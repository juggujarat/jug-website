// Community-wide settings: name, stats, social links, featured content.
// Plain data only — no React, no window/document (must stay SSR-safe).

export const site = {
  name: 'Gujarat JUG',
  fullName: 'Gujarat Java User Group',
  tagline: 'Connect , Code , Learn',
  description:
    'Gujarat Java User Group (JUG) is a thriving community of Java developers, tech enthusiasts, and industry professionals. Join us to learn, network, and grow!',
  url: 'https://www.gujaratjug.org',
  logo: '/Home/community-logo.svg',
  // Default social-share image (raster; SVG isn't supported by most OG consumers).
  ogImage: '/Img/AboutCommunity.png',
  joinUrl: 'https://linktr.ee/juggujarat',
  volunteerFormUrl: 'https://forms.gle/TQrY7pC7k7heAw87A',
  lumaCalendarUrl: 'https://luma.com/juggujarat',
  lumaIcsUrl: 'https://api.lu.ma/ics/get?entity=calendar&id=cal-9GeA8E6xpITOUpi',
  timeZone: 'Asia/Kolkata',
  // Footer shows © this year – current IST year (never earlier than this).
  copyrightStartYear: 2025,
  stats: {
    members: '500',
  },
  // About page "Our Journey" figures, from the "Our Journey" slide of the
  // CDJ 2026 sponsorship deck (update them together when the deck changes).
  journey: [
    { value: '1.5+ years', label: 'Since inception' },
    { value: '19', label: 'Meetups' },
    { value: '2600+', label: 'Registrations' },
    { value: '1100+', label: 'In-person attendees' },
  ],
  socials: {
    linkedin: 'https://www.linkedin.com/company/juggujarat/',
    x: 'https://x.com/juggujarat',
    whatsapp: 'https://chat.whatsapp.com/I3W75ItQTNs7Hr7WzRWcPR',
    youtube: 'https://www.youtube.com/@juggujarat',
  },
  about:
    'Gujarat Java User Group (Gujarat JUG) is a thriving community of Java developers, architects, students, and technology enthusiasts passionate about learning, sharing, and growing together.',
  mission:
    'Our mission is to empower Java professionals, promote best practices, and create a platform where developers can connect, collaborate, and innovate.',
  // About page copy, from the Gujarat JUG sponsorship decks (2025 and 2026).
  whatWeDo: {
    meetups:
      'Community meetups and technical sessions that bring together Java developers, students and industry experts to learn, collaborate and grow.',
    workshops: 'Hands-on workshops and technical labs designed for deep, practical learning.',
    conferences:
      'Community Day for Java, our flagship annual conference: a full-day technical immersive designed to celebrate innovation and collaboration.',
  },
  nonCommercial:
    'Gujarat JUG is a community-driven, volunteer-run initiative and part of the worldwide Java User Group network, registered with Oracle.',
  participate: {
    attend: 'Come along to a meetup or conference, and follow our Luma calendar so you never miss one.',
    speak: 'Have something to share? Submit a talk while a call for papers is open.',
    speakClosed: 'Speaking slots open with each call for papers. Get in touch and we will let you know.',
    host: 'Have a venue and want to host a meetup? See our venue partners.',
    join: 'Chat with fellow Java developers and hear about events first.',
  },
  // Speaker slugs shown in the home page "Here Come the Experts!" section, in order.
  featuredSpeakers: ['siva-reddy', 'vikas-rajput', 'vaibhav-choudhary', 'rohan-kumar'],
  // YouTube embeds shown in the home page "Our Sessions" section, in order.
  // Talk titles/speakers for these recordings are not in the repo yet, so they
  // are kept as plain videos rather than session records.
  featuredVideos: [
    { embedUrl: 'https://www.youtube.com/embed/65jLZYSIB3A?si=ePFhouw1u49R6grn' },
    { embedUrl: 'https://www.youtube.com/embed/5z53EUXWjtU?si=9BJdbWhAxrAVxi8s' },
  ],
};
