import { Injectable, inject } from '@angular/core';

import { BoxesExtractor } from './extractors/BoxesExtractor';
import { ParserService } from './parser.service';
import { mapDocToNotice } from './utils/parser.operators';
import { extractResultContent } from './utils/parser.utils';
import type { Result } from '../action/results.types';
import { NoticeService } from '../notice/notice.service';

@Injectable({
  providedIn: 'root',
})
export class ResultsParserService {
  #parserService = inject(ParserService);
  #noticeService = inject(NoticeService);

  private domParser = new DOMParser();

  /**
     * Parse the result received from an action (casting a skill, use an item, etc.)
     */
  public parseHtml(html: string): Result {
    const dom = this.domParser.parseFromString(html, 'text/html');

    const boxesExtractor = new BoxesExtractor(dom);
    const resultBox = boxesExtractor.getBoxByTitle('Results:');

    if (!resultBox) {
      return { entries: [], title: 'Results:', type: 'result' };
    }

    const content = resultBox.getContent();

    return { entries: content.map(contentEntry => extractResultContent(contentEntry)), title: 'Results:', type: 'result' };
  }

  public parseAndSetNotice(html: string): void {
    const result = this.parseHtml(html);
    this.#noticeService.setNotice(result);
  }
  
  /**
   * Does an action in a place, like tavern.php?action=barkeep
   */
  public placeNotice(path: string): void {
    this.#parserService.parsePageAndReturn(path).pipe(
      mapDocToNotice(),
    ).subscribe(notice => {
      this.#noticeService.setNotice(notice);
    });
  }
}
