import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AbstractActionService } from './abstract-action.service';
import { Equipment } from '../../shared/inventory.types';
import { LoginService } from '../login/login.service';
import { NoticeService } from '../notice/notice.service';
import { ResultsParserService } from '../parser/results-parser.service';
import { RoutingService } from '../routing/routing.service';

type CastSkillParams = {
  pwd: string;
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

  public constructor(
    httpClient: HttpClient,
    loginService: LoginService,
    private resultsParserService: ResultsParserService,
    private noticeService: NoticeService,
    routingService: RoutingService,
  ) {
    super(httpClient, loginService, routingService);
  }

  /**
   * targetPlayer 0 means casting to yourself
   */
  public castSkill({ pwd, skillId, quantity = 1, targetPlayer = 0 }: CastSkillParams): Observable<unknown> {
    return this.postPath(`${environment.backendDomain}/skill`, pwd, { quantity: quantity.toString(), skillId, targetPlayer: targetPlayer.toString() });
  }

  public useItem({ action, itemId, pwd, quantity, which }: UseItemParams): void {
    // TODO: does "quantity: ''" work?
    this.postPath(`${environment.backendDomain}/item/use`, pwd, { action, itemId, quantity: quantity ? quantity.toString() : '', which: which.toString() }).subscribe((success) => {
      console.log('success item use;', success);
    });
  }

  /**
   * TODO: equip offhand: "action: dualwield"
   */
  public equipItem({ isOffhand, itemId, which, pwd }: EquipItemParams): void {
    console.log('equip item');

    this.postPath(`${environment.backendDomain}/item/equip`, pwd, { itemId, offhand: isOffhand.toString(), which: which.toString() }).subscribe((success) => {
      console.log('equip item: ', success);
    });
  }

  public unequipItem({ equipmentSection, pwd }: UnequipItemParams): void {
    console.log('unequip item: ', equipmentSection);

    this.postPath(`${environment.backendDomain}/item/unequip`, pwd, { section: equipmentSection }).subscribe((success) => {
      console.log('unequip item: ', success);
    });

  }

  public buyItem({ pwd, quantity, row, shop }: BuyItemParams): void {
    console.log('buyItem: ', pwd, quantity, row, shop);

    this.postPath(`${environment.backendDomain}/item/buy`, pwd, {  quantity, row, shop })
      .pipe(
        map(result => this.resultsParserService.parseHtml(result)),
      )
      .subscribe(result => {
        console.log('buy item: ', result);
        this.noticeService.setNotice(result);
      });
  }
}
