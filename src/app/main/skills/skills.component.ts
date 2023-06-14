import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SkillsDataWithPwd } from './skills.types';
import { SkillsParserService } from '../../parser/skills-parser.service';

@Component({
  selector: 'kolol-skills',
  styleUrls: [ './skills.component.scss' ],
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements OnInit {

  public skills$: Observable<SkillsDataWithPwd> = of({} as SkillsDataWithPwd);

  public constructor(private skillsParserService: SkillsParserService) {
    //
  }

  public ngOnInit(): void {
    // TODO: move to constructor?
    this.skills$ = this.skillsParserService.skills$;
  }
}
