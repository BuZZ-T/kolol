import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, combineLatest, filter, map, startWith, switchMap, tap } from 'rxjs';

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

  private tick$= new BehaviorSubject<void>(undefined);

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
    this.playerAvatar$ = loginService.sessionId$.pipe(
      filter((sessionId) => !!sessionId),
      switchMap((sessionId) => this.parse(sessionId as string)),
    );
   }

   public tick(): void {
    this.tick$.next();
   }

   private parse(sessionCookie: string): Observable<string> {
    return this.parserService.parse('charpane.php', sessionCookie).pipe(
      map((http) => {
        const tableFields = http.querySelectorAll('td');

        const playerAvatar = tableFields?.[0]?.querySelector('img')?.getAttribute('src') || '';

        return playerAvatar;
      },
    ));
   }
}
