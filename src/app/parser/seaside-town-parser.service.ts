import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

import { ParserService } from './parser.service';
import { SeasideTown } from '../main/seaside-town/seaside-town.types';

@Injectable({
  providedIn: 'root',
})
export class SeasideTownParserService {

  public town$: Observable<SeasideTown | null> = of(null);

  public constructor(private parserService: ParserService) { 
    this.town$ = this.parse();
    //
  }

  private parse(): Observable<SeasideTown> {
    return this.parserService.parse('place.php?whichplace=town').pipe(
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
