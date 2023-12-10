import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { mapApiStatusToUserData } from './user.mapper';
import { UserData } from './user.types';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  public constructor(private apiService: ApiService) { 
    //
  }

  public getUser(): Observable<UserData> {
    return this.apiService.status().pipe(
      map(apiStatus => mapApiStatusToUserData(apiStatus)),
      tap(e => console.log('e: ', e)),
    );
  }
}
