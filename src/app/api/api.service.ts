import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ActionBarResponse, ApiItem, ApiStatus } from './api.types';
import { AbstractActionService } from '../action/abstract-action.service';
import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';

/**
 * Responsible for fetching data from the KoL API.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService extends AbstractActionService {

  public constructor(
    httpClient: HttpClient,
    loginService: LoginService,
    routingService: RoutingService,
  ) {
    super(httpClient, loginService, routingService);
  }

  public status(): Observable<ApiStatus> {
    return this.getPath<ApiStatus>('/api/status');
  }

  public item(itemId: string): Observable<ApiItem> {
    return this.getPath<ApiItem>(`/api/item?id=${itemId}`);
  }

  public actionBar(): Observable<ActionBarResponse> {
    return this.getPath<ActionBarResponse>('/api/actionbar');
  }
}
