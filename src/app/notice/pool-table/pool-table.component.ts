import { Component, Input } from '@angular/core';

import { Notice } from '../notice.types';

@Component({
  selector: 'kolol-pool-table',
  styleUrls: [ './pool-table.component.scss' ],
  templateUrl: './pool-table.component.html',
})
export class PoolTableComponent {

  @Input({ required: true })
  public notice!: Notice;
}
