import { Component, Input } from '@angular/core';

import { imageToAbsolute } from '../../../utils/image.utils';
import { SkillEffectDescriptionData } from '../inventory.types';

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
