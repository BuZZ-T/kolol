import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SeasideTown, Element } from './seaside-town.types';
import { SeasideTownParserService } from '../../parser/seaside-town-parser.service';
import { RoutingService } from '../../routing/routing.service';
import { Site } from '../../routing/routing.types';

@Component({
  selector: 'kolol-seaside-town',
  styleUrls: [ './seaside-town.component.scss' ],
  templateUrl: './seaside-town.component.html',
})
export class SeasideTownComponent {

  public town$: Observable<SeasideTown | null> = of(null);

  public constructor(
    private seasideTownParserService: SeasideTownParserService,
    private routingService: RoutingService,
  ) {
    this.town$ = this.seasideTownParserService.town$;
    this.town$.subscribe(town => {
      console.log('town: ', town);
    });
  }

  public tileClicked(element: Element): void {
    this.routingService.navigateTo(element.url as Site);
  }
}
