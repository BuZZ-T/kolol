import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { DescFamiliarComponent } from './familiar/desc-familiar/desc-familiar.component';
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

  private initRef(): void {
    if (!this.overlayRef) {
      this.overlayRef = this.createOverlayRef();
    }
    if(this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  private initPortal<TComponent>(component: ComponentType<TComponent>): TComponent {
    this.initRef();

    const portal = new ComponentPortal(component);
    this.overlayRef = this.createOverlayRef();
    const componentRef = this.overlayRef.attach(portal);

    return componentRef.instance;
  }

  private showOutfit(outfitId: string): void {
    this.descriptionParserService.outfit(outfitId).subscribe((outfitDescription) => {

      const descOutfitComponentInstance = this.initPortal(DescOutfitComponent);
      descOutfitComponentInstance.outfit = outfitDescription;

      const closeSubscription = descOutfitComponentInstance.onClosed.subscribe(() => {
        this.overlayRef?.dispose();
        this.overlayRef = null;
        closeSubscription?.unsubscribe();
      });
    });
  }

  private showSkillEffect(effectId: string): void {
    this.descriptionParserService.effect(effectId).subscribe((effectDescription) => {
      console.log({ effectDescription });

      const descSkillEffectInstance = this.initPortal(DescSkillEffectComponent);
      descSkillEffectInstance.skillEffectDescriptionData = effectDescription;
    });
  }

  public showItemDescription(itemId: string): void {
    this.descriptionParserService.itemDescription(itemId).subscribe((itemDescription) => {
      if (this.overlayRef) {
        console.log('prevented');
    
        return;
      }

      const stop$= new Subject<void>();
      
      const descItemInstance = this.initPortal(DescItemComponent);
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
    });
  }

  public showFamiliarDescription(familiarId: string): void {
    const stop$= new Subject<void>();
    
    this.descriptionParserService.familiar(familiarId).pipe(takeUntil(stop$)).subscribe((familiarDescription) => {
      const descFamiliarComponentInstance = this.initPortal(DescFamiliarComponent);
      descFamiliarComponentInstance.familiar = familiarDescription;

      descFamiliarComponentInstance.onClosed.pipe(takeUntil(stop$)).subscribe(() => {
        this.overlayRef?.dispose();
        this.overlayRef = null;
        stop$.next();
      });
    });
  }
}
