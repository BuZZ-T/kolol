import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { CellarData } from './cellar.types';
import { CellarParserService } from '../../../parser/cellar-parser.service';
import { RoutingService } from '../../../routing/routing.service';

@Component({
  selector: 'kolol-cellar',
  styleUrls: [ './cellar.component.scss' ],
  templateUrl: './cellar.component.html',
})
export class CellarComponent {
  #cellarParserService = inject(CellarParserService);
  #routingService = inject(RoutingService);

  public cellar$: Observable<CellarData | null>;

  public constructor(
  ) {
    this.cellar$ = this.#cellarParserService.cellar();
  }

  public tileClicked(link: string): void {
    if (link === 'tavern.php') {
      this.#routingService.navigateTo(link);
    } else {
      this.#cellarParserService.exploreDarkness(link);
    }
  }
}
