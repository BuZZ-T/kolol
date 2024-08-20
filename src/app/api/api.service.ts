import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';

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

  #pwd: string | null = null;
  
  public constructor(
    httpClient: HttpClient,
    loginService: LoginService,
    routingService: RoutingService,
  ) {
    super(httpClient, loginService, routingService);
  }

  public pwd(): Observable<string> {
    if (this.#pwd) {
      console.log('returning cached pwd');
      return of(this.#pwd);
    } else {
      console.log('fetching pwd');
      return this.status().pipe(
        map(status => status.pwd),
      );
    }
  }

  public status(): Observable<ApiStatus> {
    return this.getPath<ApiStatus>('/api/status').pipe(
      tap(status => {
        this.#pwd = status.pwd;
      }),
    );
  }

  public item(itemId: string): Observable<ApiItem> {
    return this.getPath<ApiItem>(`/api/item?id=${itemId}`);
  }

  public actionBar(): Observable<ActionBarResponse> {
    return this.getPath<ActionBarResponse>('/api/actionbar');
  }
}
