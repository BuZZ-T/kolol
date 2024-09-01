import { Component, Input } from '@angular/core';
import type { Result, ResultEntry } from 'src/app/action/results.types';
import type { Item } from 'src/app/adventure/adventure.types';

@Component({
  selector: 'kolol-result',
  styleUrls: [ './result.component.scss' ],
  templateUrl: './result.component.html',
})
export class ResultComponent {

  @Input({ required: true })
  public result!: Result;

  public asNumber(value: ResultEntry['value']): number {
    return parseInt(value.toString(), 10) || 0;
  }

  public asItem(value: ResultEntry['value']): Item {
    return value as Item;
  }
  
  public abs = Math.abs;
}
