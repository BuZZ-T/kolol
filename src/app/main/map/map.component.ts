import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Map } from './map.types';
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
  ) {
    this.map$ = this.mapParserService.mainMap();
  }
}
