import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { MenuEntry } from '../awesome-menu/menu.types';
import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';
import { menuRoutes } from '../routing/routing.utils';
import { isTruthy } from '../utils/general';

@Injectable({
  providedIn: 'root',
})
export class MenuParserService extends AbstractParserService<MenuEntry[]> {
  public constructor(
    httpClient: HttpClient,
    loginService: LoginService,
    routingService: RoutingService,
  ) {
    super(httpClient, loginService, routingService);
  }

  protected override map({ doc }: { doc: Document, pwd: string }): MenuEntry[] {
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
  }

  public menu(): Observable<MenuEntry[] | null> {
    return this.parsePageToSubject('awesomemenu.php');
  }
}
