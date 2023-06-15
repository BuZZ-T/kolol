import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Site } from './routing.types';
import { siteToRoute } from './routing.utils';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {

  public constructor(private router: Router) { }

  public navigateTo(site: Site): void {
    const route = siteToRoute[site];

    if (route) {
      this.router.navigate([ '/kol', route ]);
    } else {
      console.error(`No route found for site: ${site}`);
    }
  }
}
