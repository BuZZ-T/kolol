import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

import { ShopData, ShopItemData } from './shop.types';
import { ActionService } from '../action/action.service';
import { ShopParserService } from '../parser/shop-parser.service';

@Component({
  selector: 'kolol-shop',
  styleUrls: [ './shop.component.scss' ],
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {

  public shopData$: Observable<ShopData | null> = of(null);

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
    const { row, whichshop, quantity } = shopItem;
    this.actionService.buyItem({ pwd, quantity, row, whichshop });
  }
}
