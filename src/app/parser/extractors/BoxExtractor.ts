import { AdventureExtractor } from './AdventureExtractor';
import { Box } from './Box';
import { isElement, isTruthy } from '../../utils/general';

export class BoxExtractor {
    
  #titles = new Array<string>();
  #elements = new Array<Element>();

  #extractBoxes = (doc: Document | Element): [Array<string>, Array<Element>]  =>
    Array.from(doc.querySelectorAll('td[bgcolor="blue"]'))
      .map(e => e?.parentNode?.parentNode)
      .filter(isTruthy)
      .filter(isElement)
      .reduce(([ titles, elements ]: [Array<string>, Array<Element>], e) => {
        const title = e.querySelector('b')?.innerHTML || '';
        titles.push(title);
        elements.push(e);

        return [ titles, elements ];
      }, [ [], [] ]);

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
    const element = this.#elements.find(element => element.querySelector(query) !== null);

    return element ? new Box(element) : undefined;
  }

  public getBoxByIndex(index: number): Element | undefined {
    return this.#elements[index];
  }

  public toAdventureExtractor(): AdventureExtractor {
    return new AdventureExtractor(this);
  }
}
