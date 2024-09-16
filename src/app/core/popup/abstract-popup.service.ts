import type { ComponentType, ConnectedPosition, OverlayRef } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import type { EventEmitter } from '@angular/core';
import { inject } from '@angular/core';
import { Subject } from 'rxjs';

export type StickyPopupConfig = {
  backdropClass: string;
  panelClass: string;
  position: 'above' | 'below' | 'above-below' | 'below-above';
  height?: `${number}px`;
  width: `${number}px`;
}

interface Closable {
  onClosed: EventEmitter<void>;
}

export abstract class AbstractPopupService {
  #overlay = inject(Overlay);
  #overlayRef: OverlayRef | null = null;

  protected readonly abovePosition: ConnectedPosition = { originX: 'end',originY: 'top',overlayX: 'start',overlayY: 'bottom',panelClass: 'tooltip-above' } as const;
  protected readonly belowPosition: ConnectedPosition = { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', panelClass: 'tooltop-below' } as const;

  #createOverlayRef(): OverlayRef {
    const overlayRef = this.#overlay.create({
      backdropClass: 'tooltip-backdrop-grey',
      hasBackdrop: true,
      panelClass: 'tooltip-with-thick-border',
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

  #getPositions(position: StickyPopupConfig['position']): ConnectedPosition[] {
    switch (position) {
    case 'above':
      return [ this.abovePosition ];
    case 'below':
      return [ this.belowPosition ];
    case 'above-below':
      return [ this.abovePosition, this.belowPosition ];
    case 'below-above':
      return [ this.belowPosition, this.abovePosition ];
    }
  }

  #createStickyOverlayRef(element: Element, config: StickyPopupConfig): OverlayRef {
    const { backdropClass, height, panelClass, position, width } = config;
    const overlayRef = this.#overlay.create({
      backdropClass,
      hasBackdrop: true,
      height,
      panelClass,
      positionStrategy: this.#overlay.position()
        .flexibleConnectedTo(element)
        .withPositions(this.#getPositions(position)),
      scrollStrategy: this.#overlay.scrollStrategies.block(),
      width,
    });

    overlayRef.backdropClick().subscribe(() => {
      this.#overlayRef?.dispose();
      this.#overlayRef = null;
    });

    return overlayRef;
  }

  protected stop$= new Subject<void>();

  protected close(): void {
    this.#overlayRef?.dispose();
    this.#overlayRef = null;
  }

  protected initPortal<TComponent extends Closable>(component: ComponentType<TComponent>): TComponent {
    if (!this.#overlayRef) {
      this.#overlayRef = this.#createOverlayRef();
    }
    if(this.#overlayRef.hasAttached()) {
      this.#overlayRef.detach();
    }

    const portal = new ComponentPortal(component);
    const componentRef = this.#overlayRef.attach(portal);

    const instance = componentRef.instance;

    instance.onClosed.subscribe(() => {
      this.stop$.next();
      this.close();
    });

    return instance;
  }

  protected initStickyPortal<TComponent>(component: ComponentType<TComponent>, element: Element, config: StickyPopupConfig): TComponent {
    if (!this.#overlayRef) {
      this.#overlayRef = this.#createStickyOverlayRef(element, config);
    }
    if(this.#overlayRef.hasAttached()) {
      this.#overlayRef.detach();
    }

    const portal = new ComponentPortal(component);
    const componentRef = this.#overlayRef.attach(portal);

    return componentRef.instance;
  }
}
