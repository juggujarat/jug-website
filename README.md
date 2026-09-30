# Gujarat JUG Website

Website of the Gujarat Java User Group (JUG) and Community Day for Java. Contributions are welcome.

## Project overview

The site covers meetups, conferences (Community Day for Java), speakers, photo galleries, venue and community partners, and an about page.

- React 18 + Vite, Tailwind CSS v3, React Router.
- All content lives in plain JavaScript files in `src/content/` (events, conferences, speakers, sessions, venues, sponsors, galleries, site). Event, speaker and conference pages read it through `src/content/selectors.js`. The exception is the core team, which lives in `src/data/volunteerData.jsx` (home and About pages); each conference's volunteer team is its `volunteers` list in `conferences.js`.
- `npm run build` prerenders every route to static HTML, deployed on Vercel (`vercel.json`).

## Getting started

Requires Node.js 18+ and npm.

```bash
git clone https://github.com/juggujarat/jug-website.git
cd jug-website
npm ci
npm run dev       # dev server, http://localhost:5173
npm run lint      # ESLint
npm run build     # validate content, build, prerender into dist/
npm run preview   # serve dist/ locally (run build first)
```

`npm run build` first runs `prebuild` (`scripts/validate-content.mjs`), which checks all content and fails with a readable list of problems: unknown slug references, duplicate or non-kebab-case slugs, missing required fields, bad dates and times, and image files missing from `public/`. Run it after every content change.

### What the build does

1. Validates `src/content` (above).
2. `vite build` builds the client into `dist/`.
3. `vite build --ssr src/entry-server.jsx` builds the server renderer into `dist-ssr/`.
4. `scripts/prerender.mjs` renders every route (static pages, plus one page per event, conference, speaker and gallery, and `404`) to `dist/<route>.html`, writes `sitemap.xml` and `robots.txt`, and fails if any internal link points to a page that was not written.

Because pages are rendered on the server first, components must be SSR-safe: do not touch `window`, `document` or `localStorage` during render; use `useEffect` for browser-only code.

## Content model

| File | Holds |
| --- | --- |
| `src/content/events.js` | Single-day meetups |
| `src/content/conferences.js` | Multi-track conferences (Community Day for Java) |
| `src/content/sessions.js` | Talks, workshops, panels, keynotes and agenda slots (registration, opening, breaks) |
| `src/content/speakers.js` | One record per person |
| `src/content/venues.js` | Venue partners (organisations that host us) |
| `src/content/sponsors.js` | Sponsors, partner communities, individual supporters |
| `src/content/galleries.js` | Photo galleries |
| `src/content/site.js` | Site-wide settings (URL, featured speakers, social links) |

The full field list for each entity is documented at the top of its file. Rules are enforced by `src/content/validate.js`. Slugs are lowercase kebab-case, unique per file, and used in URLs (`/events/<slug>`, `/speakers/<slug>`, ...). Records reference each other by slug; never copy a speaker's name or photo into an event.

## How to add content

Add records to the array exported by the relevant file, then run `npm run build`. Records with `isSample: true` are placeholders; do not copy that field.

### Add a meetup

Three pieces: the event, its speakers, and its sessions (talks).

1. Add the event to `src/content/events.js`. Set exactly one of `venue` (a venue partner slug), `location` (a place that is not a partner) or `online: true`.

```js
{
  slug: 'java-21-features-meetup',
  name: 'Java 21 Features Meetup',
  description: 'An evening of talks on what is new in Java 21.',
  date: '2026-11-15',
  startTime: '10:00', // IST, 24h
  endTime: '13:00',
  venue: 'lj-university', // a slug from venues.js
  // location: { name: 'Coworking Space', address: 'SG Highway', city: 'Ahmedabad' },
  // online: true,
  // banner: '/Events/java-21-features-meetup.webp', // optional, the files must exist (see Images)
  // registrationUrl: 'https://luma.com/your-event', // optional
  // externalUrl: 'https://luma.com/your-event', // optional
},
```

2. Add each new speaker to `src/content/speakers.js` (skip if they already exist). See "Add a speaker".

