import { Component, inject, Input } from '@angular/core';

import type { ShopData, ShopItemData } from './shop.types';
import { ActionService } from '../action/action.service';
import { DescriptionPopupService } from '../description-popup.service';

@Component({
  selector: 'kolol-shop',
  styleUrl: './shop.component.scss',
  templateUrl: './shop.component.html',
})
export class ShopComponent {

  #actionService = inject(ActionService);
  #descriptionPopupService = inject(DescriptionPopupService);
    
    @Input({ required: true })
  public shopData!: ShopData;

    public openDescription(itemId: string): void {
      this.#descriptionPopupService.showItemDescription(itemId);
    }

    public buyItem(shopItem: ShopItemData['buy'], pwd: string): void {
      const { row, shop, quantity } = shopItem;
      this.#actionService.buyItem({ pwd, quantity, row, shop });
    }
}
