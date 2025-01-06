import type { OnDestroy } from '@angular/core';
import { Component, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { ActionService } from '../action/action.service';
import { DescriptionPopupService } from '../description-popup.service';
import type { CharPaneData } from '../parser/charpane-parser.service';
import { CharpaneParserService } from '../parser/charpane-parser.service';
import { ROUTES } from '../routing/routing.utils';
import { UserService } from '../user/user.service';
import type { EffectData } from '../user/user.types';
import { PlayerClass } from '../user/user.types';
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
  #descriptionPopupService = inject(DescriptionPopupService);

  public userData$ = this.#userService.getUser();
  
  public charPane$: Observable<CharPaneData> = this.#charpaneParserService.charPane();

  public stop$ = new Subject<void>();
  
  public imageToAbsolute = imageToAbsolute;

  public onExtendEffect(effect: EffectData): void {
    this.#actionService.castSkill({ skillId: effect.skillId });
  }

  public onShowEffectDescription(effect: EffectData): void {
    console.log('show effect description', effect.effectId);
    this.#descriptionPopupService.showEffectDescription(effect.effectId);
  }

  public familiarRouting = { name: 'Familiars', url: ROUTES.familiar };
  
  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  public PlayerClass = PlayerClass;
}
