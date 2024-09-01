import type { OnDestroy } from '@angular/core';
import { Component, HostListener, inject } from '@angular/core';
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
  #formBuilder = inject(FormBuilder);
  #loginService = inject(LoginService);
  #preloadingService = inject(PreloadingService);
  #routingService = inject(RoutingService);

  public loginForm = this.#formBuilder.group({
    name: '',
    password: '',
  });

  public error: string |undefined;

  public onLogin(): void {
    const { name, password } = this.loginForm.value;
    if (!!name && !!password) {
      this.#loginService.login(name, password).subscribe({
        error: error => {
          switch (error.status) {
          case 400:
            this.error = 'Please enter a name and a password.';
            break;
          case 401:
            this.error = 'Invalid name or password.';
            break;
          case 429:
            this.error = 'Too many login attempts. Please try again later.';
            break;
          case 500:
            this.error = 'Unknown server error. Please try again later.';
            break;
          default:
            this.error = 'Could not connect to server. Please try again later.';
            break;
          }
        },
        next: success => {
          console.log('login: ', success ? 'successful' : 'failed');
          if (success) {
            this.error = undefined;
            this.#routingService.navigateTo('/');
          }
        },
      });
    }
    this.loginForm.reset();
  }

  public ngOnDestroy(): void {
    this.#preloadingService.preload();
  }

  @HostListener('window:keydown', [ '$event' ])
  public logo(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onLogin();
    }
  }

}
