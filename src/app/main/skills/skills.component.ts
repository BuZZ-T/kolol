import { Component, inject } from '@angular/core';

import { ParseApiService } from '../../api/parse-api.service';

@Component({
  selector: 'kolol-skills',
  styleUrls: [ './skills.component.scss' ],
  templateUrl: './skills.component.html',
})
export class SkillsComponent {
  #parseApiService = inject(ParseApiService);

  public skills$ = this.#parseApiService.skills(); 
}
