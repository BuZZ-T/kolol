import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, switchMap } from 'rxjs';

import { ApiStatus } from './api.types';
import { LoginService } from '../login/login.service';
import { BACKEND_DOMAIN } from '../utils/constants';
import { isTruthy } from '../utils/general';

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
      switchMap(cookies => {
        let headers = new HttpHeaders();
        headers = headers.append('x-session', cookies.cookies as string);

        return this.httpClient.get<ApiStatus>(`${BACKEND_DOMAIN}/api/status`, { headers });
      }),
    );
  }
}
