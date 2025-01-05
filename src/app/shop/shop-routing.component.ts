import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import type { Observable } from 'rxjs';
import { of, switchMap } from 'rxjs';

import type { ShopData } from './shop.types';
import { ShopParserService } from '../parser/shop-parser.service';

@Component({
  templateUrl: './shop-routing.component.html',
})
export class ShopRoutingComponent implements OnInit {
  #shopParserService = inject(ShopParserService);
  #route = inject(ActivatedRoute);

  public shopData$: Observable<ShopData | undefined> = of(undefined);

  public ngOnInit(): void {
    this.shopData$ = this.#route.paramMap.pipe(
      switchMap((params) => {
        const shopId = params.get('shop') || '';
        return this.#shopParserService.shop(shopId);
      }),
    );
  }

}
