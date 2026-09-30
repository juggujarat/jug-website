// Speakers — one record per person, referenced by slug from sessions.js
// and site.js (featuredSpeakers). A speaker's talks are derived via selectors;
// never copy a speaker's name/photo into an event or session.
//
// Fields:
//   slug         kebab-case, stable (used in /speakers/:slug)
//   name         display name (mixed case)
//   photo?       root-relative path under public/ (missing → initials avatar)
//   designation  job title, e.g. 'JVM Engineer'
//   company      organisation, e.g. 'Salesforce'
//   rolePrefix?  optional text shown before the company on cards; defaults to
//                `${designation} at` (see getSpeakerRolePrefix in selectors.js)
//   bio?         short bio (only real, sourced text — never invented)
//   socials?     { linkedin?, x?, github?, website? }
//   isSample?    true for placeholder records

export const speakers = [
  {
    slug: 'venkat-subramaniam',
    name: 'Venkat Subramaniam',
    photo: '/Experts/SpeakerVenkat.webp',
    designation: 'Founder',
    company: 'Agile Developer Inc.',
    rolePrefix: 'Founder of',
  },
  {
    slug: 'vaibhav-choudhary',
    name: 'Vaibhav Choudhary',
    photo: '/Experts/Vaibhav.webp',
    designation: 'JVM Engineer',
    company: 'Salesforce',
  },
  {
    slug: 'jigar-shah',
    name: 'Jigar Shah',
    photo: '/Experts/Jigar.webp',
    designation: 'Director of Engineering',
    company: 'DataOrb',
    rolePrefix: 'Director of Engineering',
  },
  {
    slug: 'dhaval-shah',
    name: 'Dhaval Shah',
    photo: '/Experts/Dhaval.webp',
    designation: 'Principal Consulting Architect',
    bio:
      'Fintech and payments infrastructure expert with 20+ years architecting high-scale distributed systems, optimizing provisioning for large user bases.',
    socials: { linkedin: 'https://www.linkedin.com/in/dhavalshah201279/' },
  },
  {
    slug: 'siva-reddy',
    name: 'Siva Reddy',
    photo: '/Experts/Siva.webp',
    designation: 'Developer Advocate',
    company: 'JetBrains',
    bio:
      'Developer Advocate at JetBrains, focusing on empowering the developer community through technical advocacy and engagement.',
    socials: { linkedin: 'https://www.linkedin.com/in/ksivaprasadreddy/' },
  },
  {
    slug: 'vikas-rajput',
    name: 'Vikas Rajput',
    photo: '/Experts/Vikas.webp',
    designation: 'Founder',
    company: 'TechXplore',
    rolePrefix: 'Founder of',
    bio:
      'Founder of Techxplore and a Java Enterprise Architect. He also serves as a Community Manager for JUG Gujarat, empowering developers through knowledge sharing.',
    socials: {
      linkedin: 'https://linkedin.com/in/vikasrajputin',
      x: 'https://x.com/vikasrajputin',
      website: 'https://vikasrajput.in',
    },
  },
  {
    slug: 'rohan-kumar',
    name: 'Rohan Kumar',
    photo: '/Experts/Rohan.webp',
    designation: 'Software Developer',
    company: 'Red Hat',
  },
];
