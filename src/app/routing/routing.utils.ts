import { Site } from './routing.types';

/* eslint-disable sort-keys */
export const menuRoutes = {
  'Campground': 'campground',
  'Clan Hall': '',
  'Clan VIP Lounge': '',
  'Community': '',
  'Consumables (Inventory)': 'inventory', // tmp
  'Crafting': 'crafting',
  'Current Quest Log': '',
  'Equipment (Inventory)': 'inventory',
  'Main Map': 'map',
  'Messages': '',
  'Miscellaneous (Inventory)': 'inventory',
  'Mysterious Island': '',
  'Options': 'options',
  'Options Menu': '',
  'Search the Mall': '',
  'Seaside Town': 'seaside-town',
  'Support the Kingdom': '',
  'The Big Mountains': 'the-big-mountains',
  'The Distant Woods': 'the-distant-woods',
  'The Naughty Sorceress\' Tower': 'naugthy-sorceress-tower',
  'The Nearby Plains': '',
  'Tongue of the Walrus': '',
  'Your Inventory': 'inventory',
  'Your Skills': 'skills',

  'Right Side of the Tracks': 'right-side-of-the-tracks',
  'Wrong Side of the Tracks': 'wrong-side-of-the-tracks',
} as const;
/* eslint-enable sort-keys */

export const siteToRoute: Record<Site, typeof menuRoutes[keyof typeof menuRoutes]> = {
  'campground.php': menuRoutes['Campground'],
  'mountains.php': menuRoutes['The Big Mountains'],
  'place.php?whichplace=nstower': menuRoutes['The Naughty Sorceress\' Tower'],
  'place.php?whichplace=plains': menuRoutes['The Nearby Plains'],
  'place.php?whichplace=town_right': menuRoutes['Right Side of the Tracks'],
  'place.php?whichplace=town_wrong': menuRoutes['Wrong Side of the Tracks'],
  'town.php': menuRoutes['Seaside Town'],
  'woods.php': menuRoutes['The Distant Woods'],
} as const;
  
