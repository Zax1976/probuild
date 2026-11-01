// Towns served. Coordinates come from each town's Wikipedia entry (decimal degrees).
// `page` is set for towns that have their own page; the map and footer link to it.

export interface Town {
  name: string;
  lat: number;
  lon: number;
  county: 'Ashtabula' | 'Lake';
  page?: string;
  // Which side of the dot the map label sits on (desktop, mobile).
  label: { d: 'n' | 's' | 'e' | 'w'; m: 'n' | 's' | 'e' | 'w' };
}

export const towns: Town[] = [
  { name: 'Painesville', lat: 41.7394, lon: -81.2497, county: 'Lake', label: { d: 's', m: 's' } },
  { name: 'Madison', lat: 41.7717, lon: -81.0531, county: 'Lake', label: { d: 's', m: 's' } },
  { name: 'Geneva', lat: 41.8006, lon: -80.9461, county: 'Ashtabula', page: '/web-design-geneva-ohio/', label: { d: 's', m: 's' } },
  { name: 'Geneva-on-the-Lake', lat: 41.8594, lon: -80.9539, county: 'Ashtabula', label: { d: 'w', m: 'w' } },
  { name: 'Ashtabula', lat: 41.8744, lon: -80.7958, county: 'Ashtabula', label: { d: 'e', m: 'n' } },
  { name: 'Jefferson', lat: 41.7386, lon: -80.7569, county: 'Ashtabula', page: '/web-design-jefferson-ohio/', label: { d: 's', m: 's' } },
  { name: 'Conneaut', lat: 41.925, lon: -80.5903, county: 'Ashtabula', page: '/web-design-conneaut-ohio/', label: { d: 's', m: 's' } },
];

// Where Zack works from (Saybrook Township, Wikipedia coordinates).
export const home = { name: 'Saybrook', lat: 41.8661, lon: -80.8489 };

// Footer order, west to east along the lake, then inland.
export const footerTowns = [
  'Ashtabula',
  'Geneva',
  'Geneva-on-the-Lake',
  'Conneaut',
  'Jefferson',
  'Madison',
  'Painesville',
].map((name) => towns.find((t) => t.name === name)!);
