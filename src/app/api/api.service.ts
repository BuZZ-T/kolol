import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ActionBarResponse, ApiStatus } from './api.types';
import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';
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

        return this.httpClient.get<ApiStatus>(`${environment.backendDomain}/api/status`, { headers });
      }),
    );
  }

  public actionBar(): Observable<ActionBarResponse> {
    return this.loginService.session$.pipe(
      handleNoSession(this.routingService),
      switchMap(session => {
        const headers = getHttpHeaders(session);

        return this.httpClient.get<ActionBarResponse>(`${environment.backendDomain}/api/actionbar`, { headers });
      }),
    );
  }
}
