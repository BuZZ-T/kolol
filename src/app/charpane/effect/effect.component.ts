import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EffectData } from 'src/app/user/user.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kolol-effect',
  styleUrls: [ './effect.component.scss' ],
  templateUrl: './effect.component.html',
})
export class EffectComponent {

  @Input()
  public effect!: EffectData;
}
