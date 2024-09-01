import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { map, of, tap } from 'rxjs';

import type { ActionBarResponse, ApiItem, ApiStatus } from './api.types';
import { AbstractActionService } from '../action/abstract-action.service';

/**
 * Responsible for fetching data from the KoL API.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService extends AbstractActionService {

  #pwd: string | null = null;
  
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
