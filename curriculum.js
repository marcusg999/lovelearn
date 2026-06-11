/* LoveLearn Academy curriculum data
   Each module is inspired by publicly available work from well-known
   relationship researchers and therapists. Passing score is 4/5 (80%). */

const PASSING_SCORE = 4;

const CURRICULUM = [
  {
    id: 'attachment',
    order: 1,
    icon: '🧩',
    title: 'Know Thyself: Attachment Styles',
    expert: 'Inspired by Amir Levine, M.D. & Rachel S.F. Heller, M.A. — "Attached"',
    summary: 'Why we love the way we love — and how understanding your attachment style helps you build healthier relationships.',
    takeaways: [
      'Our earliest bonds with caregivers shape how we approach closeness and security as adults.',
      'Three common adult attachment styles: Secure, Anxious, and Avoidant (plus Fearful-Avoidant).',
      'Secure: comfortable with both intimacy and independence.',
      'Anxious: craves closeness and connection, and can worry about a partner pulling away.',
      'Avoidant: values independence and may feel uncomfortable with too much closeness.',
      'Knowing your style — and your partner\'s — helps you communicate needs clearly and choose compatible partners.',
      'With self-awareness and supportive relationships, people can move toward "earned security" over time.'
    ],
    video: {
      type: 'link',
      label: 'Watch: Attachment Styles Explained',
      url: 'https://www.youtube.com/results?search_query=attachment+styles+anxious+avoidant+secure+explained'
    },
    quiz: [
      {
        q: 'According to attachment theory, our early bonds with caregivers primarily shape:',
        options: [
          'Our taste in music',
          'How we approach closeness and security in adult relationships',
          'Our career choices',
          'Our physical health only'
        ],
        correct: 1,
        explanation: 'Early caregiving bonds form the template for how we experience intimacy, trust, and security later in life.'
      },
      {
        q: 'A person with an anxious attachment style typically:',
        options: [
          'Avoids closeness at all costs',
          'Feels secure without ever needing reassurance',
          'Craves closeness and may worry about a partner pulling away',
          'Never thinks about relationships'
        ],
        correct: 2,
        explanation: 'Anxiously attached people deeply value closeness and can be highly attuned to signs of distance.'
      },
      {
        q: 'A person with an avoidant attachment style often:',
        options: [
          'Values independence and may feel uncomfortable with too much closeness',
          'Constantly seeks reassurance from their partner',
          'Is always the first to say "I love you"',
          'Cannot function without a partner'
        ],
        correct: 0,
        explanation: 'Avoidantly attached people prize self-reliance and may pull back when a relationship feels too close, too fast.'
      },
      {
        q: 'Which attachment style is generally associated with being comfortable with both intimacy and independence?',
        options: ['Anxious', 'Avoidant', 'Secure', 'Disorganized'],
        correct: 2,
        explanation: 'Securely attached people tend to balance closeness and autonomy without much distress.'
      },
      {
        q: 'With self-awareness and supportive relationships, attachment styles can:',
        options: [
          'Never change',
          'Shift toward "earned security" over time',
          'Only get worse with age',
          'Only change before age 5'
        ],
        correct: 1,
        explanation: 'Attachment styles are patterns, not life sentences — growth and "earned secure" attachment is possible.'
      }
    ]
  },
  {
    id: 'four-horsemen',
    order: 2,
    icon: '🐎',
    title: 'The Four Horsemen & Their Antidotes',
    expert: 'Inspired by John Gottman, Ph.D. — The Gottman Institute',
    summary: 'Learn the four communication patterns that predict relationship breakdown — and the antidotes that protect connection.',
    takeaways: [
      'Dr. Gottman identified four patterns that predict relationship breakdown: Criticism, Contempt, Defensiveness, and Stonewalling.',
      'Criticism attacks a partner\'s character rather than addressing a specific behavior.',
      'Contempt — sarcasm, eye-rolling, name-calling, mockery — is the single greatest predictor of divorce.',
      'Defensiveness means playing the victim or counter-attacking instead of taking responsibility.',
      'Stonewalling is shutting down and withdrawing from the interaction altogether.',
      'Antidotes: a gentle start-up, a culture of appreciation, taking responsibility, and physiological self-soothing (taking a break).'
    ],
    video: {
      type: 'embed',
      videoId: '1o30Ps-_8is',
      label: 'Four Horsemen of the Apocalypse | The Gottman Institute'
    },
    quiz: [
      {
        q: 'According to Dr. Gottman, which of the Four Horsemen is the single greatest predictor of divorce?',
        options: ['Criticism', 'Contempt', 'Defensiveness', 'Stonewalling'],
        correct: 1,
        explanation: 'Contempt — communicating disgust or superiority — is the most corrosive of the four.'
      },
      {
        q: 'The antidote to criticism is:',
        options: [
          'Yelling louder to be heard',
          'A gentle start-up using "I" statements about a specific situation',
          'Ignoring the issue forever',
          'Responding with sarcasm'
        ],
        correct: 1,
        explanation: 'A gentle start-up focuses on a specific issue and a need, rather than attacking character.'
      },
      {
        q: 'Stonewalling looks like:',
        options: [
          'Actively engaging in the conflict',
          'Withdrawing, shutting down, and disengaging from the conversation',
          'Apologizing immediately',
          'Complimenting your partner'
        ],
        correct: 1,
        explanation: 'Stonewalling is when a person checks out of the interaction, often to self-protect from feeling overwhelmed.'
      },
      {
        q: 'Defensiveness in conflict often involves:',
        options: [
          'Taking responsibility for your part',
          'Playing the victim or counter-attacking instead of hearing your partner',
          'Active listening',
          'Taking a self-soothing break'
        ],
        correct: 1,
        explanation: 'Defensiveness deflects responsibility and escalates conflict by turning it back on the other person.'
      },
      {
        q: 'A "culture of appreciation" helps couples by:',
        options: [
          'Avoiding all disagreements',
          'Building a buffer of fondness and admiration that protects the relationship during conflict',
          'Ensuring partners never criticize anything',
          'Replacing communication with gifts'
        ],
        correct: 1,
        explanation: 'Regularly noticing and naming what you appreciate creates resilience that helps couples weather conflict.'
      }
    ]
  },
  {
    id: 'desire-intimacy',
    order: 3,
    icon: '🔥',
    title: 'Mating in Captivity: Desire & Intimacy',
    expert: 'Inspired by Esther Perel — psychotherapist & author',
    summary: 'How long-term couples keep desire alive by balancing the need for security with the need for mystery.',
    takeaways: [
      'Good, committed intimacy often draws on two seemingly conflicting needs: security and novelty/mystery.',
      'Desire often needs some space and separateness — too much merging can dampen attraction.',
      'Maintaining your own interests and autonomy in a relationship can help fuel attraction.',
      'Approaching your long-term partner with curiosity — instead of assuming you fully "know" them — keeps connection alive.',
      'Eroticism thrives on an element of the unknown, while love thrives on closeness — the art is balancing both.'
    ],
    video: {
      type: 'embed',
      videoId: 'sa0RUmGTCYY',
      label: 'Esther Perel: The Secret to Desire in a Long-Term Relationship (TED)'
    },
    quiz: [
      {
        q: 'According to Esther Perel, good and committed intimacy often draws on two seemingly conflicting needs:',
        options: [
          'Wealth and status',
          'Security and novelty/mystery',
          'Routine and predictability only',
          'Distance and isolation'
        ],
        correct: 1,
        explanation: 'We want both safety and adventure — the challenge is holding both at once.'
      },
      {
        q: 'Perel suggests that desire often needs:',
        options: [
          'Total merging with your partner at all times',
          'Some space and separateness',
          'Constant communication about logistics',
          'Avoiding all vulnerability'
        ],
        correct: 1,
        explanation: 'A little distance can preserve the sense of "otherness" that fuels desire.'
      },
      {
        q: 'Maintaining your own interests and autonomy in a relationship can:',
        options: [
          'Always weaken the relationship',
          'Help fuel attraction and desire',
          'Have no effect on intimacy',
          'Replace the need for communication'
        ],
        correct: 1,
        explanation: 'Individuality keeps each partner interesting to the other.'
      },
      {
        q: 'Approaching your long-term partner with curiosity, instead of assuming you fully "know" them, can:',
        options: [
          'Make the relationship boring',
          'Keep desire and connection alive',
          'Lead to more conflict only',
          'Is unnecessary after the honeymoon phase'
        ],
        correct: 1,
        explanation: 'People keep growing and changing — curiosity helps you keep discovering your partner.'
      },
      {
        q: 'Eroticism, in Perel\'s framework, thrives on:',
        options: [
          'Total predictability',
          'An element of mystery and the unknown',
          'Avoiding all risk',
          'Strict daily schedules'
        ],
        correct: 1,
        explanation: 'Mystery and surprise help keep the spark alive over the long term.'
      }
    ]
  },
  {
    id: 'boundaries-consent',
    order: 4,
    icon: '🛡️',
    title: 'Boundaries, Consent & Honest Communication',
    expert: 'Inspired by Robin Roemer, LMFT — Los Angeles, CA (Gottman-trained, LGBTQ+ & sex-positive affirming therapist)',
    summary: 'A shame-free approach to communicating needs, setting boundaries, and practicing ongoing consent.',
    takeaways: [
      'Healthy relationships are built on clear, ongoing, enthusiastic consent — never assumptions.',
      'Boundaries communicate your own needs and limits — they are not a tool for controlling your partner.',
      '"I feel ___ when ___ because ___, and I need ___" is an "I" statement that reduces blame and defensiveness.',
      'Shame-free communication about needs and desires creates safety to be honest without fear of judgment.',
      'Consent and boundaries can evolve — revisit them regularly rather than assuming they\'re settled forever.',
      'Respecting a partner\'s "no" (and your own) is foundational to trust and emotional safety.'
    ],
    video: {
      type: 'link',
      label: 'Watch: Healthy Boundaries & Consent in Relationships',
      url: 'https://www.youtube.com/results?search_query=healthy+boundaries+consent+communication+relationships+therapist'
    },
    quiz: [
      {
        q: 'A healthy boundary is best described as:',
        options: [
          'A way to control your partner\'s behavior',
          'A clear communication of your own needs and limits',
          'Something you only set once and never revisit',
          'A punishment for bad behavior'
        ],
        correct: 1,
        explanation: 'Boundaries are about you — they tell others what you need in order to feel safe and respected.'
      },
      {
        q: '"I feel ___ when ___ because ___, and I need ___" is an example of:',
        options: [
          'An ultimatum',
          'An "I" statement that reduces blame',
          'The silent treatment',
          'Stonewalling'
        ],
        correct: 1,
        explanation: '"I" statements focus on your own experience and needs rather than attacking your partner.'
      },
      {
        q: 'Consent in a relationship should be:',
        options: [
          'Assumed once given',
          'Ongoing, enthusiastic, and revisited over time',
          'Only discussed before the first date',
          'Optional between long-term partners'
        ],
        correct: 1,
        explanation: 'Consent is an ongoing conversation, not a one-time checkbox — needs and comfort levels can change.'
      },
      {
        q: 'Shame-free communication about needs and desires helps couples by:',
        options: [
          'Avoiding the topic entirely',
          'Creating safety to be honest without fear of judgment',
          'Making one partner feel guilty',
          'Replacing the need for boundaries'
        ],
        correct: 1,
        explanation: 'When people feel safe rather than judged, they\'re more able to share honestly.'
      },
      {
        q: 'Respecting a partner\'s "no" primarily helps build:',
        options: ['Resentment', 'Trust and emotional safety', 'Distance only', 'Competition'],
        correct: 1,
        explanation: 'When "no" is respected, both partners feel safer saying "yes" when they truly mean it.'
      }
    ]
  },
  {
    id: 'repair-bids',
    order: 5,
    icon: '🏠',
    title: 'Conflict Repair & The Sound Relationship House',
    expert: 'Inspired by John Gottman, Ph.D. — The Gottman Institute',
    summary: 'How small "bids for connection" and repair attempts build a relationship that can weather conflict.',
    takeaways: [
      'The "Sound Relationship House" describes the building blocks of healthy relationships, from love maps and fondness to trust and commitment.',
      'A "bid for connection" is a small attempt to connect — a comment, a question, or a gesture.',
      '"Turning towards" a partner\'s bids (instead of away or against) builds the emotional bank account of the relationship.',
      'A "repair attempt" is any action or statement that helps de-escalate tension — humor, an apology, or taking a break.',
      'Roughly 69% of relationship conflicts are "perpetual" — rooted in personality or needs differences — and the goal is to manage them, not "win".',
      'Emotionally healthy couples maintain roughly a 5:1 ratio of positive to negative interactions, even during conflict.'
    ],
    video: {
      type: 'link',
      label: 'Watch: The Gottman Institute on Repair & Connection',
      url: 'https://www.youtube.com/results?search_query=gottman+institute+sound+relationship+house+repair+attempts+bids'
    },
    quiz: [
      {
        q: 'A "bid for connection" is:',
        options: [
          'A formal relationship contract',
          'A small attempt to connect — a comment, question, or gesture',
          'Only relevant during arguments',
          'A type of ultimatum'
        ],
        correct: 1,
        explanation: 'Bids are everyday moments — like pointing something out the window — that invite connection.'
      },
      {
        q: '"Turning towards" a partner\'s bids tends to:',
        options: [
          'Weaken trust over time',
          'Build connection and the relationship\'s emotional bank account',
          'Have no long-term effect',
          'Only matter during big events'
        ],
        correct: 1,
        explanation: 'Small, consistent moments of connection accumulate into a strong foundation.'
      },
      {
        q: 'A "repair attempt" during conflict is:',
        options: [
          'Ignoring the issue until it goes away',
          'Any action or statement that helps de-escalate tension, like humor, an apology, or a break',
          'Winning the argument at all costs',
          'Bringing up past grievances'
        ],
        correct: 1,
        explanation: 'Repair attempts help de-escalate tension so the conversation can stay productive.'
      },
      {
        q: 'According to Gottman\'s research, roughly what percentage of relationship conflicts are "perpetual" (not fully solvable)?',
        options: ['About 5%', 'About 30%', 'About 69%', '100%'],
        correct: 2,
        explanation: 'Most ongoing conflicts are about fundamental differences in personality or needs — the goal is dialogue, not resolution.'
      },
      {
        q: 'Gottman found that emotionally healthy couples maintain roughly what ratio of positive to negative interactions during conflict?',
        options: ['1:1', '5:1', '1:5', '10:1'],
        correct: 1,
        explanation: 'A roughly 5:1 ratio of positive to negative interactions buffers the relationship during hard moments.'
      }
    ]
  },
  {
    id: 'red-green-flags',
    order: 6,
    icon: '🚩',
    title: 'Red Flags, Green Flags & Dating Safety',
    expert: 'General relationship & dating safety education',
    summary: 'How to spot healthy patterns early, trust your instincts, and stay safe while meeting new people.',
    takeaways: [
      'Green flags: a person\'s actions consistently match their words, they respect boundaries, take accountability, and support your goals.',
      'Red flags: love bombing, pressure to move fast, isolating you from friends and family, disrespecting "no", and blame-shifting.',
      '"Love bombing" — excessive early affection or gifts — can be a red flag, especially if it pressures you to move faster than you\'re comfortable with.',
      'Trust your gut: discomfort is information, not something to override.',
      'For first in-person dates, meet in a public place, tell a friend your plans, and arrange your own transportation.',
      'Healthy relationships leave room for both partners to maintain individual friendships, interests, and growth.'
    ],
    video: {
      type: 'link',
      label: 'Watch: Relationship Red Flags & Green Flags Explained',
      url: 'https://www.youtube.com/results?search_query=relationship+red+flags+green+flags+dating+safety'
    },
    quiz: [
      {
        q: '"Love bombing" — excessive early affection or gifts to fast-track intimacy — is considered:',
        options: [
          'A green flag showing strong interest',
          'A potential red flag, especially if it pressures you to move faster than you\'re comfortable with',
          'Required for a relationship to work',
          'Irrelevant to relationship health'
        ],
        correct: 1,
        explanation: 'Intense early intensity can sometimes be used to create obligation or skip past normal pacing.'
      },
      {
        q: 'A green flag in a new relationship looks like:',
        options: [
          'Someone who pressures you to cut off friends',
          'Someone whose actions consistently match their words',
          'Someone who gets upset when you say no',
          'Someone who avoids accountability'
        ],
        correct: 1,
        explanation: 'Consistency between words and actions over time is one of the strongest signs of trustworthiness.'
      },
      {
        q: 'For first in-person dates with someone new, a recommended safety practice is:',
        options: [
          'Meeting at their home',
          'Meeting in a public place and telling a friend your plans',
          'Sharing your home address immediately',
          'Letting them arrange all transportation alone with you'
        ],
        correct: 1,
        explanation: 'Public meetings and sharing your plans with a trusted friend are simple, effective safety steps.'
      },
      {
        q: 'If a new partner consistently disrespects your "no" or pushes past stated limits, this is:',
        options: [
          'Normal and should be ignored',
          'A red flag worth taking seriously',
          'A sign they really care',
          'Something only you should change'
        ],
        correct: 1,
        explanation: 'Repeatedly ignoring boundaries is a strong early warning sign.'
      },
      {
        q: 'Healthy relationships generally allow for:',
        options: [
          'One partner controlling all decisions',
          'Both partners to maintain individual friendships, interests, and growth',
          'Total merging of identities',
          'No outside relationships of any kind'
        ],
        correct: 1,
        explanation: 'Room for individuality alongside the relationship is a sign of a healthy dynamic.'
      }
    ]
  },
  {
    id: 'hold-me-tight',
    order: 7,
    icon: '🤲',
    title: 'Hold Me Tight: Emotional Responsiveness',
    expert: 'Inspired by Dr. Sue Johnson — creator of Emotionally Focused Therapy (EFT)',
    summary: 'How emotional accessibility, responsiveness, and engagement (A.R.E.) build secure bonds — and how to break free from negative cycles.',
    takeaways: [
      'Emotionally Focused Therapy (EFT) is grounded in attachment science: we are wired to need close emotional bonds throughout life.',
      'The "A.R.E." framework — Accessibility, Responsiveness, Engagement — describes what it takes for a partner to feel emotionally safe with you.',
      'Couples often get stuck in negative cycles, like the "Protest Polka": one partner pursues or criticizes while the other withdraws.',
      'Underneath anger or withdrawal is usually a softer, more vulnerable emotion — like fear of disconnection.',
      'Being emotionally responsive means tuning in to your partner\'s feelings and letting them matter to you, not just solving the problem.',
      '"Hold Me Tight" conversations help couples recognize their cycle and reach for each other instead of away.'
    ],
    video: {
      type: 'link',
      label: 'Watch: Dr. Sue Johnson on Emotionally Focused Therapy',
      url: 'https://www.youtube.com/results?search_query=sue+johnson+emotionally+focused+therapy+hold+me+tight'
    },
    quiz: [
      {
        q: 'Emotionally Focused Therapy (EFT) is grounded primarily in:',
        options: ['Behaviorism and rewards', 'Attachment science', 'Financial planning', 'Cognitive load theory'],
        correct: 1,
        explanation: 'EFT draws on attachment theory — the idea that emotional bonds and responsiveness are core human needs.'
      },
      {
        q: 'Dr. Sue Johnson\'s "A.R.E." framework stands for:',
        options: [
          'Accessibility, Responsiveness, Engagement',
          'Anger, Resentment, Escape',
          'Agreement, Routine, Effort',
          'Avoidance, Reaction, Evaluation'
        ],
        correct: 0,
        explanation: 'A.R.E. describes the qualities that help a partner feel emotionally safe and connected.'
      },
      {
        q: 'A common negative cycle sometimes called the "Protest Polka" looks like:',
        options: [
          'One partner pursues or criticizes while the other withdraws',
          'Both partners ignore each other completely',
          'Both partners over-communicate calmly',
          'Neither partner has any needs'
        ],
        correct: 0,
        explanation: 'Pursue-withdraw cycles are one of the most common patterns couples get stuck in.'
      },
      {
        q: 'Being "emotionally responsive" to a partner mainly means:',
        options: [
          'Fixing their problems immediately',
          'Tuning in to their feelings and letting them matter to you',
          'Agreeing with everything they say',
          'Avoiding emotional topics'
        ],
        correct: 1,
        explanation: 'Responsiveness is about emotional attunement, not necessarily solutions or agreement.'
      },
      {
        q: '"Hold Me Tight" conversations are designed to help couples:',
        options: [
          'Win arguments',
          'Identify their negative cycle and reach for each other instead of away',
          'Avoid talking about the relationship',
          'Assign blame for past mistakes'
        ],
        correct: 1,
        explanation: 'The goal is to interrupt the cycle and create new moments of safe emotional connection.'
      }
    ]
  },
  {
    id: 'wired-for-love',
    order: 8,
    icon: '🧲',
    title: 'Wired for Love: Secure Functioning',
    expert: 'Inspired by Dr. Stan Tatkin — creator of PACT (A Psychobiological Approach to Couple Therapy)',
    summary: 'How securely functioning couples build a shared "couple bubble" and stay connected even when their nervous systems get activated.',
    takeaways: [
      'Dr. Stan Tatkin describes the "couple bubble" — a shared protective space partners create and maintain together.',
      '"Secure functioning" means decisions are made based on fairness and full collaboration, not on who is "right."',
      'The principle "two yeses make a go, one no means no" means big decisions need genuine agreement from both partners.',
      'Tatkin describes attachment-influenced styles he calls "Islands" (more independent) and "Waves" (more anxious) alongside secure "Anchors."',
      'During conflict, our nervous systems can become activated ("primitives" take over) — staying face-to-face and calm helps both partners regulate.',
      'Small daily rituals — good mornings, goodbyes, greetings — reinforce the couple bubble over time.'
    ],
    video: {
      type: 'link',
      label: 'Watch: Dr. Stan Tatkin on PACT & the Couple Bubble',
      url: 'https://www.youtube.com/results?search_query=stan+tatkin+wired+for+love+couple+bubble+pact'
    },
    quiz: [
      {
        q: 'Dr. Stan Tatkin\'s term for the shared protective space partners build together is:',
        options: ['The "comfort zone"', 'The "couple bubble"', 'The "safe house"', 'The "neutral ground"'],
        correct: 1,
        explanation: 'The "couple bubble" is a mutual agreement to protect and prioritize the relationship.'
      },
      {
        q: '"Secure functioning" in a relationship means decisions are made based on:',
        options: [
          'Who is right',
          'Fairness and full collaboration between both partners',
          'Whoever is more stressed gets their way',
          'Tradition and habit only'
        ],
        correct: 1,
        explanation: 'Secure functioning prioritizes mutual fairness and shared decision-making over "winning."'
      },
      {
        q: 'The principle "two yeses make a go, one no means no" is about:',
        options: [
          'Majority rule',
          'Requiring both partners\' genuine agreement before moving forward',
          'Avoiding decisions altogether',
          'Letting one partner decide for both'
        ],
        correct: 1,
        explanation: 'Either partner can pause a decision until both feel good about it.'
      },
      {
        q: 'Tatkin describes "Islands" and "Waves" as relationship styles roughly similar to:',
        options: [
          'Avoidant and anxious attachment styles',
          'Introvert and extrovert personality types',
          'Morning people and night owls',
          'Savers and spenders'
        ],
        correct: 0,
        explanation: '"Islands" tend toward independence (avoidant), while "Waves" tend toward anxious attachment.'
      },
      {
        q: 'During conflict, Tatkin emphasizes managing the nervous system\'s threat response by:',
        options: [
          'Raising your voice to be heard',
          'Maintaining face-to-face contact and helping each other calm down',
          'Walking away without communicating',
          'Multitasking to reduce stress'
        ],
        correct: 1,
        explanation: 'Staying physically present and co-regulating helps de-escalate the brain\'s threat response.'
      }
    ]
  }
];

