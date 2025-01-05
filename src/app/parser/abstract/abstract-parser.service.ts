import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject, catchError, map } from 'rxjs';

import { LoginService } from '../../login/login.service';
import { RoutingService } from '../../routing/routing.service';
import { distinctUntilChangedDeep, handleNoSession, handleRedirect } from '../../utils/http.utils';
import { mapHtmlToDocAndPwd, switchMapToGet } from '../utils/parser.operators';
import { handleError } from '../utils/parser.utils';

export type Path = `/${string}`;

export abstract class AbstractParserService<T> {
  protected httpClient = inject(HttpClient);
  protected loginService = inject(LoginService);
  protected routingService = inject(RoutingService);

  #object$ = new BehaviorSubject<T | null>(null);
  #value$: Observable<T | null> = this.#object$.asObservable().pipe(
    distinctUntilChangedDeep(),
  );

  protected abstract map({ doc, pwd }: {doc: Document, pwd: string}): T;

  protected parsePage(path: string, params?: Record<string, string>): Observable<T | null> {
    return this.loginService.session$.pipe(
      handleNoSession(this.routingService),
      switchMapToGet(this.httpClient, path, params),
      handleRedirect(this.routingService),
      map(event => event.body || ''),
      mapHtmlToDocAndPwd(),
      map(({ doc, pwd }) => this.map({ doc, pwd })),
      catchError(handleError),
    );
  }

  protected parsePageToSubject(path: string, params?: Record<string, string>): Observable<T | null> {
    this.parsePage(path, params).subscribe({
      error: error => {
        console.error('error', error);
      },
      next: object => {
        this.#object$.next(object);
      },
    });

    return this.#value$;
  }
}
