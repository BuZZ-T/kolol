import { Injectable } from '@angular/core';

import { ParserService } from './parser.service';

@Injectable({
  providedIn: 'root',
})
export class MapParserService {

  public constructor(private parserService: ParserService) {
    this.parse();
  }

  private parse(): void {
    // TODO:
    this.parserService.parse('main.php').subscribe(() => {
      console.log('main.php parsed');
    });
  }
}
