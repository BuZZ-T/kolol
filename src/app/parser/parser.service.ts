import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, switchMap  } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { environment } from '../../environments/environment';
import { isTruthy } from '../../shared/general';
import { Choice, Option } from '../adventure/adventure.types';
import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';
import { getHttpHeaders, handleNoSession, handleRedirect } from '../utils/http.utils';

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
      handleNoSession(this.routingService),
      switchMap(session => {
        const formData = new URLSearchParams();
        formData.append('which', choice.which);
        formData.append('option', option.option);

        const headers = getHttpHeaders(session, choice.pwd);

        return this.httpClient.post(`${environment.backendDomain}/choice`, formData, { headers, observe: 'response', responseType: 'text' });
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

  public parsePageAndReturn(path: string, params?: Record<string, string>): Observable<{doc: Document, pwd: string}> {
    return this.parsePage(path, params).pipe(
      filter(isTruthy),
    );
  }
}
