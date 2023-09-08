import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { InventoryEntry } from '../inventory.types';

@Component({
  selector: 'kolol-inventory-section',
  styleUrls: [ './inventory-section.component.scss' ],
  templateUrl: './inventory-section.component.html',
})
export class InventorySectionComponent {
  @Input()
  public section: KeyValue<string, InventoryEntry[]> | null = null;

  @Output()
  public use = new EventEmitter<string>();

  @Output()
  public altUse = new EventEmitter<string>();
}
