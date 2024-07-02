import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, distinctUntilChanged, map, tap } from 'rxjs';

import { Session } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';

export const handleRedirect = <T>(routingService: RoutingService) => (source: Observable<HttpResponse<T>>): Observable<HttpResponse<T>> =>
  source.pipe(
    tap((response: HttpResponse<T>) => {
      const redirectedTo = response.headers.get('X-Redirected-To');
    
      switch(redirectedTo) {
      case 'login':
        routingService.login();
        break;
      case 'adventure':
        routingService.navigateTo('/adventure');
        break;
      default:
        break;
      }
    },
    ),
  );

export const handleScriptNotLoggedIn = (routingService: RoutingService) => (source: Observable<{ doc: Document; pwd: string; }>): Observable<{ doc: Document; pwd: string; }> =>
  source.pipe(
    tap(({ doc }: { doc: Document; pwd: string; }) => {
      if (doc.querySelector('body')?.textContent?.includes('This script is not available unless you\'re logged in.')) {
        routingService.login();
      }
    }),
  );

export const handleNoSession = (routingService: RoutingService) => (source: Observable<Session | null>): Observable<Session> =>
  source.pipe(
    tap((value) => {
      if (!value) {
        routingService.login();
      }
    }),
    map((value: Session | null) => {
      return value as Session;
    }),
  );

export const distinctUntilChangedDeep = () => <T>(source: Observable<T>): Observable<T> =>
  source.pipe(
    distinctUntilChanged((a, b) => {
      const before = JSON.stringify(a);
      const after = JSON.stringify(b);
      
      return before === after;
    }),
  );

export const getHttpHeaders = (session: Session, pwd?: string): HttpHeaders => {
  const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('x-session', session.cookies);
    
  if (pwd) {
    return headers
      .set('x-pwd', pwd);
  }

  return headers;
};
