import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, switchMap  } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { Choice, Option } from '../adventure/adventure.types';
import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';
import { BACKEND_DOMAIN } from '../utils/constants';
import { isTruthy } from '../utils/general';
import { handleRedirect } from '../utils/http.utils';

export type Path = `/${string}`;

@Injectable({
  providedIn: 'root',
})
export class ParserService extends AbstractParserService<{doc: Document, pwd: string}> {

  public constructor(
    httpClient: HttpClient,
    loginService: LoginService,
    routingService: RoutingService,
  ) { 
    super(httpClient, loginService, routingService);
  }

  protected override map(value: {doc: Document, pwd: string}): {doc: Document, pwd: string} {
    return value;
  }

  public selectChoice(choice: Choice, option: Option): Observable<{doc: Document, pwd: string}> {
    return this.loginService.session$.pipe(
      filter(isTruthy),
      switchMap(session => {
        const formData = new URLSearchParams();
        formData.append('which', choice.which);
        formData.append('option', option.option);
        formData.append('pwd', choice.pwd);

        const headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('x-session', session.cookies as string);
    
        return this.httpClient.post(`${BACKEND_DOMAIN}/choice`, formData, { headers, observe: 'response', responseType: 'text' });
      }),
      handleRedirect(this.routingService),
      map(response => {
        const httpString = response.body || ''; 
        
        return {
          doc: new DOMParser().parseFromString(httpString, 'text/html'),
          pwd: this.extractPwdHash(httpString) ?? '' };
      }),
    );
  }

  public parseRaw(path: string, params?: Record<string, string>): Observable<{doc: Document, pwd: string}> {
    return this.parse(path, params).pipe(
      filter(isTruthy),
    );
  }
}
