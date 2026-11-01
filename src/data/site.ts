// Site-wide settings. Change contact details and links here, not in the pages.

export const site = {
  name: 'Pro Build Digital',
  legalName: 'Probuild Digital LLC',
  url: 'https://probuilddigital.com',
  owner: 'Zack Pearson',
  baseTown: 'Saybrook',
  email: 'zack.pearson@probuilddigital.com',

  // Google Voice number (440 is the local area code). It forwards to Zack's cell.
  phone: {
    display: '(440) 276-1706',
    tel: '+14402761706',
  },

  // TODO(owner): paste your scheduling link (Calendly, Google booking page, etc.).
  // While this is empty, the "Book a 15-minute call" link shows a TODO marker.
  bookingUrl: '',

  linkedIn: 'https://www.linkedin.com/in/zachary-pearson1/',

  // Form backend (Formspree). It accepts new fields without any change there.
  formAction: 'https://formspree.io/f/mkgzrnvd',
};

// Internal links use trailing slashes to match the canonical URLs Cloudflare serves.
export const navLinks = [
  { href: '/work/', label: 'Work' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/website-chatbot/', label: 'Website chatbot' },
  { href: '/about/', label: 'About' },
];
