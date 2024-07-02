import { Directive, HostListener, Input } from '@angular/core';

import { RoutingService } from './routing.service';

@Directive({
  selector: '[kololRouting]',
})
export class RoutingDirective {

  public constructor(private routingService: RoutingService) {
    //
  }

  @HostListener('click', [ '$event' ])
  private onClick(): void {
    this.routingService.navigateTo(this.route || '');
  }

  @Input('kololRouting')
  public route: string | null | undefined;
}
