import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { ParserService } from './parser.service';
import { Map } from '../main/map/map.types';

@Injectable({
  providedIn: 'root',
})
export class MapParserService {

  public map$: Observable<Map | null> = of(null);

  public constructor(private parserService: ParserService) {
    this.map$ = this.parse();
  }

  // TODO: remove null
  private parse(): Observable<Map | null> {
    return this.parserService.parse('main.php').pipe(
      map(({ doc }) => {
        const images = doc.querySelectorAll('img');
        const tileImages = Array.from(images).filter(i => i.getAttribute('src')?.includes('main/map') || i.getAttribute('src')?.includes('main/newmap'));

        if (tileImages.length !== 10) {
          console.error('Error parsing main map. Length is: ', tileImages.length);
          return null;
        }

        const map2: Map = tileImages.map(tileImage => ({
          image: tileImage.getAttribute('src') || '',
          url: tileImage.parentElement?.getAttribute('href') || '',
        })) as Map;

        return map2;
      }),
    );
  }
}
