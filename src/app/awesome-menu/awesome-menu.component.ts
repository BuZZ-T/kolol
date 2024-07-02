import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import type { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';

import type { MenuEntry } from './menu.types';
import type { MenuParserService } from '../parser/menu-parser.service';

@Component({
  selector: 'kolol-awesome-menu',
  styleUrls: [ './awesome-menu.component.scss' ],
  templateUrl: './awesome-menu.component.html',
})
export class AwesomeMenuComponent implements OnInit {

  public menu$: Observable<MenuEntry[] | null> = of(null);

  public currentPath: string | null = null;

  public constructor(
    private menuParserService: MenuParserService,
    private router: Router) {
    //
  }

  public ngOnInit(): void {
    this.menu$ = this.menuParserService.menu();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentPath = event.url;
      }
    });
  }
}
