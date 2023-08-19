import { Injectable } from '@angular/core';

import { mapDocToNotice } from './adventure-parser.utils';
import { ParserService } from './parser.service';
import { extractBoxes, extractResultContent } from './parser.utils';
import { Result } from '../action/results.types';
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

    const boxes = extractBoxes(dom);
    const resultBox = boxes.find(([ title ]) => title === 'Results:')?.[1];

    if (!resultBox) {
      return { entries: [], title: 'Results:', type: 'result' };
    }

    const content = Array.from(resultBox.querySelectorAll('tr')?.[1].querySelector('td td')?.children || []);
    return { entries: content.map(contentEntry => extractResultContent(contentEntry)), title: 'Results:', type: 'result' };
  }
  
  /**
   * Does an action in a place, like tavern.php?action=barkeep
   */
  public placeNotice(path: string): void {
    this.parserService.parseRaw(path).pipe(
      mapDocToNotice(),
    ).subscribe(notice => {
      this.noticeService.setNotice(notice);
    });
  }
}
