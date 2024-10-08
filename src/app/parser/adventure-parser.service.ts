import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';

import { ParserService } from './parser.service';
import { cacheFightUsables, mapDocToAdventure, mapHtmlToDocAndPwd } from './utils/parser.operators';
import { AbstractActionService } from '../action/abstract-action.service';
import type { Adventure, Choice, Fight, FightEnd, Option } from '../adventure/adventure.types';
import { CacheService } from '../cache/cache.service';

@Injectable({
  providedIn: 'root',
})
export class AdventureParserService extends AbstractActionService {

  public adventure$: Observable<Choice | Fight | FightEnd | null> = of(null);
  #parserService = inject(ParserService);
  #cacheService = inject(CacheService);

  public attack(): Observable<Adventure | null> {
    return this.postPath('/adventure/attack', { action: 'attack' }).pipe(
      mapHtmlToDocAndPwd(),
      mapDocToAdventure(),
      cacheFightUsables(this.#cacheService),
    );
  }

  /**
   * TODO: whichitem2
   */
  public item(itemId: string): Observable<Adventure | null> {
    return this.postPath('/adventure/attack', { action: 'useitem', itemId }).pipe(
      mapHtmlToDocAndPwd(),
      mapDocToAdventure(),
      cacheFightUsables(this.#cacheService),
    );
  }

  /**
   * TODO: new, unchecked
   */
  public castSkill(skillId: string): Observable<Adventure | null> {
    return this.postPath('/adventure/attack', { action: 'skill', skillId }).pipe(
      mapHtmlToDocAndPwd(),
      mapDocToAdventure(),
      cacheFightUsables(this.#cacheService),
    );
  }

  public pickPocket(): Observable<Adventure | null> {
    return this.postPath('/adventure/attack', { action: 'steal' }).pipe(
      mapHtmlToDocAndPwd(),
      mapDocToAdventure(),
      cacheFightUsables(this.#cacheService),
    );
  }

  public runAway(): Observable<Adventure | null> {
    return this.postPath('/adventure/attack', { action: 'runaway' }).pipe(
      mapHtmlToDocAndPwd(),
      mapDocToAdventure(),
      cacheFightUsables(this.#cacheService),
    );
  }

  public useMacro(macroId: string): Observable<Adventure | null> {
    return this.postPath('/adventure/attack', { action: 'macro', macroId }).pipe(
      mapHtmlToDocAndPwd(),
      mapDocToAdventure(),
      cacheFightUsables(this.#cacheService),
    );
  }

  /**
   * Starts a fight, or continues (e.g. on redirect)
   */
  public fight(snarfblat: string | undefined): Observable<Adventure | null> {
    const path = snarfblat ? `adventure.php?snarfblat=${snarfblat}` : 'adventure.php';

    return this.#parserService.parsePageAndReturn(path).pipe(
      mapDocToAdventure(),
      cacheFightUsables(this.#cacheService),
    );
  }

  public selectChoice(choice: Choice, option: Option): Observable<Adventure | null> {
    return this.#parserService.selectChoice(choice, option).pipe(
      mapDocToAdventure(),
      cacheFightUsables(this.#cacheService),
    );
  }
}
