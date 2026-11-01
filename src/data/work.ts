import type { ImageMetadata } from 'astro';
import pearlBeach from '../assets/work/pearl-beach-cottages.png';
import julesRv from '../assets/work/jules-rv-awnings.png';
import keptPages from '../assets/work/keptpages.png';
import cottagesConcierge from '../assets/work/cottages-concierge.png';

// Screenshots live in src/assets/work/. Astro resizes and compresses them at build.
// A project with `image: null` shows a TODO placeholder until a screenshot is added.

export interface ClientSite {
  name: string;
  businessType: string;
  town: string;
  built: string;
  url: string;
  image: ImageMetadata | null;
}

export const clientSites: ClientSite[] = [
  {
    name: 'Pearl Beach Cottages',
    businessType: 'Vacation rentals',
    town: 'Saybrook Township, on Lake Erie',
    built: 'Website and website chatbot',
    url: 'https://pearlbeachcottages.com',
    image: pearlBeach,
  },
  {
    name: 'Jules RV Awnings',
    businessType: 'Mobile RV awning repair',
    town: 'Western Maine',
    built: 'Website and domain move',
    url: 'https://julesrvawnings.com',
    image: julesRv,
  },
  // TODO(owner): add Predator Node when it launches.
  // {
  //   name: 'Predator Node',
  //   businessType: 'Members site and store',
  //   town: 'TODO',
  //   built: 'Website, membership and AI assistant',
  //   url: 'https://predatornode.com',
  //   image: null,
  // },
];

export interface Product {
  name: string;
  line: string;
  url: string;
  image: ImageMetadata | null;
}

// Products Zack built and runs himself. Not client work.
export const products: Product[] = [
  {
    name: 'KeptPages',
    line: 'An app that turns handwritten family recipes and pages into printed books.',
    url: 'https://keptpages.com',
    image: keptPages,
  },
  {
    name: 'Cottages Concierge',
    line: 'An AI guest assistant for vacation rental hosts.',
    url: 'https://cottagesconcierge.com',
    image: cottagesConcierge,
  },
];
