import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Equipment, EquippedItem } from 'src/shared/inventory.types';

@Component({
  selector: 'kolol-equipment',
  styleUrls: [ './equipment.component.scss' ],
  templateUrl: './equipment.component.html',
})
export class EquipmentComponent {

  @Input()
  public equipment!: Equipment;

  public equipmentSections: Array<Exclude<keyof Equipment, 'Accessory'>> = [ 'hat', 'shirt', 'weapon', 'offhand', 'pants' ];

  public equip(section: Exclude<keyof Equipment, 'Accessory'>): EquippedItem {
    return this.equipment[section] as EquippedItem;
  }

  @Output()
  public unequip = new EventEmitter<keyof Equipment | 'acc1' | 'acc2' | 'acc3'>();

  public onUnequipAccessory(accName: string | undefined): void {
    const acc = {
      'Accessory 1': 'acc1',
      'Accessory 2': 'acc2',
      'Accessory 3': 'acc3',
    }[accName || 'Accessory 1'];
    this.unequip.emit(acc as 'acc1' | 'acc2' | 'acc3');
  }
}
