import { Component, EventEmitter } from '@angular/core';
import type { ItemEffect } from 'src/shared/inventory.types';
import type { SkillData } from 'src/shared/skills.types';

@Component({
  selector: 'kolol-desc-skill',
  styleUrl: './desc-skill.component.scss',
  templateUrl: './desc-skill.component.html',
})
export class DescSkillComponent {

  public skill!: SkillData;

  public onClosed = new EventEmitter<void>();

  public onEffectClicked = new EventEmitter<string>();

  public mapEffects(): ItemEffect[][] {
    const effect = this.skill.givesEffect;
    if (!effect) {
      return [];
    }
    return [ [ { element: 'none', id: effect.id, name: effect.name } ] ];
  }
}