3. Add one session per talk to `src/content/sessions.js`. A session points to its meetup with `event` and to its speakers by slug. `type` is one of `talk`, `workshop`, `panel`, `keynote`, `registration`, `opening`, `break`. Talk-like types need at least one speaker; `registration`, `opening` and `break` use `speakers: []`. Session `date` is optional for meetups (it defaults to the event date; if set it must match).

```js
{
  slug: 'java-21-features-meetup-pattern-matching',
  title: 'Pattern Matching in Practice',
  description: 'Records, sealed types and pattern matching for switch.', // optional
  type: 'talk',
  event: 'java-21-features-meetup',
  speakers: ['asha-patel'], // speaker slugs
  startTime: '10:30',
  endTime: '11:15',
  // room, slidesUrl, videoUrl, repoUrl are optional
},
```

Speakers on a meetup page are derived from its sessions. Do not list them on the event.

### Add a conference

Add to `src/content/conferences.js`. Only `slug`, `name`, `startDate`, `endDate` are required by validation, but the page uses most other fields (see the field list at the top of that file). Sessions point to the conference with `conference: '<slug>'`, must have a `date` between `startDate` and `endDate`, and may have a `track` (a `tracks[].slug` of that conference).

```js
{
  slug: 'community-day-for-java-2027',
  name: 'Community Day for Java 2027',
  tagline: 'One day, all things Java.',
  description: ['First paragraph.', 'Second paragraph.'],
  startDate: '2027-02-20',
  endDate: '2027-02-20',
  startTime: '09:00',
  endTime: '18:00',
  location: 'LJ University, Ahmedabad',
  venues: ['lj-university'],
  tracks: [{ slug: 'core-java', name: 'Core Java' }],
  highlights: ['20+ talks', 'Hands-on workshops'],
  registrationUrl: 'https://luma.com/your-conference',
  cfp: { url: 'https://sessionize.com/your-cfp', closesOn: '2026-12-31' },
  sponsors: [], // e.g. { sponsor: '<slug from sponsors.js>', tier: 'gold' }
  partners: [], // sponsor slugs of kind 'jug' or 'community'
},
```

The call for papers is shown as open while the conference is upcoming or live and before `cfp.closesOn` (end of that day, IST). Omit `closesOn` to keep it open until the conference. Remove `cfp` to hide it.

### Add a speaker

Add to `src/content/speakers.js`. `slug` and `name` are required.

```js
{
  slug: 'asha-patel',
  name: 'Asha Patel',
  photo: '/Experts/asha-patel.webp', // optional; the file must exist. Without it an initials avatar is shown
  designation: 'JVM Engineer',
  company: 'Example Corp',
  bio: 'One or two real sentences.', // optional, only real text
  socials: { linkedin: 'https://www.linkedin.com/in/...', x: 'https://x.com/...', github: 'https://github.com/...', website: 'https://...' }, // all optional
},
```

A speaker's page lists their talks automatically, from sessions that reference their slug. To feature a speaker on the home page, add the slug to `featuredSpeakers` in `src/content/site.js`.

### Add a gallery

Add to `src/content/galleries.js`. Point it to exactly one of `event` or `conference`. `cover`, `photos[].src` and `photos[].thumb` must exist under `public/`; `alt` is required; `w`/`h` are the real pixel size of the full image.

```js
{
  slug: 'java-21-features-meetup-photos',
  title: 'Java 21 Features Meetup',
  event: 'java-21-features-meetup',
  date: '2026-11-15',
  cover: '/gallery/java-21-features-meetup-photos/thumbs/photo-1.webp', // needs a photo-1.jpg twin beside it
  photos: [
    {
      src: '/gallery/java-21-features-meetup-photos/full/photo-1.webp',
      thumb: '/gallery/java-21-features-meetup-photos/thumbs/photo-1.webp',
      alt: 'Attendees listening to the opening talk',
      w: 1600,
      h: 1067,
    },
  ],
},
```

### Add a venue partner

Add to `src/content/venues.js`. A venue is both the partner (name, logo, website) and the place (address, city). Use it from an event with `venue: '<slug>'` or from a conference in `venues: ['<slug>']`. For a one-off place that is not a partner, use an inline `location` on the event instead.

