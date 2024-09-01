import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';

import type { MacroMenuEntry, MenuEntry } from './menu.types';
import { ActionService } from '../action/action.service';
import { MenuParserService } from '../parser/menu-parser.service';

@Component({
  selector: 'kolol-awesome-menu',
  styleUrls: [ './awesome-menu.component.scss' ],
  templateUrl: './awesome-menu.component.html',
})
export class AwesomeMenuComponent implements OnInit {
  #menuParserService = inject(MenuParserService);
  #actionService = inject(ActionService);
  #router = inject(Router);

  public menu$: Observable<MenuEntry[] | null> = of(null);

  public currentPath: string | null = null;

  public ngOnInit(): void {
    this.menu$ = this.#menuParserService.menu();

    this.#router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url;
      }
    });
  }

  public onMacro(menuEntry: MacroMenuEntry): void {
    menuEntry.skills.forEach(skill => {
      this.#actionService.castSkill({ skillId: skill.id });
    });
  }
}
