import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Route } from './routing.types';

const places = new Map([ 
  // 'friars.php', // may be both
  [ 'town', 'town' ],
  [ 'mountains', 'mountains' ],
  [ 'woods', 'woods' ],
  [ 'forestvillage', 'forestvillage' ],
  [ 'beanstalk', 'beanstalk' ],
  [ 'giantcastle', 'giantcastle' ],
  [ 'knoll_friendly', 'knoll_friendly' ],
  [ 'bathole', 'bathole' ],
  [ 'oldman', 'sea_oldman' ],
]);

@Injectable({
  providedIn: 'root',
})
export class RoutingService {

  public constructor(private router: Router) { }

  private createRoute(rawRoute: string): Route {
    const url = new URL(rawRoute, 'http://kingdomofloathing.com/');
    const path = url.pathname.replace(/^\//, '').replace('.php', '');

    const action = url.searchParams.get('action');

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
      const placePath = places.get(path) || path;

      return { action, path: placePath, type: places.has(path) ? 'place' : 'other', url };
    }
    return { action, path, type: 'other', url };
  }

  public navigateTo(site: string): void {
    const cleanedRoute = this.createRoute(site);

    console.log('navigateTo: ', site, cleanedRoute);

    const splittedPath = cleanedRoute.path.split('/');

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
      this.router.navigate(cleanedRoute.action ? [ '/kol', 'place', ...splittedPath, cleanedRoute.action ] :  [ '/kol', 'place', ...splittedPath ] );
      
      return;
    }
    case 'shop': {
      this.router.navigate([ '/kol', 'shop', cleanedRoute.url.searchParams.get('whichshop') ]);

      return;
    }

    default: {
      console.log('no place: ', site);
      this.router.navigate(cleanedRoute.action ? [ '/kol', ...splittedPath, cleanedRoute.action ] : [ '/kol', ...splittedPath ]);

      return;
    }

    }
  }

  public login(): void {
    this.router.navigate([ '/login' ]);
  }
}
