export const menuRoutes = {
  'Campground': 'campground',
  'Clan Hall': '',
  'Clan VIP Lounge': '',
  'Community': '',
  'Consumables (Inventory)': '',
  'Crafting': 'crafting',
  'Current Quest Log': '',
  'Equipment (Inventory)': '',
  'Main Map': 'map',
  'Messages': '',
  'Miscellaneous (Inventory)': '',
  'Mysterious Island': '',
  'Options': 'options',
  'Options Menu': '',
  'Search the Mall': '',
  'Seaside Town': '',
  'Support the Kingdom': '',
  'The Big Mountains': 'the-big-mountains',
  'The Distant Woods': 'the-distant-woods',
  'The Naughty Sorceress\' Tower': '',
  'The Nearby Plains': '',
  'Tongue of the Walrus': '',
  'Your Inventory': 'inventory',
  'Your Skills': 'skills',
} satisfies Record<string, string>;

export type MenuEntry = {
    image: string;
    name: string;
    route: string;
}
