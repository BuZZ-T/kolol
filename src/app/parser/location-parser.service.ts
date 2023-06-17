import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ParserService } from './parser.service';
import { Location } from '../location/location.types';

@Injectable({
  providedIn: 'root',
})
export class LocationParserService {

  public constructor(private parserService: ParserService) { 
    //    
  }

  // /**
  //  * Already handle known redirect paths from <path>.php to place.php?whichplace=<path>
  //  */
  // private redirects(path: string): string {
  //   const pathWithExtension = path.endsWith('.php') ? path : `${path}.php`;

  //   const redirectPaths: Record<string, string> = {
  //     'town.php': 'place.php?whichplace=town',
  //   };

  //   return redirectPaths[pathWithExtension] || pathWithExtension;
  // }

  public parse(path: string): Observable<Location> {
    return this.parserService.parse(path).pipe(
      map(({ doc }) => {
        const container = doc.querySelector('#background');

        const background = container?.querySelector('#place_bg')?.getAttribute('src') || '';
        const elements = Array.from(doc?.querySelectorAll('.element')).map(element => {
          const url = element.querySelector('a')?.getAttribute('href') || '';
          const imageElement = element.querySelector('img');
          const image = imageElement?.getAttribute('src') || '';
          const name = imageElement?.getAttribute('title') || '';

          return {
            image,
            name,
            position: {
              left: (element as HTMLElement).style.left,
              top: (element as HTMLElement).style.top,
            },
            url,
          };
        });

        return {
          background,
          elements,
        };
      }),
    );
  }
}
