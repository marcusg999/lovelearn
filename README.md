# LoveLearn

> Get certified mature & healed enough to date — then meet people who did the work too.

LoveLearn is a concept dating app that requires new users to earn a
**LoveLearn Relationship-Readiness Certification** — by completing **LoveLearn
Academy** and passing a capstone exam — before they can browse profiles, match,
or chat. The whole journey is gamified with XP, levels, streaks, and confetti.

## How it works

1. **Create a profile** — name, age, avatar, gender, who you're looking for, and a bio.
2. **LoveLearn Academy** — work through 8 modules inspired by well-known relationship
   researchers and therapists:
   - 🧩 Know Thyself: Attachment Styles — inspired by Amir Levine, M.D. & Rachel S.F. Heller ("Attached")
   - 🐎 The Four Horsemen & Their Antidotes — inspired by John Gottman, Ph.D. (The Gottman Institute)
   - 🔥 Mating in Captivity: Desire & Intimacy — inspired by Esther Perel
   - 🛡️ Boundaries, Consent & Honest Communication — inspired by Robin Roemer, LMFT (Los Angeles)
   - 🏠 Conflict Repair & The Sound Relationship House — inspired by John Gottman, Ph.D.
   - 🚩 Red Flags, Green Flags & Dating Safety — general dating safety education
   - 🤲 Hold Me Tight: Emotional Responsiveness — inspired by Dr. Sue Johnson (Emotionally Focused Therapy)
   - 🧲 Wired for Love: Secure Functioning — inspired by Dr. Stan Tatkin (PACT)
3. **Watch & learn** — each module includes a short video and a list of key takeaways.
4. **Pass the quiz** — score 4/5 (80%) or higher to unlock the next module, earn XP,
   build your daily streak, and level up.
5. **Get certified** — once all 8 modules are passed, take the **🏅 LoveLearn
   Certification Exam** (a 10-question review of every module, 8/10 to pass).
6. **Graduate** — earn your Relationship-Readiness Certification, complete with a
   certificate, and unlock **Discover** (swipeable profiles), **Matches**, and chat.
7. **Major or minor in Electives** — once certified, unlock the **LoveLearn
   Electives** screen and specialize in topics like Polyamory, Kink & Consent,
   Conflict Mastery, Long-Distance Relationships, and LGBTQ+ Relationship Dynamics.

## Electives: Majors & Minors

Certified members can explore specialization tracks on the **Electives** screen:

- 💜 Polyamory & Ethical Non-Monogamy — inspired by Jessica Fern ("Polysecure")
- ⛓️ Kink, Consent & Power Exchange — inspired by consent-culture frameworks (Betty Martin's "Wheel of Consent", SSC, RACK)
- 🕊️ Conflict Resolution Mastery — inspired by Marshall B. Rosenberg's Nonviolent Communication
- 🌍 Long-Distance & Life Transitions
- 🏳️‍🌈 LGBTQ+ Relationship Dynamics & Chosen Family

Each elective has two assessments:

- **🎓 Minor Assessment** — a 5-question quiz; score 4/5 (80%) to earn a **Minor**.
- **🏆 Major Thesis Exam** — a harder, scenario-based 5-question quiz that unlocks
  once the Minor is earned; score 4/5 (80%) to earn a **Major**.

Earned Minors and Majors show up as badges on your Profile and as specialization
tags on your Certificate.

### Adding new electives

The `ELECTIVES` array in `curriculum.js` is the single source of truth — append a
new entry with the same shape (`id`, `icon`, `title`, `shortTitle`, `expert`,
`summary`, `takeaways`, `video`, `minorQuiz`, `majorQuiz`) and it automatically
appears on the Electives screen, in profile badges, on the certificate, and in
XP/leveling — no other code changes needed.

## Gamification

- **XP & levels** — every passed quiz earns XP (with bonus XP for extra correct
  answers), leveling you up from 🌱 New Student all the way to 👑 LoveLearn
  Laureate, including 💎 Master Communicator and 🎯 Specialist along the way.
  Elective Minors and Majors award extra XP on top of the core curriculum.
- **Daily streaks** — a 🔥 streak counter tracks consecutive days of progress.
- **Confetti & level-up celebrations** — passing a module, leveling up, or getting
  certified triggers a celebration animation.
- **Badges & certificate** — your Profile shows a badge for every completed module
  plus a gold "Certified" badge, badges for each elective Major/Minor earned, and
  a certificate once certified.

## Shareable certificate

From the Certificate screen, certified members can:

- **📤 Share Certificate** — generates a shareable 1200×630 certificate image
  (via `<canvas>`) showing your name, certification date/ID, and any Majors/Minors
  earned. Uses the Web Share API on supported devices, or downloads the image.
- **📋 Copy Share Text** — copies a short, social-ready caption summarizing your
  certification and specializations to the clipboard.

## Tech stack

Vanilla HTML / CSS / JS, zero build step, zero dependencies. All app state
(profile, academy progress, XP/streaks, swipes, matches, and chats) is stored in
the browser's `localStorage` — there is no backend or server.

## Running locally

Just open `index.html` in a browser, or serve the folder with any static file server:

```bash
cd lovelearn
python3 -m http.server 8080
# then open http://localhost:8080
```

## Files

- `index.html` — app shell and screen markup
- `styles.css` — all styling
- `curriculum.js` — the 8 LoveLearn Academy modules and the capstone certification exam, with takeaways, videos, and quizzes
- `profiles.js` — sample/demo profiles for the Discover screen
- `app.js` — app state, routing, and rendering logic
