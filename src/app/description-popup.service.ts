import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { DescItemComponent } from './main/inventory/desc-item/desc-item.component';
import { DescOutfitComponent } from './main/inventory/desc-outfit/desc-outfit.component';
import { DescSkillEffectComponent } from './main/inventory/desc-skill-effect/desc-skill-effect.component';
import { DescriptionParserService } from './parser/description-parser.service';

@Injectable({
  providedIn: 'root',
})
export class DescriptionPopupService {

  private overlayRef: OverlayRef | null = null;

  public constructor(
    private descriptionParserService: DescriptionParserService,
    private overlay: Overlay,
  ) {
    //
  }

  private createOverlayRef(): OverlayRef {
    const overlayRef = this.overlay.create({
      backdropClass: 'tooltip-backdrop',
      hasBackdrop: true,
      panelClass: 'tooltip',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      width: '350px',
    });

    overlayRef.backdropClick().subscribe(() => {
      console.log('backdropClick');
      this.overlayRef?.dispose();
      this.overlayRef = null;
    });

    return overlayRef;
  }

  private showOutfit(outfitId: string): void {
    if (!this.overlayRef) {
      this.overlayRef = this.createOverlayRef();
    }
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }

    this.descriptionParserService.outfit(outfitId).subscribe((outfitDescription) => {
      if (outfitDescription) {
        console.log({ outfitDescription });
        const outfitPortal = new ComponentPortal(DescOutfitComponent);
        if (this.overlayRef) {
          const componentRef = this.overlayRef.attach(outfitPortal);
          const descOutfitInstance = componentRef.instance;
          descOutfitInstance.outfit = outfitDescription;

          const closeSubscription = descOutfitInstance.onClosed.subscribe(() => {
            this.overlayRef?.dispose();
            this.overlayRef = null;
            closeSubscription?.unsubscribe();
          });
        }
      }
    });
  }

  private showSkillEffect(effectId: string): void {
    if (!this.overlayRef) {
      this.overlayRef = this.createOverlayRef();
    }
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }

    this.descriptionParserService.effect(effectId).subscribe((effectDescription) => {
      if (effectDescription) {
        console.log({ effectDescription });
        const skillEffectPortal = new ComponentPortal(DescSkillEffectComponent);

        if (this.overlayRef) {
          const componentRef = this.overlayRef.attach(skillEffectPortal);
          const descSkillEffectInstance = componentRef.instance;
          descSkillEffectInstance.skillEffectDescriptionData = effectDescription;
        }
      }
    });
  }

  public showItemDescription(itemId: string): void {
    this.descriptionParserService.itemDescription(itemId).subscribe((itemDescription) => {
      if (itemDescription) {
        if (this.overlayRef) {
          console.log('prevented');
    
          return;
        }

        const stop$= new Subject<void>();
        
        const portal = new ComponentPortal(DescItemComponent);
        this.overlayRef = this.createOverlayRef();
        const componentRef = this.overlayRef.attach(portal);
    
        const descItemInstance = componentRef.instance;
        descItemInstance.itemDescription = itemDescription;
    
        descItemInstance.onClosed.pipe(takeUntil(stop$)).subscribe(() => {
          this.overlayRef?.dispose();
          this.overlayRef = null;
          stop$.next();
        });
    
        descItemInstance.onOutfitClicked.pipe(takeUntil(stop$)).subscribe((outfitId) => {
          this.showOutfit(outfitId);
          stop$.next();
        });
    
        descItemInstance.onEffectClicked.pipe(takeUntil(stop$)).subscribe((effectId) => {
          this.showSkillEffect(effectId);
          stop$.next();
        });
      }
    });
  }
}
