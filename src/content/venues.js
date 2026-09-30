// Venue partners — organisations whose premises host our meetups/conferences.
// Each record is both the partner (name/logo/website) and the place
// (address/city/map). Events and conferences point here by slug
// (`venue` / `venues[]`); a venue's hosting history is derived via
// getVenueHistory() in selectors.js. For a one-off place that is NOT a
// partner, use an inline `location` on the event instead (see events.js).
//
// Fields:
//   slug, name, logo, website, description        partner info
//   address, city                                 place info
//   mapUrl?, mapEmbedUrl?, image?, logoAlt?, isSample?

export const venues = [
  {
    slug: 'lj-university',
    name: 'LJ University',
    logo: '/Img/LJ_Logo.svg',
    logoAlt: 'LJ Logo',
    image: '/Img/LJ_Campus.svg',
    website: 'https://ljku.edu.in/',
    description: 'A hub for future-ready talent and cutting-edge technology learning.',
    // Only address text present in the repo (AboutEvent.jsx); replace with the
    // full street address when known.
    address: 'LJ University, Ahmedabad',
    city: 'Ahmedabad',
    mapUrl: 'https://maps.app.goo.gl/PCQEcveVpwxk9YdD8',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3672.9108100708986!2d72.485711!3d22.990307!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9aee6c89a621%3A0x872df2d55fbb0008!2sLJ%20University!5e0!3m2!1sen!2sin!4v1744317485542!5m2!1sen!2sin',
  },
  {
    slug: 'gujarat-university-cpc',
    name: 'Gujarat University Centre For Professional Courses',
    logo: '/Img/gujarat-university-cpc.webp',
    website: 'https://gucpc.in/',
    address: 'Centre for Professional Courses Department, Gujarat University, Ahmedabad',
    city: 'Ahmedabad',
    mapUrl: 'https://www.google.com/maps?q=23.038873494473062,72.54532835582141',
    mapEmbedUrl: 'https://www.google.com/maps?q=23.038873494473062,72.54532835582141&output=embed',
  },
];
