import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Map, Site, siteToRoute } from './map.types';
import { MapParserService } from '../../parser/map-parser.service';

@Component({
  selector: 'kolol-map',
  styleUrls: [ './map.component.scss' ],
  templateUrl: './map.component.html',
})
export class MapComponent {

  public map$: Observable<Map | null> = of(null);

  public constructor(
    private mapParserService: MapParserService,
    private router: Router) {
    this.map$ = this.mapParserService.map$;
  }

  public tileClicked(url: string): void {
    const route = siteToRoute[url as Site];

    if (route) {
      this.router.navigate([ '/kol', route ]);
    } else {
      console.log('no route for:', url);
    }
  }
}
