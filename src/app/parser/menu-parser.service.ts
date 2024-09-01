import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { filter, map, first } from 'rxjs';

import { AbstractAsyncMapParserService } from './abstract/abstract-async-map-parser.service';
import { isTruthy } from '../../shared/general';
import { ParseApiService } from '../api/parse-api.service';
import type { MenuEntry, MacroMenuEntry, LinkMenuEntry } from '../awesome-menu/menu.types';
import { menuRoutes } from '../routing/routing.utils';

@Injectable({
  providedIn: 'root',
})
export class MenuParserService extends AbstractAsyncMapParserService<MenuEntry[]> {
  #parseApiService = inject(ParseApiService);

  protected override mapAsync({ doc }: { doc: Document, pwd: string }): Observable<MenuEntry[]> {
    const elements = Array.from(doc.querySelectorAll('.ai:not(.empty) img'));

    return this.#parseApiService.skills().pipe(
      filter(isTruthy),
      first(),
      map(skills => {
        const interestingSkills = [ ...skills.skills.Buff, ...skills.skills.NotBuff ];

        const menuEntries = elements.map(element => {
          const name = element.getAttribute('alt') as keyof typeof menuRoutes;
          const image = element.getAttribute('src') || '';

          const isMacro = element.parentElement?.classList.contains('macrocon');

          if (isMacro) {
            const actions = element.parentElement?.getAttribute('rel');

            const emptyMacroMenuEntry: MacroMenuEntry = { image, name, skills: [], type: 'macro' };

            const menuEntry = actions?.split('&&').map(c => c.trim()).reduce((acc, command) => {
              if (command.startsWith('/cast') || command.startsWith('cast')) {
                const skillName = command.replace(/.?cast\s/, '').toLowerCase();
                const interestingSkill = interestingSkills.find(skill => skill.name.toLowerCase().startsWith(skillName));
                if (interestingSkill) {
                  acc.skills.push(interestingSkill);
                }
              }
              
              return acc;
            }, { ...emptyMacroMenuEntry });

            return menuEntry || { ...emptyMacroMenuEntry };
          } else {
            const route = menuRoutes[name];
            const entry: LinkMenuEntry = { 
              image,
              name,
              route,
              type: 'link',
            };
            return entry;
          }
        });

        return menuEntries;
      }),
    );
  }

  public menu(): Observable<MenuEntry[] | null> {
    return this.parsePageToSubject('awesomemenu.php');
  }
}
