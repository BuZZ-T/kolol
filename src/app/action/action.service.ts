import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, switchMap, tap } from 'rxjs';

import { LoginService } from '../login/login.service';
import { ResultsParserService } from '../parser/results-parser.service';
import { BACKEND_DOMAIN } from '../utils/constants';

type CastSkillParams = {
  pwd: string;
  skillId: string;
  targetPlayer?: string | number;
  quantity?: string | number;
}

@Injectable({
  providedIn: 'root',
})
export class ActionService {

  public constructor(
    private httpClient: HttpClient,
    private loginService: LoginService,
    private resultsParserService: ResultsParserService,
  ) {
    //
  }

  /**
   * targetPlayer 0 means casting to yourself
   */
  public castSkill({ pwd, skillId, quantity = 1, targetPlayer = 0 }: CastSkillParams): void {
    this.loginService.session$.pipe(
      filter(session => !!session),
      switchMap(session => {
        const headers = new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .set('x-pwd', pwd)
          .set('x-session', session!.cookies);
        
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
      console.log('sucessful: ', success);
    });
  }
}
