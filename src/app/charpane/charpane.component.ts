import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';

import { CharpaneParserService } from '../parser/charpane-parser.service';
import { UserService } from '../user/user.service';
import { UserData } from '../user/user.types';

@Component({
  selector: 'kolol-charpane',
  styleUrls: [ './charpane.component.scss' ],
  templateUrl: './charpane.component.html',
})
export class CharpaneComponent implements OnDestroy {

  public userData: UserData | null = null;
  public userDataSubscription: Subscription | null = null;

  public playerAvatar$: Observable<string> = of('');

  public constructor(
    private userService: UserService,
    private charpaneParserService: CharpaneParserService,
  ) {
    this.userService.getUser().subscribe(userData => {
      this.userData = userData;
    });

    this.playerAvatar$ = this.charpaneParserService.avatar();
  }

  public ngOnDestroy(): void {
    this.userDataSubscription?.unsubscribe();
  }
}
