import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { LoginService } from '../login/login.service';
import { InventoryDataWithPwd } from '../main/inventory/inventory.types';
import { RoutingService } from '../routing/routing.service';
import { isTruthy } from '../utils/general';
import { getHttpHeaders, handleNoSession, handleRedirect } from '../utils/http.utils';

/**
 * Responsible for handling response of server-side parsing of the inventory.
 */
@Injectable({
  providedIn: 'root',
})
export class InventoryApiService {

  private inventorySubject$ = new BehaviorSubject<InventoryDataWithPwd | null>(null);
  private inventory$: Observable<InventoryDataWithPwd | null> = this.inventorySubject$.asObservable();

  public constructor(private httpClient: HttpClient, private loginService: LoginService, private routingService: RoutingService) {
    //
  }

  private getPath<T>(path: string): Observable<T> {
    return this.loginService.session$.pipe(
      handleNoSession(this.routingService),
      switchMap(session => {
        const headers = getHttpHeaders(session);

        return this.httpClient.get<T>(`${environment.backendDomain}${path}`, { headers, observe: 'response' });
      }),
      handleRedirect<T>(this.routingService),
      map(response => response.body),
      filter(isTruthy),
    );
  }

  public inventory(): Observable<InventoryDataWithPwd | null> {
    this.getPath<InventoryDataWithPwd>('/parse/inventory').subscribe( inventory => {
      this.inventorySubject$.next(inventory); 
    });

    return this.inventory$;
  }
}
