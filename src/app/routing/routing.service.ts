import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const places = new Set([ 
  // 'friars.php', // may be both
  'town',
  'mountains',
  'woods',
  'forestvillage',
  'beanstalk',
  'giantcastle',
  'knoll_friendly',
  'bathole',
]);

type RouteType = 'place' | 'shop' | 'adventure' | 'other';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {

  public constructor(private router: Router) { }

  private createRoute(rawRoute: string): {action: string | null; type: RouteType, path: string, url: URL} {
    const url = new URL(rawRoute, 'http://kingdomofloathing.com/');
    const path = url.pathname.replace(/^\//, '').replace('.php', '');

    const action = url.searchParams.get('action');
    console.log({ action, route: path, url });

    if (url.pathname === '/place.php' && url.searchParams.has('whichplace')) {
      return { action, path: url.searchParams.get('whichplace') || '', type: 'place', url };
    }
    if (url.pathname === '/shop.php' && url.searchParams.has('whichshop')) {
      return { action, path, type: 'shop', url };
    }
    if (url.pathname === '/adventure.php') {
      return { action, path, type: 'adventure', url };  
    }
    if (url.pathname.endsWith('.php')) {
      return { action, path: path, type: places.has(path) ? 'place' : 'other', url };
    }
    return { action, path, type: 'other', url };
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
      this.router.navigate(cleanedRoute.action ? [ '/kol', 'place', cleanedRoute.path, cleanedRoute.action ] :  [ '/kol', 'place', cleanedRoute.path ] );
      
      return;
    }
    case 'shop': {
      this.router.navigate([ '/kol', 'shop', cleanedRoute.url.searchParams.get('whichshop') ]);

      return;
    }

    default: {
      console.log('no place: ', site);
      this.router.navigate(cleanedRoute.action ? [ '/kol', cleanedRoute.path, cleanedRoute.action ] : [ '/kol', cleanedRoute.path ]);

      return;
    }

    }
  }
}
