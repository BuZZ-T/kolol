import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map, switchMap, throwError } from 'rxjs';

import { Choice, Option } from '../adventure/adventure.types';
import { LoginService } from '../login/login.service';
import { BACKEND_DOMAIN } from '../utils/constants';
import { isTruthy } from '../utils/general';

export type Path = `/${string}`;

@Injectable({
  providedIn: 'root',
})
export class ParserService {

  private domParser = new DOMParser();

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

  public constructor(private httpClient: HttpClient, private loginService: LoginService) { 
    //
  }

  private extractPwdHash(httpString: string): string | undefined {
    return httpString.match(/pwd=([^"]*)/)?.[1];
  }

  public selectChoice(choice: Choice, option: Option): Observable<{doc: Document, pwd: string}> {
    return this.loginService.session$.pipe(
      filter(isTruthy),
      switchMap(session => {
        const formData = new URLSearchParams();
        formData.append('which', choice.which);
        formData.append('option', option.option);
        formData.append('pwd', choice.pwd);

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('x-session', session.cookies as string);
    
        return this.httpClient.post(`${BACKEND_DOMAIN}/choice`, formData, { headers, responseType: 'text' });
      }),
      map(httpString => ({
        doc: this.domParser.parseFromString(httpString, 'text/html'),
        pwd: this.extractPwdHash(httpString) ?? '',
      })),
    );
  }

  public parse(path: string, params?: Record<string, string>): Observable<{doc: Document, pwd: string}> {
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

        return this.httpClient.get(`${BACKEND_DOMAIN}/page?${searchParams}`, { headers, responseType: 'text' });
      }),
      map(httpString => ({
        doc: this.domParser.parseFromString(httpString, 'text/html'),
        pwd: this.extractPwdHash(httpString) ?? '',
      })),
      catchError(this.handleError),
    );
  }
}
