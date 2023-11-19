import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';

import { DescItemComponent } from './desc-item/desc-item.component';
import { DescOutfitComponent } from './desc-outfit/desc-outfit.component';
import { DescSkillEffectComponent } from './desc-skill-effect/desc-skill-effect.component';
import { Equipment, InventoryDataWithPwd, ItemDescriptionData } from './inventory.types';
import { ActionService } from '../../action/action.service';
import { ParseApiService } from '../../api/parse-api.service';
import { DescriptionParserService } from '../../parser/description-parser.service';

type Section = 'consumables' | 'equipment' | 'miscellaneous';

@Component({
  selector: 'kolol-inventory',
  styleUrls: [ './inventory.component.scss' ],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {

  public inventory$: Observable<InventoryDataWithPwd | null> = of(null);
  public sectionName: Section = 'consumables';

  private portal!: ComponentPortal<DescItemComponent>;
  private outfitPortal!: ComponentPortal<DescOutfitComponent>;
  private skillEffectPortal!: ComponentPortal<DescSkillEffectComponent>;

  private overlayRef: OverlayRef | null = null;
  private descItemInstance: DescItemComponent | undefined;

  public constructor(
    private parseApiService: ParseApiService,
    private actionService: ActionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private descriptionParserService: DescriptionParserService,
    private overlay: Overlay,
  ) {
    this.inventory$ = this.parseApiService.inventory();
  }

  public ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const section = params['section'];

      if ([ 'consumables', 'equipment',  'miscellaneous' ].includes(section)) {
        this.sectionName = section;
      }
    });
  }

  public showOutfit(outfitId: string): void {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        height: '100%',
        width: '100%',
      });
    }
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
    
    this.descriptionParserService.outfit(outfitId).subscribe((outfitDescription) => {
      if (outfitDescription) {
        console.log({ outfitDescription });
        this.outfitPortal = new ComponentPortal(DescOutfitComponent);
        if (this.overlayRef) {
          const componentRef = this.overlayRef.attach(this.outfitPortal);
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

  public showSkillEffect(effectId: string): void {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        height: '100%',
        width: '100%',
      });
    }
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }

    this.descriptionParserService.effect(effectId).subscribe((effectDescription) => {
      if (effectDescription) {
        console.log({ effectDescription });
        this.skillEffectPortal = new ComponentPortal(DescSkillEffectComponent);

        if (this.overlayRef) {
          const componentRef = this.overlayRef.attach(this.skillEffectPortal);
          const descSkillEffectInstance = componentRef.instance;
          descSkillEffectInstance.skillEffectDescriptionData = effectDescription;
        }
      }
    });
  }
  
  public showDescItem(itemDescription: ItemDescriptionData): void {
    if (this.overlayRef) {
      console.log('prevented');

      return;
    }
    this.portal = new ComponentPortal(DescItemComponent);
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      height: '100%',
      width: '100%',
    });
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef?.dispose();
      this.overlayRef = null;
    });
    const componentRef = this.overlayRef.attach(this.portal);
    this.descItemInstance = componentRef.instance;

    if (this.descItemInstance) {
      this.descItemInstance.itemDescription = itemDescription;
      let closeSubscription: Subscription | null = null;

      const showOutfitSubscription = this.descItemInstance.onOutfitClicked.subscribe((outfitId) => {
        this.showOutfit(outfitId);
        showOutfitSubscription.unsubscribe();
        closeSubscription?.unsubscribe();
      });

      const showEffectSubscription = this.descItemInstance.onEffectClicked.subscribe((effectId) => {
        console.log('effectId: ', effectId);
        this.showSkillEffect(effectId);
        showEffectSubscription.unsubscribe();
        closeSubscription?.unsubscribe();
      });

      closeSubscription = this.descItemInstance.onClosed.subscribe(() => {
        this.overlayRef?.dispose();
        this.overlayRef = null;
        closeSubscription?.unsubscribe();
        showOutfitSubscription.unsubscribe();
      });

    }
  }

  private consume(itemId: string, pwd: string): void {
    console.log('consume: ', itemId);
    this.actionService.useItem({ itemId, pwd, which: 1 });
  }

  private equip(itemId: string, pwd: string): void {
    console.log('equip: ', itemId);
    this.actionService.equipItem({ isOffhand: false, itemId, pwd, which: 2 });
  }

  private useMisc(itemId: string, pwd: string): void {
    this.actionService.useItem({ itemId, pwd, which: 3 });
  }

  public use(itemId: string, pwd: string): void {
    console.log('use: ', itemId);
    switch(this.sectionName) {
    case 'consumables':
      this.consume(itemId, pwd);
      break;
    case 'equipment':
      this.equip(itemId, pwd);
      break;
    case 'miscellaneous':
      this.useMisc(itemId, pwd);
      break;
    }
  }

  public altUse(itemId: string, pwd: string): void {
    console.log('altUse: ', itemId);
    this.actionService.equipItem({ isOffhand: true, itemId, pwd, which: 2 });
  }

  public onSelect(section: Section): void {
    if (this.sectionName !== section) {
      this.router.navigate([ 'kol', 'inventory', section ]);
    }
  }

  public onUnequip(equipmentSection: keyof Equipment | 'acc1' | 'acc2' | 'acc3', pwd: string): void {
    this.actionService.unequipItem({ equipmentSection, pwd });
  }

  public onDescItem(itemId: string): void {
    this.descriptionParserService.itemDescription(itemId).subscribe((itemDescription) => {
      if (itemDescription) {
        this.showDescItem(itemDescription);
      }
    });
  }
}
