import type { OverlayRef } from '@angular/cdk/overlay';
import { Overlay } from '@angular/cdk/overlay';
import { Injectable, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import type { SkillData } from 'src/shared/skills.types';

import { AbstractPopupService } from './core/popup/abstract-popup.service';
import { DescFamiliarComponent } from './familiar/desc-familiar/desc-familiar.component';
import { DescItemComponent } from './main/inventory/desc-item/desc-item.component';
import { DescOutfitComponent } from './main/inventory/desc-outfit/desc-outfit.component';
import { DescSkillEffectComponent } from './main/inventory/desc-skill-effect/desc-skill-effect.component';
import { DescSkillComponent } from './main/skills/desc-skill/desc-skill.component';
import { DescriptionParserService } from './parser/description-parser.service';

@Injectable({
  providedIn: 'root',
})
export class DescriptionPopupService extends AbstractPopupService {
  #descriptionParserService = inject(DescriptionParserService);
  #overlay = inject(Overlay);

  private overlayRef: OverlayRef | null = null;

  #showOutfit(outfitId: string): void {
    this.#descriptionParserService.outfit(outfitId).subscribe((outfitDescription) => {

      const descOutfitComponentInstance = this.initPortal(DescOutfitComponent);
      descOutfitComponentInstance.outfit = outfitDescription;

      const closeSubscription = descOutfitComponentInstance.onClosed.subscribe(() => {
        this.overlayRef?.dispose();
        this.overlayRef = null;
        closeSubscription?.unsubscribe();
      });
    });
  }

  public showEffectDescription(effectId: string): void {
    const stop$= new Subject<void>();
    
    this.#descriptionParserService.effect(effectId).subscribe((effectDescription) => {
      const descSkillEffectInstance = this.initPortal(DescSkillEffectComponent);
      descSkillEffectInstance.skillEffectDescriptionData = effectDescription;

      descSkillEffectInstance.onClosed.pipe(takeUntil(stop$)).subscribe(() => {
        this.overlayRef?.dispose();
        this.overlayRef = null;
        stop$.next();
      });
    });
  }

  public showItemDescription(itemId: string): void {
    this.#descriptionParserService.itemDescription(itemId).subscribe((itemDescription) => {
      if (this.overlayRef) {
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
        this.#showOutfit(outfitId);
        stop$.next();
      });
    
      descItemInstance.onEffectClicked.pipe(takeUntil(stop$)).subscribe((effectId) => {
        this.showEffectDescription(effectId);
        stop$.next();
      });
    });
  }

  public showFamiliarDescription(familiarId: string): void {
    const stop$= new Subject<void>();
    
    this.#descriptionParserService.familiar(familiarId).pipe(takeUntil(stop$)).subscribe((familiarDescription) => {
      const descFamiliarComponentInstance = this.initPortal(DescFamiliarComponent);
      descFamiliarComponentInstance.familiar = familiarDescription;

      descFamiliarComponentInstance.onClosed.pipe(takeUntil(stop$)).subscribe(() => {
        this.overlayRef?.dispose();
        this.overlayRef = null;
        stop$.next();
      });
    });
  }

  public showSkillDescription(skill: SkillData): void {
    const stop$= new Subject<void>();

    const descSkillComponent = this.initPortal(DescSkillComponent);
    descSkillComponent.skill = skill;

    descSkillComponent.onClosed.pipe(takeUntil(stop$)).subscribe(() => {
      this.overlayRef?.dispose();
      this.overlayRef = null;
      stop$.next();
    });

    descSkillComponent.onEffectClicked.pipe(takeUntil(stop$)).subscribe((effectId) => {
      this.showEffectDescription(effectId);
      stop$.next();
    });
  }
}
