import type { OnDestroy } from '@angular/core';
import { Component, HostListener } from '@angular/core';
import type { FormBuilder } from '@angular/forms';

import type { LoginService } from './login.service';
import type { PreloadingService } from '../preloading/preloading.service';
import type { RoutingService } from '../routing/routing.service';

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

  @HostListener('window:keydown', [ '$event' ])
  public logo(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onLogin();
    }
  }

}
