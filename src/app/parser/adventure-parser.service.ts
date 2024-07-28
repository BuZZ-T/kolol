import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { mapDocToAdventure } from './parser.operators';
import { ParserService } from './parser.service';
import { Adventure, Choice, Fight, FightEnd, Option } from '../adventure/adventure.types';

@Injectable({
  providedIn: 'root',
})
export class AdventureParserService {

  public adventure$: Observable<Choice | Fight | FightEnd | null> = of(null);

  public constructor(private parserService: ParserService) { 
    //
  }

  public attack(): Observable<Adventure | null> {
    return this.parserService.parsePageAndReturn('fight.php', { action: 'attack' }).pipe(
      mapDocToAdventure(),
    );
  }

  /**
   * TODO: whichitem2
   */
  public item(itemId: string): Observable<Adventure | null> {
    return this.parserService.parsePageAndReturn('fight.php', { action: 'item', itemId }).pipe(
      mapDocToAdventure(),
    );
  }

  public pickPocket(): Observable<Adventure | null> {
    console.log('pickPocket');
    return this.parserService.parsePageAndReturn('fight.php', { action: 'steal' }).pipe(
      mapDocToAdventure(),
    );
  }

  // TODO: does it work like that?
  public skill(skillId: string): Observable<Adventure | null> {
    return this.parserService.parsePageAndReturn('fight.php', { action: 'skill', skillId }).pipe(
      mapDocToAdventure(),
    );
  }

  public runAway(): Observable<Adventure | null> {
    return this.parserService.parsePageAndReturn('fight.php', { action: 'runaway' }).pipe(
      mapDocToAdventure(),
    );
  }

  /**
   * Starts a fight, or continues (e.g. on redirect)
   */
  public parse(snarfblat: string | undefined): Observable<Adventure | null> {
    const path = snarfblat ? `adventure.php?snarfblat=${snarfblat}` : 'adventure.php';

    return this.parserService.parsePageAndReturn(path).pipe(
      mapDocToAdventure(),
    );
  }

  public selectChoice(choice: Choice, option: Option): Observable<Adventure | null> {
    return this.parserService.selectChoice(choice, option).pipe(
      mapDocToAdventure(),
    );
  }
}
