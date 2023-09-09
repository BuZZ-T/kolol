import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

import { ApiStatus } from './api.types';
import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';
import { BACKEND_DOMAIN } from '../utils/constants';
import { getHttpHeaders, handleNoSession } from '../utils/http.utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
    private routingService: RoutingService,
  ) {
    //
  }

  public status(): Observable<ApiStatus> {
    return this.loginService.session$.pipe(
      handleNoSession(this.routingService),
      switchMap(session => {
        const headers = getHttpHeaders(session);

        return this.httpClient.get<ApiStatus>(`${BACKEND_DOMAIN}/api/status`, { headers });
      }),
    );
  }
}
