import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError, withLatestFrom } from 'rxjs';

import { DOMAIN } from '../general';

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

  public constructor(private httpClient: HttpClient) { 
    //
  }

  public parse(path: string, cookies: string): Observable<Document> {
    
    let headers = new HttpHeaders();
    headers = headers.append('x-session', cookies);

    return this.httpClient.get(`http://localhost:4100/page?page=${path}`, { headers, responseType: 'text' }).pipe(
      tap(() => {
        console.log('fetched url');
      }),
      map(httpString => this.domParser.parseFromString(httpString, 'text/html')),
      catchError(this.handleError),
    );
  }
}
