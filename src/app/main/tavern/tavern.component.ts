import { Component, inject } from '@angular/core';
import { ROUTES } from 'src/app/routing/routing.utils';

import { ResultsParserService } from '../../parser/results-parser.service';

@Component({
  selector: 'kolol-tavern',
  styleUrls: [ './tavern.component.scss' ],
  templateUrl: './tavern.component.html',
})
export class TavernComponent {
  #resultsParserService = inject(ResultsParserService);

  public barkeep(): void {
    this.#resultsParserService.placeNotice('tavern.php?place=barkeep');
  }

  public pool(): void {
    console.log('Play at the Pool Table');
    this.#resultsParserService.placeNotice('tavern.php?place=pooltable');
  }

  public susguy(): void {
    console.log('Talk to the Suspicious-Looking Guy');
    this.#resultsParserService.placeNotice('tavern.php?place=susguy');
  }
  
  public cellarRoute = ROUTES.cellar;
}
