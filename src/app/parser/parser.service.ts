import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map, switchMap, throwError } from 'rxjs';

import { LoginService } from '../login/login.service';
import { BACKEND_DOMAIN } from '../utils/constants';

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
    // return httpString.match(/var\spwdhash\s?=\s?"(.*)";/)?.[1];
    return httpString.match(/pwd=([^"]*)/)?.[1];
  }

  public parse(path: string): Observable<{doc: Document, pwd: string}> {
    return this.loginService.session$.pipe(
      filter(cookies => !!cookies),
      switchMap(cookies => {
        const headers = new HttpHeaders()
          .set('x-session', cookies?.cookies as string);

        return this.httpClient.get(`${BACKEND_DOMAIN}/page?page=${path}`, { headers, responseType: 'text' });
      }),
      map(httpString => ({
        doc: this.domParser.parseFromString(httpString, 'text/html'),
        pwd: this.extractPwdHash(httpString) ?? '',
      })),
      catchError(this.handleError),
    );
  }
}
