import { Injectable } from '@angular/core';
import type { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter, skip } from 'rxjs';

import type { Notice } from '../notice/notice.types';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {

  private noticeSubject$ = new BehaviorSubject<Notice | null>(null);
  public notice$ = this.noticeSubject$.asObservable();

  public constructor(router: Router) {
    router.events.pipe(
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
