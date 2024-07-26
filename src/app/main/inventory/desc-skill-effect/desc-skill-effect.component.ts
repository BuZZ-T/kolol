import { Component, Input } from '@angular/core';

import { SkillEffectDescriptionData } from '../../../../shared/inventory.types';
import { imageToAbsolute } from '../../../utils/image.utils';

@Component({
  selector: 'kolol-desc-skill-effect',
  styleUrls: [ './desc-skill-effect.component.scss' ],
  templateUrl: './desc-skill-effect.component.html',
})
export class DescSkillEffectComponent {

  @Input()
  public skillEffectDescriptionData!: SkillEffectDescriptionData;

  public imageToAbsolute = imageToAbsolute;
}
