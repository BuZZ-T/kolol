import { Effect, ResultEntry } from '../action/results.types';
import { Item } from '../adventure/adventure.types';
import { Damage, Element as KolElement } from '../main/inventory/inventory.types';
import { isElement, isTruthy } from '../utils/general';

/**
 * The first <b> tag in the document is the title of the box.
 * @deprecated use extractBoxBody instead
 */
export function getBoxTitle(doc: Document): string {
  return doc.querySelector('b')?.innerHTML || '';
}

export const extractAllTdText = (doc: Element | Document): string => Array.from(doc.querySelectorAll('td')).map(td => td.innerHTML).join(' ');

/**
 * Returns all Boxes as <tbody> (including the title)
 */
export const extractBoxes = (doc: Document | Element): Array<[string, Element]> =>
  Array.from(doc.querySelectorAll('td[bgcolor="blue"]'))
    .map(e => e?.parentNode?.parentNode)
    .filter(isTruthy)
    .filter(isElement)
    .map(e => [ e.querySelector('b')?.innerHTML || '', e ]);

export const extractBoxByTitle = (doc: Document | Element, boxTitle: string): Element | undefined =>
  extractBoxes(doc).find(([ title ]) => title === boxTitle)?.[1];

export const extractStatGain = (text: string): {moxie: number, muscle: number, mysticallity: number } => ({
  moxie: parseInt(text.match(/You\s+gain\s+(\d+) (?:Cheek|Moxie|Roguishness|Sarcasm)/i)?.[1] || '', 10) || 0,
  muscle: parseInt(text.match(/You\s+gain\s+(\d+) (?:Beefiness)/i)?.[1] || '', 10) || 0,
  mysticallity: parseInt(text.match(/You\s+gain\s+(\d+) (?:Wizardliness)/i)?.[1] || '', 10) || 0,
});

const extractAdventures = (text: string): number =>
  parseInt(text.match(/You\s+gain\s+(\d+)\s+Adventure/)?.[1] || '', 10) || -parseInt(text.match(/You\s+lose\s+(\d+)\s+Adventure/)?.[1] || '') || 0;

export const extractMeat = (text: string): number =>
  parseInt(text.match(/You\s+gain\s+(\d+)\s+Meat/)?.[1] || '', 10) || -parseInt(text.match(/You\s+spent\s+(\d+)\s+Meat/)?.[1] || '') || 0;

export const extractItems = (doc: Document): Item[] => 
  Array.from(doc.querySelectorAll('.item')).map(itemElement => {
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

const extractItem = (doc: Document | Element): Item | null => {
  const itemElement = doc.querySelector('.item');
  if (!itemElement) {
    return null;
  }
  const image = itemElement.querySelector('img')?.getAttribute('src') || '';
  const name = itemElement.querySelector('b')?.innerHTML || '';

  return {
    amount: 1, // TODO
    id: '', // TODO
    image,
    name,
  };
};

// TODO
export const extractEffect = (doc: Document | Element): Effect | null => null;

// TODO
const extractImage = (doc: Document | Element): string | null => null;

export const extractResultContent = (element: Element): ResultEntry => {
  const elementText = extractAllTdText(element);
  
  const adventures = extractAdventures(elementText);
  if (adventures) {
    return { type: 'adventure', value: adventures };
  }
  const item = extractItem(element);
  if (item) {
    return { type: 'item', value: item };
  }
  const meat = extractMeat(elementText);
  if (meat) {
    return { type: 'meat', value: meat };
  }

  const stats = extractStatGain(elementText);
  if (stats) {
    return { type: 'stats', value: stats };
  }

  const effect = extractEffect(element);
  if (effect) {
    return { type: 'effect', value: effect };
  }

  const image = extractImage(element);
  if (image) {
    return { type: 'image', value: image };
  }

  return { type: 'text', value: elementText };
};

export const extractDamage = (doc: Document): Record<Damage, number> => {

  const damageElement = Array.from(doc.querySelectorAll('p')).find(p => p.innerHTML.includes('damage'));
  const damageText = damageElement?.innerHTML || '';

  const physicalDamage = damageText.match(/(\d+).*/);
  const offhandDamage = damageText.match(/\(<b>\+(\d+)<\/b>\)/);
  const elementDamages = Array.from(damageText.matchAll(/color="(.*)"><b>\+(\d+)/g));

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
    offhand: parseInt(offhandDamage?.[1] || '0', 10),
    physical: parseInt(physicalDamage?.[1] || '0', 10),
  };
};
