import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, skip } from 'rxjs';

import { Notice } from '../notice/notice.types';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  #router = inject(Router);

  private noticeSubject$ = new BehaviorSubject<Notice | null>(null);
  public notice$ = this.noticeSubject$.asObservable();

  public constructor() {
    this.#router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      skip(1),
    )
      .subscribe(() => {
        // clear result on interaction
        this.noticeSubject$.next(null);
      });
  }

  public setNotice(notice: Notice | null): void {
    this.noticeSubject$.next(notice);
  }
}
