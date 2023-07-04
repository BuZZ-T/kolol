import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { ParserService } from './parser.service';
import { CellarData, CellarTile } from '../main/tavern/cellar/cellar.types';

@Injectable({
  providedIn: 'root',
})
export class CellarParserService {

  private cellarSubject$ = new BehaviorSubject<CellarData | null>(null);

  public constructor(private parserService: ParserService) {
    //
  }

  public tick(): Observable<CellarData | null> {
    this.parserService.parse('cellar.php').pipe(
      map(({ doc }) => {
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
      }),
    ).subscribe(tiles => {
      this.cellarSubject$.next(tiles);
    });

    return this.cellarSubject$.asObservable();
  }
}
