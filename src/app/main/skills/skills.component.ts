import { Component } from '@angular/core';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';

import type { SkillsDataWithPwd } from './skills.types';
import type { ParseApiService } from '../../api/parse-api.service';

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
