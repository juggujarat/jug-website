import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const socials = z
  .object({
    linkedin: z.string().url().optional(),
    x: z.string().url().optional(),
    github: z.string().url().optional(),
    website: z.string().url().optional(),
    instagram: z.string().url().optional(),
    youtube: z.string().url().optional(),
  })
  .default({});

/** Every human in the community: speakers, core team, volunteers, hosts. One file each. */
const people = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    photo: z.string().optional(),
    headline: z.string().optional(), // e.g. "System Architect"
    company: z.string().optional(),
    companyUrl: z.string().url().optional(), // backlink for the company name
    city: z.string().optional(),
    /** core = organising team, volunteer = active volunteer. Speaker status is derived from events. */
    roles: z.array(z.enum(['founder', 'core', 'volunteer'])).default([]),
    teamTitle: z.string().optional(), // e.g. "Co-founder & Lead Organiser"
    order: z.number().default(100),
    socials,
  }),
});

/** Companies and communities that support us. One file each. */
const partners = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/partners' }),
  schema: z.object({
    name: z.string(),
    logo: z.string().optional(),
    website: z.string().url().optional(),
    kind: z.enum(['company', 'community', 'university', 'jug']).default('company'),
    city: z.string().optional(),
  }),
});

const partnerRole = z.enum([
  'venue',
  'sponsor',
  'food',
  'goodies',
  'swag',
  'community',
  'media',
  'knowledge',
]);

/** One file per meetup/conference. The Markdown body is the event article/recap. */
const events = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
    /** 150-160 character summary used for the meta description and article intro */
    summary: z.string().optional(),
    date: z.coerce.date(),
    startTime: z.string().optional(), // e.g. 10:30 (IST)
    endTime: z.string().optional(),
    endDate: z.coerce.date().optional(),
    /** true when we know only the month, not the exact day */
    dateApproximate: z.boolean().default(false),
    format: z.enum(['meetup', 'conference', 'online', 'workshop', 'special']).default('meetup'),
    city: z.string().default('Ahmedabad'),
    venueName: z.string().optional(),
    address: z.string().optional(),
    mapUrl: z.string().url().optional(),
    lumaUrl: z.string().url().optional(),
    registrationUrl: z.string().url().optional(),
    registered: z.number().optional(),
    attended: z.number().optional(),
    cover: z.string().optional(),
    /** Position in the Luma past-events list; photos are read from src/assets/meetups/meetup-<n>/ */
    meetupNumber: z.number().int().positive().optional(),
    /** File name of the group photo inside the meetup folder (defaults to a file whose name contains "group") */
    banner: z.string().optional(),
    gallery: z
      .array(z.object({ src: z.string(), alt: z.string().default(''), caption: z.string().optional() }))
      .default([]),
    videos: z.array(z.object({ youtubeId: z.string(), title: z.string() })).default([]),
    agenda: z.array(z.object({ time: z.string(), item: z.string() })).default([]),
    talks: z
      .array(
        z.object({
          title: z.string(),
          kind: z.enum(['talk', 'panel', 'workshop', 'keynote', 'open-mic']).default('talk'),
          speakers: z.array(reference('people')).default([]),
          abstract: z.string().optional(),
          slidesUrl: z.string().url().optional(),
          recordingUrl: z.string().url().optional(),
        }),
      )
      .default([]),
    hosts: z.array(reference('people')).default([]),
    partners: z.array(z.object({ partner: reference('partners'), role: partnerRole })).default([]),
    /** Goodies, swag and giveaways handed out at the event */
    giveaways: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    /** false until the recap article has been written */
    recapReady: z.boolean().default(false),
  }),
});

export const collections = { people, partners, events };
