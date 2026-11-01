// ONE place for prices. Every page and the /start form read from this file.
// Change a number here and it changes everywhere.
//
// Prices, package contents and terms were set in Nov 2026 from the pricing research
// ("Pro Build Digital pricing and terms" in the claude.ai project).

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
  // Build time as a short phrase, used in sentences ("1 week").
  weeks?: string;
  // How a build is paid for, shown under the timing.
  payment?: string;
  // Shown on the page as a visible TODO marker until you clear it.
  todo?: string;
}

export const builds: Plan[] = [
  {
    id: 'starter',
    name: 'Starter site',
    price: 900,
    cadence: 'one time',
    summary: 'A small site with the basics your customers look for.',
    includes: [
      'Up to 5 pages, such as Home, Services, About and Contact',
      'I polish the words you send me',
      'Help setting up your Google Business Profile',
      'Works on phones, tablets and computers',
      'A contact form that sends to your email',
      'Your hours, service area and prices written out plainly',
      'A short questions and answers section',
      'Business details marked up for search engines',
      'Two rounds of changes before launch',
    ],
    notIncluded: [
      'Online store or booking',
      'Logo design',
      'Writing every page from scratch (that comes with the Full site)',
    ],
    weeks: '1 week',
    timeline: 'About 1 week, counted from when I have your photos and details.',
    payment: `${money(900 / 2)} to start and ${money(900 / 2)} when your site goes live.`,
  },
  {
    id: 'full',
    name: 'Full site',
    price: 1500,
    cadence: 'one time',
    summary: 'More pages, and I write the words for you.',
    includes: [
      'Everything in the Starter site',
      'Up to 8 pages',
      'I write the words for every page, and you approve them',
      'A photo gallery of your work',
      'A questions and answers page',
    ],
    notIncluded: ['Online store or booking', 'Logo design'],
    weeks: '3 weeks',
    timeline: 'About 3 weeks, counted from when I have your photos and details.',
    payment: `${money(1500 / 2)} to start and ${money(1500 / 2)} when your site goes live.`,
  },
];

export const care: Plan[] = [
  {
    id: 'care',
    name: 'Care plan',
    price: 50,
    cadence: 'a month',
    summary: "I keep your site running so you don't have to think about it.",
    includes: [
      'Hosting',
      'Updates',
      'Small edits, like new hours, prices or photos',
      'A monthly check that everything works',
    ],
    notIncluded: ['New pages ($100 each) or bigger changes (priced before I start)'],
    timeline: 'Starts the day your site goes live. Cancel anytime.',
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
    notIncluded: ['New pages ($100 each) or bigger changes (priced before I start)'],
    timeline: 'Starts the day your site goes live. Cancel anytime.',
  },
];

export const addOns = [
  {
    id: 'extra-page',
    name: 'Extra page',
    price: 100,
    cadence: 'each',
    note: 'Add a page to any site, built to match the rest of it.',
  },
  {
    id: 'chatbot-addon',
    name: 'Chatbot add-on for the Care plan',
    price: 50,
    cadence: 'a month',
    note: `Adds the website chat to the ${money(care[0].price)} Care plan.`,
  },
];

// The chatbot on a website I didn't build. No setup fee. Billing starts when the
// owner approves it, or 14 days after it's sent for review with no reply.
export const chatbotOnly = { price: 100, cadence: 'a month', reviewDays: 14 };

// If a Starter client moves up to Full within this many months, the Starter price counts toward it.
export const upgradeMonths = 6;

// Options for "Which package interests you?" on /start.
// `legacy` lists old ?service= values from the previous contact form.
export const startOptions = [
  { value: 'starter', label: `${builds[0].name} (${money(builds[0].price)})` },
  { value: 'full', label: `${builds[1].name} (${money(builds[1].price)})` },
  { value: 'care', label: `${care[0].name} (${money(care[0].price)} a month)` },
  { value: 'care-chatbot', label: `${care[1].name} (${money(care[1].price)} a month)` },
  {
    value: 'website-chatbot',
    label: `Chatbot for my current website (${money(chatbotOnly.price)} a month)`,
    legacy: ['chatbot'],
  },
  { value: 'automation', label: 'Automation or invoicing', legacy: ['automation', 'invoicing'] },
  { value: 'not-sure', label: 'Not sure yet', legacy: ['website', 'multiple', 'other'] },
];

export const lowestCare = Math.min(...care.map((p) => p.price));
