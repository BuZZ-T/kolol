export type Site = `${string}.php` | `place.php?whichplace=${string}`;

export type PageType = 'adventure' | 'place' | 'shop' | 'other';

export type Route = {
  action: string | null;
  path: string;
  type: PageType;
  url: URL;
}
