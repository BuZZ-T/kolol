import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, switchMap } from 'rxjs';

import { ApiStatus } from './api.types';
import { LoginService } from '../login/login.service';
import { BACKEND_DOMAIN } from '../utils/constants';
import { isTruthy } from '../utils/general';
import { getHttpHeaders } from '../utils/http.utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public constructor(private httpClient: HttpClient, private loginService: LoginService) {
    //
  }

  public status(): Observable<ApiStatus> {
    return this.loginService.session$.pipe(
      filter(isTruthy),
      switchMap(session => {
        const headers = getHttpHeaders(session);

        return this.httpClient.get<ApiStatus>(`${BACKEND_DOMAIN}/api/status`, { headers });
      }),
    );
  }
}
