import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, distinctUntilChanged, tap } from 'rxjs';

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
    headers
      .set('x-pwd', pwd);
  }

  return headers;
};