/* ---------- Capstone Certification Exam ----------
   Unlocked once every module above is passed. Passing this exam
   (8/10) earns the LoveLearn Relationship-Readiness Certification
   and unlocks Discover & Matches. */
const CAPSTONE_EXAM = {
  id: 'certification-exam',
  icon: '🏅',
  title: 'LoveLearn Certification Exam',
  expert: 'Comprehensive review of every LoveLearn Academy module',
  summary: 'Pass this exam to earn your LoveLearn Relationship-Readiness Certification and unlock Discover & Matches.',
  passingScore: 8,
  quiz: [
    {
      q: 'Which attachment style is generally associated with being comfortable with both intimacy and independence?',
      options: ['Anxious', 'Avoidant', 'Secure', 'Disorganized'],
      correct: 2,
      explanation: 'From Module 1 — securely attached people balance closeness and autonomy without much distress.'
    },
    {
      q: 'According to Dr. Gottman, which of the Four Horsemen is the single greatest predictor of divorce?',
      options: ['Criticism', 'Contempt', 'Defensiveness', 'Stonewalling'],
      correct: 1,
      explanation: 'From Module 2 — contempt communicates disgust or superiority and is the most corrosive pattern.'
    },
    {
      q: 'According to Esther Perel, good and committed intimacy often draws on two seemingly conflicting needs:',
      options: ['Wealth and status', 'Security and novelty/mystery', 'Routine and predictability only', 'Distance and isolation'],
      correct: 1,
      explanation: 'From Module 3 — desire balances the need for safety with the need for mystery.'
    },
    {
      q: '"I feel ___ when ___ because ___, and I need ___" is an example of:',
      options: ['An ultimatum', 'An "I" statement that reduces blame', 'The silent treatment', 'Stonewalling'],
      correct: 1,
      explanation: 'From Module 4 — "I" statements focus on your own experience rather than attacking your partner.'
    },
    {
      q: 'A "repair attempt" during conflict is:',
      options: [
        'Ignoring the issue until it goes away',
        'Any action or statement that helps de-escalate tension, like humor, an apology, or a break',
        'Winning the argument at all costs',
        'Bringing up past grievances'
      ],
      correct: 1,
      explanation: 'From Module 5 — repair attempts keep conflict from spiraling out of control.'
    },
    {
      q: '"Love bombing" — excessive early affection or gifts to fast-track intimacy — is considered:',
      options: [
        'A green flag showing strong interest',
        'A potential red flag, especially if it pressures you to move faster than you\'re comfortable with',
        'Required for a relationship to work',
        'Irrelevant to relationship health'
      ],
      correct: 1,
      explanation: 'From Module 6 — intense early intensity can sometimes create obligation or skip past healthy pacing.'
    },
    {
      q: 'Dr. Sue Johnson\'s "A.R.E." framework stands for:',
      options: [
        'Accessibility, Responsiveness, Engagement',
        'Anger, Resentment, Escape',
        'Agreement, Routine, Effort',
        'Avoidance, Reaction, Evaluation'
      ],
      correct: 0,
      explanation: 'From Module 7 — A.R.E. describes what helps a partner feel emotionally safe with you.'
    },
    {
      q: 'A common negative cycle sometimes called the "Protest Polka" looks like:',
      options: [
        'One partner pursues or criticizes while the other withdraws',
        'Both partners ignore each other completely',
        'Both partners over-communicate calmly',
        'Neither partner has any needs'
      ],
      correct: 0,
      explanation: 'From Module 7 — pursue-withdraw cycles are one of the most common patterns couples get stuck in.'
    },
    {
      q: 'Dr. Stan Tatkin\'s term for the shared protective space partners build together is:',
      options: ['The "comfort zone"', 'The "couple bubble"', 'The "safe house"', 'The "neutral ground"'],
      correct: 1,
      explanation: 'From Module 8 — the "couple bubble" is a mutual agreement to protect and prioritize the relationship.'
    },
    {
      q: 'Which of these best describes "secure functioning" in a relationship?',
      options: [
        'One partner makes most decisions for efficiency',
        'Decisions are made based on fairness and full collaboration between both partners',
        'Conflict is avoided at all costs',
        'Each partner keeps score of who "wins" arguments'
      ],
      correct: 1,
      explanation: 'From Module 8 — secure functioning prioritizes mutual fairness over "winning."'
    }
  ]
};

