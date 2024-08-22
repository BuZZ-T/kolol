import { Express } from 'express';
import { JSDOM } from 'jsdom';

import { isTruthy } from '../../shared/general';
import { Equipment, InventoryDataWithPwd, InventoryEntry } from '../../shared/inventory.types';
import { SkillData, SkillsData, SkillsDataWithPwd } from '../../shared/skills.types';
import { fetchByPath } from '../request';
import { extractHeaders } from '../utils';

const equipNameMap = {
  'Hat': 'hat',
  'Off-Hand': 'offhand',
  'Pants': 'pants',
  'Shirt': 'shirt',
  'Weapon': 'weapon',
};

function extractPwdHash(httpString: string | undefined): string | undefined {
  return httpString?.match(/pwd=([^"']*)/)?.[1];
}

function parseCurrentEquipment(page: string): Equipment {
  const dom = new JSDOM(page);
  const body = dom.window.document.body;

  const equipment: Equipment = {
    accessories: [],
    hat: undefined,
    offhand: undefined,
    pants: undefined,
    shirt: undefined,
    weapon: undefined,
  };

  Array.from(body.querySelector('#curequip')?.querySelectorAll('tr') || []).forEach(element => {
    const type = element.querySelector('a')?.parentElement?.textContent?.replace(/:$/, '');

    const imgElement = element.querySelector('img');

    const nameElement = element.querySelector('b');
    const name = nameElement?.textContent || '';
    const strength = nameElement?.nextElementSibling?.textContent?.slice(1, -1);

    const image = imgElement?.getAttribute('src') || '';

    if (type?.startsWith('Accessory')) {
      equipment.accessories.push({
        image,
        name,
        strength: '', // accessories don't have strength
        type,
      });
    } else if (type && Object.keys(equipNameMap).includes(type)) {
      const key = equipNameMap[type as keyof typeof equipNameMap];

      equipment[key as Exclude<keyof typeof equipment, 'accessories'>] = {
        image,
        name,
        strength,
        type,
      };
    }
  });

  return equipment;
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
      const actionElements = item.querySelectorAll('a');
      const actionElement = actionElements[0];
      const action = actionElement?.innerHTML?.slice(1, -1);
      const action2 = actionElements[1]?.innerHTML?.slice(1, -1);
      
      const count = item.querySelector('b.ircm')?.nextElementSibling?.innerHTML.slice(1, -1);
      const image = item.querySelector('img')?.getAttribute('src') || undefined;

      const nameElement = item.querySelector('b.ircm');
      const name = nameElement?.innerHTML;
      const descriptionId = nameElement?.getAttribute('rel') || undefined;
      
      const id = item.getAttribute('id')?.slice(2);

      if (!id) {
        return null;
      }
      
      const parentElementLength = actionElement?.parentElement?.childNodes.length ?? 0;

      const qualitySizeElement = actionElement?.parentElement?.childNodes[parentElementLength -1];

      // Colored text is wrapped in a <font> tag, non-colored is not...
      const qualitySizeText = qualitySizeElement?.nodeName === 'FONT'
        ? qualitySizeElement.childNodes[0]?.nodeValue
        : qualitySizeElement?.nodeValue;

      const [ _, quality, size ] = qualitySizeText?.match(/\((.*),\ssize:\s(.*)\)/) || [ '', '', '' ];

      const inventoryEntry: InventoryEntry = {
        action,
        action2,
        count,
        descriptionId,
        id,
        image,
        name,
        quality,
        size,
      };

      return inventoryEntry;
    }).filter(isTruthy);

    return {
      ...result,
      [sectionName]: mappedItems,
    };

  }, {});
}

/**
  * TODO: Grouping
  * - Big and Chunky
  * - Classic (Buff/non-buff)
  * - Classic
  * - Functional
  */
