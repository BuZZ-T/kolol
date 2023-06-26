import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Fight } from '../adventure.types';

@Component({
  selector: 'kolol-fight',
  styleUrls: [ './fight.component.scss' ],
  templateUrl: './fight.component.html',
})
export class FightComponent {

  @Input({ required: true })
  public fight!: Fight;

  @Output()
  public attack = new EventEmitter<void>();

  @Output()
  public item = new EventEmitter<string>();

  @Output()
  public pickPocket = new EventEmitter<void>();

  @Output()
  public skill = new EventEmitter<string>();

  @Output()
  public runAway = new EventEmitter<void>();

  public hasDamage(): boolean {
    return Object.values(this.fight.damage).some((damage) => damage > 0);
  }
}
