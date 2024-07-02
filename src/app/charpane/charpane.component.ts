import type { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import type { Observable } from 'rxjs';
import { Subject, of, takeUntil } from 'rxjs';

import type { CharPaneData, CharpaneParserService } from '../parser/charpane-parser.service';
import { ROUTES } from '../routing/routing.utils';
import type { UserService } from '../user/user.service';
import type { UserData } from '../user/user.types';
import { imageToAbsolute } from '../utils/image.utils';

@Component({
  selector: 'kolol-charpane',
  styleUrls: [ './charpane.component.scss' ],
  templateUrl: './charpane.component.html',
})
export class CharpaneComponent implements OnDestroy {

  public userData: UserData | null = null;

  public charPane$: Observable<CharPaneData | null> = of(null);

  public stop$ = new Subject<void>();
  
  public constructor(
    private userService: UserService,
    private charpaneParserService: CharpaneParserService,
  ) {
    this.userService.getUser().pipe(takeUntil(this.stop$)).subscribe(userData => {
      this.userData = userData;
    });

    this.charPane$ = this.charpaneParserService.charPane();
  }

  public imageToAbsolute = imageToAbsolute;

  public familiarRouting = ROUTES.familiar;
  
  public ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }
}
