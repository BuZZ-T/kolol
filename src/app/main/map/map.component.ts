import { Component } from '@angular/core';

import { MapParserService } from '../../parser/map-parser.service';

@Component({
  selector: 'kolol-map',
  styleUrls: [ './map.component.scss' ],
  templateUrl: './map.component.html',
})
export class MapComponent {

  public constructor(private mapParserService: MapParserService) {
    //
  }

  // public ngOnInit(): void {
  //   // this.mapParserService.
  // }
}
