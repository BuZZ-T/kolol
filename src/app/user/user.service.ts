import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';
import { BehaviorSubject, map, switchMap } from 'rxjs';

import { mapApiStatusToUserData } from './user.mapper';
import type { UserData } from './user.types';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #apiService = inject(ApiService);

  private tickSubject$ = new BehaviorSubject<void>(undefined);

  public update(): void {
    this.tickSubject$.next();
  }

  public getUser(): Observable<UserData> {
    return this.tickSubject$.asObservable().pipe(
      switchMap(() => this.#apiService.status()),
      map(apiStatus => mapApiStatusToUserData(apiStatus)),
    );
  }
}
