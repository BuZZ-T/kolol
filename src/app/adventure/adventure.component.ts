import type { OnDestroy, OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, switchMap, takeUntil } from 'rxjs';

import type { Adventure, Choice, Option } from './adventure.types';
import { isFight, isNonFight, isChoice, isFightEnd, isAdventureError } from './adventure.utils';
import { AdventureParserService } from '../parser/adventure-parser.service';
import { RoutingService } from '../routing/routing.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'kolol-adventure',
  styleUrls: [ './adventure.component.scss' ],
  templateUrl: './adventure.component.html',
})
export class AdventureComponent implements OnInit, OnDestroy {

  #adventureParserService = inject(AdventureParserService);
  #route = inject(ActivatedRoute);
  #routingService = inject(RoutingService);
  #userService = inject(UserService);

  public adventure$ = new BehaviorSubject<Adventure | null>(null);

  private kill = new Subject<void>();

  public snarfblat: string | null = null;

  public ngOnInit(): void {
    this.adventure$.pipe(
      takeUntil(this.kill),
    )
      .subscribe((adventure) => {
        if (adventure && isFightEnd(adventure)) {
          this.#userService.update();
        }
      });

    this.#route.paramMap.pipe(
      switchMap((params) => {
        const snarfblat = params.get('snarfblat') || '';
        this.snarfblat = snarfblat;
        return this.#adventureParserService.fight(snarfblat);
      }),
    ).subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public ngOnDestroy(): void {
    this.kill.next();
    this.kill.complete();
  }

  public isFight = isFight;
  public isNonFight = isNonFight;
  public isChoice = isChoice;
  public isFightEnd = isFightEnd;
  public isAdventureError = isAdventureError;

  public onAttack(): void {
    this.#adventureParserService.attack().subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public onItem(item: string): void {
    this.#adventureParserService.item(item).subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public onMacro(macroId: string): void {
    this.#adventureParserService.useMacro(macroId).subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public onPickPocket(): void {
    console.log('onPickPocket');
    this.#adventureParserService.pickPocket().subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public onSkill(skillId: string): void {
    this.#adventureParserService.castSkill(skillId).subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public onRunAway(): void {
    this.#adventureParserService.runAway().subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }
  
  public onAdventureAgain(snarfblat?: string): void {
    const newSnarfblat = this.snarfblat || snarfblat;
    if (newSnarfblat) {
      this.#adventureParserService.fight(newSnarfblat).subscribe((adventure) => {
        this.adventure$.next(adventure);
      });
    }
  }

  public onSelectChoice({ choice, option }: {choice: Choice, option: Option}): void {
    this.#adventureParserService.selectChoice(choice, option).subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public onGoBack(url: string): void {
    this.#routingService.navigateTo(url);
  }

}
