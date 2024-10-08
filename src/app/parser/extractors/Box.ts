import type { ResultEntry } from 'src/app/action/results.types';
import type { Item, Stats } from 'src/app/adventure/adventure.types';
import type { Image } from 'src/app/place/place.types';

import type { Damage, Element as KolElement } from '../../../shared/inventory.types';

export class Box {

  #text: string | undefined;
  
  public constructor(
      public readonly element: Element,
  ) {
    //
  }
  
  public getImage(): Image {
    // const img = this.element.querySelector('#monpic') as HTMLImageElement; 
    const img = this.element.querySelector('img');
      
    return {
      height: img?.getAttribute('height') || '',
      url: img?.getAttribute('src') || '',
      width: img?.getAttribute('width') || '',
    };
  }
  
  public getDescription(): string {
    return this.element.querySelector('blockquote')?.innerHTML
      || this.element.querySelector('p')?.innerHTML
      || '';
  }
  
  public getContent(): Element[] {
    return Array.from(this.element.querySelectorAll('tr')?.[1].querySelector('td td')?.children || []);
  }
  
  public getText(): string {
    if (!this.#text) {
      this.#text = Array.from(this.element.querySelectorAll('td')).map(td => td.innerHTML).join(' ');
    }
  
    return this.#text;
  }
  
  public getTitle(): string {
    // return this.element.querySelectorAll('b')[1]?.innerHTML || '';
    return this.element.querySelectorAll('b')[0]?.innerHTML || '';
  }

  public getAdventures(): number {
    const text = this.getText();
    
    return parseInt(text.match(/You\s+gain\s+(\d+)\s+Adventure/)?.[1] || '', 10) || -parseInt(text.match(/You\s+lose\s+(\d+)\s+Adventure/)?.[1] || '', 10) || 0;
  }
  
  public getItems(): Item[] {
    return Array.from(this.element.querySelectorAll('.item')).map(itemElement => {
      const image = itemElement.querySelector('img')?.getAttribute('src') || '';
      const name = itemElement.querySelector('b')?.innerHTML || '';
      
      const item: Item = {
        amount: 1, // TODO
        id: '', // TODO
        image,
        name,
      };
      
      return item;
    });
  }
  
  public getMeat(): number {
    const text = this.getText();
  
    return parseInt(text.match(/You\s+gain\s+(\d+)\s+Meat/)?.[1] || '', 10) || -parseInt(text.match(/You\s+spent\s+(\d+)\s+Meat/)?.[1] || '') || 0;
  }
  
  public getDamage(): Record<Damage, number> & { isCritical: boolean } {
    const damageElement = Array.from(this.element.querySelectorAll('p')).find(p => p.innerHTML.includes('damage'));
    const damageText = damageElement?.innerHTML || '';
  
    const physicalDamage = damageText.match(/(\d+).*/);
    const offhandDamage = damageText.match(/\(<b>\+(\d+)<\/b>\)/);
    const elementDamages = Array.from(damageText.matchAll(/color="(.*?)"><b>\+(\d+)/g));
  
    const elementDmg: Record<Exclude<KolElement, 'physical'>, number> = elementDamages.reduce((acc, [ _, color, damage ]) => {
      switch (color) {
      case 'blueviolet':
        acc.sleaze = parseInt(damage, 10);
        break;
      case 'gray':
        acc.spooky = parseInt(damage, 10);
        break;
      case 'red':
        acc.hot = parseInt(damage, 10);
        break;
      case 'green':
        acc.stench = parseInt(damage, 10);
        break;
      case 'blue':
        acc.cold = parseInt(damage, 10);
        break;
      }
  
      return acc;
    }, { cold: 0, hot: 0, sleaze: 0, spooky: 0, stench: 0 });
  
    return {
      ...elementDmg,
      // TODO
      isCritical: false,
      offhand: parseInt(offhandDamage?.[1] || '0', 10),
      physical: parseInt(physicalDamage?.[1] || '0', 10),
    };
  }

  public getStatGain(): Stats {
    const text = this.getText();

    return {
      hasMoxieUpgrade: text.includes('You gain a Moxie point!'),
      hasMuscleUpgrade: text.includes('You gain a Muscle point!'),
      hasMysticalityUpgrade: text.includes('You gain a Mysticality point!'),
      moxie: parseInt(text.match(/You\s+gain\s+(\d+) (?:Cheek|Moxie|Roguishness|Sarcasm|Chutzpah|Smarm)/i)?.[1] || '', 10) || 0,
      muscle: parseInt(text.match(/You\s+gain\s+(\d+) (?:Beefiness|Strongness|Muscleboundness|Strengthliness|Fortitude)/i)?.[1] || '', 10) || 0,
      mysticality: parseInt(text.match(/You\s+gain\s+(\d+) (?:Wizardliness|Magicalness|Enchantedness|Mysteriousness)/i)?.[1] || '', 10) || 0,
    };
  }

  public getResultEntry(): ResultEntry {
    const elementText = this.getText(); //extractAllTdText(element);
  
    const adventures = this.getAdventures(); // extractAdventures(elementText);
    if (adventures) {
      return { type: 'adventure', value: adventures };
    }

    // TODO: is this correct?
    const item = this.getItems()[0]; // extractItems(element)[0];
    if (item) {
      return { type: 'item', value: item };
    }
    const meat = this.getMeat(); // extractMeat(elementText);
    if (meat) {
      return { type: 'meat', value: meat };
    }
  
    const stats = this.getStatGain(); // extractStatGain(elementText);
    if (stats) {
      return { type: 'stats', value: stats };
    }
  
    const effect = undefined; // extractEffect(element);
    if (effect) {
      return { type: 'effect', value: effect };
    }
  
    const image = this.getImage().url; // extractImage(element);
    if (image) {
      return { type: 'image', value: image };
    }
  
    return { type: 'text', value: elementText };
  }

  public getResult(): ResultEntry[] {
    // return this.getContent().map(element => this.getResultEntry());
    // TODO

    return [];
  }
  
  public getPwd(): string {
    return this.element.querySelector('input[type="hidden"][name="pwd"]')?.getAttribute('value') || '';
  }
}