function parseSkills(page: string): SkillsData {
  const dom = new JSDOM(page);
  const body = dom.window.document.body;
  
  const sections = Array.from(body.querySelectorAll('.cat'));
  
  const emptySkillsData: SkillsData = {
    Buff: [],
    CombatSkills: [],
    NotBuff: [],
    PassiveSkills: [],
  };

  const skillsData = sections.reduce((result, section) => {
    const sectionTitle = (section?.querySelector('b')?.childNodes[0]?.nodeValue?.replace(' ', '').replace('-', '') ?? '') as keyof SkillsData;
    const skillElements = Array.from(section.querySelectorAll('.skill'));

    const skills = skillElements.map(skill => {
      const cost = parseInt(skill.querySelector('.cost')?.innerHTML.slice(1, -3) ?? '', 10);
      const image = skill.querySelector('img')?.getAttribute('src') ?? '';
      const name = skill.querySelector('b')?.innerHTML ?? '';
      const isUsable = !skill.classList.contains('disabled');
      const id = skill.getAttribute('rel') ?? '';

      const descriptionContentElement = skill.nextElementSibling?.querySelector('span.small');
      const description = descriptionContentElement?.childNodes[0]?.textContent ?? '';

      const givesEffectElement = descriptionContentElement?.children[1]?.querySelector('a');
      const givesEffectId = givesEffectElement?.getAttribute('href')?.split('=')[1] ?? '';
      const givesEffectName = givesEffectElement?.textContent;

      const skillData: SkillData = {
        cost,
        dailyUseAmount: undefined, // TODO
        description,
        givesEffect: givesEffectId && givesEffectName ? { id: givesEffectId, name: givesEffectName } : undefined,
        id,
        image,
        instrument: undefined, // TODO
        isUsable,
        name,
        useAmount: undefined, // TODO
      };

      return skillData;
    });

    result[sectionTitle] = skills;

    return result;
  }, {} as SkillsData);

  return {
    ...emptySkillsData,
    ...skillsData,
  };
}

export function setupParse(app: Express): void {
  app.get('/parse/inventory', async (req, res) => {
    const { cookies } = extractHeaders(req);

    if (!cookies) {
      res.status(400).send({ error: 'missing-parameters' });
      res.end();
        
      return;
    }

    const page1Promise = fetchByPath({ cookies, path: 'inventory.php?which=1' });
    const page2Promise = fetchByPath({ cookies, path: 'inventory.php?which=2' });
    const page3Promise = fetchByPath({ cookies, path: 'inventory.php?which=3' });

    const [ page1, page2, page3 ] = await Promise.all([ page1Promise, page2Promise, page3Promise ]);

    if (page1.redirectedTo || page2.redirectedTo || page3.redirectedTo) {
      res.set('X-Redirected-To', page1.redirectedTo || page2.redirectedTo || page3.redirectedTo);
      res.end();
      
      return;
    }

    if (page1.status >= 300 || page2.status >= 300 || page3.status >= 300) {
      // TODO
    }

    const pwd = extractPwdHash(page1.body as string | undefined) ?? extractPwdHash(page2.body as string) ?? extractPwdHash(page3.body as string) ?? '';

    const consumables = parseInventorySubpage(page1.body as string);
    const equipment = parseInventorySubpage(page2.body as string);
    const miscellaneous = parseInventorySubpage(page3.body as string);

    const currentEquipment = parseCurrentEquipment(page2.body as string);

    const items = {
      consumables,
      equipment,
      miscellaneous,
    } as InventoryDataWithPwd['items'];

    const inventoryData: InventoryDataWithPwd = {
      currentEquipment,
      items,
      pwd,
    };

    res.send(inventoryData);
    res.end();
  });

  app.get('/parse/skills', async (req, res) => {
    const { cookies } = extractHeaders(req);

    if (!cookies) {
      res.status(400).send({ error: 'missing-parameters' });
      res.end();
        
      return;
    }

    const page = await fetchByPath({ cookies, path: 'skillz.php' });
    const pwd = extractPwdHash(page.body as string) ?? '';

    if (page.redirectedTo) {
      res.set('X-Redirected-To', page.redirectedTo);
      res.end();
      
      return;
    }

    if (page.status >= 300) {
      res.status(page.status).send({ error: page.error || 'unknown' });
      res.end();

      return;
    }

    const skills = parseSkills(page.body as string);

    const result: SkillsDataWithPwd = {
      pwd,
      skills,
    };

    res.send(result);
    res.end();
  });
}
