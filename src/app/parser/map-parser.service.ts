import { Injectable } from '@angular/core';
import type { Observable  } from 'rxjs';

import { AbstractParserService } from './abstract/abstract-parser.service';
import type { Map } from '../main/map/map.types';

@Injectable({
  providedIn: 'root',
})
export class MapParserService extends AbstractParserService<Map | null> {
  protected override map({ doc }: { doc: Document; pwd: string; }): Map | null {
    const images = doc.querySelectorAll('img');
    const tileImages = Array.from(images).filter(i => i.getAttribute('src')?.includes('main/map') || i.getAttribute('src')?.includes('main/newmap') || i.getAttribute('src')?.includes('main/island'));
  
    if (tileImages.length !== 10) {
      console.error('Error parsing main map. Length is: ', tileImages.length, tileImages.map(t => t.getAttribute('alt')));
      return null;
    }
  
    const map: Map = tileImages.map(tileImage => ({
      image: tileImage.getAttribute('src') || '',
      url: tileImage.parentElement?.getAttribute('href') || '',
    })) as Map;
  
    return map;
  }

  public mainMap(): Observable<Map | null> {
    return this.parsePageToSubject('main.php');
  }
}
