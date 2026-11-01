// ONE place for prices. Every page and the /start form read from this file.
// Change a number here and it changes everywhere.
//
// TODO(owner): confirm what each build package includes, leaves out, and how long
// it takes. The lists below are a starting draft so the pages have structure.

export const money = (n: number) => `$${n.toLocaleString('en-US')}`;

export interface Plan {
  id: string;
  name: string;
  price: number;
  cadence: 'one time' | 'a month';
  summary: string;
  includes: string[];
  notIncluded: string[];
  timeline: string;
  // Build time as a short phrase, used in sentences ("2 weeks").
  weeks?: string;
  // Shown on the page as a visible TODO marker until you clear it.
  todo?: string;
}

export const builds: Plan[] = [
  {
    id: 'starter',
    name: 'Starter site',
    // TODO(owner): placeholder price.
    price: 900,
    cadence: 'one time',
    summary: 'A small site with the basics your customers look for.',
    includes: [
      'Up to 3 pages, such as Home, Services and Contact',
      'Works on phones, tablets and computers',
      'A contact form that sends to your email',
      'Your hours, service area and prices written out plainly',
      'A short questions and answers section',
      'Business details marked up for search engines',
      'Help setting up your Google Business Profile',
    ],
    notIncluded: ['Online store or booking', 'Logo design', 'Writing more than the basics'],
    weeks: '2 weeks',
    timeline: 'About 2 weeks, counted from when I have your photos and details.',
    todo: 'Confirm the price, the included list and the timeline.',
  },
  {
    id: 'full',
    name: 'Full site',
    // TODO(owner): placeholder price.
    price: 1500,
    cadence: 'one time',
    summary: 'More pages and more room to show your work.',
    includes: [
      'Everything in the Starter site',
      'Up to 8 pages',
      'A photo gallery of your work',
      'A questions and answers page',
      'Help writing the words for every page',
    ],
    notIncluded: ['Online store or booking', 'Logo design'],
    weeks: '3 to 4 weeks',
    timeline: 'About 3 to 4 weeks, counted from when I have your photos and details.',
    todo: 'Confirm the price, the included list and the timeline.',
  },
];

export const care: Plan[] = [
  {
    id: 'care',
    name: 'Care plan',
    price: 50,
    cadence: 'a month',
    summary: "I keep your site running so you don't have to think about it.",
    includes: ['Hosting', 'Updates', 'Small edits when you need them', 'A monthly check that everything works'],
    notIncluded: ['New pages or big changes (quoted first)'],
    timeline: 'Starts the month your site goes live.',
  },
  {
    id: 'care-chatbot',
    name: 'Care plus chatbot',
    price: 100,
    cadence: 'a month',
    summary: 'Everything in the Care plan, plus the website chat assistant.',
    includes: [
      'Everything in the Care plan',
      'The Build Bot chat on your site, set up with your business details',
      'Customer questions and contact details sent to you',
    ],
    notIncluded: ['New pages or big changes (quoted first)'],
    timeline: 'Starts the month your site goes live.',
  },
];

export const addOns = [
  {
    id: 'chatbot-addon',
    name: 'Chatbot add-on for the Care plan',
    price: 50,
    cadence: 'a month',
    note: `Adds the website chat to the ${money(care[0].price)} Care plan.`,
  },
  {
    id: 'extra',
    // TODO(owner): name this add-on and confirm the price (placeholder).
    name: 'Extra add-on (name to come)',
    price: 40,
    cadence: 'one time',
    note: '',
    todo: 'Name and describe this add-on, and confirm the $40 price.',
  },
];

// Options for "Which package interests you?" on /start.
// `legacy` lists old ?service= values from the previous contact form.
export const startOptions = [
  { value: 'starter', label: `${builds[0].name} (${money(builds[0].price)})` },
  { value: 'full', label: `${builds[1].name} (${money(builds[1].price)})` },
  { value: 'care', label: `${care[0].name} (${money(care[0].price)} a month)` },
  { value: 'care-chatbot', label: `${care[1].name} (${money(care[1].price)} a month)` },
  { value: 'website-chatbot', label: 'Website chatbot for my current site', legacy: ['chatbot'] },
  { value: 'automation', label: 'Automation or invoicing', legacy: ['automation', 'invoicing'] },
  { value: 'not-sure', label: 'Not sure yet', legacy: ['website', 'multiple', 'other'] },
];

export const lowestCare = Math.min(...care.map((p) => p.price));
