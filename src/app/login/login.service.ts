import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

import { BACKEND_DOMAIN } from '../utils/constants';

type Session = {
  cookies: string;
  sessionId: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public constructor(private httpClient: HttpClient) {
    //
  }

  public session$ = new BehaviorSubject<Session | null>(null);

  // TODO: don't return Observable (needs to subscribe this way...)
  public login(name: string, password: string): Observable<boolean> {
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('password', password);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.httpClient.post<string[]>(`${BACKEND_DOMAIN}/login`, formData, { headers }).pipe(
      tap((cookies: string[]) => {
        console.log('cookies: ', cookies);
        const sessionId = cookies.map(cookie => cookie.match(/PHPSESSID=(.*);/)?.[1]).find(Boolean) ?? '';
        this.session$.next({
          cookies: cookies.join('; '),
          sessionId,
        });

      }),
      map(() => true),
      catchError(error => {
        console.log('error.:', error);
        return of(false);
      }),
    );
  }
}