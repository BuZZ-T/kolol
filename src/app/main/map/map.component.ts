import { Component, inject } from '@angular/core';

import { MapParserService } from '../../parser/map-parser.service';

@Component({
  selector: 'kolol-map',
  styleUrls: [ './map.component.scss' ],
  templateUrl: './map.component.html',
})
export class MapComponent {
  #mapParserService = inject(MapParserService);

  public map$ = this.#mapParserService.mainMap();
}
