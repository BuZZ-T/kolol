import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { mapDocToAdventure, mapHtmlToDocAndPwd } from './parser.operators';
import { ParserService } from './parser.service';
import { AbstractActionService } from '../action/abstract-action.service';
import { Adventure, Choice, Fight, FightEnd, Option } from '../adventure/adventure.types';
import { LoginService } from '../login/login.service';
import { RoutingService } from '../routing/routing.service';

@Injectable({
  providedIn: 'root',
})
export class AdventureParserService extends AbstractActionService {

  public adventure$: Observable<Choice | Fight | FightEnd | null> = of(null);

  public constructor(
    private parserService: ParserService,
    loginService: LoginService,
    routingService: RoutingService,
    httpClient: HttpClient,
  ) {
    super(httpClient, loginService, routingService);
  }

  /**
   * 
   * @deprecated use attackNew
   */
  public attack(): Observable<Adventure | null> {
    return this.parserService.parsePageAndReturn('fight.php', { action: 'attack' }).pipe(
      mapDocToAdventure(),
    );
  }

  /**
   * TODO: rename to attack
   */
  public attackNew(): Observable<Adventure | null> {
    return this.postPath('/adventure/attack', { action: 'attack' }).pipe(
      mapHtmlToDocAndPwd(),
      mapDocToAdventure(),
    );
  }

  /**
   * TODO: whichitem2
   * @deprecated use itemNew
   */
  public item(itemId: string): Observable<Adventure | null> {
    return this.parserService.parsePageAndReturn('fight.php', { action: 'item', itemId }).pipe(
      mapDocToAdventure(),
    );
  }

  /**
   * TODO: rename to item
   */
  public itemNew(itemId: string): Observable<unknown> {
    return this.postPath('/adventure/attack', { action: 'item', itemId });
  }

  /**
   * TODO: new, unchecked
   */
  public castSkill(skillId: string): Observable<Adventure | null> {
    return this.postPath('/adventure/attack', { action: 'skill', skillId }).pipe(
      mapHtmlToDocAndPwd(),
      mapDocToAdventure(),
    );
  }

  public pickPocket(): Observable<Adventure | null> {
    console.log('pickPocket');
    return this.parserService.parsePageAndReturn('fight.php', { action: 'steal' }).pipe(
      mapDocToAdventure(),
    );
  }

  /**
   * @deprecated use runAwayNew
   */
  public runAway(): Observable<Adventure | null> {
    return this.parserService.parsePageAndReturn('fight.php', { action: 'runaway' }).pipe(
      mapDocToAdventure(),
    );
  }

  /**
   * TODO: rename to runAway
   */
  public runAwayNew(): Observable<Adventure | null> {
    return this.postPath('/adventure/attack', { action: 'runaway' }).pipe(
      mapHtmlToDocAndPwd(),
      mapDocToAdventure(),
    );
  }

  /**
   * TODO: new, unchecked
   */
  public useMacro(macroId: string): Observable<unknown> {
    return this.postPath('/adventure/attack', { action: 'macro', macroId });
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
