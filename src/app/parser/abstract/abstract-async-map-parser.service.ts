import type { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs';
import { handleNoSession, handleRedirect } from 'src/app/utils/http.utils';

import { AbstractParserService } from './abstract-parser.service';
import { mapHtmlToDocAndPwd, switchMapToGet } from '../utils/parser.operators';
import { handleError } from '../utils/parser.utils';

export abstract class AbstractAsyncMapParserService<T> extends AbstractParserService<T> {
  protected abstract mapAsync({ doc }: { doc: Document; pwd: string; }): Observable<T>;

  protected override map(_x: never): T {
    throw new Error('Use mapAsync for this service');
  }

  protected override parsePage(path: string, params?: Record<string, string>): Observable<T | null> {
    return this.loginService.session$.pipe(
      handleNoSession(this.routingService),
      switchMapToGet(this.httpClient, path, params),
      handleRedirect(this.routingService),
      map(event => event.body || ''),
      mapHtmlToDocAndPwd(),
      switchMap(({ doc, pwd }) => this.mapAsync({ doc, pwd })),
      catchError(handleError),
    );
  }
}
