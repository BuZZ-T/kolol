import { Component, EventEmitter, Input, Output } from '@angular/core';

import type { ItemEffect } from '../../../../shared/inventory.types';

@Component({
  selector: 'kolol-desc-effects',
  styleUrls: [ './desc-effects.component.scss' ],
  templateUrl: './desc-effects.component.html',
})
export class DescEffectsComponent {

  @Input()
  public effects!: ItemEffect[][];

  @Output()
  public effectClicked = new EventEmitter<string>();
}
