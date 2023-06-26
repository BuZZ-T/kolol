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

  private createRoute(route: string): {isPlace: boolean, route: string, url: URL} {
    const url = new URL(route, 'http://kingdomofloathing.com/');
    if (url.pathname === '/place.php' && url.searchParams.has('whichplace')) {
      return { isPlace: true, route: route.slice(21), url };
    }
    if (url.pathname.endsWith('.php')) {
      return { isPlace: places.has(route), route: route.slice(0, -4), url };
    }
    return { isPlace: false, route, url };
  }

  public navigateTo(site: string/* Site */): void {
    const cleanedRoute = this.createRoute(site);

    if (cleanedRoute.route.startsWith('adventure.php')) {
      console.log('fight: ', site);

      const snarfblat = cleanedRoute.url.searchParams.get('snarfblat');
      if (snarfblat) {
        this.router.navigate([ '/kol', 'adventure', cleanedRoute.url.searchParams.get('snarfblat') ]);
      }
      return;
    }

    if (cleanedRoute.isPlace) {
      console.log('place: ', site);
      this.router.navigate([ '/kol', 'place', cleanedRoute.route ] );
      return;
    }

    console.log('no place: ', site);
    this.router.navigate([ '/kol', cleanedRoute.route ]);
  }
}
