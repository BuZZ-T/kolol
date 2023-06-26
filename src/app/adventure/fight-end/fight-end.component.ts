import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FightEnd } from '../adventure.types';

@Component({
  selector: 'kolol-fight-end',
  styleUrls: [ './fight-end.component.scss' ],
  templateUrl: './fight-end.component.html',
})
export class FightEndComponent {

  @Input({ required: true })
  public fightEnd!: FightEnd;

  @Output()
  public adventureAgain = new EventEmitter<void>();

  @Output()
  public goBack = new EventEmitter<void>();
}
