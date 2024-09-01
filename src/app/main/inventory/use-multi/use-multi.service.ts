import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { ActionService } from 'src/app/action/action.service';

import { UseMultiComponent } from './use-multi.component';

type ShowParams = {
  action: string | undefined;
  element: HTMLElement | undefined;
  itemId: string | undefined;
  quantity: number;
  pwd: string;
  which: 1 | 2 | 3;
}

@Injectable({
  providedIn: 'root',
})
export class UseMultiService {
  #overlay = inject(Overlay);
  #actionService = inject(ActionService);
  
  private overlayRef: OverlayRef | null = null;

  private createOverlayRef(element: HTMLElement): OverlayRef {
    const overlayRef = this.#overlay.create({
      backdropClass: 'tooltip-backdrop',
      hasBackdrop: true,
      height: '70px',
      panelClass: 'multi-tooltip',
      positionStrategy: this.#overlay.position()
        .flexibleConnectedTo(element)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            panelClass: 'multi-tooltip-top',
          },
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            panelClass: 'multi-tooltip-top',
          },
        ]),
      scrollStrategy: this.#overlay.scrollStrategies.block(),
      width: '120px',
    });

    overlayRef.backdropClick().subscribe(() => {
      this.overlayRef?.dispose();
      this.overlayRef = null;
    });

    return overlayRef;
  }

  public show({ action, element, itemId, quantity, pwd, which }: ShowParams): void {
    if (!element) {
      return;
    }
    this.overlayRef = this.createOverlayRef(element);

    const portal = new ComponentPortal(UseMultiComponent);
    const componentRef = this.overlayRef.attach(portal);
    const componentInstance = componentRef.instance;
    componentInstance.maxValue = quantity;
    componentInstance.submitText = action || 'Use';

    componentInstance.use.subscribe((value) => {
      console.log({ value });
      if (itemId) {
        this.#actionService.useItem({ action: action || 'use', itemId, pwd, quantity: value, which });
      }
      this.overlayRef?.dispose();
      this.overlayRef = null;
    });
  }

}
