import { Injectable, inject } from '@angular/core';
import { takeUntil } from 'rxjs';
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

  #showOutfit(outfitId: string): void {
    this.#descriptionParserService.outfit(outfitId).subscribe((outfitDescription) => {

      const descOutfitComponentInstance = this.initPortal(DescOutfitComponent);
      descOutfitComponentInstance.outfit = outfitDescription;

      const closeSubscription = descOutfitComponentInstance.onClosed.subscribe(() => {
        console.log('outfit closed');
        this.close();
        closeSubscription?.unsubscribe();
      });
    });
  }

  public showEffectDescription(effectId: string): void {
    this.#descriptionParserService.effect(effectId).subscribe((effectDescription) => {
      const descSkillEffectInstance = this.initPortal(DescSkillEffectComponent);
      descSkillEffectInstance.skillEffectDescriptionData = effectDescription;
    });
  }

  public showItemDescription(itemId: string): void {
    this.#descriptionParserService.itemDescription(itemId).subscribe((itemDescription) => {
      const descItemInstance = this.initPortal(DescItemComponent);
      descItemInstance.itemDescription = itemDescription;
    
      descItemInstance.onClosed.pipe(takeUntil(this.stop$)).subscribe(() => {
        this.close();
        this.stop$.next();
      });
    
      descItemInstance.onOutfitClicked.pipe(takeUntil(this.stop$)).subscribe((outfitId) => {
        this.#showOutfit(outfitId);
        this.stop$.next();
      });
    
      descItemInstance.onEffectClicked.pipe(takeUntil(this.stop$)).subscribe((effectId) => {
        this.showEffectDescription(effectId);
        this.stop$.next();
      });
    });
  }

  public showFamiliarDescription(familiarId: string): void {
    this.#descriptionParserService.familiar(familiarId).pipe(takeUntil(this.stop$)).subscribe((familiarDescription) => {
      const descFamiliarComponentInstance = this.initPortal(DescFamiliarComponent);
      descFamiliarComponentInstance.familiar = familiarDescription;
    });
  }

  public showSkillDescription(skill: SkillData): void {
    const descSkillComponent = this.initPortal(DescSkillComponent);
    descSkillComponent.skill = skill;

    descSkillComponent.onClosed.pipe(takeUntil(this.stop$)).subscribe(() => {
      this.close();
      this.stop$.next();
    });

    descSkillComponent.onEffectClicked.pipe(takeUntil(this.stop$)).subscribe((effectId) => {
      this.showEffectDescription(effectId);
      this.stop$.next();
    });
  }
}
