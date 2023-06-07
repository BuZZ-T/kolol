import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, switchMap } from 'rxjs';

import { ParserService } from './parser.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Currently only used for picking the player avatar (which is not )
 */
export class CharpaneParserService {

  public playerAvatar$: Observable<string>;

  private tick$= new BehaviorSubject<null>(null);

  public constructor(
    loginService: LoginService,
    private parserService: ParserService,
  ) {
    // this.playerAvatar$ = combineLatest([ this.loginService.sessionId$, this.tick$ ]).pipe(
    //   tap(([ a, b ]) => {
    //     console.log('before filter: ', a, b);
    //   }),
    //   filter(([ sessionId ]) => !!sessionId),
    //   tap(([ a, b ]) => {
    //     console.log('after filter: ', a, b);
    //   }),
    //   switchMap(([ sessionId ]) => this.parse(sessionId as string)),
    //   map(p => p.playerAvatar),
    // );

    this.playerAvatar$ = this.parse();
  }

  public tick(): void {
    this.tick$.next(null);
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
