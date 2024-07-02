import { Component } from '@angular/core';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';

import type { Map } from './map.types';
import type { MapParserService } from '../../parser/map-parser.service';

@Component({
  selector: 'kolol-map',
  styleUrls: [ './map.component.scss' ],
  templateUrl: './map.component.html',
})
export class MapComponent {

  public map$: Observable<Map | null> = of(null);

  public constructor(
    private mapParserService: MapParserService,
  ) {
    this.map$ = this.mapParserService.mainMap();
  }
}
