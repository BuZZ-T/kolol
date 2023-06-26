import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Fight, FightEnd } from '../adventure.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kolol-damage',
  styleUrls: [ './damage.component.scss' ],
  templateUrl: './damage.component.html',
})
export class DamageComponent {

  @Input({ required: true })
  public fight!: Fight | FightEnd;

  public hasDamage(): boolean {
    return Object.values(this.fight.damage).some((damage) => damage > 0);
  }
}
