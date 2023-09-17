import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

import { LoginService } from './login.service';

@Component({
  selector: 'kolol-login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  public loginForm = this.formBuilder.group({
    name: '',
    password: '',
  });

  public constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {
    //
  }

  public onLogin(): void {
    const { name, password } = this.loginForm.value;
    if (!!name && !!password) {
      this.loginService.login(name, password).subscribe(success => {
        console.log('login: ', success ? 'successful' : 'failed');
        if (success) {
          // TODO: use routing service
          this.router.navigate([ '/kol' ]);
        }
      });
    }
    this.loginForm.reset();
  }

}
