import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { BoxesExtractor } from './extractors/BoxesExtractor';
import { ExtendedFamiliar, Familiar, Familiars } from '../familiar/familiar.types';
import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';

@Injectable({
  providedIn: 'root',
})
export class FamiliarParserService extends AbstractParserService<Familiars> {

  public constructor(httpClient: HttpClient, loginService: LoginService, routingService: RoutingService) {
    super(httpClient, loginService, routingService);
  }

  #elementToFamilar(element: Element, isCurrent: boolean): Familiar {
    const imageElement = element.querySelector('img');
    
    const idString = imageElement?.getAttribute('onclick') || '';
    const id = idString.substring(4, idString.length - 1);

    const imageUrl = imageElement?.getAttribute('src') || '';
    const name = element.querySelector('b')?.textContent || '';
    const stats = isCurrent 
      ? Array.from(imageElement?.parentElement?.childNodes || []).filter(e => e.nodeName === '#text')[1]?.textContent || ''
      : Array.from(element.querySelectorAll('td')[2]?.childNodes || []).find(e => e.nodeName === '#text')?.textContent || '';

    return {
      id,
      imageUrl,
      name,
      stats,
    };
  }

  #elementToExtendedFamilar(element: Element): ExtendedFamiliar {
    const familiar = this.#elementToFamilar(element, false);
    const attributeNames = element.getAttributeNames();

    const qualities = attributeNames.filter(attr => attr.startsWith('data-')).map(attr => attr.replace('data-', ''));

    return {
      ...familiar,
      qualities,
    };
  }

  public update(): void {
    //
  }

  protected override map({ doc }: { doc: Document; pwd: string; }): Familiars {
    const box = new BoxesExtractor(doc).getBoxByTitle('Manage your Familiar:');
    const content = box?.getContent()[0];

    const text = box?.getText();
    const hasCurrentFamiliar = !text?.includes('You do not currently have a familiar.');

    const current = hasCurrentFamiliar && content ? this.#elementToFamilar(content, true) : undefined;

    const famListElement = content?.querySelector('.famlist');
    const familiarElements = Array.from(famListElement?.children[0].children || []);

    const favoriteSeparator = famListElement?.querySelector('tr:not(.frow)');
    const favoriteSeparatorPosition = familiarElements.indexOf(favoriteSeparator as Element);

    const favoriteFamiliars = familiarElements.slice(0, favoriteSeparatorPosition).map(famElement => 
      this.#elementToExtendedFamilar(famElement),
    );

    const familiars = familiarElements.slice(favoriteSeparatorPosition + 1).map(famElement =>
      this.#elementToExtendedFamilar(famElement),
    );

    return {
      current,
      familiars,
      favoriteFamiliars,
    };
  }

  public familiars(): Observable<Familiars | null> {
    return this.parsePageToSubject('familiar.php');
  }
}
