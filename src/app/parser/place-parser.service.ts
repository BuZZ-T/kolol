import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, withLatestFrom } from 'rxjs';

import { ParserService } from './parser.service';
import { Place } from '../place/place.types';

@Injectable({
  providedIn: 'root',
})
export class PlaceParserService {

  private placesSubject = new BehaviorSubject<Record<string, Place>>({});

  public constructor(private parserService: ParserService) { 
    //    
  }

  public place(placeName: string): Observable<Place> {
    const path = `place.php?whichplace=${placeName}`;
    
    this.parse(path).pipe(
      withLatestFrom(this.placesSubject),
      map(([ place, places ]) => ({
        ...places,
        [placeName]: place,
      })),
    ).subscribe(places => {
      this.placesSubject.next(places);
    });

    return this.placesSubject.asObservable().pipe(
      map(places => places[placeName]),
    );
  }

  public parse(path: string): Observable<Place> {
    return this.parserService.parse(path).pipe(
      map(({ doc }) => {
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
      }),
    );
  }
}
