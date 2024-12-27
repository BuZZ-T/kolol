import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs';

import { AbstractActionService } from './abstract-action.service';
import type { Equipment } from '../../shared/inventory.types';
import { ApiService } from '../api/api.service';
import { ParseApiService } from '../api/parse-api.service';
import { NoticeService } from '../notice/notice.service';
import { ResultsParserService } from '../parser/results-parser.service';
import { UserService } from '../user/user.service';

type CastSkillParams = {
  skillId: string;
  targetPlayer?: string | number;
  quantity?: string | number;
}

type UseItemParams = {
  action: string;
  itemId: string;
  pwd: string;
  which: number;
  quantity?: number;
}

type EquipItemParams = {
  isOffhand: boolean;
  itemId: string;
  pwd: string;
  which: number;
  /** Used for alt actions of accessories to directly equip it to a slot */
  slot?: string;
}

type BuyItemParams = { 
  pwd: string;
  quantity: string;
  row: string;
  shop: string;
}

type UnequipItemParams = {
  equipmentSection: keyof Equipment | 'acc1' | 'acc2' | 'acc3';
  pwd: string;
}

@Injectable({
  providedIn: 'root',
})
export class ActionService extends AbstractActionService {

  #apiService = inject(ApiService);
  #noticeService = inject(NoticeService);
  #resultsParserService = inject(ResultsParserService);
  #userService = inject(UserService);
  #parseApiService = inject(ParseApiService);

  /**
   * targetPlayer 0 means casting to yourself
   */
  public castSkill({ skillId, quantity = 1, targetPlayer = 0 }: CastSkillParams): void {
    this.#apiService.pwd().pipe(
      first(),
      switchMap((pwd) => this.postPath('/skill', pwd, { quantity: quantity.toString(), skillId, targetPlayer: targetPlayer.toString() })),
    ).subscribe(html => {
      this.#resultsParserService.parseAndSetNotice(html);
      this.#userService.update();
    });
  }

  public useItem({ action, itemId, pwd, quantity, which }: UseItemParams): void {
    // TODO: does "quantity: ''" work?
    this.postPath('/item/use', pwd, { action, itemId, quantity: quantity ? quantity.toString() : '', which: which.toString() }).subscribe((success) => {
      console.log('success item use;', success);
    });
  }

  public equipItem({ isOffhand, itemId, which, slot, pwd }: EquipItemParams): void {
    this.postPath('/item/equip', pwd, { itemId, offhand: isOffhand.toString(), slot, which: which.toString() }).subscribe(() => {
      this.#parseApiService.updateInventory();
    });
  }

  public unequipItem({ equipmentSection, pwd }: UnequipItemParams): void {
    console.log('unequip item: ', equipmentSection);

    this.postPath('/item/unequip', pwd, { section: equipmentSection }).subscribe((success) => {
      console.log('unequip item: ', success);
    });

  }

  public buyItem({ pwd, quantity, row, shop }: BuyItemParams): void {
    console.log('buyItem: ', pwd, quantity, row, shop);

    this.postPath('/item/buy', pwd, {  quantity, row, shop })
      .pipe(
        map(result => this.#resultsParserService.parseHtml(result)),
      )
      .subscribe(result => {
        console.log('buy item: ', result);
        this.#noticeService.setNotice(result);
      });
  }

  public rename(newName: string, pwd: string): Observable<unknown> {
    return this.postPath('/familiar/rename', pwd, { newName });
  }

  public favoriteFamiliar(familiarId: string, pwd: string): Observable<unknown> {
    return this.postPath('/familiar/favorite', pwd, { familiarId });
  }

  public unfavoriteFamiliar(familiarId: string, pwd: string): Observable<unknown> {
    return this.postPath('/familiar/unfavorite', pwd, { familiarId });
  }

  public takeFamiliar(familiarId: string, pwd: string): Observable<unknown> {
    return this.postPath('/familiar/take', pwd, { familiarId });
  }

  public putBackFamiliar(pwd: string): Observable<unknown> {
    return this.postPath('/familiar/putback', pwd);
  }
}
