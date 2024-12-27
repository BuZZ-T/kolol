import type { OnChanges, SimpleChanges } from '@angular/core';
import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';

import { RoutingService } from './routing.service';

@Directive({
  selector: '[kololRouting]',
})
export class RoutingDirective implements OnChanges {
  #routingService = inject(RoutingService);
  #renderer = inject(Renderer2);
  #element = inject(ElementRef);

  #splitRoute(): { url: string, name: string } {
    if (typeof this.route === 'string') {
      return { name: this.#routingService.resolveName(this.route), url: this.route };
    } else if (this.route) {
      return { name: this.route.name || '', url: this.route.url || '' };
    } else {
      return { name: '', url: '' };
    }
  }

  @HostListener('click', [ '$event' ])
  private onClick(): void {
    const { url } = this.#splitRoute();
    this.#routingService.navigateTo(url);
  }

  @Input('kololRouting')
  public route: string | { url: string | undefined, name: string | undefined } | null | undefined;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['route']) {
      const { name } = this.#splitRoute();
      this.#renderer.setAttribute(this.#element.nativeElement, 'title', name);
    }
  }
}
