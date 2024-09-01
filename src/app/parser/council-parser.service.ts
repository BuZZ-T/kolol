import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import { AbstractParserService } from './abstract/abstract-parser.service';
import type { Council } from '../main/council/council.types';

@Injectable({
  providedIn: 'root',
})
export class CouncilParserService extends AbstractParserService<Council> {
  protected override map({ doc }: { doc: Document; pwd: string; }): Council {

    const text = Array.from(doc.querySelectorAll('p')).map(e => e.textContent).join(' ');

    return {
      text,
    };
  }

  public council(): Observable<Council | null> {
    return this.parsePageToSubject('council.php');
  }
}
