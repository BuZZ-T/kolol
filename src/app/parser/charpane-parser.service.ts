import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { ParserService } from './parser.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Currently only used for picking the player avatar (which is not )
 */
export class CharpaneParserService {

  private playerAvatarSubject$= new BehaviorSubject<string>('');

  public constructor(
    loginService: LoginService,
    private parserService: ParserService,
  ) {
    //
  }

  public avatar(): Observable<string> {
    this.parse().subscribe((avatar) => {
      this.playerAvatarSubject$.next(avatar);
    });

    return this.playerAvatarSubject$.asObservable();
  }

  private parse(): Observable<string> {
    return this.parserService.parse('charpane.php').pipe(
      map(({ doc }) => {
        const tableFields = doc.querySelectorAll('td');

        const playerAvatar = tableFields?.[0]?.querySelector('img')?.getAttribute('src') || '';

        return playerAvatar;
      },
      ));
  }
}
