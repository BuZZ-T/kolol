import { Component, Input } from '@angular/core';

import type { Stats } from '../adventure.types';

@Component({
  selector: 'kolol-stats',
  styleUrl: './stats.component.scss',
  templateUrl: './stats.component.html',
})
export class StatsComponent {

  @Input({ required: true })
  public stats!: Stats;

}
