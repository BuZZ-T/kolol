import { Observable, map } from 'rxjs';

import { AdventureExtractor } from './extractors/AdventureExtractor';
import type { Adventure } from '../adventure/adventure.types';
import type { Notice } from '../notice/notice.types';

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
