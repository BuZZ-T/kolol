import { Component, EventEmitter, Input } from '@angular/core';
import type { FamiliarDescriptionData } from 'src/app/user/user.types';

@Component({
  selector: 'kolol-desc-familiar',
  styleUrls: [ './desc-familiar.component.scss' ],
  templateUrl: './desc-familiar.component.html',
})
export class DescFamiliarComponent {

  @Input()
  public familiar!: FamiliarDescriptionData;

  public onClosed = new EventEmitter<void>();
}
