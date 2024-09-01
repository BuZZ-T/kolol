import { Component, inject } from '@angular/core';

import { CampgroundParserService } from '../../parser/campground-parser.service';

@Component({
  selector: 'kolol-campground',
  styleUrls: [ './campground.component.scss' ],
  templateUrl: './campground.component.html',
})
export class CampgroundComponent {
  #campgroundParserService = inject(CampgroundParserService);

  public campground$ = this.#campgroundParserService.campground();
}
