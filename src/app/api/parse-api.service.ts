import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, first, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { isTruthy } from '../../shared/general';
import { InventoryDataWithPwd } from '../../shared/inventory.types';
import { SkillsDataWithPwd } from '../../shared/skills.types';
import { CacheService } from '../cache/cache.service';
import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';
import { distinctUntilChangedDeep, getHttpHeaders, handleNoSession, handleRedirect } from '../utils/http.utils';
import { combatSkillMapFromSkills, itemMapFromInventory } from '../utils/inventory.utils';

/**
 * Responsible for handling requests/responses of server-side parsing.
 */
@Injectable({
  providedIn: 'root',
})
export class ParseApiService {
  #httpClient = inject(HttpClient);
  #loginService = inject(LoginService);
  #routingService = inject(RoutingService);
  #cacheService = inject(CacheService);
  private inventorySubject$ = new BehaviorSubject<InventoryDataWithPwd | null>(null);
  private inventory$: Observable<InventoryDataWithPwd | null> = this.inventorySubject$.asObservable().pipe(
    distinctUntilChangedDeep(),
  );

  private skillsSubject$ = new BehaviorSubject<SkillsDataWithPwd | null>(null);
  private skills$ = this.skillsSubject$.asObservable().pipe(
    distinctUntilChangedDeep(),
  );

  private getPath<T>(path: string): Observable<T> {
    return this.#loginService.session$.pipe(
      handleNoSession(this.#routingService),
      switchMap(session => {
        const headers = getHttpHeaders(session);

        return this.#httpClient.get<T>(`${environment.backendDomain}${path}`, { headers, observe: 'response' });
      }),
      handleRedirect<T>(this.#routingService),
      map(response => response.body),
      filter(isTruthy),
      first(),
    );
  }

  public updateInventory(): void {
    this.getPath<InventoryDataWithPwd>('/parse/inventory').subscribe(inventory => {
      this.inventorySubject$.next(inventory);

      const items = itemMapFromInventory(inventory.items);
      this.#cacheService.items.set(items);
      this.#cacheService.equipment.set(inventory.currentEquipment);
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
      this.#cacheService.skills.set(combatSkills);
    });
  }

  public skills(): Observable<SkillsDataWithPwd | null> {
    this.updateSkills();

    return this.skills$;
  }
}
