import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Session } from 'src/app/login/login.service';
import { getHttpHeaders } from 'src/app/utils/http.utils';
import { environment } from 'src/environments/environment';

import type { Adventure } from '../../adventure/adventure.types';
import type { Notice } from '../../notice/notice.types';
import { AdventureExtractor } from '../extractors/AdventureExtractor';

export const mapDocToAdventure = () => (source: Observable<{doc: Document, pwd: string}>): Observable<Adventure | null> => 
  source.pipe(
    map(({ doc }) => {
      const adventureExtractor = new AdventureExtractor(doc);
    
      if (adventureExtractor.hasFight()) {
        return adventureExtractor.getFight();
      } else if (adventureExtractor.hasNonFight()) {
        return adventureExtractor.getNonFight();

      // } else if (header === 'Results:') {
      //   // TODO: Handle result
      } else if(adventureExtractor.hasChoice()) {
        return adventureExtractor.getChoice();
        
        // } else {
        //   return mapDocToAnswer(doc);
      } else if (adventureExtractor.hasAdventureError()) {
        return adventureExtractor.getAdventureError();
      }

      console.log('mapDocToAdventure null', doc);
      return null;
    }));

export const mapDocToNotice = () => (source: Observable<{doc: Document, pwd: string}>): Observable<Notice | null> =>
  source.pipe(
    map(({ doc }) => {
      const adventureExtractor = new AdventureExtractor(doc);

      if(adventureExtractor.hasChoice()) {
        return adventureExtractor.getChoice();
      }

      return adventureExtractor.getAnswer();
    }));

export const mapHtmlToDocAndPwd = () => (source: Observable<string>): Observable<{doc: Document, pwd: string}> =>
  source.pipe(
    map(html => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const pwd = html.match(/pwd=([^"']*)/)?.[1] ?? '';

      return { doc, pwd };
    }),
  );

export const switchMapToGet = (httpClient: HttpClient, path: string, params: Record<string, string> | undefined) => (source: Observable<Session>): Observable<HttpResponse<string>> =>
  source.pipe(
    switchMap(session => {
      const headers = getHttpHeaders(session);
        
      const searchParams = Object.entries(params || {})?.reduce((acc, [ key, value ]) => {
        acc.append(key, value);
      
        return acc;
      }, new URLSearchParams());
      searchParams.append('page', path);

      // return httpClient.get('', { headers, observe: 'response', responseType: 'text' })
      return httpClient.get(`${environment.backendDomain}/page?${searchParams}`, { headers, observe: 'response', responseType: 'text' });
    }),
  );
