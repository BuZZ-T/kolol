import { Component, EventEmitter } from '@angular/core';

import type { ItemDescriptionData } from '../../../../shared/inventory.types';

@Component({
  selector: 'kolol-desc-item',
  styleUrls: [ './desc-item.component.scss' ],
  templateUrl: './desc-item.component.html',
})
export class DescItemComponent {

  public itemDescription!: ItemDescriptionData;

  public onOutfitClicked = new EventEmitter<string>();

  public onOutfitClick(outfitId: string): void {
    this.onOutfitClicked.emit(outfitId);
  }

  public onEffectClicked = new EventEmitter<string>();

  public onClosed = new EventEmitter<void>();
}
