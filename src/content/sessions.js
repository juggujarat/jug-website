// Sessions — talks, workshops, panels, keynotes, plus non-talk agenda slots
// (registration, opening, breaks) so a full schedule can be rendered.
// A session points to its speakers (slugs) and to ONE of `event` or `conference`.
// Speaker talk lists and event/conference speaker lists are derived in selectors.js.
//
// Fields:
//   slug, title
//   description?
//   speakers[]      speaker slugs (empty for non-talk slots)
//   event?          event slug        } exactly one of these
//   conference?     conference slug   }
//   track?          track slug (from the conference's tracks[])
//   type            'talk' | 'workshop' | 'panel' | 'keynote'
//                   | 'registration' | 'opening' | 'break'
//   date            'YYYY-MM-DD' — required for conference sessions (multi-day
//                   scheduling); optional for event sessions (defaults to the
//                   event's date via getSessionDate() in selectors.js)
//   startTime, endTime   'HH:mm' IST, 24h
//   room?, slidesUrl?, videoUrl?, repoUrl?
//   isSample?

export const SPEAKER_SESSION_TYPES = ['talk', 'workshop', 'panel', 'keynote'];
export const AGENDA_SESSION_TYPES = ['registration', 'opening', 'break'];
export const SESSION_TYPES = [...SPEAKER_SESSION_TYPES, ...AGENDA_SESSION_TYPES];

export const sessions = [
  // ---- Community Day for Java 2025 (in schedule order) ----
  {
    slug: 'cdj-2025-registrations',
    title: 'Registrations + Refreshments',
    description: 'Get settled, grab your badges, and network over a cup of chai! ☕',
    speakers: [],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'registration',
    startTime: '07:30',
    endTime: '09:00',
  },
  {
    slug: 'cdj-2025-opening',
    title: 'Opening Session',
    description: 'Kickstarting the day with an introduction to the event and what’s in store! 🎤',
    speakers: [],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'opening',
    startTime: '09:00',
    endTime: '09:15',
  },
  {
    slug: 'cdj-2025-using-ai-to-create-functional-style-code',
    title: 'Using AI to create Functional Style Code',
    speakers: ['venkat-subramaniam'],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'talk',
    startTime: '09:15',
    endTime: '10:45',
  },
  {
    slug: 'cdj-2025-run-java-application-like-never-before',
    title: 'Run Java Application Like Never Before',
    speakers: ['vaibhav-choudhary'],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'talk',
    startTime: '10:50',
    endTime: '11:45',
  },
  {
    slug: 'cdj-2025-lunch',
    title: 'Lunch Break',
    description: 'Refuel and connect with fellow Java enthusiasts!',
    speakers: [],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'break',
    startTime: '11:45',
    endTime: '13:00',
  },
  {
    slug: 'cdj-2025-context-aware-ai-spring-boot-langchain4j',
    title:
      'Craft Context Aware AI Application using Spring Boot - A Deep Dive into LangChain4j and Vector Search',
    speakers: ['jigar-shah'],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'talk',
    startTime: '13:00',
    endTime: '13:55',
  },
  {
    slug: 'cdj-2025-chaos-engineering-primer',
    title: 'Chaos Engineering – A Primer with Working Demo',
    speakers: ['dhaval-shah'],
    conference: 'community-day-for-java-2025',
    date: '2025-04-27',
    type: 'talk',
    startTime: '14:00',
    endTime: '14:55',
  },
];
