import { Component, inject, Input } from '@angular/core';

import type { SkillData } from '../../../../shared/skills.types';
import { ActionService } from '../../../action/action.service';
import { DescriptionPopupService } from '../../../description-popup.service';

@Component({
  selector: 'kolol-skill-section',
  styleUrls: [ './skill-section.component.scss' ],
  templateUrl: './skill-section.component.html',
})
export class SkillSectionComponent {
  #actionService = inject(ActionService);
  #descriptionPopupService = inject(DescriptionPopupService);

  @Input({ required: true })
  public skills!: SkillData[];

  @Input({ required: true })
  public skillTitle!: string;

  @Input()
  /**
   * Whether the skill is usable at the moment
   */
  public active!: boolean;

  public castSkill(skillId: SkillData['id']): void {
    this.#actionService.castSkill({ skillId });
  }

  public onDescription(event: Event, skill: SkillData): void {
    event.preventDefault();
    this.#descriptionPopupService.showSkillDescription(skill);
  }
}
