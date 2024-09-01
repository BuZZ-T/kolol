import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import { AbstractMultiParserService } from './abstract/abstract-multi-parser.service';
import type { ShopData, ShopItemData } from '../shop/shop.types';

@Injectable({
  providedIn: 'root',
})
/**
   * TODO: Shop item categories
   */
export class ShopParserService extends AbstractMultiParserService<ShopData> {

  private shopId = '';

  protected map({ doc, pwd }: {doc: Document, pwd: string}): ShopData {
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
        shop: this.shopId,
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

  }

  public shop(shopId: string): Observable<ShopData | undefined> {
    this.shopId = shopId;
    const path = `shop.php?whichshop=${shopId}`;
    
    return this.parseMulti(shopId, path);
  }
}
