import { menuRoutes } from 'src/app/awesome-menu/menu.types';

export type Site = `${string}.php` | `place.php?whichplace=${string}`;

export type MapTile = {
    image: string;
    url: string;
}

/**
 * 3x3 with one splitted tile = 10 Tiles
 */
export type Map = [
    MapTile,
    MapTile,
    MapTile,
    MapTile,
    MapTile,
    MapTile,
    MapTile,
    MapTile,
    MapTile,
    MapTile,
]

export const siteToRoute: Record<Site, typeof menuRoutes[keyof typeof menuRoutes]> = {
  'campground.php': menuRoutes['Campground'],
  'mountains.php': menuRoutes['The Big Mountains'],
  'place.php?whichplace=nstower': menuRoutes['The Naughty Sorceress\' Tower'],
  'place.php?whichplace=plains': menuRoutes['The Nearby Plains'],
  'town.php': menuRoutes['Seaside Town'],
  'woods.php': menuRoutes['The Distant Woods'],
} as const;
