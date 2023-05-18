import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { name, password } from '../login/login.data';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'kolol-chat',
  styleUrls: [ './chat.component.scss' ],
  templateUrl: './chat.component.html',
})
export class ChatComponent /* implements OnInit */ {

  // public loggedIn$: Observable<boolean> = of(false);

  // public constructor(private loginService: LoginService) {
  //   //
  // }

  // public ngOnInit(): void {
  //   this.loggedIn$ = this.loginService.login(name, password);
  // }
}
