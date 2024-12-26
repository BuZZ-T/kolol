import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { Observable } from 'rxjs';
import { of, switchMap } from 'rxjs';

import type { ShopData, ShopItemData } from './shop.types';
import { ActionService } from '../action/action.service';
import { DescriptionPopupService } from '../description-popup.service';
import { ShopParserService } from '../parser/shop-parser.service';

@Component({
  selector: 'kolol-shop',
  styleUrls: [ './shop.component.scss' ],
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  #shopParserService = inject(ShopParserService);
  #route = inject(ActivatedRoute);
  #actionService = inject(ActionService);
  #descriptionPopupService = inject(DescriptionPopupService);

  public shopData$: Observable<ShopData | undefined> = of(undefined);

  public constructor(
  ) {
    //
  }

  public ngOnInit(): void {
    this.shopData$ = this.#route.paramMap.pipe(
      switchMap((params) => {
        const shopId = params.get('shop') || '';
        return this.#shopParserService.shop(shopId);
      }),
    );
  }

  public buyItem(shopItem: ShopItemData['buy'], pwd: string): void {
    const { row, shop, quantity } = shopItem;
    this.#actionService.buyItem({ pwd, quantity, row, shop });
  }

  public openDescription(itemId: string): void {
    this.#descriptionPopupService.showItemDescription(itemId);
  }
}
