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

  #elementToFamilar(element: Element): Familiar {
    const imageElement = element.querySelector('img');
    
    const idString = imageElement?.getAttribute('onclick') || '';
    const id = idString.substring(4, idString.length - 1);

    const imageUrl = imageElement?.getAttribute('src') || '';
    const name = element.querySelector('b')?.textContent || '';
    const stats = Array.from(element.querySelectorAll('td')[2].childNodes).find(e => e.nodeName === '#text')?.textContent || '';

    return {
      id,
      imageUrl,
      name,
      stats,
    };
  }

  protected override map({ doc }: { doc: Document; pwd: string; }): Familiars {
    console.log('fam map: ', doc);

    const box = new BoxesExtractor(doc).getBoxByTitle('Manage your Familiar:');
    const content = box?.getContent()[0];

    const current = content ? this.#elementToFamilar(content) : { id: '', imageUrl: '', name: '', stats: '' };

    const familiars: Familiar[] = Array.from(doc.querySelectorAll('.frow')).map(famElement => {
      return this.#elementToFamilar(famElement);
    });

    return {
      current,
      familiars,
    };
  }

  public familiars(): Observable<Familiars | null> {
    return this.parsePageToSubject('familiar.php');
  }
}
