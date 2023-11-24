import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { DescItemComponent } from './desc-item/desc-item.component';
import { Equipment, InventoryDataWithPwd } from './inventory.types';
import { ActionService } from '../../action/action.service';
import { ParseApiService } from '../../api/parse-api.service';
import { DescriptionPopupService } from '../../description-popup.service';
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

  private overlayRef: OverlayRef | null = null;
  private descItemInstance: DescItemComponent | undefined;

  public constructor(
    private parseApiService: ParseApiService,
    private actionService: ActionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private descriptionParserService: DescriptionParserService,
    private overlay: Overlay,
    private popupService: DescriptionPopupService,
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
    this.popupService.showItemDescription(itemId);
  }
}
