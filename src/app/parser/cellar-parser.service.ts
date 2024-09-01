import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';

import { AbstractParserService } from './abstract/abstract-parser.service';
import { CellarData, CellarTile } from '../main/tavern/cellar/cellar.types';

@Injectable({
  providedIn: 'root',
})
export class CellarParserService extends AbstractParserService<CellarData | null> {
  public cellar(): Observable<CellarData | null> {
    return this.parsePageToSubject('cellar.php');
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

  /**
   * Explore the darkness in the typical tavern cellar.
   */
  public exploreDarkness(place: string): void {
    this.parsePage(place).pipe(first()).subscribe();
  }
}
