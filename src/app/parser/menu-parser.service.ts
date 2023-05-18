import { Injectable } from '@angular/core';
import { Observable, filter, map, of, switchMap } from 'rxjs';

import { ParserService } from './parser.service';
import { MenuEntry, menuRoutes } from '../awesome-menu/menu.types';
import { LoginService } from '../login/login.service';

function isTruthy<T>(value: T | null | undefined): value is T {
  return !!value;
}

@Injectable({
  providedIn: 'root',
})
export class MenuParserService {

  public menu$: Observable<MenuEntry[] | null> = of(null);

  public constructor(
    loginService: LoginService,
    private parserService: ParserService,
  ) {
      this.menu$ = loginService.sessionId$.pipe(
        filter(sessionId => !!sessionId),
        switchMap(sessionId => this.parse(sessionId as string)),
      );
   }

   private parse(sessionId: string): Observable<MenuEntry[]> {
    return this.parserService.parse('awesomemenu.php', sessionId).pipe(
      map(http => {
        console.log('http: ', http);

        const elements = Array.from(http.querySelectorAll('.ai:not(.empty) img'));

        return elements.map(e => {

          const name = e.getAttribute('alt');
          const image = e.getAttribute('src');

          if (isTruthy(name) && isTruthy(image)) {
            const route = menuRoutes[name];
            return { image, name, route };
          }
          return null;
        }).filter(isTruthy);
      }),
    );
  }
}
