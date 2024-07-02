import { Component } from '@angular/core';
import type { Observable } from 'rxjs';

import type { Campground } from './campground.types';
import type { CampgroundParserService } from '../../parser/campground-parser.service';

@Component({
  selector: 'kolol-campground',
  styleUrls: [ './campground.component.scss' ],
  templateUrl: './campground.component.html',
})
export class CampgroundComponent {

  public campground$: Observable<Campground | null>;

  public constructor(campgroundParserService: CampgroundParserService) {
    this.campground$ = campgroundParserService.campground();
  }
}
