import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';
import { distinctUntilChangedDeep, getHttpHeaders, handleNoSession, handleRedirect } from '../utils/http.utils';

export type Path = `/${string}`;

export abstract class AbstractParserService<T> {

  private domParser = new DOMParser();

  private object$ = new BehaviorSubject<T | null>(null);
  private value$: Observable<T | null> = this.object$.asObservable().pipe(
    distinctUntilChangedDeep(),
  );

  public constructor(
    protected httpClient: HttpClient,
    protected loginService: LoginService,
    protected routingService: RoutingService,
  ) { 
    //
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 0) {
      console.error('Could not fetch:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  protected extractPwdHash(httpString: string): string | undefined {
    return httpString.match(/pwd=([^"']*)/)?.[1];
  }

  protected abstract map({ doc, pwd }: {doc: Document, pwd: string}): T;

  protected parse(path: string, params?: Record<string, string>): Observable<T | null> {
    return this.loginService.session$.pipe(
      handleNoSession(this.routingService),
      switchMap(session => {
        const headers = getHttpHeaders(session);
        
        const searchParams = Object.entries(params || {})?.reduce((acc, [ key, value ]) => {
          acc.append(key, value);

          return acc;
        }, new URLSearchParams());

        searchParams.append('page', path);

        return this.httpClient.get(`${environment.backendDomain}/page?${searchParams}`, { headers, observe: 'response', responseType: 'text' });
      }),
      handleRedirect(this.routingService),
      map((event) => {
        const html = event.body || '';
        
        return {
          doc: this.domParser.parseFromString(html, 'text/html'),
          pwd: this.extractPwdHash(html) ?? '',
        };
      }),
      map(({ doc, pwd }) => this.map({ doc, pwd })),
      catchError(this.handleError),
    );
  }

  protected parseToSubject(path: string, params?: Record<string, string>): Observable<T | null> {
    this.parse(path, params).subscribe(object => {
      this.object$.next(object);
    });

    return this.value$;
  }
}
