import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject, map, switchMap } from 'rxjs';

import { AbstractParserService } from './abstract/abstract-parser.service';

// TODO: move to .types file
export type CharPaneData = {
  avatar: string;
  familiar: {
    image: string;
    name: string;
    progress: {
      current: number;
      max: number;
    }
    type: string;
    weight: string;
  };
};

const emptyCharPaneData: CharPaneData = {
  avatar: '',
  familiar: {
    image: '',
    name: '',
    progress: {
      current: 0,
      max: 0,
    },
    type: '',
    weight: '',
  },
};

@Injectable({
  providedIn: 'root',
})
/**
 * Currently only used for picking the player avatar
 */
export class CharpaneParserService extends AbstractParserService<CharPaneData> {
  private tickSubject$ = new BehaviorSubject<void>(undefined);
  
  public update(): void {
    this.tickSubject$.next();
  }

  public charPane(): Observable<CharPaneData> {

    return this.tickSubject$.asObservable().pipe(
      switchMap(() => this.parsePageToSubject('charpane.php')),
      map((avatar) => avatar || emptyCharPaneData),
    );
  }

  protected map({ doc }: { doc: Document; pwd: string; }): CharPaneData {
    const tableFields = doc.querySelectorAll('td');

    const avatar = tableFields?.[0]?.querySelector('img')?.getAttribute('src') || '';

    const familiarHeadlineIndex = Array.from(tableFields).findIndex(td => td.textContent === 'Familiar:');
    const image = tableFields?.[familiarHeadlineIndex + 1]?.querySelector('img')?.getAttribute('src') || '';
    
    const contentElement = tableFields[familiarHeadlineIndex + 2];
    const [ name, weight ] = Array.from(contentElement.querySelectorAll('b')).map(e => e.textContent || '');
    const type = Array.from(contentElement.childNodes[1].childNodes).find(e => e.nodeType === Node.TEXT_NODE && e.textContent?.startsWith(' pound'))?.textContent || '';

    // "1 / 4"
    const progress = contentElement.querySelector('table')?.getAttribute('title') || '/';
    const [ current, max ] = progress.split(' / ').map(Number);
    
    return {
      avatar, 
      familiar: { 
        image,
        name,
        progress: {
          current,
          max,
        },
        type: type.replace(/pound/, '').trim(), 
        weight,
      },
    };
  }
}
