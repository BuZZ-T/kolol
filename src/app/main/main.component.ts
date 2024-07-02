import { Component } from '@angular/core';

import { LoginService } from '../login/login.service';

@Component({
  selector: 'kolol-main',
  styleUrls: [ './main.component.scss' ],
  templateUrl: './main.component.html',
})
export class MainComponent {

  public constructor(private loginService: LoginService) {
    //
  }
}
