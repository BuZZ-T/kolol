import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  public constructor(private httpClient: HttpClient) {
    //
  }

  // TODO: rename to "cookies" or "session"
  public sessionId$ = new BehaviorSubject<string | null>(null);

  // TODO: don't return Observable (needs to subscribe this way...)
  public login(name: string, password: string): Observable<boolean> {
    const formData = new URLSearchParams();
    formData.append('name', name);
    formData.append('password', password);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.httpClient.post<string[]>('http://localhost:4100/login', formData, { headers }).pipe(
      tap((sessionId: string[]) => {
        console.log('session Id: ', sessionId);
        this.sessionId$.next(sessionId.join('; '));
      }),
      map(() => true),
      catchError(error => {
        console.log('error.:', error);
        return of(false);
      }),
    );
  }
}
