import { HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { RoutingService } from '../routing/routing.service';

export const handleRedirect = (routingService: RoutingService) => (source: Observable<HttpResponse<string>>): Observable<HttpResponse<string>> =>
  source.pipe(
    tap((response: HttpResponse<string>) => {
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
