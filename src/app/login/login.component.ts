import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { LoginService } from './login.service';
import { PreloadingService } from '../preloading/preloading.service';
import { RoutingService } from '../routing/routing.service';

@Component({
  selector: 'kolol-login',
  styleUrls: [ './login.component.scss' ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnDestroy {

  public loginForm = this.formBuilder.group({
    name: '',
    password: '',
  });

  public constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private preloadingService: PreloadingService,
    private routingService: RoutingService,
  ) {
    //
  }

  public onLogin(): void {
    const { name, password } = this.loginForm.value;
    if (!!name && !!password) {
      this.loginService.login(name, password).subscribe(success => {
        console.log('login: ', success ? 'successful' : 'failed');
        if (success) {
          this.routingService.navigateTo('/');
        }
      });
    }
    this.loginForm.reset();
  }

  public ngOnDestroy(): void {
    this.preloadingService.preload();
  }

}
