import type { ComponentType, OverlayRef } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject } from '@angular/core';

export abstract class AbstractPopupService {
  #overlay = inject(Overlay);
  #overlayRef: OverlayRef | null = null;

  #createOverlayRef(): OverlayRef {
    const overlayRef = this.#overlay.create({
      backdropClass: 'tooltip-backdrop',
      hasBackdrop: true,
      panelClass: 'tooltip',
      positionStrategy: this.#overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.#overlay.scrollStrategies.block(),
      width: '350px',
    });

    overlayRef.backdropClick().subscribe(() => {
      this.#overlayRef?.dispose();
      this.#overlayRef = null;
    });

    return overlayRef;
  }

  #initRef(): OverlayRef {
    if (!this.#overlayRef) {
      this.#overlayRef = this.#createOverlayRef();
    }
    if(this.#overlayRef.hasAttached()) {
      this.#overlayRef.detach();
    }

    return this.#overlayRef;
  }

  protected initPortal<TComponent>(component: ComponentType<TComponent>): TComponent {
    const ref = this.#initRef();

    const portal = new ComponentPortal(component);
    const componentRef = ref.attach(portal);

    return componentRef.instance;
  }
}
