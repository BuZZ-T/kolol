import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';

import { Adventure, Choice, Option } from './adventure.types';
import { isFight, isNonFight, isChoice, isFightEnd } from './adventure.utils';
import { AdventureParserService } from '../parser/adventure-parser.service';
import { RoutingService } from '../routing/routing.service';

@Component({
  selector: 'kolol-adventure',
  styleUrls: [ './adventure.component.scss' ],
  templateUrl: './adventure.component.html',
})
export class AdventureComponent implements OnInit {

  public adventure$ = new BehaviorSubject<Adventure | null>(null);

  public snarfblat: string | null = null;
  public constructor(
    private adventureParserService: AdventureParserService,
    private route: ActivatedRoute,
    private routingService: RoutingService,
  ) { 
    //
  }

  public ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params) => {
        const snarfblat = params.get('snarfblat') || '';
        this.snarfblat = snarfblat;
        return this.adventureParserService.parse(snarfblat);
      }),
    ).subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public isFight = isFight;
  public isNonFight = isNonFight;
  public isChoice = isChoice;
  public isFightEnd = isFightEnd;

  public onAttack(): void {
    this.adventureParserService.attack().subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public onItem(item: string): void {
    this.adventureParserService.item(item).subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public onPickPocket(): void {
    console.log('onPickPocket');
    this.adventureParserService.pickPocket().subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public onSkill(skillId: string): void {
    this.adventureParserService.skill(skillId).subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public onRunAway(): void {
    this.adventureParserService.runAway().subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }
  
  public onAdventureAgain(): void {
    console.log('onAdventureAgain: ', this.snarfblat);
    if (this.snarfblat) {
      this.adventureParserService.parse(this.snarfblat).subscribe((adventure) => {
        this.adventure$.next(adventure);
      });
    }
  }

  public onSelectChoice({ choice, option }: {choice: Choice, option: Option}): void {
    this.adventureParserService.selectChoice(choice, option).subscribe((adventure) => {
      this.adventure$.next(adventure);
    });
  }

  public onGoBack(url: string): void {
    this.routingService.navigateTo(url);
  }

}
