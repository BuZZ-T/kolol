import { Component, inject, Input } from '@angular/core';
import { first, map } from 'rxjs';
import { ParseApiService } from 'src/app/api/parse-api.service';
import { DescriptionPopupService } from 'src/app/description-popup.service';
import { transformedSkillTableData } from 'src/app/parser/utils/skill.utils';
import type { SkillData } from 'src/shared/skills.types';

@Component({
  selector: 'kolol-skill-table',
  styleUrl: './skill-table.component.scss',
  templateUrl: './skill-table.component.html',
})
export class SkillTableComponent {

  #parseApiService = inject(ParseApiService);
  #skillMap$ = this.#parseApiService.skills().pipe(
    map(skills => {
      const skillMap = new Map<string, SkillData>();

      if (!skills) {
        return skillMap;
      }

      for(const skill of [ ...skills.skills.Buff, ...skills.skills.NotBuff, ...skills.skills.PassiveSkills, ...skills.skills.CombatSkills ]) {
        skillMap.set(skill.id, skill);
      }
      return skillMap;
    }),
  );
  #descriptionPopupService = inject(DescriptionPopupService);
  
  public skillTable = transformedSkillTableData;

  @Input({ required: true })
  public skills!: Map<string, { id: string; permanent: 'permanent' | 'hardcore-permanent' | 'no'}> | undefined;

  public onShowDescription(skillId: string | undefined): void {
    if (!skillId) {
      return;
    }
    this.#skillMap$.pipe(first()).subscribe(skillMap => {
      const skill = skillMap.get(skillId);
      if (skill) {
        this.#descriptionPopupService.showSkillDescription(skill);
      } else {
        this.#descriptionPopupService.showSkillDescription(skillId);
      }
    });
  }
}
