
import type { EffectData } from 'src/app/user/user.types';

import { AdventureExtractor } from './AdventureExtractor';
import { Box } from './Box';
import { isElement, isTruthy } from '../../../shared/general';

/**
 * Holds all boxes of the current page.
 */
export class BoxesExtractor {
    
  #titles = new Array<string>();
  #elements = new Array<Element>();

  #extractBoxes = (doc: Document | Element): [Array<string>, Array<Element>]  => {
    const oldStyleTds = Array.from(doc.querySelectorAll('td[bgcolor="blue"]'));
    
    return (oldStyleTds.length > 0 ? oldStyleTds : Array.from(doc.querySelectorAll('td[style="background-color: blue"]')))
      .map(e => e?.parentNode?.parentNode)
      .filter(isTruthy)
      .filter(isElement)
      .reduce(([ titles, elements ]: [Array<string>, Array<Element>], e) => {
        const title = e.querySelector('b')?.innerHTML || '';
        titles.push(title);
        elements.push(e.childNodes[1] as Element);

        return [ titles, elements ];
      }, [ [], [] ]);
  };
  public constructor(doc: Document | Element) {
    const [ titles, elements ] = this.#extractBoxes(doc);
    this.#titles = titles;
    this.#elements = elements;
  }

  public hasBoxWithTitle(...boxTitles: string[]): boolean {
    return boxTitles.some(boxTitle => this.#titles.includes(boxTitle));
  }

  public getBoxByTitle(boxTitle: string): Box | undefined {
    const element = this.#elements.find((_, index) => this.#titles[index] === boxTitle);

    return element ? new Box(element) : undefined;
  }

  public hasBoxWithQuery(query: string): boolean {
    return this.#elements.some(element => element.querySelector(query) !== null);
  }

  public getBoxByQuery(query: string): Box | undefined {
    const boxElement = this.#elements.find(element => element.querySelector(query) !== null);

    return boxElement ? new Box(boxElement) : undefined;
  }

  public getBoxByIndex(index: number): Element | undefined {
    return this.#elements[index];
  }

  /**
   * An "Effect-like" is a tuple of image and text, that doesn't have the "effect" class.
   */
  public getEffectLikes(): Array<EffectData> {
    const allImages = this.#elements.flatMap(element => Array.from(element.querySelectorAll('img')));

    const filteredImages = allImages.filter(image => image.getAttribute('height') === '30' && image.parentNode?.parentElement?.childNodes[1].nodeName === 'TD');

    return filteredImages.map(imageElement => {
      const name = imageElement.parentNode?.parentElement?.childNodes[1].textContent || '';
      const image = imageElement.getAttribute('src') || '';

      return {
        duration: '',
        effectId: '',
        image,
        isExtendable: false,
        name,
        skillId: '',
      };
    });
  }

  public toAdventureExtractor(): AdventureExtractor {
    return new AdventureExtractor(this);
  }
}
