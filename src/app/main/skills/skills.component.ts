import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SkillSection } from './skills.types';
import { SkillsParserService } from '../../parser/skills-parser.service';

@Component({
  selector: 'kolol-skills',
  styleUrls: [ './skills.component.scss' ],
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements OnInit {

  public skills$: Observable<SkillSection[]> = of([]);

  public constructor(private skillsParserService: SkillsParserService) {
    //
  }

  public ngOnInit(): void {
    this.skills$ = this.skillsParserService.skills$;

    this.skills$.subscribe(skills => {
      console.log('skills: ', skills);
    });
  }
}
