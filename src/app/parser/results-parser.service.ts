import { Injectable } from '@angular/core';
import { filter } from 'rxjs';

import { mapDocToNotice } from './adventure-parser.utils';
import { ParserService } from './parser.service';
import { Effect, Item, Result } from '../action/results.types';
import { NoticeService } from '../notice/notice.service';
import { isTruthy } from '../utils/general';

@Injectable({
  providedIn: 'root',
})
export class ResultsParserService {

  private domParser = new DOMParser();

  public constructor(private parserService: ParserService, private noticeService: NoticeService) { 
    //
  }

  /**
   * Parse the result received from an action (casting a skill, use an item, etc.)
   */
  public parseHtml(html: string): Result {
    const dom = this.domParser.parseFromString(html, 'text/html');

    const blocks = Array.from(dom.querySelectorAll('.effect'));

    const result: Result = blocks.reduce((res, block) => {
      // the line ends with colon and trailing space, therefore we use "".startsWith"
      const isItem = block.childNodes[0].nodeValue?.startsWith('You acquire an item');
      const isEffect = block.childNodes[0].nodeValue?.startsWith('You acquire an effect');

      const name = block.childNodes[1].textContent ?? '';
      const img = block.previousElementSibling?.querySelector('img');
      const image = img?.getAttribute('src') ?? '';

      if (isItem) {
        const id = img?.getAttribute('onclick')?.match(/descitem\((.*)\)/)?.[1] ?? '';

        const item: Item = {
          id,
          image,
          name,
        };

        res.items.push(item);
      } else if (isEffect) {
        const duration = block.childNodes[block.childNodes.length -1]?.nodeValue?.match(/\(duration:\s(.*)\sAdventures\)/)?.[1] ?? '';
        const id = img?.getAttribute('onclick')?.match(/eff\("(.*)"\)/)?.[1] ?? '';

        const effect: Effect = {
          duration,
          id,
          image,
          name,
        };

        res.effects.push(effect);
      }

      return res;
    }, { adventures: 0, effects: [], items: [], stats: { moxie: 0, muscle: 0, mysticallity: 0 } } as Result);

    return result;
  }
  
  /**
   * Does an action in a place, like tavern.php?action=barkeep
   */
  public placeAction(path: string): void {
    this.parserService.parseRaw(path).pipe(
      mapDocToNotice(),
    ).subscribe(notice => {
      console.log('notice', notice);
      this.noticeService.setNotice(notice);
    });
  }
  
}
