import { Component, OnDestroy, inject } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';

import { ActionService } from '../action/action.service';
import { CharPaneData, CharpaneParserService } from '../parser/charpane-parser.service';
import { ROUTES } from '../routing/routing.utils';
import { UserService } from '../user/user.service';
import { EffectData, UserData } from '../user/user.types';
import { imageToAbsolute } from '../utils/image.utils';

@Component({
  selector: 'kolol-charpane',
  styleUrls: [ './charpane.component.scss' ],
  templateUrl: './charpane.component.html',
})
export class CharpaneComponent implements OnDestroy {
  #userService = inject(UserService);
  #charpaneParserService = inject(CharpaneParserService);
  #actionService = inject(ActionService);

  public userData: UserData | null = null;

  public charPane$: Observable<CharPaneData | null> = of(null);

  public stop$ = new Subject<void>();
  
  public constructor() {
    this.#userService.getUser().pipe(takeUntil(this.stop$)).subscribe(userData => {
      this.userData = userData;
    });

    this.charPane$ = this.#charpaneParserService.charPane();
  }

  public imageToAbsolute = imageToAbsolute;

  public onExtendEffect(effect: EffectData): void {
    this.#actionService.castSkill({ skillId: effect.skillId });
  }

  public familiarRouting = { name: 'Familiars', url: ROUTES.familiar };
  
  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
}
