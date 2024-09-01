import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import type { EffectData } from 'src/app/user/user.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kolol-effect',
  styleUrls: [ './effect.component.scss' ],
  templateUrl: './effect.component.html',
})
export class EffectComponent {

  @Input()
  public effect!: EffectData;

  @Output()
  public extend = new EventEmitter<EffectData>();
}
