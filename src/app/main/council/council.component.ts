import { Component } from '@angular/core';
import { CouncilParserService } from 'src/app/parser/council-parser.service';
import { imageToAbsolute } from 'src/app/utils/image.utils';

@Component({
  selector: 'kolol-council',
  styleUrls: [ './council.component.scss' ],
  templateUrl: './council.component.html',
})
export class CouncilComponent {

  public council$ = this.councilParserService.council();
  public councilImage = imageToAbsolute('council', 'otherimages', 'gif');

  public constructor(private councilParserService: CouncilParserService) {
    //
  }
}
