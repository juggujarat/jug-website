// Conferences — multi-track / flagship events (e.g. Community Day for Java).
// Status (upcoming/live/completed) is computed from startDate/endDate +
// startTime/endTime in Asia/Kolkata by status.js — never hand-write it.
// Set `statusOverride` only to force a status manually.
//
// Fields:
//   slug, name, tagline, description (string[] paragraphs)
//   startDate, endDate          'YYYY-MM-DD'
//   startTime, endTime          'HH:mm' IST (startTime applies to startDate, endTime to endDate)
//   location                    human-readable, e.g. 'LJ University, Ahmedabad'
//   venues[]                    venue slugs (venues.js)
//   banner?, registrationUrl?, externalUrl?
//   heroLogo?                   { src, width, height, srcSm, widthSm, heightSm } hero wordmark art
//   featuredSpeaker?            { speaker: <speaker slug>, image, width, height, imageSm, widthSm, heightSm } hero cut-out
//   aboutImage?                 { src, width, height } illustration next to the About text
//   goodies[]?                  [{ image, text }] "More Than Just Talks" perks
//   sponsorship?                { deckEmbedUrl, phone } sponsorship pitch section
//   cfp?                        { url, closesOn? ('YYYY-MM-DD') } call for papers
//   tracks[]                    [{ slug, name }]
//   highlights[]                short bullet strings
//   stats                       { attendees, speakers? } (display strings; speakers = expected count before the lineup is announced)
//   volunteers[]?               [{ name, role, company, image, linkedin? }] "Our Rockstar Volunteer" team
//   announcements[]             [{ date, title, body }]
//   sponsors[]                  [{ sponsor: <sponsor slug>, tier: 'platinum'|'gold'|'silver'|'community-supporter' }]
//   partners[]                  sponsor slugs of kind 'jug' / 'community', in display order
//   statusOverride?             'upcoming' | 'live' | 'completed'
//   isSample?
//
// Sessions point at a conference via `conference: <slug>` (sessions.js);
// speakers are derived from those sessions.

// Slug of the flagship conference (/community-day-for-java-2025 redirects to its page).
// The single place this string lives in code; routes and pages import it.
export const CDJ_2025_SLUG = 'community-day-for-java-2025';

