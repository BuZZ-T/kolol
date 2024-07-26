import { KeyValue } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { InventoryEntry } from '../../../../shared/inventory.types';

@Component({
  selector: 'kolol-inventory-section',
  styleUrls: [ './inventory-section.component.scss' ],
  templateUrl: './inventory-section.component.html',
})
export class InventorySectionComponent {
  @Input()
  public section: KeyValue<string, InventoryEntry[]> | null = null;

  @Output()
  public use = new EventEmitter<{action: string, id: string | undefined}>();

  @Output()
  public altUse = new EventEmitter<{action: string | undefined; element: HTMLElement | undefined, itemId: string | undefined, quantity: string | undefined}>();

  @Output()
  public descItem = new EventEmitter<string>();

  public alt(itemId: string | undefined, quantity: string | undefined, action: string | undefined, element: HTMLElement): void {
    this.altUse.emit({ action, element, itemId, quantity });
  }
}
