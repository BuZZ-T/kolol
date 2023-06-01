import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map, switchMap, tap, throwError } from 'rxjs';

import { LoginService } from '../login/login.service';

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

  public parse(path: string): Observable<Document> {
    return this.loginService.sessionId$.pipe(
      filter(cookies => !!cookies),
      switchMap(cookies => {
        let headers = new HttpHeaders();
        headers = headers.append('x-session', cookies as string);

        return this.httpClient.get(`http://localhost:4100/page?page=${path}`, { headers, responseType: 'text' });
      }),
      map(httpString => this.domParser.parseFromString(httpString, 'text/html')),
      catchError(this.handleError),
    );
  }
}
