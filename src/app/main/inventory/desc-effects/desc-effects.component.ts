import { Component, Input } from '@angular/core';

import { ItemEffect } from '../inventory.types';

@Component({
  selector: 'kolol-desc-effects',
  styleUrls: [ './desc-effects.component.scss' ],
  templateUrl: './desc-effects.component.html',
})
export class DescEffectsComponent {

  @Input()
  public effects!: ItemEffect[][];
  
}
