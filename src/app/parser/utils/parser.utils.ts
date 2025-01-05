import type { HttpErrorResponse } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { throwError } from 'rxjs';

import type { Effect, ResultEntry } from '../../action/results.types';
import type { Item } from '../../adventure/adventure.types';

export const extractAllTdText = (doc: Element | Document): string => Array.from(doc.querySelectorAll('td')).map(td => td.innerHTML).join(' ');

/**
 * @deprecated use box.getStatGain() instead
 */
export const extractStatGain = (text: string): {moxie: number, muscle: number, mysticality: number } => ({
  moxie: parseInt(text.match(/You\s+gain\s+(\d+) (?:Cheek|Moxie|Roguishness|Sarcasm)/i)?.[1] || '', 10) || 0,
  muscle: parseInt(text.match(/You\s+gain\s+(\d+) (?:Beefiness)/i)?.[1] || '', 10) || 0,
  mysticality: parseInt(text.match(/You\s+gain\s+(\d+) (?:Wizardliness)/i)?.[1] || '', 10) || 0,
});

/**
 * @deprecated use box.getAdventures() instead
 */
const extractAdventures = (text: string): number =>
  parseInt(text.match(/You\s+gain\s+(\d+)\s+Adventure/)?.[1] || '', 10) || -parseInt(text.match(/You\s+lose\s+(\d+)\s+Adventure/)?.[1] || '') || 0;

/**
 * 
 * @deprecated use box.getMeat() instead
 */
export const extractMeat = (text: string): number =>
  parseInt(text.match(/You\s+gain\s+(\d+)\s+Meat/)?.[1] || '', 10) || -parseInt(text.match(/You\s+spent\s+(\d+)\s+Meat/)?.[1] || '') || 0;

/**
 * 
 * @deprecated use box.getItems() instead
 */
export const extractItems = (doc: Document | Element): Item[] => 
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
  const item = extractItems(element)[0];
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

export function handleError(error: HttpErrorResponse): Observable<never> {
  if (error.status === 0) {
    console.error('Could not fetch:', error.error);
  } else {
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
}
