import { Injectable } from '@angular/core';
import { Observable, combineLatest, map, of } from 'rxjs';

import { ParserService } from './parser.service';
import { InventoryData, InventoryDataWithPwd, InventoryEntry } from '../main/inventory/inventory.types';

@Injectable({
  providedIn: 'root',
})
export class InventoryParserService {

  public inventory$: Observable<InventoryDataWithPwd | null> = of(null);

  public constructor(
    private parserService: ParserService,
  ) {
    this.inventory$ = this.parseAll();
  }
  
  private parseSubpage(doc: Document): unknown {
    const sections = Array.from(doc.querySelectorAll('.stuffbox'));
    
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
          ? qualitySizeElement.childNodes[0].nodeValue
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

  private parseAll(): Observable<InventoryDataWithPwd> {
    return combineLatest([
      this.parserService.parse('inventory.php?which=1'),
      this.parserService.parse('inventory.php?which=2'),
      this.parserService.parse('inventory.php?which=3'),
    ]).pipe(
      map(([ { doc: doc1, pwd }, { doc: doc2 }, { doc: doc3 } ]) => {
        const consumables: InventoryData['consumables'] = this.parseSubpage(doc1) as InventoryData['consumables'];
        const equipment: InventoryData['equipment'] = this.parseSubpage(doc2) as InventoryData['equipment'];
        const miscellaneous: InventoryData['miscellaneous'] = this.parseSubpage(doc3) as InventoryData['miscellaneous'];

        const inventory: InventoryData = {
          consumables,
          equipment,
          miscellaneous,
        };

        return {
          items: inventory,
          pwd,
        };
      }),
    );
  }
}
