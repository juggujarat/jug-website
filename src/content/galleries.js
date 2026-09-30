// Photo galleries. A gallery points to ONE of `event` or `conference` (slug);
// galleries for an event/conference are derived via selectors.js.
//
// Fields:
//   slug, title
//   event? / conference?   slug of what the photos are from
//   date                   'YYYY-MM-DD' (used for grouping by year)
//   cover                  root-relative image path
//   photos[]               [{ src, thumb?, alt, w, h }]  (w/h in px, to avoid layout shift)
//   isSample?
//
// Photo files: public/gallery/<slug>/full/<name>.webp (src, shown in the
// lightbox) and public/gallery/<slug>/thumbs/<name>.webp (thumb, shown in
// grids; falls back to src when omitted).

const DIR = '/gallery/community-day-for-java-2025-photos';
const photo = (name, alt, w, h, { thumb = true } = {}) => ({
  src: `${DIR}/full/${name}.webp`,
  ...(thumb && { thumb: `${DIR}/thumbs/${name}.webp` }),
  alt,
  w,
  h,
});

export const galleries = [
  {
    slug: 'community-day-for-java-2025-photos',
    title: 'Community Day for Java 2025',
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    cover: `${DIR}/thumbs/speaker-podium.webp`,
    photos: [
      photo('speaker-podium', "Speaker addressing the audience from the Community Day '25 podium", 1600, 1068),
      photo('moment-1', "Volunteer with a microphone in front of the Java User Group Gujarat banner", 868, 1300, { thumb: false }),
      photo('moment-2', "Organisers and a speaker holding up a hand-painted portrait in front of the sponsor backdrop", 1300, 868),
      photo('moment-3', "Volunteers handing out badges at the registration table", 1300, 868),
      photo('registration-swag', "Black Community Day '25 tote bags on the registration table", 560, 717, { thumb: false }),
      photo('audience-1', "Attendees smiling and applauding during a session", 560, 717, { thumb: false }),
      photo('team', "Volunteer team posing with the Community Day '25 sign", 560, 717, { thumb: false }),
      photo('team-backdrop', "Volunteers and speakers posing in front of the sponsor backdrop", 1600, 1068),
      photo('stage-banner', "Empty stage with Community Day '25 banners and a podium before the event", 1600, 900),
      photo('speaker-dhaval', "Speaker presenting in front of the Java User Group Gujarat banner", 1600, 1068),
      photo('speaker-jigar', "Jigar Shah presenting his DataOrb talk on LangChain4j and LLMs", 1600, 1068),
      photo('audience-seated', "Attendees seated in the auditorium, smiling at a talk", 1600, 1068),
      photo('moment-4', "Speaker presenting at the podium to a packed auditorium", 1300, 868),
      photo('audience-standing', "Attendees standing in the auditorium", 1600, 1068),
      photo('group-stage', "Organisers on stage taking a group photo with the audience", 1600, 1068),
      photo('volunteer-mic', "Volunteer speaking on stage beside the sponsor banner", 1600, 900),
      photo('hosts-stage', "Two organisers hosting on stage", 1600, 900),
      photo('speaker-venkat', "Venkat Subramaniam speaking at the podium", 500, 748, { thumb: false }),
      photo('speaker-vaibhav', "Vaibhav Choudhary speaking at the podium", 500, 748, { thumb: false }),
      photo('audience-clapping', "Audience applauding in the auditorium", 500, 748, { thumb: false }),
      photo('signboard', "Community Day '25 for Java signboard on the lawn", 500, 748, { thumb: false }),
      photo('attendee-passes', "Attendee badges laid out on the registration table", 500, 748, { thumb: false }),
      photo('checkin-desk', "Attendee speaking with a volunteer at the check-in desk", 500, 748, { thumb: false }),
      photo('scribble-wall', "Signature wall inviting attendees to write, sign or scribble their experience", 500, 748, { thumb: false }),
    ],
  },
];
