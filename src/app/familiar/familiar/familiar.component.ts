import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DescriptionPopupService } from 'src/app/description-popup.service';
import { FamiliarParserService } from 'src/app/parser/familiar-parser.service';

import { Familiar, Familiars } from '../familiar.types';

@Component({
  selector: 'kolol-familiar',
  styleUrl: './familiar.component.scss',
  templateUrl: './familiar.component.html',
})
export class FamiliarComponent {

  public familiars$: Observable<Familiars | null>;

  public constructor(familiarParserService: FamiliarParserService, private descriptionPopupService: DescriptionPopupService) {
    this.familiars$ = familiarParserService.familiars();
  }

  public onFamiliarDescription(familiarId: string): void {
    this.descriptionPopupService.showFamiliarDescription(familiarId);
  }

  public onSelectFamiliar(familiar: Familiar): void {
    console.log('Selected familiar:', familiar.id);
  }
}
