// Sample sites for the home page name preview.
// To add a business type: drop a photo in src/assets/samples/, import it here,
// and add an entry. Keywords pick the tab automatically when a visitor's business
// name contains one of the words. The first matching type in this list wins, so
// specific types sit above general ones (a "barber shop" should land on Salon,
// not Boutique).
import type { ImageMetadata } from 'astro';
import bakery from '../assets/samples/bakery.jpg';
import roofing from '../assets/samples/roofing.jpg';
import salon from '../assets/samples/salon.jpg';
import restaurant from '../assets/samples/restaurant.jpg';
import rental from '../assets/samples/rental.jpg';
import plumbing from '../assets/samples/plumbing.jpg';
import landscaping from '../assets/samples/landscaping.jpg';
import auto from '../assets/samples/auto.jpg';
import winery from '../assets/samples/winery.jpg';
import boutique from '../assets/samples/boutique.jpg';

export interface Theme {
  bg: string;
  ink: string;
  soft: string;
  accent: string;
  onAccent: string;
  rule: string;
  // 'text' = Newsreader (serif), 'display' = Archivo (sans)
  nameFont: 'text' | 'display';
  nameWeight: number;
  nameItalic?: boolean;
  logoFont: 'text' | 'display';
  logoWeight: number;
  logoCaps?: boolean;
  radius: string;
}

export interface Sample {
  id: string;
  tab: string;
  photo: ImageMetadata;
  position: string;
  nav: [string, string, string];
  line: string;
  cta: string;
  second: string;
  words: string[];
  phrases?: string[];
  theme: Theme;
}

