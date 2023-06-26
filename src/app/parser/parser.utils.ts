import { Item } from '../adventure/adventure.types';
import { Damage, Element } from '../main/inventory/inventory.types';

/**
 * The first <b> tag in the document is the title of the box.
 */
export function getBoxTitle(doc: Document): string {
  return doc.querySelector('b')?.innerHTML || '';
}

export const extractMuscleGain = (text: string): string => text.match(/You\s+gain\s+(\d+) (?:Beefiness)/i)?.[1] || '';
export const extractMoxieGain = (text: string): string => text.match(/You\s+gain\s+(\d+) (?:Cheek|Moxie|Roguishness|Sarcasm)/i)?.[1] || '';

export const extractMeat = (text: string): string => text.match(/You\s+gain\s+(\d+)\s+Meat/)?.[1] || '';

export const extractItems = (doc: Document): Item[] => 
  Array.from(doc.querySelectorAll('.item')).map(itemElement => {
    const image = itemElement.querySelector('img')?.getAttribute('src') || '';
    const name = itemElement.querySelector('b')?.innerHTML || '';

    const item: Item = {
      amount: 1, // TODO
      image,
      name,
    };

    return item;
  });

export const extractEffects = (doc: Document): void => {
  const effects = Array.from(doc.querySelectorAll('.effect'));
    
  // .map(tr => {
};

export const extractDamage = (doc: Document): Record<Damage, number> => {

  const damageElement = Array.from(doc.querySelectorAll('p')).find(p => p.innerHTML.includes('damage'));
  const damageText = damageElement?.innerHTML || '';

  const physicalDamage = damageText.match(/(\d+).*/);
  const offhandDamage = damageText.match(/\(<b>\+(\d+)<\/b>\)/);
  const elementDamages = Array.from(damageText.matchAll(/color="(.*)"><b>\+(\d+)/g));

  const elementDmg: Record<Exclude<Element, 'physical'>, number> = elementDamages.reduce((acc, [ _, color, damage ]) => {
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
    offhand: parseInt(offhandDamage?.[1] || '0', 10),
    physical: parseInt(physicalDamage?.[1] || '0', 10),
  };
};
