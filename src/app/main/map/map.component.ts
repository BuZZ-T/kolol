import { Component, Input } from '@angular/core';

import { Map } from './map.types';
import { MapParserService } from '../../parser/map-parser.service';

@Component({
  selector: 'kolol-map',
  styleUrls: [ './map.component.scss' ],
  templateUrl: './map.component.html',
})
export class MapComponent {

  @Input({ required: true })
  public mapTiles: Map = [
      [ 
        'https://d2uyhvukfffg5a.cloudfront.net/otherimages/main/newmap1new.gif',
        'https://d2uyhvukfffg5a.cloudfront.net/otherimages/main/map2.gif',
        'https://d2uyhvukfffg5a.cloudfront.net/otherimages/main/map3.gif',
      ],
      [ 
        'https://d2uyhvukfffg5a.cloudfront.net/otherimages/main/map4a.gif',
        'https://d2uyhvukfffg5a.cloudfront.net/otherimages/main/map4b.gif',
        'https://d2uyhvukfffg5a.cloudfront.net/otherimages/main/map5.gif',
        'https://d2uyhvukfffg5a.cloudfront.net/otherimages/main/map6.gif',
      ],
      [ 
        'https://d2uyhvukfffg5a.cloudfront.net/otherimages/main/map7.gif',
        'https://d2uyhvukfffg5a.cloudfront.net/otherimages/main/map8.gif',
        'https://d2uyhvukfffg5a.cloudfront.net/otherimages/main/map9.gif',
      ],
    ];

  public constructor(private mapParserService: MapParserService) {
    //
  }

  public tileClicked(x: number, y: number): void {
    console.log('tile clicked: ', x, y);
  }
}