/* ---------- LoveLearn Electives: Majors & Minors ----------
   Unlocked once a user earns the core Relationship-Readiness Certification.
   Each elective has a Minor Assessment (5 questions, 4/5 to earn a Minor)
   and, once the Minor is earned, a Major Thesis Exam (5 questions, 4/5 to
   earn a Major) with more applied, scenario-based questions. */
const ELECTIVES = [
  {
    id: 'polyamory',
    icon: '💜',
    title: 'Polyamory & Ethical Non-Monogamy',
    shortTitle: 'Polyamory & ENM',
    expert: 'Inspired by Jessica Fern — author of "Polysecure"',
    summary: 'Core principles of consensual non-monogamy: communication, jealousy as information, and secure attachment across multiple relationships.',
    takeaways: [
      'Ethical Non-Monogamy (ENM) — including polyamory, open relationships, and relationship anarchy — is built on full disclosure and ongoing consent from everyone involved.',
      'Jealousy isn\'t a sign something is wrong — it\'s information about an unmet need or fear worth exploring with curiosity.',
      '"Compersion" describes feeling joy at a partner\'s joy with another partner — it can be cultivated, not forced.',
      'Secure attachment is possible across multiple relationships when each partner feels like a priority within their own connection.',
      'Clear agreements (around safer sex, time, and disclosure) reduce confusion — but should be revisited as needs change, not treated as permanent.',
      'ENM is not a fix for a struggling relationship — it requires its own communication skills, on top of all the core curriculum skills.'
    ],
    video: {
      type: 'link',
      label: 'Watch: Introduction to Ethical Non-Monogamy & Polyamory',
      url: 'https://www.youtube.com/results?search_query=ethical+non+monogamy+polyamory+explained+polysecure'
    },
    minorQuiz: [
      {
        q: 'What does "ENM" stand for in relationship terminology?',
        options: ['Exclusive Newlywed Marriage', 'Ethical Non-Monogamy', 'Emotional Needs Management', 'Equal Number Matching'],
        correct: 1,
        explanation: 'ENM is an umbrella term for consensual relationships involving more than two people.'
      },
      {
        q: 'According to Jessica Fern\'s "Polysecure," jealousy is best understood as:',
        options: ['A sign the relationship is doomed', 'Information about an unmet need or fear worth exploring', 'Something to hide from partners', 'Proof of incompatibility'],
        correct: 1,
        explanation: 'Jealousy can point to a need (reassurance, time, security) that\'s worth naming and addressing together.'
      },
      {
        q: '"Compersion" refers to:',
        options: ['Feeling joy at a partner\'s joy with another partner', 'A type of jealousy', 'A legal marriage status', 'A scheduling app'],
        correct: 0,
        explanation: 'Compersion is often described as the opposite of jealousy — taking pleasure in a partner\'s happiness, even when it involves someone else.'
      },
      {
        q: 'In ENM relationships, agreements about things like safer sex and disclosure should be:',
        options: ['Set once and never discussed again', 'Revisited as needs and circumstances change', 'Decided by only one partner', 'Avoided entirely'],
        correct: 1,
        explanation: 'Agreements work best as living conversations, not permanent contracts.'
      },
      {
        q: 'Secure attachment across multiple relationships is most supported by:',
        options: ['Hiding each relationship from the others', 'Each partner feeling like a priority within their own connection', 'Constant comparison between partners', 'Avoiding emotional closeness'],
        correct: 1,
        explanation: 'Feeling secure and prioritized within each relationship — regardless of how many there are — supports healthy attachment.'
      }
    ],
    majorQuiz: [
      {
        q: 'Your partner tells you they feel a wave of jealousy after your date with someone else. The most secure-functioning response is to:',
        options: ['Tell them jealousy isn\'t allowed', 'Get defensive and end the conversation', 'Listen with curiosity and explore what need is behind the feeling', 'Stop seeing other partners immediately without discussion'],
        correct: 2,
        explanation: 'Treating jealousy as useful information — and exploring it together — builds trust rather than shutting down communication.'
      },
      {
        q: 'A "hierarchical" polyamory structure typically means:',
        options: ['All partners have identical roles and rules', 'Some relationships (e.g. a "primary" partner) are explicitly prioritized in certain decisions', 'Partners are ranked publicly', 'There are no agreements at all'],
        correct: 1,
        explanation: 'Hierarchical ENM explicitly names priority relationships, while non-hierarchical structures avoid ranking partners — neither is inherently better, but clarity matters.'
      },
      {
        q: '"New Relationship Energy" (NRE) can sometimes create friction with existing partners because:',
        options: ['NRE is always a sign of cheating', 'The intense excitement of a new connection can unintentionally shift time and attention away from existing relationships', 'NRE means the new relationship will fail', 'Existing partners should ignore their feelings about it'],
        correct: 1,
        explanation: 'NRE is a normal, intense phase — being mindful of its impact on existing relationships helps everyone feel secure.'
      },
      {
        q: 'If you\'re new to ENM and feel overwhelmed by a conversation about boundaries, a healthy "repair" move (drawing on core curriculum skills) is to:',
        options: ['Stonewall and disengage permanently', 'Take a calm break and return to the conversation when regulated', 'Make a unilateral decision to end all other relationships', 'Criticize your partner\'s character'],
        correct: 1,
        explanation: 'The repair and self-soothing skills from the core curriculum apply directly to ENM conversations — taking a break to regulate, then returning, keeps dialogue productive.'
      },
      {
        q: 'Which statement best reflects an "ethical" approach to non-monogamy?',
        options: ['What partners don\'t know can\'t hurt them', 'Everyone involved has the information and consent needed to make informed choices', 'Only one partner needs to agree to the arrangement', 'Ethics don\'t apply once a relationship is non-exclusive'],
        correct: 1,
        explanation: 'The "ethical" in ENM centers on honesty, consent, and informed choice for everyone involved — not just the people directly dating.'
      }
    ]
  },
  {
    id: 'kink-consent',
    icon: '⛓️',
    title: 'Kink, Consent & Power Exchange',
    shortTitle: 'Kink & Consent',
    expert: 'Inspired by consent-culture frameworks, incl. Betty Martin\'s "Wheel of Consent" & community standards (SSC, RACK)',
    summary: 'How explicit negotiation, safewords, and aftercare make kink and power-exchange dynamics safe, consensual, and fun.',
    takeaways: [
      '"SSC" (Safe, Sane, Consensual) and "RACK" (Risk-Aware Consensual Kink) are widely used frameworks for thinking about consent and risk in kink.',
      'Negotiation happens before a scene: discussing desires, limits (hard and soft), safewords, and aftercare needs.',
      'A safeword (like "red/yellow/green") gives a clear, unambiguous way to pause or stop — and should always be honored immediately.',
      '"Aftercare" — the time spent reconnecting after a scene — is a core part of the experience, not an optional extra.',
      'Power exchange (e.g., D/s dynamics) is consensual and revocable — consent can be withdrawn at any time, even mid-scene.',
      'Kink is one possible expression of intimacy, not a requirement — compatibility here, like anywhere else, is about honest communication of desires.'
    ],
    video: {
      type: 'link',
      label: 'Watch: Consent & Communication in Kink Relationships',
      url: 'https://www.youtube.com/results?search_query=kink+consent+communication+safewords+aftercare+explained'
    },
    minorQuiz: [
      {
        q: '"SSC" in kink communities stands for:',
        options: ['Safe, Sane, Consensual', 'Strong, Strict, Controlled', 'Slow, Steady, Careful', 'Secret, Special, Confidential'],
        correct: 0,
        explanation: 'SSC is a widely-used framework emphasizing safety, sanity (clear-headed consent), and full consent.'
      },
      {
        q: 'A safeword like "red" should:',
        options: ['Be ignored if the scene is going well', 'Be honored immediately, pausing or stopping the activity', 'Only be used once per relationship', 'Be chosen by only one partner'],
        correct: 1,
        explanation: 'A safeword is a non-negotiable signal — honoring it immediately is foundational to trust.'
      },
      {
        q: 'Negotiation in kink primarily happens:',
        options: ['After a scene is already underway', 'Before a scene, covering desires, limits, and safewords', 'Never — it ruins the spontaneity', 'Only for first-time partners'],
        correct: 1,
        explanation: 'Clear, upfront negotiation sets shared expectations and keeps everyone safe.'
      },
      {
        q: '"Aftercare" refers to:',
        options: ['Cleaning equipment after a scene', 'Time spent reconnecting emotionally and physically after a scene', 'A type of safeword', 'Paperwork required for kink events'],
        correct: 1,
        explanation: 'Aftercare supports emotional regulation and connection after an intense experience.'
      },
      {
        q: 'In a consensual power-exchange (e.g., D/s) dynamic, consent is:',
        options: ['Given once, permanently', 'Ongoing and can be withdrawn at any time, even mid-scene', 'Irrelevant once roles are established', 'Only the "submissive" partner\'s responsibility'],
        correct: 1,
        explanation: 'Even within agreed-upon power dynamics, consent remains ongoing and revocable for everyone involved.'
      }
    ],
    majorQuiz: [
      {
        q: 'You and a partner are negotiating a new scene. They mention a "soft limit." This means:',
        options: ['Something they\'re firmly against and won\'t discuss', 'Something they\'re curious about but want to approach cautiously, with extra check-ins', 'A joke', 'A hard rule that can never change'],
        correct: 1,
        explanation: 'Soft limits are areas of curiosity or caution — often approached slowly, unlike hard limits which are firm boundaries.'
      },
      {
        q: 'Mid-scene, your partner uses the agreed safeword. The best response is to:',
        options: ['Ask them to wait until a "better" moment', 'Pause or stop immediately and check in', 'Continue but more gently', 'Assume they didn\'t mean it'],
        correct: 1,
        explanation: 'Safewords exist precisely for moments like this — immediate response is what makes them trustworthy.'
      },
      {
        q: '"RACK" (Risk-Aware Consensual Kink) differs from "SSC" mainly by:',
        options: ['Removing consent from the equation', 'Acknowledging that some activities carry inherent risk, and focusing on informed awareness of that risk rather than claims of total "safety"', 'Requiring a written contract for every scene', 'Applying only to professionals'],
        correct: 1,
        explanation: 'RACK emphasizes that participants make informed choices about risk, rather than framing all kink activities as fully "safe."'
      },
      {
        q: 'After an intense scene, your partner seems withdrawn and quiet the next day. Drawing on EFT/attachment skills from the core curriculum, a good first step is to:',
        options: ['Assume they regret everything and avoid the topic forever', 'Check in with curiosity about how they\'re feeling and whether their needs were met', 'Take it personally and become defensive', 'Stop all aftercare since the scene is over'],
        correct: 1,
        explanation: '"Drop" (an emotional low after intense experiences) is common — checking in with warmth and curiosity supports both partners.'
      },
      {
        q: 'A healthy approach to introducing kink into a relationship is to:',
        options: ['Surprise your partner with new activities without discussion', 'Pressure a partner who says no until they agree', 'Share interests honestly and negotiate what, if anything, both partners want to explore', 'Assume all partners share the same interests automatically'],
        correct: 2,
        explanation: 'As with all intimacy, honest sharing and mutual, enthusiastic negotiation — not pressure or assumptions — is the foundation.'
      }
    ]
  },
  {
    id: 'conflict-mastery',
    icon: '🕊️',
    title: 'Conflict Resolution Mastery',
    shortTitle: 'Conflict Mastery',
    expert: 'Inspired by Marshall B. Rosenberg, Ph.D. — Nonviolent Communication (NVC)',
    summary: 'Go beyond repair basics with Nonviolent Communication: separating observations from judgments, naming feelings and needs, and making clear requests.',
    takeaways: [
      'NVC breaks communication into four components, often called "OFNR": Observations, Feelings, Needs, and Requests.',
      'An "observation" is a fact without evaluation — "You arrived at 8pm" vs. "You\'re always late."',
      'Naming a feeling (e.g., "I feel discouraged") is more connecting than a judgment disguised as a feeling (e.g., "I feel like you don\'t care").',
      'Underneath every feeling is a universal human need — for connection, respect, rest, autonomy, and more.',
      'A "request" is specific, doable, and stated positively — asking for what you do want, not just what you don\'t.',
      'Conflict resolution isn\'t about who\'s "right" — it\'s about understanding both people\'s needs and finding strategies that honor both.'
    ],
    video: {
      type: 'link',
      label: 'Watch: Nonviolent Communication (NVC) Explained',
      url: 'https://www.youtube.com/results?search_query=nonviolent+communication+marshall+rosenberg+explained'
    },
    minorQuiz: [
      {
        q: 'NVC\'s four components ("OFNR") stand for:',
        options: ['Observations, Feelings, Needs, Requests', 'Opinions, Facts, Negotiation, Rules', 'Order, Fairness, Neutrality, Resolution', 'Objections, Frustrations, Needs, Reactions'],
        correct: 0,
        explanation: 'OFNR is the core structure of an NVC statement.'
      },
      {
        q: 'Which of these is a pure "observation" (free of judgment)?',
        options: ['"You\'re so inconsiderate"', '"You never help out"', '"The dishes have been in the sink since yesterday"', '"You don\'t care about this house"'],
        correct: 2,
        explanation: 'An observation states what happened without evaluating the person\'s character or intent.'
      },
      {
        q: 'In NVC, underneath every feeling is usually:',
        options: ['A universal human need', 'A character flaw', 'Someone else\'s fault', 'Nothing — feelings are random'],
        correct: 0,
        explanation: 'NVC connects feelings to needs like connection, respect, autonomy, or rest.'
      },
      {
        q: 'An effective NVC "request" is:',
        options: ['Vague so the other person has flexibility', 'Phrased as a demand', 'Specific, doable, and stated in positive terms', 'About what you don\'t want, without alternatives'],
        correct: 2,
        explanation: 'Clear, positive, doable requests make it easier for a partner to actually meet the need.'
      },
      {
        q: 'The underlying goal of NVC-based conflict resolution is:',
        options: ['Determining who is "right"', 'Understanding both people\'s needs and finding strategies that honor both', 'Avoiding conflict entirely', 'Winning the negotiation'],
        correct: 1,
        explanation: 'NVC reframes conflict as a shared problem to solve, not a contest to win.'
      }
    ],
    majorQuiz: [
      {
        q: 'Your partner says, "You never listen to me!" Reframed using NVC\'s OFNR model, this might become:',
        options: ['"You\'re a bad listener and always have been."', '"When I was talking and you checked your phone, I felt hurt because I need to feel heard — could we put phones away during our talks?"', '"I never want to talk to you again."', '"Fine, whatever you say."'],
        correct: 1,
        explanation: 'This reframe separates the observation (phone use), feeling (hurt), need (to feel heard), and a specific request.'
      },
      {
        q: 'Your partner makes a request, but it conflicts with a need of your own. The NVC-informed next step is:',
        options: ['Refuse without explanation', 'Agree just to avoid conflict, even if resentful', 'Share your own need honestly and look for a solution that addresses both', 'Bring up unrelated past issues'],
        correct: 2,
        explanation: 'NVC isn\'t about always saying yes — it\'s about honestly expressing both people\'s needs and collaborating on a solution.'
      },
      {
        q: 'Combining NVC with Gottman\'s "repair attempts" (from the core curriculum), a good mid-conflict strategy is:',
        options: ['Escalate until someone gives in', 'Use a repair attempt (like a calm tone or a brief break) to de-escalate, then use OFNR to express your perspective', 'Bring in a third party to "win" the argument', 'Stop talking permanently'],
        correct: 1,
        explanation: 'De-escalation (repair) creates the calm needed for clear, connected communication (NVC) to actually land.'
      },
      {
        q: 'A judgment disguised as a feeling sounds like "I feel like you\'re being selfish." A true feeling statement would instead be:',
        options: ['"I feel ignored and frustrated, and I need some reassurance that my plans matter too."', '"I feel like you\'re wrong."', '"I feel that you should apologize."', '"I feel you never think about me, ever."'],
        correct: 0,
        explanation: 'True feelings (hurt, frustrated, lonely) describe your internal experience — judgments describe or label the other person.'
      },
      {
        q: 'When two partners have genuinely conflicting needs (e.g., one needs alone time, the other needs connection), NVC suggests:',
        options: ['One partner\'s need always wins', 'Both needs are valid, and the conversation focuses on finding a strategy that meets both, even partially', 'Ignore both needs', 'Needs can\'t actually conflict'],
        correct: 1,
        explanation: 'NVC treats needs as universal and valid — even when they conflict, the goal is creative problem-solving that honors both.'
      }
    ]
  },
  {
    id: 'long-distance',
    icon: '🌍',
    title: 'Long-Distance & Life Transitions',
    shortTitle: 'LDR & Transitions',
    expert: 'General research on long-distance relationships (LDRs) & major life transitions',
    summary: 'How couples maintain connection across distance and time zones — and navigate major life changes like moves, career shifts, and blending households.',
    takeaways: [
      'Long-distance relationships (LDRs) can be just as satisfying as geographically close ones when communication is intentional and consistent.',
      'LDR couples often report comparable or even higher relationship satisfaction during the distance phase — but the transition to living together is a major adjustment that benefits from planning.',
      '"Rituals of connection" (regular calls, shared shows, virtual dates) help maintain closeness across distance and time zones.',
      'Major life transitions (moving, job changes, becoming roommates) can surface new conflicts even in strong relationships — this is normal, not a sign of failure.',
      'Discussing logistics (finances, space, routines) before a big transition reduces surprises and resentment later.',
      'Maintaining individual identity and support networks — even while building a shared life — supports long-term relationship health.'
    ],
    video: {
      type: 'link',
      label: 'Watch: Making Long-Distance Relationships Work',
      url: 'https://www.youtube.com/results?search_query=long+distance+relationship+research+tips+moving+in+together'
    },
    minorQuiz: [
      {
        q: 'Research on LDRs suggests that, during the long-distance phase, couples often report:',
        options: ['Lower relationship satisfaction than geographically close couples', 'Similar or even higher relationship satisfaction, due to intentional communication', 'No difference in any outcome', 'Relationships always end within a year'],
        correct: 1,
        explanation: 'Many studies find LDR couples report comparable or higher satisfaction during the distance phase, often due to more deliberate communication.'
      },
      {
        q: '"Rituals of connection" in an LDR might include:',
        options: ['Avoiding contact to "give space"', 'Regular calls, shared shows, or virtual dates', 'Only texting during emergencies', 'Comparing schedules to find times to NOT talk'],
        correct: 1,
        explanation: 'Predictable rituals create a sense of togetherness despite physical distance.'
      },
      {
        q: 'The transition from long-distance to living together is often:',
        options: ['Effortless since the couple is already close', 'A major adjustment that benefits from planning, even for strong couples', 'A sign the relationship is failing if it\'s hard', 'Something that should happen with no discussion'],
        correct: 1,
        explanation: 'Closing the distance is a real transition — new routines, space-sharing, and logistics all need to be (re)negotiated.'
      },
      {
        q: 'Discussing finances and logistics before a big life transition (like moving in together) helps:',
        options: ['Reduce surprises and resentment later', 'Ruin the romance', 'Replace the need for communication afterward', 'Guarantee no future conflict'],
        correct: 0,
        explanation: 'Proactive conversations don\'t eliminate conflict, but they reduce avoidable surprises.'
      },
      {
        q: 'Maintaining individual friendships and interests during a major life transition:',
        options: ['Signals a lack of commitment', 'Supports long-term relationship health', 'Should be paused until the transition is "done"', 'Is only important for long-distance couples'],
        correct: 1,
        explanation: 'A strong sense of self alongside a strong "we" supports resilience through transitions.'
      }
    ],
    majorQuiz: [
      {
        q: 'You and a long-distance partner are planning to move in together in 3 months. A helpful first step (drawing on Tatkin\'s "couple bubble" concept) is to:',
        options: ['Wait until moving day to discuss expectations', 'Have ongoing conversations about shared routines, space, and decision-making as a team', 'Let one partner make all the decisions to "keep it simple"', 'Avoid the topic to prevent conflict'],
        correct: 1,
        explanation: 'Proactively building shared agreements — the "couple bubble" — before a big transition sets the relationship up for success.'
      },
      {
        q: 'After moving in together, you notice more friction than expected, even though you were very happy long-distance. This is best understood as:',
        options: ['Proof the relationship was never right', 'A normal adjustment to a major life transition, not a sign of failure', 'Something to hide from your partner', 'A reason to immediately separate'],
        correct: 1,
        explanation: 'New living arrangements surface new dynamics — normalizing this supports working through it together.'
      },
      {
        q: 'Time zone differences in an LDR can strain communication. A strategy that respects both partners\' needs is:',
        options: ['Whoever has the "harder" schedule should always sacrifice sleep', 'Collaboratively find consistent windows that work for both, even if imperfect, and communicate about exceptions', 'Stop scheduling calls altogether', 'One partner should change their entire sleep schedule permanently'],
        correct: 1,
        explanation: 'Mutual, flexible planning — a form of "two yeses make a go" — respects both people\'s needs.'
      },
      {
        q: 'A partner going through a major career transition seems withdrawn and stressed. Drawing on the "A.R.E." framework, a supportive response is to:',
        options: ['Give them total space and don\'t ask anything', 'Stay available, tune into their stress with curiosity, and let them know you\'re there without pressuring them to "fix" it', 'Take their stress personally', 'Tell them to "just relax"'],
        correct: 1,
        explanation: 'Being accessible and responsive — without demanding solutions — helps a partner feel supported during a hard transition.'
      },
      {
        q: 'Which best describes a healthy approach to blending two households (finances, belongings, routines)?',
        options: ['One partner\'s way of doing things should simply replace the other\'s', 'Treat it as a collaborative redesign, openly discussing preferences and compromises', 'Avoid combining anything to prevent conflict', 'Decide everything quickly without discussion to "get it over with"'],
        correct: 1,
        explanation: 'Blending lives well usually means consciously building new shared systems together, not defaulting to one person\'s prior habits.'
      }
    ]
  },
  {
    id: 'lgbtq-family',
    icon: '🏳️‍🌈',
    title: 'LGBTQ+ Relationship Dynamics & Chosen Family',
    shortTitle: 'LGBTQ+ & Chosen Family',
    expert: 'General research on LGBTQ+ relationship health, minority stress, and chosen family',
    summary: 'Understanding minority stress, the role of chosen family, and building relationships that affirm identity and navigate unique challenges.',
    takeaways: [
      '"Minority stress" describes the additional, chronic stress LGBTQ+ people may experience due to stigma, discrimination, or lack of acceptance — and it can affect relationships even when partners are supportive of each other.',
      '"Chosen family" — close friends and community who provide support that biological family may not — plays a vital role in many LGBTQ+ people\'s lives and relationships.',
      'Coming out (to family, friends, or communities) is an ongoing process, not a single event, and partners may be at different stages or face different risks.',
      'Relationship milestones (e.g., moving in together, marriage, parenting) may carry extra layers of meaning, joy, or complexity for LGBTQ+ couples.',
      'Affirming relationships actively validate each partner\'s identity — they don\'t just "tolerate" it.',
      'All the core skills — secure attachment, repair, A.R.E., the couple bubble — apply to LGBTQ+ relationships, while also benefiting from awareness of these unique contexts.'
    ],
    video: {
      type: 'link',
      label: 'Watch: LGBTQ+ Relationships, Minority Stress & Chosen Family',
      url: 'https://www.youtube.com/results?search_query=lgbtq+relationships+minority+stress+chosen+family'
    },
    minorQuiz: [
      {
        q: '"Minority stress" refers to:',
        options: ['Stress that only affects relationships with more than two people', 'The additional, chronic stress some people experience due to stigma or discrimination related to a marginalized identity', 'A stress management technique', 'Stress that has no impact on relationships'],
        correct: 1,
        explanation: 'Minority stress is a well-documented source of chronic stress tied to stigma and discrimination.'
      },
      {
        q: '"Chosen family" describes:',
        options: ['A legal adoption process', 'Close friends and community who provide support, sometimes in addition to or instead of biological family', 'Only people related by blood', 'A type of dating app feature'],
        correct: 1,
        explanation: 'Chosen family is a vital support network for many LGBTQ+ people.'
      },
      {
        q: 'Coming out is best understood as:',
        options: ['A single event that happens once', 'An ongoing process that can happen in different contexts over time', 'Something that only matters before age 18', 'Irrelevant to relationship dynamics'],
        correct: 1,
        explanation: 'Coming out often happens repeatedly, in different relationships and settings, throughout life.'
      },
      {
        q: 'An "affirming" relationship is one where partners:',
        options: ['Merely tolerate each other\'s identities', 'Actively validate and celebrate each partner\'s identity', 'Avoid discussing identity entirely', 'Require one partner to hide parts of themselves'],
        correct: 1,
        explanation: 'Affirmation goes beyond tolerance — it means actively valuing who your partner is.'
      },
      {
        q: 'Core relationship skills like secure attachment and repair attempts:',
        options: ['Don\'t apply to LGBTQ+ relationships', 'Apply to LGBTQ+ relationships, alongside awareness of unique contexts like minority stress', 'Only apply to heterosexual couples', 'Are less important for LGBTQ+ couples'],
        correct: 1,
        explanation: 'The foundational relationship science applies broadly, enriched by context-specific awareness.'
      }
    ],
    majorQuiz: [
      {
        q: 'Your partner seems anxious before a family gathering where they\'re not fully out. A supportive, A.R.E.-informed response is to:',
        options: ['Insist they come out immediately to "be authentic"', 'Check in about what they need from you, and follow their lead on disclosure', 'Out them yourself to "help"', 'Refuse to attend, ignoring their feelings'],
        correct: 1,
        explanation: 'Respecting a partner\'s pace and autonomy around coming out — while staying emotionally present — supports both safety and connection.'
      },
      {
        q: 'One partner relies heavily on chosen family for support, while the other is closer with biological family. A secure-functioning approach (per Tatkin) is to:',
        options: ['Require both partners to relate to family the same way', 'Recognize and make room for both kinds of important relationships in the "couple bubble"', 'Dismiss chosen family as "not real family"', 'Cut off one partner\'s support network'],
        correct: 1,
        explanation: 'The couple bubble can flexibly include each partner\'s support systems, rather than forcing identical family structures.'
      },
      {
        q: 'Minority stress can sometimes show up in a relationship as:',
        options: ['Increased vigilance, exhaustion, or sensitivity around topics related to safety and acceptance', 'A complete absence of any extra stress', 'Something totally unrelated to the relationship', 'Only an issue for one partner, never both'],
        correct: 0,
        explanation: 'Chronic minority stress can affect mood, energy, and reactivity — understanding this with compassion supports the relationship.'
      },
      {
        q: 'When navigating a milestone (like introducing a partner to family) that may carry extra risk for an LGBTQ+ couple, the NVC-informed approach (from Conflict Resolution Mastery) would be to:',
        options: ['Avoid discussing it until the last minute', 'Name observations, feelings, and needs around the situation, and make a specific request together about how to approach it', 'Assume both partners feel the same way without asking', 'Let one partner decide unilaterally'],
        correct: 1,
        explanation: 'Using OFNR helps both partners voice fears, hopes, and needs around sensitive milestones, and plan together.'
      },
      {
        q: 'Overall, the most accurate statement about applying LoveLearn\'s core curriculum to LGBTQ+ relationships is:',
        options: ['The core skills don\'t apply and a totally different approach is needed', 'The same core skills (attachment, repair, A.R.E., secure functioning) apply, enriched by awareness of identity-specific contexts', 'Only the "Red Flags" module is relevant', 'LGBTQ+ relationships don\'t experience conflict'],
        correct: 1,
        explanation: 'The foundational relationship science applies broadly — context and additional considerations add depth, not replacement.'
      }
    ]
  }
];
