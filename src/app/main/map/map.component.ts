import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Map } from './map.types';
import { MapParserService } from '../../parser/map-parser.service';
import { RoutingService } from '../../routing/routing.service';

@Component({
  selector: 'kolol-map',
  styleUrls: [ './map.component.scss' ],
  templateUrl: './map.component.html',
})
export class MapComponent {

  public map$: Observable<Map | null> = of(null);

  public constructor(
    private mapParserService: MapParserService,
    private routingService: RoutingService,
  ) {
    this.map$ = this.mapParserService.map();
  }
}
