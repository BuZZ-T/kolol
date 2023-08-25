import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, switchMap } from 'rxjs';

import { LoginService } from '../login/login.service';
import { InventoryDataWithPwd } from '../main/inventory/inventory.types';
import { RoutingService } from '../routing/routing.service';
import { BACKEND_DOMAIN } from '../utils/constants';
import { isTruthy } from '../utils/general';
import { handleRedirect } from '../utils/http.utils';

/**
 * Responsible for handling response of server-side parsing of pages
 */
@Injectable({
  providedIn: 'root',
})
export class ParseApiService {

  private inventorySubject$ = new BehaviorSubject<InventoryDataWithPwd | null>(null);
  private inventory$: Observable<InventoryDataWithPwd | null> = this.inventorySubject$.asObservable();

  public constructor(private httpClient: HttpClient, private loginService: LoginService, private routingService: RoutingService) {
    //
  }

  private getPath<T>(path: string): Observable<T> {
    return this.loginService.session$.pipe(
      filter(isTruthy),
      switchMap(cookies => {
        const headers = new HttpHeaders()
          .set('x-session', cookies?.cookies as string);

        return this.httpClient.get<T>(`${BACKEND_DOMAIN}${path}`, { headers, observe: 'response' });
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
