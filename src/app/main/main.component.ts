import { Component, OnInit } from '@angular/core';

import { name, password } from '../login/login.data';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'kolol-main',
  styleUrls: [ './main.component.scss' ],
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {

  public constructor(private loginService: LoginService) {
    //
  }
  
  public ngOnInit(): void {
    this.loginService.login(name, password).subscribe();
  }
}
