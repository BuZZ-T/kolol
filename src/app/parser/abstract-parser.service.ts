import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, map, switchMap, tap, throwError } from 'rxjs';

import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';
import { BACKEND_DOMAIN } from '../utils/constants';
import { isTruthy } from '../utils/general';

export type Path = `/${string}`;

export abstract class AbstractParserService<T> {

  private domParser = new DOMParser();

  private object$ = new BehaviorSubject<T | null>(null);
  private value$: Observable<T | null> = this.object$.asObservable();

  public constructor(
    protected httpClient: HttpClient,
    protected loginService: LoginService,
    private routingService: RoutingService,
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
      filter(isTruthy),
      switchMap(cookies => {
        const headers = new HttpHeaders()
          .set('x-session', cookies?.cookies as string);

        const searchParams = Object.entries(params || {})?.reduce((acc, [ key, value ]) => {
          acc.append(key, value);

          return acc;
        }, new URLSearchParams());

        searchParams.append('page', path);

        return this.httpClient.get(`${BACKEND_DOMAIN}/page?${searchParams}`, { headers, observe: 'response', responseType: 'text' });
      }),
      tap((event) => {
        const redirectedTo = event.headers.get('X-Redirected-To');

        if (redirectedTo === 'adventure') {
          this.routingService.navigateTo('adventure.php');
        }
      }),
      map((event) => {
        const html = event.body || '';
        
        return {
          doc: this.domParser.parseFromString(html, 'text/html'),
          pwd: this.extractPwdHash(html) ?? '',
        };
      }),
      // map(this.map.bind(this))),
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