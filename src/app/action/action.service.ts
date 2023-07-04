import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, switchMap } from 'rxjs';

import { LoginService } from '../login/login.service';
import { ParserService } from '../parser/parser.service';
import { ResultsParserService } from '../parser/results-parser.service';
import { BACKEND_DOMAIN } from '../utils/constants';
import { isTruthy } from '../utils/general';

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
  itemId: string;
  pwd: string;
  which: number;
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
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('x-pwd', pwd)
          .set('x-session', session.cookies);
        
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
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('x-pwd', pwd)
          .set('x-session', session.cookies);

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
  public equipItem({ itemId, which, pwd }: EquipItemParams): void {
    console.log('equip item');
    this.loginService.session$.pipe(
      filter(isTruthy),
      switchMap(session => {
        console.log('switchmap equip');
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('x-pwd', pwd)
          .set('x-session', session.cookies);

        const formData = new URLSearchParams();
        formData.append('itemId', itemId);
        formData.append('which', which.toString());

        return this.httpClient.post(`${BACKEND_DOMAIN}/item/equip`, formData, { headers, responseType: 'text' });
      }),
    ).subscribe(success => {
      console.log('equip item: ', success);
    });
  }

  /**
   * Explore the darkness in the typical tavern cellar.
   */
  public exploreDarkness(place: string): void {
    this.parserService.parse(place).subscribe();
  }
}
