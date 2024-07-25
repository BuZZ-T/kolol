import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, first, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CacheService } from '../cache/cache.service';
import { LoginService } from '../login/login.service';
import { InventoryDataWithPwd } from '../main/inventory/inventory.types';
import { SkillsDataWithPwd } from '../main/skills/skills.types';
import { RoutingService } from '../routing/routing.service';
import { isTruthy } from '../utils/general';
import { distinctUntilChangedDeep, getHttpHeaders, handleNoSession, handleRedirect } from '../utils/http.utils';
import { combatSkillMapFromSkills, itemMapFromInventory } from '../utils/inventory.utils';

/**
 * Responsible for handling requests/responses of server-side parsing.
 */
@Injectable({
  providedIn: 'root',
})
export class ParseApiService {

  private inventorySubject$ = new BehaviorSubject<InventoryDataWithPwd | null>(null);
  private inventory$: Observable<InventoryDataWithPwd | null> = this.inventorySubject$.asObservable().pipe(
    distinctUntilChangedDeep(),
  );

  private skillsSubject$ = new BehaviorSubject<SkillsDataWithPwd | null>(null);
  private skills$ = this.skillsSubject$.asObservable().pipe(
    distinctUntilChangedDeep(),
  );

  public constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
    private routingService: RoutingService,
    private cacheService: CacheService,
  ) {
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
      first(),
    );
  }

  public updateInventory(): void {
    this.getPath<InventoryDataWithPwd>('/parse/inventory').subscribe(inventory => {
      this.inventorySubject$.next(inventory);

      const items = itemMapFromInventory(inventory.items);
      this.cacheService.items.set(items);
      this.cacheService.equipment.set(inventory.currentEquipment);
    });
  }

  public inventory(): Observable<InventoryDataWithPwd | null> {
    this.updateInventory();

    return this.inventory$;
  }

  public updateSkills(): void {
    this.getPath<SkillsDataWithPwd>('/parse/skills').subscribe(skills => {
      this.skillsSubject$.next(skills);

      const combatSkills = combatSkillMapFromSkills(skills.skills);
      this.cacheService.skills.set(combatSkills);
    });
  }

  public skills(): Observable<SkillsDataWithPwd | null> {
    this.updateSkills();

    return this.skills$;
  }
}
