import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { LoginService } from '../login/login.service';
import { CellarData, CellarTile } from '../main/tavern/cellar/cellar.types';
import { RoutingService } from '../routing/routing.service';

@Injectable({
  providedIn: 'root',
})
export class CellarParserService extends AbstractParserService<CellarData | null> {

  public constructor(httpClient: HttpClient, loginService: LoginService, routingService: RoutingService) {
    super(httpClient, loginService, routingService);
  }

  public cellar(): Observable<CellarData | null> {
    return this.parseToSubject('cellar.php');
  }

  protected map({ doc }: {doc: Document}): CellarData {
    const tiles: CellarTile[] = Array.from(doc.querySelectorAll('img')).map(tile => {
      const parent = tile.parentElement;
      // the parent is a <td> of a <a>
      const link = parent?.getAttribute('href') || null;

      return {
        image: tile.getAttribute('src') || '',
        link,
      };
    });

    return {
      tiles,
    };
  }
}
