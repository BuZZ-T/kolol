import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { NoticeService } from './notice.service';
import { isChoice } from '../adventure/adventure.utils';
import { Answer, AnswerEntries, AnswerImage, AnswerLink, AnswerText, EntryContent, Notice } from '../notice/notice.types';

@Component({
  selector: 'kolol-notice',
  styleUrls: [ './notice.component.scss' ],
  templateUrl: './notice.component.html',
})
export class NoticeComponent {

  public notice$: Observable<Notice | null>;

  public constructor(noticeService: NoticeService) {
    this.notice$ = noticeService.notice$;
  }

  public isAnswer(value: Notice | null): value is Answer {
    return value?.type === 'answer';
  }

  public asAnswer(value: Notice | null): Answer | undefined {
    return this.isAnswer(value) ? value : undefined;
  }

  public asAnswerText(value: AnswerText | AnswerEntries | EntryContent): AnswerText | undefined {
    return (value as AnswerText).type === 'text' ? value as AnswerText : undefined;
  }

  public asAnswerEntries(value: AnswerText | AnswerEntries | EntryContent): AnswerEntries | undefined {
    return Array.isArray(value) ? value : undefined;
  }

  public asAnswerLink(value: AnswerText | AnswerEntries | EntryContent): AnswerLink | undefined {
    return (value as AnswerLink).type === 'link' ? value as AnswerLink : undefined;
  }

  public asAnswerImage(value: AnswerText | AnswerEntries | EntryContent): AnswerImage | undefined {
    return (value as AnswerImage).type === 'image' ? value as AnswerImage : undefined;
  }

  public isChoice = isChoice;
}