// Tab order (what visitors see, left to right).
export const samples: Sample[] = [
  {
    id: 'bakery',
    tab: 'Bakery',
    photo: bakery,
    position: '30% 50%',
    nav: ['Menu', 'Custom cakes', 'Visit'],
    line: 'Custom cakes, pies and fresh bread, made from scratch.',
    cta: 'Order a cake',
    second: 'See the menu',
    words: [
      'bakery', 'bakeries', 'bakeshop', 'bakehouse', 'bake', 'bakes', 'baked', 'baking', 'cake', 'cakes', 'kakes',
      'cakery', 'cupcake', 'cupcakes', 'cookie', 'cookies', 'pastry', 'pastries', 'donut', 'donuts', 'doughnut',
      'doughnuts', 'bread', 'breads', 'sweets', 'treats', 'pie', 'pies', 'confections', 'patisserie', 'bagel', 'bagels',
    ],
    theme: { bg: '#fbf8f3', ink: '#2b1f18', soft: '#6e5d52', accent: '#8f3f2b', onAccent: '#ffffff', rule: '#e8e0d6', nameFont: 'text', nameWeight: 600, logoFont: 'text', logoWeight: 700, radius: '3px' },
  },
  {
    id: 'roofing',
    tab: 'Roofing',
    photo: roofing,
    position: '42% 50%',
    nav: ['Services', 'Our work', 'About'],
    line: 'Roof repair and replacement for homes in Ashtabula County.',
    cta: 'Get a quote',
    second: 'Call (440) 555-0142',
    phrases: ['garage door', 'garage doors', 'home improvement', 'kitchen and bath'],
    words: [
      'roof', 'roofs', 'roofing', 'roofer', 'roofers', 'construction', 'contracting', 'contractor', 'contractors',
      'builder', 'builders', 'building', 'remodeling', 'remodel', 'siding', 'gutter', 'gutters', 'exteriors', 'masonry',
      'concrete', 'carpentry', 'handyman', 'renovation', 'renovations', 'restoration', 'painting', 'painter', 'painters',
      'deck', 'decks', 'fence', 'fencing', 'paving', 'excavating', 'excavation', 'drywall', 'flooring', 'windows',
    ],
    theme: { bg: '#f5f6f7', ink: '#142130', soft: '#4d5b6a', accent: '#c9302c', onAccent: '#ffffff', rule: '#dde2e7', nameFont: 'display', nameWeight: 800, logoFont: 'display', logoWeight: 800, radius: '4px' },
  },
  {
    id: 'salon',
    tab: 'Salon',
    photo: salon,
    position: '55% 40%',
    nav: ['Services', 'Prices', 'Stylists'],
    line: 'Cuts, color and blowouts by appointment.',
    cta: 'Book online',
    second: 'See prices',
    phrases: ['barber shop'],
    words: [
      'salon', 'salons', 'hair', 'hairstyling', 'beauty', 'barber', 'barbers', 'barbershop', 'nails', 'nail', 'spa',
      'lash', 'lashes', 'brow', 'brows', 'stylist', 'stylists', 'blowout', 'esthetics', 'tanning',
    ],
    theme: { bg: '#f6f1ee', ink: '#2a1d1f', soft: '#6f5c5e', accent: '#2a1d1f', onAccent: '#f6f1ee', rule: '#e6dcd7', nameFont: 'text', nameWeight: 400, nameItalic: true, logoFont: 'text', logoWeight: 500, radius: '0' },
  },
  {
    id: 'restaurant',
    tab: 'Restaurant',
    photo: restaurant,
    position: '50% 45%',
    nav: ['Menu', 'Specials', 'Hours'],
    line: 'Wings, burgers and cold drinks, with takeout every day.',
    cta: 'See the menu',
    second: 'Order takeout',
    phrases: ['coffee shop', 'ice cream'],
    words: [
      'grill', 'grille', 'restaurant', 'restaurants', 'diner', 'cafe', 'kitchen', 'bar', 'pub', 'tavern', 'pizza',
      'pizzeria', 'bistro', 'eatery', 'burger', 'burgers', 'wings', 'bbq', 'barbecue', 'smokehouse', 'taco', 'tacos',
      'subs', 'deli', 'coffee', 'steakhouse', 'sushi', 'saloon', 'roadhouse', 'brewhouse', 'brewpub', 'cantina',
      'trattoria', 'creamery', 'dogs', 'chophouse', 'noodle', 'noodles',
    ],
    theme: { bg: '#1d1a17', ink: '#f4ede3', soft: '#b9ab9a', accent: '#e3a33c', onAccent: '#1d1a17', rule: '#34302b', nameFont: 'display', nameWeight: 800, logoFont: 'display', logoWeight: 800, radius: '6px' },
  },
  {
    id: 'rental',
    tab: 'Lake rental',
    photo: rental,
    position: '62% 50%',
    nav: ['The cottage', 'Rates', 'Location'],
    line: 'A lakefront cottage with room for the whole family.',
    cta: 'Check dates',
    second: 'See the cottage',
    phrases: ['lake house', 'beach house', 'bed and breakfast', 'b and b'],
    words: [
      'cottage', 'cottages', 'cabin', 'cabins', 'rental', 'rentals', 'lodge', 'lodges', 'inn', 'bnb', 'airbnb',
      'lakehouse', 'getaway', 'getaways', 'retreat', 'vacation', 'vacations', 'suites', 'motel', 'campground',
      'resort', 'beachhouse', 'bungalow', 'chalet', 'guesthouse', 'lakeshore',
    ],
    theme: { bg: '#f2f4f2', ink: '#1b2b33', soft: '#4f6068', accent: '#2c5a70', onAccent: '#ffffff', rule: '#dae0dd', nameFont: 'text', nameWeight: 500, logoFont: 'text', logoWeight: 600, radius: '999px' },
  },
  {
    id: 'plumbing',
    tab: 'Plumbing',
    photo: plumbing,
    position: '35% 50%',
    nav: ['Services', 'Service area', 'About'],
    line: 'Plumbing, heating and cooling repairs for homes and businesses.',
    cta: 'Schedule service',
    second: 'Call (440) 555-0167',
    phrases: ['air conditioning', 'water heater'],
    words: [
      'plumbing', 'plumber', 'plumbers', 'heating', 'cooling', 'hvac', 'furnace', 'furnaces', 'drain', 'drains',
      'sewer', 'septic', 'rooter', 'boiler', 'boilers', 'mechanical', 'pipe', 'pipes', 'waterworks',
    ],
    theme: { bg: '#f3f6f9', ink: '#102a43', soft: '#486581', accent: '#1f6fb2', onAccent: '#ffffff', rule: '#d9e2ec', nameFont: 'display', nameWeight: 800, logoFont: 'display', logoWeight: 800, radius: '4px' },
  },
  {
    id: 'landscaping',
    tab: 'Landscaping',
    photo: landscaping,
    position: '55% 50%',
    nav: ['Services', 'Our work', 'Contact'],
    line: 'Mowing, planting and spring and fall cleanups.',
    cta: 'Get an estimate',
    second: 'See our work',
    phrases: ['lawn care', 'snow removal'],
    words: [
      'landscaping', 'landscape', 'landscapes', 'landscaper', 'lawn', 'lawns', 'lawncare', 'mowing', 'garden', 'gardens',
      'gardening', 'nursery', 'greenhouse', 'tree', 'trees', 'snow', 'plowing', 'sod', 'mulch', 'yard', 'yards',
      'outdoor', 'outdoors', 'turf', 'hardscape', 'hardscaping', 'irrigation', 'grounds',
    ],
    theme: { bg: '#f2f4ee', ink: '#1d2a17', soft: '#56634c', accent: '#2f6b2f', onAccent: '#ffffff', rule: '#dde3d5', nameFont: 'display', nameWeight: 750, logoFont: 'display', logoWeight: 750, radius: '6px' },
  },
  {
    id: 'auto',
    tab: 'Auto repair',
    photo: auto,
    position: '55% 50%',
    nav: ['Services', 'Hours', 'Contact'],
    line: 'Brakes, tires, oil changes and engine repair for most makes and models.',
    cta: 'Book a repair',
    second: 'Call (440) 555-0119',
    phrases: ['body shop', 'auto body', 'oil change'],
    words: [
      'auto', 'autos', 'automotive', 'car', 'cars', 'garage', 'motors', 'motor', 'tire', 'tires', 'collision',
      'transmission', 'muffler', 'mufflers', 'brake', 'brakes', 'detailing', 'towing', 'mechanic', 'mechanics', 'lube',
      'truck', 'trucks', 'diesel',
    ],
    theme: { bg: '#121417', ink: '#f1f2f3', soft: '#a7adb4', accent: '#e2552d', onAccent: '#ffffff', rule: '#2a2e33', nameFont: 'display', nameWeight: 850, logoFont: 'display', logoWeight: 850, radius: '3px' },
  },
  {
    id: 'winery',
    tab: 'Winery',
    photo: winery,
    position: '50% 60%',
    nav: ['Our wines', 'Visit', 'Events'],
    line: 'Wines made from our own grapes, with a tasting room open on weekends.',
    cta: 'Plan a visit',
    second: 'See our wines',
    words: ['winery', 'wineries', 'wine', 'wines', 'vineyard', 'vineyards', 'cellars', 'cellar', 'vintner', 'vino'],
    theme: { bg: '#f5f1ea', ink: '#2a1a1f', soft: '#6d5a5f', accent: '#6b1e36', onAccent: '#ffffff', rule: '#e5ddd2', nameFont: 'text', nameWeight: 500, logoFont: 'text', logoWeight: 600, radius: '0' },
  },
  {
    id: 'boutique',
    tab: 'Boutique',
    photo: boutique,
    position: '50% 50%',
    nav: ['Shop', 'New arrivals', 'Visit'],
    line: 'Clothing, shoes and gifts, with new arrivals every week.',
    cta: 'Shop new arrivals',
    second: 'Store hours',
    phrases: ['gift shop', 'general store'],
    words: [
      'boutique', 'boutiques', 'shop', 'shoppe', 'store', 'clothing', 'apparel', 'gifts', 'gift', 'goods',
      'outfitters', 'threads', 'closet', 'wear', 'fashion', 'fashions', 'mercantile', 'emporium', 'jewelry',
      'antiques', 'antique', 'vintage', 'thrift', 'consignment', 'florist', 'flowers', 'books', 'bookstore',
    ],
    theme: { bg: '#f4f2ee', ink: '#1f1f1d', soft: '#5f5d57', accent: '#1f1f1d', onAccent: '#f4f2ee', rule: '#e2dfd8', nameFont: 'text', nameWeight: 400, logoFont: 'display', logoWeight: 600, logoCaps: true, radius: '0' },
  },
];

// Keyword matching: two-word phrases are checked first across every type, then
// single words in this order (specific types first, catch-alls last).
export const matchOrder = [
  'auto',
  'salon',
  'bakery',
  'winery',
  'restaurant',
  'rental',
  'plumbing',
  'landscaping',
  'roofing',
  'boutique',
];
