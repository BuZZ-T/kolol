import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractParserService } from './abstract/abstract-parser.service';
import { Campground, CampgroundItem } from '../main/campground/campground.types';

@Injectable({
  providedIn: 'root',
})
export class CampgroundParserService extends AbstractParserService<Campground> {
  protected override map({ doc }: { doc: Document; pwd: string; }): Campground {
    const gridElement = doc.querySelector('table table table tbody');
    const rows = Array.from(gridElement?.querySelectorAll('tr') || []);

    const campground: Campground = rows.map(row =>
      Array.from(row.querySelectorAll('td') || []).map(column => {
        const link = column.querySelector('a')?.getAttribute('href') || null;

        const imageElement = column.querySelector('img');
        const title = imageElement?.getAttribute('title') || '';
        const image = imageElement?.getAttribute('src') || '';

        const campgroundItem: CampgroundItem =  {
          image,
          link,
          title,
        };

        return campgroundItem;
      }),
    );

    return campground;
  }

  public campground(): Observable<Campground | null> {
    return this.parsePageToSubject('campground.php');
  }
}
