import { Component, Input } from '@angular/core';

import { ActionService } from '../../../action/action.service';
import { SkillData } from '../skills.types';

@Component({
  selector: 'kolol-skill-section',
  styleUrls: [ './skill-section.component.scss' ],
  templateUrl: './skill-section.component.html',
})
export class SkillSectionComponent {

  public constructor(private actionService: ActionService) {
    //
  }

  @Input({ required: true })
  public skills!: SkillData[];

  @Input({ required: true })
  public skillTitle!: string;

  @Input()
  /**
   * Whether the skill is usable at the moment
   */
  public active!: boolean;

  @Input({ required: true })
  public pwd!: string;

  public castSkill(skillId: SkillData['id']): void {
    this.actionService.castSkill({ pwd: this.pwd, skillId });
  }
}
