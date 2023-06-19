import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Site } from './routing.types';

const places = new Set([ 
  // 'friars.php', // may be both
  'town.php',
  'mountains.php',
  'woods.php',
  'forestvillage.php',
  'beanstalk.php',
  'giantcastle.php',
  'knoll_friendly.php',
  'bathole.php',
]);

@Injectable({
  providedIn: 'root',
})
export class RoutingService {

  public constructor(private router: Router) { }

  private createRoute(route: string): {isPlace: boolean, route: string} {
    if (route.endsWith('.php')) {
      return { isPlace: places.has(route), route: route.slice(0, -4) };
    }
    if (route.startsWith('place.php?whichplace=')) {
      return { isPlace: true, route: route.slice(21) };
    }
    return { isPlace: false, route };
  }

  public navigateTo(site: Site): void {
    const cleanedRoute = this.createRoute(site);

    if (cleanedRoute.isPlace) {
      console.log('place');
      this.router.navigate([ '/kol', 'place', cleanedRoute.route ] );
      return;
    }

    console.log('no place');
    this.router.navigate([ '/kol', cleanedRoute.route ]);
  }
}
