import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { LoginService } from '../login/login.service';
import { Campground, CampgroundItem } from '../main/campground/campground.types';
import { RoutingService } from '../routing/routing.service';

@Injectable({
  providedIn: 'root',
})
export class CampgroundParserService extends AbstractParserService<Campground> {

  public constructor(httpClient: HttpClient, loginService: LoginService, routingService: RoutingService) { 
    super(httpClient, loginService, routingService);
  }

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
