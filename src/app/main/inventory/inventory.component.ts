import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UseMultiService } from './use-multi/use-multi.service';
import type { Equipment } from '../../../shared/inventory.types';
import { ActionService } from '../../action/action.service';
import { ParseApiService } from '../../api/parse-api.service';
import { DescriptionPopupService } from '../../description-popup.service';

type Section = 'consumables' | 'equipment' | 'miscellaneous';

@Component({
  selector: 'kolol-inventory',
  styleUrls: [ './inventory.component.scss' ],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent implements OnInit {
  #parseApiService = inject(ParseApiService);
  #actionService = inject(ActionService);
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #popupService = inject(DescriptionPopupService);
  #useMultiService = inject(UseMultiService);

  public inventory$ = this.#parseApiService.inventory();
  public sectionName: Section = 'consumables';

  public ngOnInit(): void {
    this.#activatedRoute.params.subscribe((params) => {
      const section = params['section'];

      if ([ 'consumables', 'equipment',  'miscellaneous' ].includes(section)) {
        this.sectionName = section;
      }
    });
  }
  
  private consume(itemId: string | undefined, action: string, pwd: string): void {
    console.log('consume: ', itemId);
    if (itemId) {
      this.#actionService.useItem({ action, itemId, pwd, which: 1 });
    }
  }

  private equip(itemId: string | undefined, pwd: string): void {
    console.log('equip: ', itemId);
    if (itemId) {
      this.#actionService.equipItem({ isOffhand: false, itemId, pwd, which: 2 });
    }
  }

  private useMisc(itemId: string | undefined, pwd: string): void {
    if (itemId) {
      this.#actionService.useItem({ action: 'use', itemId, pwd, which: 3 });
    }
  }

  public use({ action, id }: {action: string, id: string | undefined}, pwd: string): void {
    switch(this.sectionName) {
    case 'consumables':
      this.consume(id, action, pwd);
      break;
    case 'equipment':
      this.equip(id, pwd);
      break;
    case 'miscellaneous':
      this.useMisc(id, pwd);
      break;
    }
  }

  public altUse({ action, element, itemId, quantity }: {action: string | undefined; element: HTMLElement | undefined, itemId: string | undefined, quantity: string | undefined}, pwd: string): void {
    switch(this.sectionName) {
    case 'consumables':
      this.#useMultiService.show({ action, element, itemId, pwd, quantity: parseInt(quantity || '0', 10), which: 1 });
      break;
    case 'equipment':
      // this.actionService.equipItem({ isOffhand: true, itemId, pwd, which: 2 });
      break;
    case 'miscellaneous':
      this.#useMultiService.show({ action, element, itemId, pwd, quantity: parseInt(quantity || '0', 10), which: 3 });
      break;
    }
  }

  public onSelect(section: Section): void {
    if (this.sectionName !== section) {
      this.#router.navigate([ 'kol', 'inventory', section ]);
    }
  }

  public onUnequip(equipmentSection: keyof Equipment | 'acc1' | 'acc2' | 'acc3', pwd: string): void {
    this.#actionService.unequipItem({ equipmentSection, pwd });
  }

  public onDescItem(itemId: string): void {
    this.#popupService.showItemDescription(itemId);
  }
}
