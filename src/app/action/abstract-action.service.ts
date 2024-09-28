import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';
import { getHttpHeaders, handleNoSession } from '../utils/http.utils';

export abstract class AbstractActionService {

  #httpClient = inject(HttpClient);
  #loginService = inject(LoginService);
  #routingService = inject(RoutingService);
  
  protected getPath<T>(path: string): Observable<T> {
    return this.#loginService.session$.pipe(
      handleNoSession(this.#routingService),
      switchMap(session => {
        const headers = getHttpHeaders(session);

        return this.#httpClient.get<T>(environment.backendDomain + path, { headers });
      }),
    );
  }

  protected postPath(path: string): Observable<string>
  protected postPath(path: string, pwd: string): Observable<string>
  protected postPath(path: string, forms: Record<string, string | undefined>): Observable<string>
  protected postPath(path: string, pwd: string, forms: Record<string, string | undefined>): Observable<string>
  protected postPath(path: string, pwdOrForms?: Record<string, string | undefined> | string, forms: Record<string, string | undefined> = {}): Observable<string> {
    const pwd = typeof pwdOrForms === 'string' ? pwdOrForms : undefined;
    const usedForms = typeof pwdOrForms === 'object' ? pwdOrForms : forms; 
    
    return this.#loginService.session$.pipe(
      handleNoSession(this.#routingService),
      switchMap(session => {
        const headers = getHttpHeaders(session, pwd);

        const formData = new URLSearchParams();
        Object.entries(usedForms).forEach(([ key, value ]) => {
          if (value) {
            formData.append(key, value);
          }
        });

        // TODO: responseType: 'text' does not work
        return this.#httpClient.post(environment.backendDomain + path, formData, { headers, responseType: 'text' });
      }),
      first(),
    );
  }
} 
