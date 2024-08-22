import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ParserService } from './parser.service';
import { Element, ItemDescriptionData, ItemEffect, OutfitDescriptionData, SkillEffectDescriptionData } from '../../shared/inventory.types';
import { RoutingService } from '../routing/routing.service';
import { FamiliarDescriptionData } from '../user/user.types';
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
  // food/booze quality awesome is also wrapped in a <font color="blue"> tag
  const effectsElement = doc.querySelector('b font[color="blue"]')?.parentElement
    || Array.from(doc.querySelectorAll('font[color="blue"]')).at(-1)
    || doc.querySelector('span[style="display: block; font-weight: bold;text-align: center;color:blue"');

  if (effectsElement?.childElementCount === 0) {
    return [];
  }

  // Sometimes the effects are <font><b>[effects]</b></font> and sometimes they are <b><font>[effects]</font></b>... 
  const usedEffectsElement = effectsElement?.childNodes.length === 1 && effectsElement?.childNodes[0].nodeName === 'B'
    ? effectsElement?.childNodes[0]
    : effectsElement;

  return Array.from(usedEffectsElement?.childNodes || []).reduce((acc: ItemEffect[][], element, index, arr) => {
    if (element.nodeName === 'BR') {
      return acc;
    }

    if (index === 0 || arr[index - 1].nodeName === 'BR') {
      acc.push([ {
        element: getEffectElement(element),
        id: undefined,
        name: element.textContent || '',
      } ]);
    } else {
      acc[acc.length - 1].push({
        element: getEffectElement(element),
        id: undefined,
        name: element.textContent || '',
      });
    }
    return acc;
  }, []);
}

/**
 * TODO:
 * known not working items:
 * - Typical Tavern swill: description
 * - Franken Stein: description
 * - artisanal limoncello: description
 */
function mapDocToItemDescription(doc: Document): ItemDescriptionData {
  const image = doc.querySelector('img')?.getAttribute('src') ?? '';
  const name = doc.querySelector('b')?.textContent ?? '';

  const blockElement = doc.querySelector('blockquote');

  // There a two types of tooltips, one wrappes the stats in a <p> tag, the other one doesn't
  const paragraphIndex = Array.from(blockElement?.childNodes || []).findIndex(element => element.nodeName === 'P' && (element as HTMLElement).childElementCount > 0);
  const unsortedListAmount = paragraphIndex === -1
    ? Array.from(blockElement?.childNodes || []).filter(element => element.nodeName === 'UL' && element.childNodes.length > 1).length
    : 0;
  
  const statsElement = paragraphIndex === -1 && unsortedListAmount === 0
    ? blockElement
    : paragraphIndex !== -1
      ? (blockElement?.childNodes[paragraphIndex] as HTMLElement)
      : blockElement?.querySelector('ul');

  const description = statsElement?.innerHTML.split('<!--')[0] || '';

  const resultData: ItemDescriptionData = {
    components: [],
    damage: undefined,
    description: '',
    effect: undefined,
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
      level: undefined,
      moxie: undefined,
      muscle: undefined,
      mysticallity: undefined,
    },
    sellingPrice: undefined,
    type: {
      quality: undefined,
      text: '',
    },
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
        acc.type = {
          quality: element.nextSibling?.textContent?.match(/\((.+)\)/)?.[1]?.trim(),
          text: element.nextSibling?.textContent?.replace(/\(.+\)/, '') || '',
        };
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
      case 'Level required: ':
        acc.required.level = element.nextSibling?.textContent || '';
        break;
      case 'Effect: ':{
        const effectName = element.nextSibling?.textContent || '';
        const duration = element.nextSibling?.nextSibling?.textContent || '';
        const id = (element as HTMLElement).nextElementSibling?.querySelector('a')?.getAttribute('href')?.split('=')[1] || '';

        acc.effect = {
          duration,
          id,
          name: effectName,
        };
        break;
      }
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

function mapDocToEffectDescription(doc: Document): SkillEffectDescriptionData {
  const image = doc.querySelector('img')?.getAttribute('src') ?? '';
  const name = doc.querySelector('b')?.textContent ?? '';
  const description = doc.querySelector('blockquote')?.textContent || '';
  const effects = extractEffects(doc);
  
  return {
    description,
    effects,
    image,
    name,
  };
}

function mapDocToFamiliarDescription(doc: Document, id: string): FamiliarDescriptionData {
  const description = doc.querySelector('table')?.textContent || '';
  
  return {
    description,
    effects: extractEffects(doc),
    id,
    image: doc.querySelector('img')?.getAttribute('src') || '',
    type: doc.querySelector('b')?.textContent || '',
  };
}

@Injectable({
  providedIn: 'root',
})
// TODO: rename to DescriptionParserService
export class DescriptionParserService {

  public constructor(
    private parserService: ParserService,
    private routingService: RoutingService) {
    //
  }

  public itemDescription(id: number | string): Observable<ItemDescriptionData> {
    return this.parserService.parsePageAndReturn(`desc_item.php?whichitem=${id}`).pipe(
      handleScriptNotLoggedIn(this.routingService),
      map(({ doc }) => mapDocToItemDescription(doc)),
    );
  }

  public outfit(id: string): Observable<OutfitDescriptionData> {
    return this.parserService.parsePageAndReturn(`desc_outfit.php?whichoutfit=${id}`).pipe(
      handleScriptNotLoggedIn(this.routingService),
      map(({ doc }) => mapDocToOutfitDescription(doc)),
    );
  }

  public effect(id: string): Observable<SkillEffectDescriptionData> {
    return this.parserService.parsePageAndReturn(`desc_effect.php?whicheffect=${id}`).pipe(
      handleScriptNotLoggedIn(this.routingService),
      map(({ doc }) => mapDocToEffectDescription(doc)),
    );
  }

  public familiar(id: string): Observable<FamiliarDescriptionData> {
    return this.parserService.parsePageAndReturn(`desc_familiar.php?which=${id}`).pipe(
      handleScriptNotLoggedIn(this.routingService),
      map(({ doc }) => mapDocToFamiliarDescription(doc, id)),
    );
  }
}
