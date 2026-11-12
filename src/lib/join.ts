import { SITE } from './site';

export const JOIN = {
  whatsapp: { qr: '/qr/whatsapp.svg', href: SITE.links.whatsapp, title: 'Join the WhatsApp community', short: 'Meetup alerts, slides and chat', cta: 'Join on WhatsApp' },
  luma: { qr: '/qr/luma.svg', href: SITE.links.luma, title: 'Follow us on Luma', short: 'RSVP for upcoming events', cta: 'See upcoming events' },
  speak: { qr: '/qr/speak.svg', href: SITE.links.speakerForm, title: 'Speak at a meetup', short: 'Submit your talk idea', cta: 'Submit a talk' },
  volunteer: { qr: '/qr/volunteer.svg', href: SITE.links.volunteerForm, title: 'Volunteer with us', short: 'Help run the next meetup', cta: 'Volunteer form' },
} as const;
export type JoinKey = keyof typeof JOIN;
