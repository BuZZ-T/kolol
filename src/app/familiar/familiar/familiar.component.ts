import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FamiliarParserService } from 'src/app/parser/familiar-parser.service';

import { Familiars } from '../familiar.types';

@Component({
  selector: 'kolol-familiar',
  styleUrl: './familiar.component.scss',
  templateUrl: './familiar.component.html',
})
export class FamiliarComponent {

  public familiars$: Observable<Familiars | null>;

  public constructor(familiarParserService: FamiliarParserService) {
    this.familiars$ = familiarParserService.familiars();
  }
}
