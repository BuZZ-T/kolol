import { Component } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { ActionService } from 'src/app/action/action.service';
import { ApiService } from 'src/app/api/api.service';
import { DescriptionPopupService } from 'src/app/description-popup.service';
import { FamiliarParserService } from 'src/app/parser/familiar-parser.service';

import { Familiar, Familiars } from '../familiar.types';

@Component({
  selector: 'kolol-familiar',
  styleUrl: './familiar.component.scss',
  templateUrl: './familiar.component.html',
})
export class FamiliarComponent {

  private updateSubject = new BehaviorSubject<void>(undefined);
  public familiars$: Observable<Familiars | null>;

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

  public constructor(
    familiarParserService: FamiliarParserService,
    private descriptionPopupService: DescriptionPopupService,
    private actionService: ActionService,
    private apiService: ApiService,
  ) {
    this.familiars$ = this.updateSubject.pipe(
      switchMap(() => familiarParserService.familiars()),
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
  }

  public onFamiliarDescription(familiarId: string): void {
    this.descriptionPopupService.showFamiliarDescription(familiarId);
  }

  public onSelectFamiliar(familiar: Familiar): void {
    console.log('Selected familiar:', familiar.id);

    this.apiService.status().pipe(
      map(status => status.pwd),
    ).subscribe(pwd => {
      this.actionService.takeFamiliar(familiar.id, pwd);
    });
  }

  public onFavorite(familiar: Familiar, isFav: boolean): void {
    this.apiService.status().pipe(
      map(status => status.pwd),
    ).subscribe(pwd => {
      if (isFav) {
        this.actionService.favoriteFamiliar(familiar.id, pwd);
      } else {
        this.actionService.unfavoriteFamiliar(familiar.id, pwd);
      }
    });
  }

  public onFilterUpdate(): void {
    this.updateSubject.next();
  }

}
