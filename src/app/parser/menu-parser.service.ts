import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { ParserService } from './parser.service';
import { MenuEntry } from '../awesome-menu/menu.types';
import { menuRoutes } from '../routing/routing.utils';
import { isTruthy } from '../utils/general';

@Injectable({
  providedIn: 'root',
})
export class MenuParserService {

  public menu$: Observable<MenuEntry[] | null> = of(null);

  public constructor(
    private parserService: ParserService,
  ) {
    this.menu$ = this.parse();
  }

  private parse(): Observable<MenuEntry[]> {
    return this.parserService.parse('awesomemenu.php').pipe(
      map(({ doc }) => {
        const elements = Array.from(doc.querySelectorAll('.ai:not(.empty) img'));

        return elements.map(e => {

          const name = e.getAttribute('alt') as keyof typeof menuRoutes;
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
