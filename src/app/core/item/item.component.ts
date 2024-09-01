import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { Item } from 'src/app/adventure/adventure.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kolol-item',
  styleUrls: [ './item.component.scss' ],
  templateUrl: './item.component.html',
})
export class ItemComponent {
  @Input({ required: true })
  public item!: Item;
}
