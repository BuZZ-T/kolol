import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { BoxesExtractor } from './extractors/BoxesExtractor';
import { Familiar, Familiars } from '../familiar/familiar.types';
import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';

@Injectable({
  providedIn: 'root',
})
export class FamiliarParserService extends AbstractParserService<Familiars> {

  public constructor(httpClient: HttpClient, loginService: LoginService, routingService: RoutingService) {
    super(httpClient, loginService, routingService);
  }

  protected override map({ doc }: { doc: Document; pwd: string; }): Familiars {
    console.log('fam map: ', doc);

    const box = new BoxesExtractor(doc).getBoxByTitle('Manage your Familiar:');
    const content = box?.getContent()[0];

    const imageUrl = content?.querySelector('img')?.getAttribute('src') || '';
    const name = content?.querySelector('b')?.textContent || '';
    const stats = Array.from(content?.querySelector('b')?.parentNode?.childNodes || []).filter(e => e.nodeName === '#text')[1].textContent || '';

    const familiars: Familiar[] = Array.from(doc.querySelectorAll('.frow')).map(famElement => {
      const imageUrl = famElement.querySelector('img')?.getAttribute('src') || '';
      const name = famElement.querySelector('b')?.textContent || '';
      const stats = Array.from(famElement.querySelectorAll('td')[2].childNodes).find(e => e.nodeName === '#text')?.textContent || '';

      return {
        imageUrl,
        name,
        stats,
      };
    });

    return {
      current: {
        imageUrl,
        name,
        stats,
      },
      familiars,
    };
  }

  public familiars(): Observable<Familiars | null> {
    return this.parsePageToSubject('familiar.php');
  }
}
