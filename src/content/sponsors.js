// Sponsors, partner communities and individual supporters.
// Conferences/events reference these by slug in `sponsors[]` (with a tier)
// and `partners[]`.
//
// Fields:
//   slug, name, logo, website
//   kind         'sponsor' | 'community' | 'jug' | 'supporter'
//                ('supporter' = an individual community supporter)
//   logoAlt?     alt text for the logo (defaults to name)
//   designation?, company?, location?   only used for kind 'supporter'
//   isSample?

export const sponsors = [
  // ---- Companies ----
  {
    slug: 'codelab-technologies',
    name: 'Codelab Technologies',
    logo: '/Sponsors/Codelab.webp',
    logoAlt: 'Codelab',
    website: 'https://codelabtechnologies.com/',
    kind: 'sponsor',
  },
  {
    slug: 'rezoomex',
    name: 'Rezoomex',
    logo: '/Sponsors/rezoomex.svg',
    logoAlt: 'Rezoomx',
    website: 'https://rezoomex.com/',
    kind: 'sponsor',
  },
  {
    slug: 'staunchsys',
    name: 'Staunchsys',
    logo: '/Sponsors/Staunchsys.webp',
    website: 'https://www.staunchsys.com/',
    kind: 'sponsor',
  },
  {
    slug: 'dataorb',
    name: 'DataOrb',
    logo: '/Sponsors/dataorb.svg',
    logoAlt: 'Dataorb',
    website: 'https://www.dataorb.ai/',
    kind: 'sponsor',
  },

  {
    slug: 'jetbrains',
    name: 'JetBrains',
    logo: '/Sponsors/jetbrains.svg',
    website: 'https://www.jetbrains.com/idea/',
    kind: 'sponsor',
  },

  // ---- Individual community supporters ----
  {
    slug: 'rajesh-c',
    name: 'Rajesh C',
    logo: '/Sponsors/RajeshC.svg',
    logoAlt: 'Community',
    website: 'https://www.linkedin.com/in/rchi/',
    kind: 'supporter',
    designation: 'Java Full Stack Developer',
    location: 'Bengaluru',
  },
  {
    slug: 'hemal-trivedi',
    name: 'Hemal Trivedi',
    logo: '/Sponsors/Hemal.webp',
    logoAlt: 'Community',
    website: 'https://www.linkedin.com/in/hemalt/',
    kind: 'supporter',
    designation: 'India Director',
    company: 'SharpQuest',
  },

  // ---- Partner JUGs ----
  {
    slug: 'tamil-jug',
    name: 'Tamil JUG',
    logo: '/Img/Tamil_JUG.svg',
    website: 'https://lnkd.in/gbjUwyZU',
    kind: 'jug',
  },
  {
    slug: 'kerala-jug',
    name: 'Kerela JUG',
    logo: '/Img/Kerela_JUG.svg',
    website: 'https://www.linkedin.com/company/keralajug/',
    kind: 'jug',
  },
  {
    slug: 'bangalore-jug',
    name: 'Bangalore JUG',
    logo: '/Img/Bangalore_JUG.svg',
    website: 'https://www.meetup.com/bangalorejug',
    kind: 'jug',
  },
  {
    slug: 'hyderabad-jug',
    name: 'Hyderabad JUG',
    logo: '/Img/Hyderabad_JUG.svg',
    website: 'https://www.meetup.com/jughyderabad',
    kind: 'jug',
  },

  {
    slug: 'vjug',
    name: 'Virtual Java User Group (vJUG)',
    logo: '/Sponsors/vjug.webp',
    website: 'https://virtualjug.com/',
    kind: 'jug',
  },

  // ---- Partner communities ----
  {
    slug: 'ahmedabad-aws-cloud-meetup',
    name: 'Ahmedabad Amazon AWS Cloud Meetup',
    logo: '/Sponsors/ahmedabad-aws-cloud-meetup.webp',
    website: 'https://www.meetup.com/ahmedabad-amazon-aws-cloud-meetup/',
    kind: 'community',
  },
  {
    slug: 'devconf-india',
    name: 'DevConf India',
    logo: '/Sponsors/devconf-india.svg',
    website: 'https://www.devconf.info/in/',
    kind: 'community',
  },
  {
    slug: 'docker-ahmedabad',
    name: 'Docker Ahmedabad',
    logo: '/Img/Docker_Ahmedabad.svg',
    website: 'https://www.meetup.com/Docker-Ahmedabad/',
    kind: 'community',
  },
  {
    slug: 'open-source-weekend-ahmedabad',
    name: 'Open Source Weekend Ahmedabad',
    logo: '/Img/OSW_Ahmedabad.svg',
    website: 'https://linktr.ee/osweekend',
    kind: 'community',
  },
  {
    slug: 'cncg-ahmedabad',
    name: 'Cloud Native Community Group Ahmedabad',
    logo: '/Img/CNCG_Ahmedabad.svg',
    website: 'https://community.cncf.io/cloud-native-ahmedabad/',
    kind: 'community',
  },
  {
    slug: 'gdg-gandhinagar',
    name: 'Google Developer Group Ghandhinagar',
    logo: '/Img/GDG_Gandhinagar.webp',
    website: 'https://gdg.community.dev/gdg-gandhinagar/',
    kind: 'community',
  },
];
