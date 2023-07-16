import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, filter, skip } from 'rxjs';

import { Notice } from '../notice/notice.types';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {

  private noticeSubject$ = new BehaviorSubject<Notice | null>(null);
  
  public notice$: Observable<Notice | null>;

  public constructor(router: Router) {
    this.notice$ = this.noticeSubject$.asObservable();

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
