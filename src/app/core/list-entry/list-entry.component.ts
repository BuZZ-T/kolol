import { Component, EventEmitter } from '@angular/core';

import type { ListEntry } from './list-entry.types';
import { imageToAbsolute } from '../../utils/image.utils';

@Component({
  selector: 'kolol-list-entry',
  styleUrl: './list-entry.component.scss',
  templateUrl: './list-entry.component.html',
})
export class ListEntryComponent {

  public entries!: ListEntry[];

  public onEntryClicked = new EventEmitter<ListEntry>();

  public imageToAbsolute = imageToAbsolute;
}
