import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ParserService } from './parser.service';
import { Element, ItemDescriptionData, ItemEffect, OutfitDescriptionData } from '../main/inventory/inventory.types';
import { RoutingService } from '../routing/routing.service';
import { handleScriptNotLoggedIn } from '../utils/http.utils';

function getEffectElement(node: ChildNode): Element | 'none' {
  if (node.nodeName !== 'FONT' && node.nodeType !== Node.ELEMENT_NODE) {
    return 'none';
  }

  const element = node as unknown as HTMLElement;
  const color = element.getAttribute('color');
  
  if (color === 'red') {
    return 'hot';
  } else if (color === 'blue') {
    return 'cold';
  } else if (color === 'gray') {
    return 'spooky';
  } else if (color === 'green') {
    return 'stench';
  } else if (color === 'blueviolet') {
    return 'sleaze';
  }

  return 'none';
}

function extractEffects(doc: Document): ItemEffect[][] {
  const effectsElement = doc.querySelector('font[color="blue"]');

  return Array.from(effectsElement?.childNodes || []).reduce((acc: ItemEffect[][], element, index, arr) => {
    if (arr[index].nodeName === 'BR') {
      return acc;
    }

    if (index === 0 || arr[index - 1].nodeName === 'BR') {
      acc.push([ {
        element: getEffectElement(element),
        name: element.textContent || '',
      } ]);
    } else {
      acc[acc.length - 1].push({
        element: getEffectElement(element),
        name: element.textContent || '',
      });
    }
    return acc;
  }, []);
}

/**
 * TODO:
 * known not working items:
 * - Franken Stein: description
 */
function mapDocToItemDescription(doc: Document): ItemDescriptionData {
  const image = doc.querySelector('img')?.getAttribute('src') ?? '';
  const name = doc.querySelector('b')?.textContent ?? '';

  const blockElement = doc.querySelector('blockquote');

  // There a two types of tooltips, one wrappes the stats in a <p> tag, the other one doesn't
  const paragraphAmount = Array.from(blockElement?.childNodes || []).filter(element => element.nodeName === 'P' && element.childNodes.length > 1).length;
  const unsortedListAmount = paragraphAmount === 0
    ? Array.from(blockElement?.childNodes || []).filter(element => element.nodeName === 'UL' && element.childNodes.length > 1).length
    : 0;
  
  const statsElement = paragraphAmount === 0 && unsortedListAmount === 0
    ? blockElement
    : paragraphAmount > 0 
      ? blockElement?.querySelector('p')
      : blockElement?.querySelector('ul');

  const description = statsElement?.innerHTML.split('<!--')[0] || '';

  const resultData: ItemDescriptionData = {
    components: [],
    damage: undefined,
    description: '',
    effects: [],
    image: '',
    isDiscardable: true,
    isFreePull: false,
    isQuestItem: false,
    isTradable: true,
    name: '',
    onlyOne: false,
    outfit: undefined,
    power: '',
    required: {
      moxie: undefined,
      muscle: undefined,
      mysticallity: undefined,
    },
    sellingPrice: undefined,
    type: '',
  };

  const effects = extractEffects(doc);

  const onlyOne = Array.from(blockElement?.childNodes || []).some(e => e.nodeType === 3 && e.textContent === ' You may not equip more than one of these at a time.');

  const result = Array.from(statsElement?.childNodes || []).reduce((acc: ItemDescriptionData, element) => {
    if (element.nodeName === 'B' && element.textContent === 'Quest Item') {
      acc.isQuestItem = true;
      return acc;
    }
    
    if (element.nodeType !== Node.TEXT_NODE) {
      return acc;
    }

    if (element.textContent?.includes('component') || element.textContent?.includes('ingredient')) {
      acc.components.push(element.textContent || '');
    } else {
      switch(element.textContent) {
      case 'Damage: ':
        acc.damage = element.nextSibling?.textContent || '';
        break;
      case 'Power: ':
        acc.power = element.nextSibling?.textContent || '';
        break;
      case 'Selling Price: ':
        acc.sellingPrice = element.nextSibling?.textContent || '';
        break;
      case 'Moxie Required: ':
        acc.required.moxie = element.nextSibling?.textContent || '';
        break;
      case 'Muscle Required: ':
        acc.required.muscle = element.nextSibling?.textContent || '';
        break;
      case 'Mysticallity Required: ':
        acc.required.mysticallity = element.nextSibling?.textContent || '';
        break;
      case 'Type: ':
        acc.type = element.nextSibling?.textContent || '';
        break;
      case 'Cannot be discarded':
        acc.isDiscardable = false;
        break;
      case 'Cannot be traded':
        acc.isTradable = false;
        break;
      case 'Cannot be traded or discarded':
        acc.isTradable = false;
        acc.isDiscardable = false;
        break;
      case 'Free pull from Hagnk\'s':
        acc.isFreePull = true;
        break;
      }
    }
    return acc;
  }, resultData);

  const outfitElement = blockElement?.querySelector('table');
  if (outfitElement) {
    const outfitNameElement = outfitElement.querySelectorAll('td')[1].querySelector('span');
    const outfitId = outfitNameElement?.getAttribute('onclick')?.match(/\?whichoutfit=(\d+)/)?.[1];
    const outfitName = outfitNameElement?.textContent;
    const outfitAmount = outfitElement.querySelectorAll('td')[1].childNodes[2].textContent;
    resultData.outfit = {
      amount: outfitAmount || '',
      id: outfitId || '',
      name: outfitName || '',
    };  
  }

  return {
    ...result,
    description,
    effects,
    image,
    name,
    onlyOne,
  };
}

function mapDocToOutfitDescription(doc: Document): OutfitDescriptionData {
  const imageElement = doc.querySelector('img');
  const image = imageElement?.getAttribute('src') || '';

  const nameElement = imageElement?.parentElement?.querySelector('b');
  const name = nameElement?.textContent || '';

  const effects = extractEffects(doc);
  
  return {
    effects,
    image,
    name,
  };
}

@Injectable({
  providedIn: 'root',
})
// TODO: rename to DescriptionParserService
export class DescItemParserService {

  public constructor(
    private parserService: ParserService,
    private routingService: RoutingService) {
    //
  }

  public itemDescription(id: number | string): Observable<ItemDescriptionData | null> {
    return this.parserService.parsePageAndReturn(`desc_item.php?whichitem=${id}`).pipe(
      handleScriptNotLoggedIn(this.routingService),
      map(({ doc }) => mapDocToItemDescription(doc)),
    );
  }

  public outfit(id: string): Observable<OutfitDescriptionData | null> {
    return this.parserService.parsePageAndReturn(`desc_outfit.php?whichoutfit=${id}`).pipe(
      handleScriptNotLoggedIn(this.routingService),
      map(({ doc }) => mapDocToOutfitDescription(doc)),
    );
  }
}
