import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Currently only used for picking the player avatar (which is not )
 */
export class CharpaneParserService extends AbstractParserService<string> {

  private playerAvatarSubject$= new BehaviorSubject<string>('');

  public constructor(
    httpClient: HttpClient,
    loginService: LoginService,
    routingService: RoutingService,
  ) {
    super(httpClient, loginService, routingService);
  }

  public avatar(): Observable<string> {
    return this.parseToSubject('charpane.php').pipe(
      map((avatar) => avatar || ''),
    );
  }

  protected map({ doc }: { doc: Document; pwd: string; }): string {
    const tableFields = doc.querySelectorAll('td');

    const playerAvatar = tableFields?.[0]?.querySelector('img')?.getAttribute('src') || '';

    return playerAvatar;
  }
}
