import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SkillsDataWithPwd } from './skills.types';
import { SkillsParserService } from '../../parser/skills-parser.service';

@Component({
  selector: 'kolol-skills',
  styleUrls: [ './skills.component.scss' ],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {

  public skills$: Observable<SkillsDataWithPwd | null> = of(null);

  public constructor(private skillsParserService: SkillsParserService) {
    this.skills$ = this.skillsParserService.skills();
  }
}
