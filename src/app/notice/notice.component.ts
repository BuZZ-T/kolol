import { Component, HostBinding, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';

import { NoticeService } from './notice.service';
import type { Result } from '../action/results.types';
import { isChoice } from '../adventure/adventure.utils';
import type { Answer, AnswerEntries, AnswerImage, AnswerLink, AnswerText, EntryContent, Notice } from '../notice/notice.types';

@Component({
  selector: 'kolol-notice',
  styleUrls: [ './notice.component.scss' ],
  templateUrl: './notice.component.html',
})
export class NoticeComponent {
  #noticeService = inject(NoticeService);

  public notice$: Observable<Notice | null>;

  @HostBinding('class.is-empty')
  public isEmpty = true;

  public constructor() {
    this.notice$ = this.#noticeService.notice$.pipe(
      tap((notice) => {
        this.isEmpty = !notice;
      }),
    );
  }

  public asResult(value: Notice | null): Result | undefined {
    return value?.type === 'result' ? value : undefined;
  }

  public asAnswer(value: Notice | null): Answer | undefined {
    return value?.type === 'answer' ? value : undefined;
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
