import { HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
