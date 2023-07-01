import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { ParserService } from './parser.service';
import { Map } from '../main/map/map.types';

@Injectable({
  providedIn: 'root',
})
export class MapParserService {

  private mapSubject$: BehaviorSubject<Map | null> = new BehaviorSubject<Map | null>(null);

  public constructor(private parserService: ParserService) {
    //
  }
  
  public map(): Observable<Map | null> {
    this.parse().subscribe(map => {
      this.mapSubject$.next(map);
    });

    return this.mapSubject$.asObservable();
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

        const map: Map = tileImages.map(tileImage => ({
          image: tileImage.getAttribute('src') || '',
          url: tileImage.parentElement?.getAttribute('href') || '',
        })) as Map;

        return map;
      }),
    );
  }
}
