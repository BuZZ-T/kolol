import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map, switchMap } from 'rxjs';

import { AbstractActionService } from './abstract-action.service';
import { Equipment } from '../../shared/inventory.types';
import { ApiService } from '../api/api.service';
import { LoginService } from '../login/login.service';
import { NoticeService } from '../notice/notice.service';
import { CharpaneParserService } from '../parser/charpane-parser.service';
import { ResultsParserService } from '../parser/results-parser.service';
import { RoutingService } from '../routing/routing.service';

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
    private charpaneParserService: CharpaneParserService,
    private apiService: ApiService,
  ) {
    super(httpClient, loginService, routingService);
  }

  /**
   * targetPlayer 0 means casting to yourself
   */
  public castSkill({ skillId, quantity = 1, targetPlayer = 0 }: CastSkillParams): void {
    this.apiService.pwd().pipe(
      first(),
      switchMap((pwd) => this.postPath('/skill', pwd, { quantity: quantity.toString(), skillId, targetPlayer: targetPlayer.toString() })),
    ).subscribe(html => {
      this.resultsParserService.parseAndSetNotice(html);
    });
  }

  public useItem({ action, itemId, pwd, quantity, which }: UseItemParams): void {
    // TODO: does "quantity: ''" work?
    this.postPath('/item/use', pwd, { action, itemId, quantity: quantity ? quantity.toString() : '', which: which.toString() }).subscribe((success) => {
      console.log('success item use;', success);
    });
  }

  /**
   * TODO: equip offhand: "action: dualwield"
   */
  public equipItem({ isOffhand, itemId, which, pwd }: EquipItemParams): void {
    console.log('equip item');

    this.postPath('/item/equip', pwd, { itemId, offhand: isOffhand.toString(), which: which.toString() }).subscribe((success) => {
      console.log('equip item: ', success);
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
        map(result => this.resultsParserService.parseHtml(result)),
      )
      .subscribe(result => {
        console.log('buy item: ', result);
        this.noticeService.setNotice(result);
      });
  }

  public favoriteFamiliar(familiarId: string, pwd: string): void {
    this.postPath('/familiar/favorite', pwd, { familiarId }).subscribe((success) => {
      console.log('favorite familiar: ', success);
    });
  }

  public unfavoriteFamiliar(familiarId: string, pwd: string): void {
    this.postPath('/familiar/unfavorite', pwd, { familiarId }).subscribe((success) => {
      console.log('unfavorite familiar: ', success);
    });
  }

  public takeFamiliar(familiarId: string, pwd: string): void {
    this.postPath('/familiar/take', pwd, { familiarId }).subscribe((success) => {
      console.log('take familiar: ', success);
      this.charpaneParserService.update();
    });
  }

  public putBackFamiliar(pwd: string): void {
    this.postPath('/familiar/putback', pwd).subscribe((success) => {
      console.log('put back familiar: ', success);
      this.charpaneParserService.update();
    });
  }
}
