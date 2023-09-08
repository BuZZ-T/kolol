import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, switchMap } from 'rxjs';

import { LoginService } from '../login/login.service';
import { Equipment } from '../main/inventory/inventory.types';
import { NoticeService } from '../notice/notice.service';
import { ParserService } from '../parser/parser.service';
import { ResultsParserService } from '../parser/results-parser.service';
import { BACKEND_DOMAIN } from '../utils/constants';
import { isTruthy } from '../utils/general';
import { getHttpHeaders } from '../utils/http.utils';

type CastSkillParams = {
  pwd: string;
  skillId: string;
  targetPlayer?: string | number;
  quantity?: string | number;
}

type UseItemParams = {
  itemId: string;
  pwd: string;
  which: number;
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
export class ActionService {

  public constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
    private resultsParserService: ResultsParserService,
    private parserService: ParserService,
    private noticeService: NoticeService,
  ) {
    //
  }

  /**
   * targetPlayer 0 means casting to yourself
   */
  public castSkill({ pwd, skillId, quantity = 1, targetPlayer = 0 }: CastSkillParams): void {
    this.loginService.session$.pipe(
      filter(isTruthy),
      switchMap(session => {
        const headers = getHttpHeaders(session, pwd);
        
        const formData = new URLSearchParams();
        formData.append('skillId', skillId);
        formData.append('targetplayer', targetPlayer.toString());
        formData.append('quantity', quantity.toString());

        return this.httpClient.post(`${BACKEND_DOMAIN}/skill`, formData, { headers, responseType: 'text' });
      }),
      map(resultHtml => {
        return this.resultsParserService.parseHtml(resultHtml);
      }),
    ).subscribe((success) => {
      console.log('cast skill: ', success);
    });
  }

  public useItem({ itemId, which, pwd }: UseItemParams): void {
    this.loginService.session$.pipe(
      filter(isTruthy),
      switchMap(session => {
        const headers = getHttpHeaders(session, pwd);

        const formData = new URLSearchParams();
        formData.append('itemId', itemId);
        formData.append('which', which.toString());

        return this.httpClient.post(`${BACKEND_DOMAIN}/item/use`, formData, { headers, responseType: 'text' });
      }),
    ).subscribe((success) => {
      console.log('use item: ', success);
    });
  }

  /**
   * TODO: equip offhand: "action: dualwield"
   */
  public equipItem({ isOffhand, itemId, which, pwd }: EquipItemParams): void {
    console.log('equip item');
    this.loginService.session$.pipe(
      filter(isTruthy),
      switchMap(session => {
        const headers = getHttpHeaders(session, pwd);
        
        const formData = new URLSearchParams();
        formData.append('itemId', itemId);
        formData.append('offhand', isOffhand.toString());
        formData.append('which', which.toString());

        return this.httpClient.post(`${BACKEND_DOMAIN}/item/equip`, formData, { headers, responseType: 'text' });
      }),
    ).subscribe(success => {
      console.log('equip item: ', success);
    });
  }

  public unequipItem({ equipmentSection, pwd }: UnequipItemParams): void {
    console.log('unequip item: ', equipmentSection);
    this.loginService.session$.pipe(
      filter(isTruthy),
      switchMap(session => {
        const headers = getHttpHeaders(session, pwd);

        const formData = new URLSearchParams();
        formData.append('section', equipmentSection);

        return this.httpClient.post(`${BACKEND_DOMAIN}/item/unequip`, formData, { headers, responseType: 'text' });
      }),
    ).subscribe(success => {
      console.log('unequip item: ', success);
    });
  }

  public buyItem({ pwd, quantity, row, shop }: BuyItemParams): void {
    console.log('buyItem: ', pwd, quantity, row, shop);

    this.loginService.session$.pipe(
      filter(isTruthy),
      switchMap(session => {
        const headers = getHttpHeaders(session, pwd);

        const params = new URLSearchParams();
        params.append('shop', shop);
        params.append('quantity', quantity);
        params.append('row', row);

        return this.httpClient.post(`${BACKEND_DOMAIN}/item/buy`, params, { headers, responseType: 'text' });
      }),
    ).pipe(
      map(result => this.resultsParserService.parseHtml(result)),
    )
      .subscribe(result => {
        console.log('buy item: ', result);
        this.noticeService.setNotice(result);
      });
  }

  /**
   * Explore the darkness in the typical tavern cellar.
   */
  public exploreDarkness(place: string): void {
    this.parserService.parseRaw(place).subscribe();
  }
}
