import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Site } from './routing.types';

const redirectPaths = new Set([ 'town.php', 'mountains.php', 'woods.php' ]);

@Injectable({
  providedIn: 'root',
})
export class RoutingService {

  public constructor(private router: Router) { }

  private cleanRoute(route: string): string {
    if (route.endsWith('.php')) {
      return route.slice(0, -4);
    }
    if (route.startsWith('place.php?whichplace=')) {
      return route.slice(21);
    }
    return route;
  }

  private createRoute(route: string): {isPlace: boolean, route: string} {
    if (route.endsWith('.php')) {
      return { isPlace: redirectPaths.has(route), route: route.slice(0, -4) };
    }
    if (route.startsWith('place.php?whichplace=')) {
      return { isPlace: true, route: route.slice(21) };
    }
    return { isPlace: false, route };
  }

  public navigateTo(site: Site): void {
    const cleanedRoute = this.createRoute(site);

    if (cleanedRoute.isPlace) {
      this.router.navigate([ '/kol', 'location', cleanedRoute.route ], { queryParams: { p: 1 } });
      return;
    }

    this.router.navigate([ '/kol', 'location', cleanedRoute.route ]);
  }
}
