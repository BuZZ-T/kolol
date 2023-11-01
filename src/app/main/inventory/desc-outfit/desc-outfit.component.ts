import { Component, EventEmitter, Input } from '@angular/core';

import { OutfitDescriptionData } from '../inventory.types';

@Component({
  selector: 'kolol-desc-outfit',
  styleUrls: [ './desc-outfit.component.scss' ],
  templateUrl: './desc-outfit.component.html',
})
export class DescOutfitComponent {

  @Input()
  public outfit!: OutfitDescriptionData;

  public onClosed = new EventEmitter<void>();
}
