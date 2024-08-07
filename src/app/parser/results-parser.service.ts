import { Injectable } from '@angular/core';

import { mapDocToNotice } from './adventure-parser.operators';
import { BoxExtractor } from './extractors/BoxExtractor';
import { ParserService } from './parser.service';
import { extractResultContent } from './parser.utils';
import type { Result } from '../action/results.types';
import { NoticeService } from '../notice/notice.service';

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

    const boxExtractor = new BoxExtractor(dom);
    const resultBox = boxExtractor.getBoxByTitle('Results:');

    if (!resultBox) {
      return { entries: [], title: 'Results:', type: 'result' };
    }

    const content = resultBox.getContent();

    return { entries: content.map(contentEntry => extractResultContent(contentEntry)), title: 'Results:', type: 'result' };
  }
  
  /**
   * Does an action in a place, like tavern.php?action=barkeep
   */
  public placeNotice(path: string): void {
    this.parserService.parsePageAndReturn(path).pipe(
      mapDocToNotice(),
    ).subscribe(notice => {
      this.noticeService.setNotice(notice);
    });
  }
}
