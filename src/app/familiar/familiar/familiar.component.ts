import { Component, inject } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { ActionService } from 'src/app/action/action.service';
import { ApiService } from 'src/app/api/api.service';
import { DescriptionPopupService } from 'src/app/description-popup.service';
import { FamiliarParserService } from 'src/app/parser/familiar-parser.service';

import type { Familiar, Familiars } from '../familiar.types';

@Component({
  selector: 'kolol-familiar',
  styleUrl: './familiar.component.scss',
  templateUrl: './familiar.component.html',
})
export class FamiliarComponent {

  #familiarParserService = inject(FamiliarParserService);
  #descriptionPopupService = inject(DescriptionPopupService);
  #actionService = inject(ActionService);
  #apiService = inject(ApiService);
  
  private updateSubject = new BehaviorSubject<void>(undefined);
  public familiars$ = this.updateSubject.pipe(
    switchMap(() => this.#familiarParserService.familiars()),
    map(familiars => {
      if (Object.values(this.filter).every(value => !value) || !familiars) {
        return familiars;
      }

      const filterEntries = Object.entries(this.filter).filter(([ , value ]) => !!value).map(([ key ]) => key);

      const filteredFamiliars: Familiars = {
        current: familiars.current,
        familiars: familiars.familiars.filter(familiar => filterEntries.every(filterEntry => familiar.qualities.includes(filterEntry))),
        favoriteFamiliars: familiars.favoriteFamiliars.filter(familiar => filterEntries.every(filterEntry => familiar.qualities.includes(filterEntry))),
      };

      return filteredFamiliars;
    }),
  );

  public filter = {
    attack: false,
    defense: false,
    hp_restore: false,
    itemdrops: false,
    items: false,
    meat: false,
    mp_restore: false,
    other: false,
    stats: false,
    underwater: false,
  } as const;

  public onFamiliarDescription(familiarId: string): void {
    this.#descriptionPopupService.showFamiliarDescription(familiarId);
  }

  public onSelectFamiliar(familiar: Familiar): void {
    console.log('Selected familiar:', familiar.id);

    this.#apiService.pwd().subscribe(pwd => {
      this.#actionService.takeFamiliar(familiar.id, pwd);
    });
  }

  public onFavorite(familiar: Familiar, isFav: boolean): void {
    this.#apiService.pwd().subscribe(pwd => {
      if (isFav) {
        this.#actionService.favoriteFamiliar(familiar.id, pwd);
      } else {
        this.#actionService.unfavoriteFamiliar(familiar.id, pwd);
      }
    });
  }

  public onFilterUpdate(): void {
    this.updateSubject.next();
  }

}
