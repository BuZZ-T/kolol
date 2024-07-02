import type { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import type { ActivatedRoute } from '@angular/router';
import type { Observable } from 'rxjs';
import { of, switchMap } from 'rxjs';

import type { ShopData, ShopItemData } from './shop.types';
import type { ActionService } from '../action/action.service';
import type { ShopParserService } from '../parser/shop-parser.service';

@Component({
  selector: 'kolol-shop',
  styleUrls: [ './shop.component.scss' ],
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {

  public shopData$: Observable<ShopData | undefined> = of(undefined);

  public constructor(
    private shopParserService: ShopParserService,
    private route: ActivatedRoute,
    private actionService: ActionService,
  ) {
    //
  }

  public ngOnInit(): void {
    this.shopData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const shopId = params.get('shop') || '';
        return this.shopParserService.shop(shopId);
      }),
    );
  }

  public buyItem(shopItem: ShopItemData['buy'], pwd: string): void {
    const { row, shop, quantity } = shopItem;
    this.actionService.buyItem({ pwd, quantity, row, shop });
  }
}