```js
{
  slug: 'example-tech-hub',
  name: 'Example Tech Hub',
  logo: '/Partners/example-tech-hub.svg', // file must exist under public/
  logoAlt: 'Example Tech Hub logo', // optional
  website: 'https://example.com',
  description: 'One sentence on the partnership.',
  address: '1 Example Road, SG Highway',
  city: 'Ahmedabad',
  mapUrl: 'https://maps.google.com/?q=...', // optional
},
```

Sponsors and partner communities are added the same way in `src/content/sponsors.js` (`kind` is `sponsor`, `community`, `jug` or `supporter`) and referenced from a conference's `sponsors[]` (with a `tier`) or `partners[]`.

## Status: upcoming, live, completed

Never write a status by hand. `src/content/status.js` computes it from the event `date` + `startTime`/`endTime` (or a conference's `startDate`/`endDate` + times) in Asia/Kolkata (IST), so the same result is produced at build time and in the browser. A missing `startTime` counts as 00:00 and a missing `endTime` as 23:59. Before start is `upcoming`, between start and end is `live`, after end is `completed`.

Set `statusOverride: 'upcoming' | 'live' | 'completed'` only to force a status (for example, a postponed event). Remove it afterwards.

The site is prerendered, so pages reflect the status at build time and update in the browser once loaded. Redeploy after an event ends if you want the static HTML to be current.

## Luma and registration links

`src/content/events.js` is the source of truth for meetups. Luma is not synced automatically. Put the Luma page in `externalUrl` and/or `registrationUrl` when you add the meetup, and update the event record if details change on Luma.

## Images

Everything under `public/` is served from the site root, so `public/Events/x.webp` is `/Events/x.webp` in content. Use kebab-case file names without spaces. Paths are case-sensitive (Vercel runs on Linux), and validation checks them that way.

Convert with [sharp-cli](https://github.com/vibecode/sharp-cli) (no install needed):

```bash
# WebP, max width 1200 (never upscales)
npx --yes sharp-cli -i in.jpg -o out.webp -f webp -q 80 resize 1200 --withoutEnlargement
# JPEG share twin, same width
npx --yes sharp-cli -i in.jpg -o out.jpg -f jpeg -q 80 resize 1200 --withoutEnlargement
```

- **Banners** (events and conferences), for `banner: '/Events/name.webp'`, need three files next to each other:
  - `name.webp` (1200w, aspect ratio about 2:1, like the existing 1200x600 banners)
  - `name-640.webp` (640w, used for cards and small screens)
  - `name.jpg` (1200w, used for social share previews, since not every scraper reads WebP)
- **Gallery** photos, in `public/gallery/<gallery-slug>/`:
  - `full/<name>.webp`, max 1600w (`src`, shown in the lightbox)
  - `thumbs/<name>.webp`, 800w (`thumb`, shown in the grid)
  - the cover is a thumb path and needs a `.jpg` twin beside it (`thumbs/<name>.jpg`)
  - record the real pixel `w`/`h` of the full image
- **Speaker photos**: `.webp` plus a `.jpg` twin with the same name.

`npm run build` fails if any referenced file or twin is missing.

## Styling and breakpoints

Tailwind screens in `tailwind.config.js` are min-max ranges, not mobile-first:

| Prefix | Applies to |
| --- | --- |
| `sm:` | 320-768px only |
| `md:` | 768-1023px only |
| `lg:` | 1024-1279px only |
| `xl:` | 1280px and up |
| `2xl:` | 1440px and up |

Unprefixed classes apply at every width, and `sm:` does not cascade upward. Write the desktop style unprefixed, then override with `sm:` (mobile) and `md:` (tablet). A style meant for both tablet and mobile needs both `sm:x md:x`.

## Contributing

1. Fork the repository and clone your fork.
2. Create a branch: `git checkout -b feature/your-change`.
3. Make your change. For content changes, run `npm run build`; for code changes also run `npm run lint`.
4. Commit, push, and open a pull request against `main`.

## Stay connected

- [X (Twitter)](https://x.com/juggujarat)
- [LinkedIn](https://www.linkedin.com/company/juggujarat)
