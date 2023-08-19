import { Express } from 'express';
import { JSDOM } from 'jsdom';

import { fetchPage } from './request';
import { InventoryEntry } from '../src/app/main/inventory/inventory.types';

function extractPwdHash(httpString: string): string | undefined {
  return httpString.match(/pwd=([^"']*)/)?.[1];
}

function parseInventorySubpage(page: string): unknown {
  const dom = new JSDOM(page);
  const body = dom.window.document.body;

  const sections = Array.from(body.querySelectorAll('.stuffbox'));
 
  return sections.reduce((result, section) => {
    // food, booze, etc.
    const sectionName = section.parentElement?.getAttribute('name');

    if (!sectionName) {
      return result;
    }

    const items = section.querySelectorAll('.item');

    const mappedItems = Array.from(items).map(item => {
      // TODO: disabled action => <s>
      const actionElement = item.querySelector('a');
      const action = actionElement?.innerHTML?.slice(1, -1);
      const count = item.querySelector('b.ircm')?.nextElementSibling?.innerHTML.slice(1, -1);
      const image = item.querySelector('img')?.getAttribute('src') || undefined;
      const name = item.querySelector('b.ircm')?.innerHTML;
      const id = item.getAttribute('id')?.slice(2);

      const parentElementLength = actionElement?.parentElement?.childNodes.length ?? 0;

      const qualitySizeElement = actionElement?.parentElement?.childNodes[parentElementLength -1];

      // Colored text is wrapped in a <font> tag, non-colored is not...
      const qualitySizeText = qualitySizeElement?.nodeName === 'FONT'
        ? qualitySizeElement.childNodes[0]?.nodeValue
        : qualitySizeElement?.nodeValue;

      const [ _, quality, size ] = qualitySizeText?.match(/\((.*),\ssize:\s(.*)\)/) || [ '', '', '' ];

      const inventoryEntry: InventoryEntry = {
        action,
        count,
        id,
        image,
        name,
        quality,
        size,
      };

      return inventoryEntry;
    });

    return {
      ...result,
      [sectionName]: mappedItems,
    };

  }, {});
}

export function setupParse(app: Express): void {
  app.get('/parse/inventory', async (req, res) => {
    const cookies = req.headers['x-session'];

    if (!cookies) {
      res.status(400).send({ error: 'missing-parameters' });
      res.end();
        
      return;
    }

    // const { body, error, redirectedTo, status } = await fetchPage({ cookies, path: 'inventory.php' });
    const page1Promise = fetchPage({ cookies, path: 'inventory.php?which=1' });
    const page2Promise = fetchPage({ cookies, path: 'inventory.php?which=2' });
    const page3Promise = fetchPage({ cookies, path: 'inventory.php?which=3' });

    const [ page1, page2, page3 ] = await Promise.all([ page1Promise, page2Promise, page3Promise ]);

    if (page1.redirectedTo || page2.redirectedTo || page3.redirectedTo) {
      res.set('X-Redirected-To', page1.redirectedTo || page2.redirectedTo || page3.redirectedTo);
      res.end();
      
      return;
    }

    if (page1.status >= 300 || page2.status >= 300 || page3.status >= 300) {
      // TODO
    }

    const pwd = extractPwdHash(page1.body as string) ?? extractPwdHash(page2.body as string) ?? extractPwdHash(page3.body as string) ?? '';

    const consumables = parseInventorySubpage(page1.body as string);
    const equipment = parseInventorySubpage(page2.body as string);
    const miscellaneous = parseInventorySubpage(page3.body as string);

    const items = {
      consumables,
      equipment,
      miscellaneous,
    };

    res.send({
      items,
      pwd,
    });
    res.end();
  });
}