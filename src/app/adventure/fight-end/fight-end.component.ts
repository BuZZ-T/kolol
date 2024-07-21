import { Component, EventEmitter, Input, Output } from '@angular/core';

import type { Hotkey } from '../../api/api.types';
import type { FightEnd } from '../adventure.types';

@Component({
  selector: 'kolol-fight-end',
  styleUrls: [ './fight-end.component.scss' ],
  templateUrl: './fight-end.component.html',
})
export class FightEndComponent {

  @Input({ required: true })
  public fightEnd!: FightEnd;

  @Output()
  public adventureAgain = new EventEmitter<string>();

  @Output()
  public goBack = new EventEmitter<void>();

  public onAdventureAgain(): void {
    this.adventureAgain.emit(this.fightEnd.snarfblat);
  }

  public onHotkey(hotkey: Hotkey): void {
    if (hotkey.type === 'action' && hotkey.id === 'repeat') {
      this.adventureAgain.emit(this.fightEnd.snarfblat);
    }
  }
}
