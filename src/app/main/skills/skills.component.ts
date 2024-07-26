import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { SkillsDataWithPwd } from '../../../shared/skills.types';
import { ParseApiService } from '../../api/parse-api.service';

@Component({
  selector: 'kolol-skills',
  styleUrls: [ './skills.component.scss' ],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {

  public skills$: Observable<SkillsDataWithPwd | null> = of(null);

  public constructor(parseApiService: ParseApiService) {
    this.skills$ = parseApiService.skills();
  }
}
