import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { AbstractMultiCacheParserService } from './abstract/abstract-multi-cache-parser.service';
import type { Place } from '../place/place.types';

@Injectable({
  providedIn: 'root',
})
export class PlaceParserService extends AbstractMultiCacheParserService<Place> {

  private placesSubject = new BehaviorSubject<Record<string, Place | undefined>>({});
  private places$ = this.placesSubject.asObservable();

  protected override map({ doc }: { doc: Document; pwd: string; }): Place {
    const container = doc.querySelector('#background');
  
    const placeName = doc.querySelector('b')?.innerHTML || '';
  
    const backUrlAnchor = Array.from(doc.querySelectorAll('a')).at(-1);
    const backText = backUrlAnchor?.innerHTML || '';
    const backUrl = backText.startsWith('Back to') ?  backUrlAnchor?.getAttribute('href') ?? '' : '';
    
    const background = container?.querySelector('#place_bg');
    const backgroundImage = background?.getAttribute('src') || '';
    const backgroundWidth = background?.getAttribute('width') || '';
    const backgroundHeight = background?.getAttribute('height') || '';
  
    const elements = Array.from(doc?.querySelectorAll('.element')).map(element => {
      const url = element.querySelector('a')?.getAttribute('href') || '';
      const imageElement = element.querySelector('img');
      const image = imageElement?.getAttribute('src') || '';
      const name = imageElement?.getAttribute('title') || '';
  
      return {
        image,
        name,
        style: {
          height: (element as HTMLElement).style.height,
          left: (element as HTMLElement).style.left,
          top: (element as HTMLElement).style.top,
          width: (element as HTMLElement).style.width,
        },
        url,
      };
    });
  
    return {
      back: {
        text: backText,
        url: backUrl,
      },
      background: {
        height: backgroundHeight,
        image: backgroundImage,
        width: backgroundWidth,
      },
      elements,
      name: placeName,
    };
  }

  public place(placeName: string): Observable<Place | undefined> {
    const path = `place.php?whichplace=${placeName}`;

    return this.parseMulti(placeName, path);
  }
}
