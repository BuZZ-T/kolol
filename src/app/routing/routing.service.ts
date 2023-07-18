import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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

type RouteType = 'place' | 'shop' | 'adventure' | 'other';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {

  public constructor(private router: Router) { }

  private createRoute(route: string): {type: RouteType, route: string, url: URL} {
    const url = new URL(route, 'http://kingdomofloathing.com/');
    if (url.pathname === '/place.php' && url.searchParams.has('whichplace')) {
      return { route: route.slice(21), type: 'place', url };
    }
    if (url.pathname === '/shop.php' && url.searchParams.has('whichshop')) {
      return { route, type: 'shop', url };
    }
    if (url.pathname === '/adventure.php') {
      return { route, type: 'adventure', url };  
    }
    if (url.pathname.endsWith('.php')) {
      return { route: route.slice(0, -4), type: places.has(route) ? 'place' : 'other', url };
    }
    return { route, type: 'other', url };
  }

  public navigateTo(site: string): void {
    const cleanedRoute = this.createRoute(site);

    console.log('navigateTo: ', site, cleanedRoute);

    switch(cleanedRoute.type) {
    case 'adventure': {
      const snarfblat = cleanedRoute.url.searchParams.get('snarfblat');
      if (snarfblat) {
        this.router.navigate([ '/kol', 'adventure', snarfblat ]);
      } else {
        this.router.navigate([ '/kol', 'adventure' ]);
      }
      
      return;
    }
    case 'place': {
      console.log('place: ', site);
      this.router.navigate([ '/kol', 'place', cleanedRoute.route ] );
      
      return;
    }
    case 'shop': {
      this.router.navigate([ '/kol', 'shop', cleanedRoute.url.searchParams.get('whichshop') ]);

      return;
    }

    default: {
      console.log('no place: ', site);
      this.router.navigate([ '/kol', cleanedRoute.route ]);

      return;
    }

    }
  }
}
