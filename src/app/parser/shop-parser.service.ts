import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { ParserService } from './parser.service';
import { ShopData, ShopItemData } from '../shop/shop.types';

@Injectable({
  providedIn: 'root',
})
export class ShopParserService {

  private shopDataSubject$ = new BehaviorSubject<ShopData | null>(null);

  public constructor(private parserService: ParserService) { }

  /**
   * TODO: Shop item categories
   */
  private parse(shopId: string): Observable<ShopData> {
    return this.parserService.parse(`shop.php?whichshop=${shopId}`).pipe(
      map(({ doc, pwd }) => {

        const bs = doc.querySelectorAll('b');

        const title = bs[0]?.innerHTML ?? '';
        const name = bs[1]?.innerHTML ?? '';
        const image = doc.querySelector('img')?.getAttribute('src') ?? '';
        const text = doc.querySelector('p')?.innerHTML ?? '';
        
        const itemElements = doc.querySelectorAll('tr[rel]');

        const backElement = Array.from(doc.querySelectorAll('a')).at(-1);
        const back = {
          text: backElement?.innerHTML || '',
          url: backElement?.getAttribute('href') || '',
        };

        const items = Array.from(itemElements).map(element => {
          const elementImage = element.querySelector('img')?.getAttribute('src') || '';
          
          const elementBs = element.querySelectorAll('b');
          const elementName = elementBs?.[0]?.innerHTML;
          const cost = elementBs?.[1]?.innerHTML;

          const disabled = element.querySelector('input')?.classList.contains('disabled') ?? false;

          const buyUrlString = element.querySelector('input')?.getAttribute('rel') || '';
          const buyUrl = new URL(buyUrlString, 'https://example.com');
          const buy = {
            action: 'buyitem', // buyUrl.searchParams.get('action'),
            quantity: buyUrl.searchParams.get('quantity') || '',
            row: buyUrl.searchParams.get('whichrow') || '',
            whichshop: shopId,
          } as const;

          const shopItem: ShopItemData = {
            buy,
            cost,
            disabled,
            image: elementImage,
            name: elementName,
          };

          return shopItem;
        });

        const shopData: ShopData = {
          back,
          image,
          items,
          name,
          pwd,
          text,
          title,
        };
  
        return shopData;
      }));
  }

  public shop(shopId: string): Observable<ShopData | null> {
    this.parse(shopId).subscribe(shopData => {
      this.shopDataSubject$.next(shopData);
    });

    return this.shopDataSubject$.asObservable();
  }
}
