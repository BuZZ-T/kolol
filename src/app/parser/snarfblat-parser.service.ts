import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { ParserService, Path } from './parser.service';

@Injectable({
  providedIn: 'root',
})
export class SnarfblatParserService {

  public constructor(private parserService: ParserService) {
    //
  }

  public parse(snarfblat: number): Observable<Document> {
    const url: Path = `/adventure.php?snarfblat=${snarfblat}`;

    // TODO
    const httpString$ = this.parserService.parse(url);

    return httpString$.pipe(
      tap(() => {
        console.log('fetch snarfblat');
      }),
      tap(http => {
        console.log('http: ', http);
      }),
    );
  }
}
