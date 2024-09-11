import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import { ListEntryComponent } from '../../../core/list-entry/list-entry.component';
import type { ListEntry } from '../../../core/list-entry/list-entry.types';
import { AbstractPopupService } from '../../../core/popup/abstract-popup.service';

@Injectable({
  providedIn: 'root',
})
export class HotkeyPopupService extends AbstractPopupService {
  public showCombatSkills(entries: ListEntry[], element: Element): Observable<ListEntry> {
    const listComponent = this.initStickyPortal(ListEntryComponent, element, {
      panelClass: 'tooltip',
      position: 'below',
      width: '350px',
    });
    listComponent.entries = entries;

    return listComponent.onEntryClicked;
  }

  public showCombatItems(entries: ListEntry[], element: Element): Observable<ListEntry> {
    const listComponent = this.initStickyPortal(ListEntryComponent, element, {
      panelClass: 'tooltip',
      position: 'below',
      width: '350px',
    });
    listComponent.entries = entries;

    return listComponent.onEntryClicked;
  }
}
