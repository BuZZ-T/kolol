import { Component } from '@angular/core';
import type { Observable } from 'rxjs';

import type { CellarData } from './cellar.types';
import type { ActionService } from '../../../action/action.service';
import type { CellarParserService } from '../../../parser/cellar-parser.service';
import type { RoutingService } from '../../../routing/routing.service';

@Component({
  selector: 'kolol-cellar',
  styleUrls: [ './cellar.component.scss' ],
  templateUrl: './cellar.component.html',
})
export class CellarComponent {

  public cellar$: Observable<CellarData | null>;

  public constructor(
    private cellarParserService: CellarParserService,
    private routingService: RoutingService,
    private actionService: ActionService,
  ) {
    this.cellar$ = this.cellarParserService.cellar();
  }

  public tileClicked(link: string): void {
    if (link === 'tavern.php') {
      this.routingService.navigateTo(link);
    } else {
      this.actionService.exploreDarkness(link);
    }
  }
}
