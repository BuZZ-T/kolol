import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { LoginService } from '../login/login.service';
import { Map } from '../main/map/map.types';
import { RoutingService } from '../routing/routing.service';

@Injectable({
  providedIn: 'root',
})
export class MapParserService extends AbstractParserService<Map | null> {
  public constructor(
    httpClient: HttpClient,
    loginService: LoginService,
    routingService: RoutingService,
  ) {
    super(httpClient, loginService, routingService);
  }

  protected override map({ doc }: { doc: Document; pwd: string; }): Map | null {
    const images = doc.querySelectorAll('img');
    const tileImages = Array.from(images).filter(i => i.getAttribute('src')?.includes('main/map') || i.getAttribute('src')?.includes('main/newmap'));
  
    if (tileImages.length !== 10) {
      console.error('Error parsing main map. Length is: ', tileImages.length);
      return null;
    }
  
    const map: Map = tileImages.map(tileImage => ({
      image: tileImage.getAttribute('src') || '',
      url: tileImage.parentElement?.getAttribute('href') || '',
    })) as Map;
  
    return map;
  }

  public mainMap(): Observable<Map | null> {
    return this.parseToSubject('main.php');
  }
}
