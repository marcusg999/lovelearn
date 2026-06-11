/* Mock profiles for the Discover screen.
   These are sample/demo profiles only — no real user data.

   Extra fields used by the matching/compatibility & access-tier features:
   - relationshipStructure: 'solo' | 'couple'
   - openToPlayPartners: true if a couple profile is open to additional
     partners. Only surfaced to viewers who hold a Major in Polyamory & ENM
     or Kink & Consent (the "special training" for this audience).
   - majors / minors: elective ids (see ELECTIVES in curriculum.js) this
     profile has earned — used to compute a compatibility score against the
     current user's own Majors & Minors.
   - tier: 'standard' | 'advanced'. 'advanced' profiles are only fully
     visible to viewers who are themselves Advanced Certified (2+ Majors,
     or LoveLearn+). Everyone else sees a locked preview and can request
     access. */

const PROFILES = [
  {
    id: 'p1',
    name: 'Maya',
    age: 29,
    avatar: '👩🏽',
    bio: 'Ceramicist & weekend hiker. Looking for someone who can sit in comfortable silence and also debate the best taco spot in town.',
    tags: ['Creative', 'Outdoors', 'Foodie'],
    prompt: 'My attachment style is securely earned — ask me how 😄',
    relationshipStructure: 'solo',
    openToPlayPartners: false,
    majors: [],
    minors: ['long-distance'],
    tier: 'standard'
  },
  {
    id: 'p2',
    name: 'Daniel',
    age: 32,
    avatar: '👨🏻',
    bio: 'Software engineer who finally finished the Gottman module and learned what "turning towards" actually means.',
    tags: ['Tech', 'Board Games', 'Coffee'],
    prompt: 'Green flag: I text back. Every time.',
    relationshipStructure: 'solo',
    openToPlayPartners: false,
    majors: ['conflict-mastery'],
    minors: ['conflict-mastery'],
    tier: 'standard'
  },
  {
    id: 'p3',
    name: 'Priya',
    age: 27,
    avatar: '👩🏾',
    bio: 'Yoga instructor and trying to read one Esther Perel book a year. Curious, direct communicator, terrible singer.',
    tags: ['Wellness', 'Travel', 'Music'],
    prompt: 'Ask me about the last boundary I set — I\'m proud of it.',
    relationshipStructure: 'solo',
    openToPlayPartners: false,
    majors: [],
    minors: ['lgbtq-family', 'conflict-mastery'],
    tier: 'standard'
  },
  {
    id: 'p4',
    name: 'Jordan',
    age: 31,
    avatar: '🧑🏼',
    bio: 'Graphic designer, plant parent, and recovering people-pleaser working on healthy boundaries.',
    tags: ['Art', 'Plants', 'Movies'],
    prompt: 'Let\'s do a gentle start-up and plan a first date.',
    relationshipStructure: 'solo',
    openToPlayPartners: false,
    majors: [],
    minors: ['kink-consent'],
    tier: 'standard'
  },
  {
    id: 'p5',
    name: 'Wei',
    age: 34,
    avatar: '👨🏻‍🦱',
    bio: 'Chef on weekdays, amateur astronomer on weekends. My partner and I are big believers in repair attempts, consent check-ins, and good dumplings.',
    tags: ['Cooking', 'Stargazing', 'Dogs'],
    prompt: 'I make a mean repair-attempt dumpling soup.',
    relationshipStructure: 'couple',
    openToPlayPartners: true,
    majors: ['polyamory', 'kink-consent'],
    minors: ['polyamory', 'kink-consent'],
    tier: 'advanced'
  },
  {
    id: 'p6',
    name: 'Sofia',
    age: 26,
    avatar: '👩🏼‍🦰',
    bio: 'Marketing strategist, marathon runner, and proud LoveLearn graduate. Looking for curiosity, not perfection.',
    tags: ['Fitness', 'Reading', 'Travel'],
    prompt: 'My love language is quality time and well-timed memes.',
    relationshipStructure: 'solo',
    openToPlayPartners: false,
    majors: ['conflict-mastery'],
    minors: ['conflict-mastery', 'long-distance'],
    tier: 'standard'
  },
  {
    id: 'p7',
    name: 'Marcus',
    age: 30,
    avatar: '🧔🏽',
    bio: 'Music teacher who believes in showing up consistently and saying what I mean. My partner and I are exploring opening up, thoughtfully.',
    tags: ['Music', 'Teaching', 'Comedy'],
    prompt: 'Ask me about my secure attachment glow-up.',
    relationshipStructure: 'couple',
    openToPlayPartners: true,
    majors: ['polyamory'],
    minors: ['polyamory', 'lgbtq-family'],
    tier: 'standard'
  },
  {
    id: 'p8',
    name: 'Aisha',
    age: 28,
    avatar: '🧕🏽',
    bio: 'Therapist-in-training (the irony is not lost on me). Loves deep talks, board games, and slow mornings.',
    tags: ['Psychology', 'Coffee', 'Board Games'],
    prompt: 'I promise not to analyze you on the first date. Mostly.',
    relationshipStructure: 'solo',
    openToPlayPartners: false,
    majors: ['kink-consent', 'polyamory'],
    minors: ['kink-consent', 'polyamory'],
    tier: 'advanced'
  }
];
