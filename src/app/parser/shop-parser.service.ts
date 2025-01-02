import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import { AbstractMultiCacheParserService } from './abstract/abstract-multi-cache-parser.service';
import type { ShopData, ShopItemData, ShopSeparatorData } from '../shop/shop.types';

@Injectable({
  providedIn: 'root',
})
/**
   * TODO: Shop item categories
   */
export class ShopParserService extends AbstractMultiCacheParserService<ShopData> {

  private shopId = '';

  protected map({ doc, pwd }: {doc: Document, pwd: string}): ShopData {
    const bs = doc.querySelectorAll('b');

    const title = bs[0]?.innerHTML ?? '';
    const name = bs[1]?.innerHTML ?? '';
    const image = doc.querySelector('img')?.getAttribute('src') ?? '';
    const text = doc.querySelector('p')?.innerHTML ?? '';
    
    const backElement = Array.from(doc.querySelectorAll('a')).at(-1);
    const back = {
      text: backElement?.innerHTML || '',
      url: backElement?.getAttribute('href') || '',
    };

    const itemsOrSeparatorElements = Array.from(doc.querySelectorAll('form tr')).filter(element => element.getAttribute('rel') !== null || element.textContent?.includes('—'));

    const items = Array.from(itemsOrSeparatorElements).map(element => {

      const textContent = element.textContent || '';
      if (textContent.includes('—')) {
        const separator: ShopSeparatorData = {
          text: textContent.replaceAll('—', '').trim(),
          type: 'separator',
        };
        return separator;
      }

      const elementImage = element.querySelector('img')?.getAttribute('src') || '';
      
      const elementBs = element.querySelectorAll('b');
      const elementName = elementBs?.[0]?.innerHTML;
      const cost = elementBs?.[1]?.innerHTML;

      const descriptionId = element.querySelector('a')?.getAttribute('onclick')?.match(/\((.*)\)/)?.[1] || '';

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
        descriptionId,
        disabled,
        image: elementImage,
        name: elementName,
        type: 'item',
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
