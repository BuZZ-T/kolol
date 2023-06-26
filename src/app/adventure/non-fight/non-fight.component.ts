import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NonFight } from '../adventure.types';

@Component({
  selector: 'kolol-non-fight',
  styleUrls: [ './non-fight.component.scss' ],
  templateUrl: './non-fight.component.html',
})
export class NonFightComponent {

  @Input({ required: true })
  public nonFight!: NonFight;

  @Output()
  public adventureAgain = new EventEmitter<void>();
}
