// Events — single-day community meetups.
// To add a meetup: copy one object, give it a new unique kebab-case slug,
// and fill in the fields. Talks go in sessions.js (with `event: '<slug>'`).
// Status (upcoming/live/completed) is computed from date + startTime/endTime
// in Asia/Kolkata by status.js; set `statusOverride` only to force it.
//
// Fields:
//   slug             kebab-case, stable (used in /events/:slug)
//   name
//   description
//   date             'YYYY-MM-DD'
//   startTime        'HH:mm' (IST, 24h)
//   endTime          'HH:mm' (IST, 24h)
//   venue?           venue partner slug (venues.js)             } exactly one
//   location?        { name, address?, city } inline place      } of these
//   online?          true for online-only events                } is required
//                    (use `location` when the place isn't a venue partner)
//   banner?          root-relative image path under public/
//   registrationUrl?
//   externalUrl?     Luma (or other) event page
//   conference?      conference slug, if this meetup is part of one
//   statusOverride?  'upcoming' | 'live' | 'completed'
//   isSample?        true for placeholder records

export const events = [
  {
    slug: 'building-modular-monoliths-using-spring-modulith',
    name: 'Building Modular Monoliths Using Spring Modulith',
    description: 'Online meetup hosted by Java User Group Gujarat, Vikas Rajput and Bharat Ranpariya.',
    date: '2024-09-29',
    startTime: '10:00',
    endTime: '11:30',
    online: true,
    externalUrl: 'https://luma.com/tw7wx50t',
  },
];
