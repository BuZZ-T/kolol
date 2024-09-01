import type { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';

import { LoginService } from '../../login/login.service';
import { RoutingService } from '../../routing/routing.service';
import { distinctUntilChangedDeep, handleNoSession, handleRedirect } from '../../utils/http.utils';
import { mapHtmlToDocAndPwd, switchMapToGet } from '../utils/parser.operators';

export type Path = `/${string}`;

export abstract class AbstractParserService<T> {
  protected httpClient = inject(HttpClient);
  protected loginService = inject(LoginService);
  protected routingService = inject(RoutingService);

  #object$ = new BehaviorSubject<T | null>(null);
  #value$: Observable<T | null> = this.#object$.asObservable().pipe(
    distinctUntilChangedDeep(),
  );

  protected handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      console.error('Could not fetch:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  protected abstract map({ doc, pwd }: {doc: Document, pwd: string}): T;

  protected parsePage(path: string, params?: Record<string, string>): Observable<T | null> {
    return this.loginService.session$.pipe(
      handleNoSession(this.routingService),
      switchMapToGet(this.httpClient, path, params),
      handleRedirect(this.routingService),
      map(event => event.body || ''),
      mapHtmlToDocAndPwd(),
      map(({ doc, pwd }) => this.map({ doc, pwd })),
      catchError(this.handleError),
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