export const conferences = [
  {
    slug: 'community-day-for-java-2026',
    name: 'Community Day for Java, 2026',
    tagline: "Gujarat's BIGGEST Java Community Conference",
    description: [
      'Community Day for Java (CDJ 2026) is one day, 600+ innovators, 3 parallel tracks and hands-on labs on the future of Java.',
      'A full-day technical immersive in the heart of Ahmedabad city.',
    ],
    startDate: '2026-10-24',
    endDate: '2026-10-24',
    location: 'Centre for Professional Courses Department, Gujarat University, Ahmedabad',
    venues: ['gujarat-university-cpc'],
    banner: '/conferences/cdj-2026/banner.webp',
    registrationUrl: 'https://konfhub.com/community-day-for-java-2026',
    externalUrl: 'https://www.communitydayforjava.com/',
    aboutImage: { src: '/conferences/cdj-2026/about.webp', width: 1133, height: 1150 },
    goodies: [
      { image: '/Goodies/Food.webp', text: 'Community Fuel – Full catering, breakfast and lunch included for every attendee.' },
      { image: '/Goodies/Bag.webp', text: 'Cool Swag – Limited-edition merchandise and collectibles for the community.' },
      {
        image: '/Goodies/Speakers.webp',
        text: 'Java for AI era – Sessions on building intelligent, AI-powered apps and tooling with modern Java.',
      },
    ],
    sponsorship: {
      deckEmbedUrl: 'https://docs.google.com/presentation/d/1HRvy4j8G7B_0tfvsxr3V5fmiTW7-pGHECAZ7WPTncBE/embed',
      phone: '98791 29867',
    },
    cfp: { url: 'https://sessionize.com/community-day-for-java-2026/', closesOn: '2026-09-25' },
    tracks: [
      { slug: 'core-java', name: 'Core Java' },
      { slug: 'enterprise-and-cloud', name: 'Enterprise & Cloud' },
      { slug: 'workshops', name: 'Workshops' },
    ],
    highlights: ['Java for AI era', 'Hands-on Workshops', 'Community Fuel', 'Cool Swag', 'Unlimited Networking'],
    stats: { attendees: '600+', speakers: '15+' },
    announcements: [],
    volunteers: [
      { name: 'Dhaval Gajjar', role: 'System Architect', company: 'Staunchsys IT Services', image: '/Volunteer/Dhaval.webp', linkedin: 'https://www.linkedin.com/in/dhavalgajjarin/' },
      { name: 'Vikas Rajput', role: 'Founder', company: 'TechXplore', image: '/Volunteer/Vikas.webp', linkedin: 'https://www.linkedin.com/in/vikasrajputin/' },
      { name: 'Bharat Ranpariya', role: 'Engineering Manager', company: 'DataOrb', image: '/Volunteer/Bharat.webp', linkedin: 'https://www.linkedin.com/in/bharat-ranpariya/' },
      { name: 'Daman Singh Rajput', role: 'Java FullStack Developer', company: 'Techxplore', image: '/Volunteer/cdj-2026/daman-singh-rajput.webp', linkedin: 'https://in.linkedin.com/in/daman-singh-rajput-2a1ba4237' },
      { name: 'Vinay Rajput', role: 'Sr. Visual Designer', company: 'Apexure India', image: '/Volunteer/cdj-2026/vinay-rajput.webp' },
      { name: 'Jayesh Gupta', role: 'Software Engineer', company: 'Tata Consultancy Services', image: '/Volunteer/cdj-2026/jayesh-gupta.webp', linkedin: 'https://in.linkedin.com/in/jayeshgupta91' },
      { name: 'Nagendra Verma', role: 'Java FullStack Developer', company: 'Techxplore', image: '/Volunteer/cdj-2026/nagendra-verma.webp', linkedin: 'https://linkedin.com/in/nagendra-verma-8a60372b2/' },
      { name: 'Smit Joshi', role: 'ASE @ Advenix Systems LLP', company: 'Advenix Systems LLP', image: '/Volunteer/cdj-2026/smit-joshi.webp', linkedin: 'https://www.linkedin.com/in/smit-joshi814' },
      { name: 'Malhar Gupte', role: 'AI Data Engineer', company: 'ProductSquads', image: '/Volunteer/cdj-2026/malhar-gupte.webp', linkedin: 'https://www.linkedin.com/in/malhargupte/' },
      { name: 'Harshvardhan Parmar', role: 'LFX\'25 Mentee', company: 'Microcks', image: '/Volunteer/cdj-2026/harshvardhan-parmar.webp', linkedin: 'https://www.linkedin.com/in/harshvardhan-parmar' },
      { name: 'Deep Shah', role: 'Java FullStack Developer', company: 'Techxplore', image: '/Volunteer/cdj-2026/deep-shah.webp', linkedin: 'https://www.linkedin.com/in/deepshah-java-developer' },
      { name: 'Divyesh Prajapati', role: 'Java Technical Lead', company: 'Tata Consultancy Services', image: '/Volunteer/cdj-2026/divyesh-prajapati.webp', linkedin: 'https://www.linkedin.com/in/divyeshprajapati1010/' },
      { name: 'Tanvir Dhanani', role: 'Backend Developer', company: 'IBM', image: '/Volunteer/cdj-2026/tanvir-dhanani.webp', linkedin: 'https://www.linkedin.com/in/tanvirdhanani' },
      { name: 'Harshit Gajjar', role: 'Content Creator', company: 'Freelancer', image: '/Volunteer/cdj-2026/harshit-gajjar.webp', linkedin: 'https://www.linkedin.com/in/harshit-gajjar-79b51a296/' },
      { name: 'Ishank Gupta', role: 'Software Engineer', company: 'Avaloq', image: '/Volunteer/cdj-2026/ishank-gupta.webp', linkedin: 'https://www.linkedin.com/in/ishankguptag/' },
      { name: 'Ashish Vaghela', role: 'Frontend Developer', company: 'Nelkinda Software Craft', image: '/Volunteer/cdj-2026/ashish-vaghela.webp', linkedin: 'https://linkedin.com/in/ashish-codejourney' },
      { name: 'Romin Kevadiya', role: 'Student', company: 'LJIET', image: '/Volunteer/cdj-2026/romin-kevadiya.webp', linkedin: 'https://linkedin.com/in/rominkevadiya' },
      { name: 'Margi Shah', role: 'Java Developer', company: 'IBM', image: '/Volunteer/cdj-2026/margi-shah.webp', linkedin: 'https://www.linkedin.com/in/margi212' },
      { name: 'Ankit Dabhi', role: 'Frontend Developer', company: 'Prama.ai', image: '/Volunteer/cdj-2026/ankit-dabhi.webp', linkedin: 'https://www.linkedin.com/in/theankitdabhi' },
      { name: 'Krunal Pandit', role: 'Developer', company: 'IBM India Pvt Ltd', image: '/Volunteer/cdj-2026/krunal-pandit.webp', linkedin: 'https://www.linkedin.com/in/krunal-pandit-46920469' },
      { name: 'Ketan Bhavsar', role: 'Developer', company: 'Staunchsys', image: '/Volunteer/cdj-2026/ketan-bhavsar.webp', linkedin: 'https://www.linkedin.com/in/ketanbhavsar' },
      { name: 'Shrujal Ganatra', role: 'Student', company: 'AD Patel Institute of Technology', image: '/Volunteer/cdj-2026/shrujal-ganatra.webp', linkedin: 'https://www.linkedin.com/in/shrujal-ganatra/' },
      { name: 'Ved Vyas', role: 'Student', company: 'GSFC University', image: '/Volunteer/cdj-2026/ved-vyas.webp', linkedin: 'https://www.linkedin.com/in/ved-vyas416631327' },
      { name: 'Divya Trivedi', role: 'Developer', company: 'Thomson Reuters', image: '/Volunteer/cdj-2026/divya-trivedi.webp', linkedin: 'https://www.linkedin.com/in/divya-trivedi-8177b0165' },
      { name: 'Aditya Lallchandani', role: 'Student', company: 'Nirma University', image: '/Volunteer/cdj-2026/aditya-lallchandani.webp', linkedin: 'https://www.linkedin.com/in/adityalallchandani/' },
      { name: 'Dhruvi Jha', role: 'Developer', company: 'Agileverify', image: '/Volunteer/cdj-2026/dhruvi-jha.webp', linkedin: 'https://www.linkedin.com/in/dhruvi-jha/' },
      { name: 'Harsh Patel', role: 'Student', company: 'DevIT', image: '/Volunteer/cdj-2026/harsh-patel.webp', linkedin: 'https://www.linkedin.com/in/harsh-patel-2137b5237' },
      { name: 'Hemangini B Thakkar', role: 'Developer', company: 'Monarch Innovation Pvt Ltd', image: '/Volunteer/cdj-2026/hemangini-b-thakkar.webp', linkedin: 'https://www.linkedin.com/in/hemangini-thakkar-724115245/' },
      { name: 'Riyanshi Chaudhary', role: 'Student', company: 'Student', image: '/Volunteer/cdj-2026/riyanshi-chaudhary.webp', linkedin: 'https://www.linkedin.com/in/riyanshi-chaudhary-ab842731b' },
      { name: 'Dwij Pancholi', role: 'Student', company: 'SAL Institute of Technology and Engineering Research', image: '/Volunteer/cdj-2026/dwij-pancholi.webp', linkedin: 'https://www.linkedin.com/in/dwijpancholi' },
      { name: 'Nirva Padaliya', role: 'Cloud Engineer', company: 'Hackberry Softech Private Limited', image: '/Volunteer/cdj-2026/nirva-padaliya.webp', linkedin: 'https://www.linkedin.com/in/nirva-padaliya' },
      { name: 'Vanshika Kamdar', role: 'Student', company: 'TechnoSpace Institute', image: '/Volunteer/cdj-2026/vanshika-kamdar.webp', linkedin: 'https://www.linkedin.com/in/vanshikakamdar/' },
    ],
    sponsors: [{ sponsor: 'jetbrains', tier: 'platinum' }],
    partners: ['vjug', 'ahmedabad-aws-cloud-meetup', 'devconf-india'],
  },
  {
    slug: CDJ_2025_SLUG,
    name: 'Community Day for Java, 2025',
    tagline: 'Join the Biggest Java Community Event in Gujarat!',
    description: [
      'Community Day for Java, 2025 is our flagship annual tech event dedicated to fostering knowledge-sharing, networking, and professional growth within the Java ecosystem.',
      'Join Java professionals, tech leaders, and aspiring developers for insightful sessions, hands-on workshops, and opportunities to connect with like-minded enthusiasts.',
    ],
    startDate: '2025-04-27',
    endDate: '2025-04-27',
    startTime: '07:30',
    endTime: '14:55',
    location: 'LJ University, Ahmedabad',
    venues: ['lj-university'],
    banner: '/Home/community-banner.webp',
    registrationUrl: 'https://konfhub.com/community-day-for-java-2025',
    heroLogo: {
      src: '/Home/CommunityDayJava.svg',
      width: 492,
      height: 249,
      srcSm: '/Home/CommunityDayJavaSm.svg',
      widthSm: 206,
      heightSm: 104,
    },
    featuredSpeaker: {
      speaker: 'venkat-subramaniam',
      image: '/Home/VenkatXl.webp',
      width: 358,
      height: 318,
      imageSm: '/Home/VenkatSm.webp',
      widthSm: 210,
      heightSm: 202,
    },
    aboutImage: { src: '/Img/AboutEvent.webp', width: 1133, height: 1150 },
    goodies: [
      { image: '/Goodies/Food.webp', text: 'Delicious Food & Breakfast Included – Fuel up while networking!' },
      { image: '/Goodies/Bag.webp', text: 'Exclusive Swags & Goodies – Walk away with special event memorabilia!' },
      {
        image: '/Goodies/Speakers.webp',
        text: 'Technical Talks from Industry Experts – Get insights from top minds in Java.',
      },
    ],
    sponsorship: {
      deckEmbedUrl:
        'https://docs.google.com/presentation/d/1e_eKQ3kvR7318PCQNxNNsJrsshI9mq9Qi-bLz2UO_aA/embed?start=true&loop=true&delayms=3000',
      phone: '98794 83841',
    },
    cfp: { url: 'https://www.papercall.io/community-day-for-java' },
    tracks: [],
    highlights: [
      'Engaging Tech Talks',
      'Exclusive Swags & Goodies',
      'Delicious Food & Refreshments',
      'And much more',
    ],
    stats: {
      attendees: '300+',
    },
    announcements: [],
    volunteers: [
      { name: 'Dhaval Gajjar', role: 'System Architect', company: 'Staunchsys IT Services', image: '/Volunteer/Dhaval.webp', linkedin: 'https://www.linkedin.com/in/dhavalgajjarin/' },
      { name: 'Vikas Rajput', role: 'Founder', company: 'TechXplore', image: '/Volunteer/Vikas.webp', linkedin: 'https://www.linkedin.com/in/vikasrajputin/' },
      { name: 'Bharat Ranpariya', role: 'Engineering Manager', company: 'DataOrb', image: '/Volunteer/Bharat.webp', linkedin: 'https://www.linkedin.com/in/bharat-ranpariya/' },
      { name: 'Daman Singh Rajput', role: 'Java FullStack Developer', company: 'TechXplore IT Solutions', image: '/Volunteer/Damansingh.webp', linkedin: 'https://www.linkedin.com/in/daman-singh-rajput-2a1ba4237/' },
      { name: 'Harshvardhan Parmar', role: 'LFX\'25 Mentee', company: 'Microcks', image: '/Volunteer/Harsh.webp', linkedin: 'https://www.linkedin.com/in/harshvardhan-parmar/' },
      { name: 'Vinay Rajput', role: 'Sr. Visual Designer', company: 'Apexure India', image: '/Volunteer/Vinay.webp', linkedin: 'https://www.linkedin.com/in/vinay21496/' },
      { name: 'Meet Patel', role: 'Student', company: 'Royal Technosoft', image: '/Volunteer/Meet.webp', linkedin: 'https://www.linkedin.com/in/meet-patel-1b30a5255/' },
      { name: 'Dubey Saurav', role: 'Graphic Designer', company: 'Gujarat University', image: '/Volunteer/Sourav.webp' },
      { name: 'Kevin Gokani', role: 'Java Developer', company: 'Qatar Airways', image: '/Volunteer/Kevin.webp', linkedin: 'https://www.linkedin.com/in/kevin-gokani/' },
      { name: 'Shalin Sabuwala', role: 'Java Developer', company: 'Sanctuary Technologies', image: '/Volunteer/Shalin.webp', linkedin: 'https://www.linkedin.com/in/shalin-sabuwala/' },
      { name: 'Harshit Gajjar', role: 'Graphic Designer', company: 'Indus university', image: '/Volunteer/Harshit.webp' },
      { name: 'Akshay Vadsara', role: 'Java Head', company: '7Span', image: '/Volunteer/Akshay.webp', linkedin: 'https://www.linkedin.com/in/akshay-vadsara/' },
      { name: 'Pravin Jain', role: 'Java Trainer and Evangelist', company: 'Zen Softech Private Limited', image: '/Volunteer/Pravin.webp', linkedin: 'https://www.linkedin.com/in/jainpravin/' },
      { name: 'Sandip Godhani', role: 'Student', company: 'LJ university', image: '/Volunteer/Sandip.webp', linkedin: 'https://www.linkedin.com/in/sandip-godhani-836294311/' },
      { name: 'Ravi Soni', role: '2x AWS & Cloud Architect', company: 'Rishabh Software Pvt Ltd', image: '/Volunteer/Ravi.webp', linkedin: 'https://www.linkedin.com/in/rvsoni/' },
      { name: 'Aryan Gajjar', role: 'Student', company: 'Swarrnim Startup & Innovation University', image: '/Volunteer/Aryan.webp', linkedin: 'https://www.linkedin.com/in/aryangajjar/' },
      { name: 'Jayesh Gupta', role: 'Software Engineer', company: 'Tata Consultancy Services', image: '/Volunteer/Jayesh.webp', linkedin: 'https://www.linkedin.com/in/jayeshgupta91/' },
    ],
    sponsors: [
      { sponsor: 'codelab-technologies', tier: 'platinum' },
      { sponsor: 'rezoomex', tier: 'platinum' },
      { sponsor: 'staunchsys', tier: 'gold' },
      { sponsor: 'dataorb', tier: 'gold' },
      { sponsor: 'rajesh-c', tier: 'community-supporter' },
      { sponsor: 'hemal-trivedi', tier: 'community-supporter' },
    ],
    partners: [
      'tamil-jug',
      'kerala-jug',
      'bangalore-jug',
      'hyderabad-jug',
      'docker-ahmedabad',
      'open-source-weekend-ahmedabad',
      'cncg-ahmedabad',
      'gdg-gandhinagar',
    ],
  },
];
