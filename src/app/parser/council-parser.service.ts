import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractParserService } from './abstract-parser.service';
import { LoginService } from '../login/login.service';
import { Council } from '../main/council/council.types';
import { RoutingService } from '../routing/routing.service';

@Injectable({
  providedIn: 'root',
})
export class CouncilParserService extends AbstractParserService<Council> {
  public constructor(
    httpClient: HttpClient,
    loginService: LoginService,
    routingService: RoutingService,
  ) {
    super(httpClient, loginService, routingService);
  }

  protected override map({ doc }: { doc: Document; pwd: string; }): Council {

    const text = Array.from(doc.querySelectorAll('p')).map(e => e.textContent).join(' ');

    return {
      text,
    };
  }

  public council(): Observable<Council | null> {
    return this.parseToSubject('council.php');
  }
}
