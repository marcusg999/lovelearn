/* LoveLearn — app logic
   A local, single-device demo: profile data, academy progress, and
   matches/chat are all stored in localStorage. */

const STORAGE_KEY = 'lovelearn_state_v1';

const AUTO_REPLIES = [
  'Haha, I like that 😄',
  "Okay deal — when are you free?",
  "That's such a green flag answer.",
  'Tell me more!',
  'I was just thinking about that too.',
  'Honestly, same. What made you join LoveLearn?',
  'Coffee or a walk for a first date?'
];

/* Level thresholds, derived from total XP earned across modules + capstone */
const LEVELS = [
  { name: 'New Student', icon: '🌱', xp: 0 },
  { name: 'Curious Learner', icon: '📖', xp: 100 },
  { name: 'Self-Aware', icon: '🧠', xp: 250 },
  { name: 'Empathetic Listener', icon: '👂', xp: 400 },
  { name: 'Conflict Navigator', icon: '🧭', xp: 560 },
  { name: 'Secure & Grounded', icon: '🪴', xp: 740 },
  { name: 'Relationship Ready', icon: '💪', xp: 940 },
  { name: 'Master Communicator', icon: '💎', xp: 1150 },
  { name: 'Specialist', icon: '🎯', xp: 1450 },
  { name: 'LoveLearn Laureate', icon: '👑', xp: 2000 }
];

let state = createInitialState();
let currentScreen = 'welcome';
let currentModuleId = null;
let currentChatProfileId = null;
let matchedProfileId = null;
let quizState = null;
let toastTimer = null;

function createInitialState() {
  return { user: null, progress: {}, swiped: {}, matches: [], chats: {}, streak: { count: 0, lastDate: null }, requests: {} };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = Object.assign(createInitialState(), JSON.parse(raw));
  } catch (e) {
    state = createInitialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

/* ---------- Curriculum helpers ---------- */
function getModule(id) {
  return CURRICULUM.find(m => m.id === id);
}

function isModuleUnlocked(module) {
  if (module.order === 1) return true;
  const prev = CURRICULUM.find(m => m.order === module.order - 1);
  return !!(prev && state.progress[prev.id] && state.progress[prev.id].passed);
}

function getModuleStatus(module) {
  if (state.progress[module.id] && state.progress[module.id].passed) return 'completed';
  if (isModuleUnlocked(module)) return 'unlocked';
  return 'locked';
}

function countPassed() {
  return CURRICULUM.filter(m => state.progress[m.id] && state.progress[m.id].passed).length;
}

function allModulesPassed() {
  return countPassed() === CURRICULUM.length;
}

/* ---------- Capstone / certification helpers ---------- */
function isCapstone(id) {
  return id === CAPSTONE_EXAM.id;
}

function getQuizDef(id) {
  if (isCapstone(id)) return CAPSTONE_EXAM;
  const module = getModule(id);
  if (module) return module;
  const elective = getElectiveByQuizId(id);
  if (elective) {
    const isMajor = id === majorQuizId(elective.id);
    return {
      id,
      title: `${elective.title} — ${isMajor ? 'Major Thesis Exam' : 'Minor Assessment'}`,
      quiz: isMajor ? elective.majorQuiz : elective.minorQuiz
    };
  }
  return null;
}

function getPassingScore(quizDef) {
  return quizDef.passingScore || PASSING_SCORE;
}

function isCapstoneUnlocked() {
  return allModulesPassed();
}

function getCapstoneStatus() {
  const prog = state.progress[CAPSTONE_EXAM.id];
  if (prog && prog.passed) return 'completed';
  if (isCapstoneUnlocked()) return 'unlocked';
  return 'locked';
}

function isCertified() {
  const prog = state.progress[CAPSTONE_EXAM.id];
  return !!(prog && prog.passed);
}

function generateCertId() {
  return 'LL-' + Date.now().toString(36).toUpperCase();
}

/* ---------- Electives (Majors & Minors) ----------
   Adding a new elective is data-only: append an entry to the ELECTIVES
   array in curriculum.js with the same shape (id, icon, title, shortTitle,
   expert, summary, takeaways, video, minorQuiz, majorQuiz) and it will
   automatically appear here, on the Electives screen, in profile badges,
   on the certificate, and in XP/leveling — no other code changes needed. */
function getElective(id) {
  return ELECTIVES.find(e => e.id === id);
}

function electivesUnlocked() {
  return isCertified();
}

function minorQuizId(electiveId) {
  return electiveId + '-minor';
}

function majorQuizId(electiveId) {
  return electiveId + '-major';
}

function getElectiveByQuizId(id) {
  return ELECTIVES.find(e => minorQuizId(e.id) === id || majorQuizId(e.id) === id);
}

function isElectiveMinorId(id) {
  return ELECTIVES.some(e => minorQuizId(e.id) === id);
}

function isElectiveMajorId(id) {
  return ELECTIVES.some(e => majorQuizId(e.id) === id);
}

function hasMinor(electiveId) {
  const p = state.progress[minorQuizId(electiveId)];
  return !!(p && p.passed);
}

function hasMajor(electiveId) {
  const p = state.progress[majorQuizId(electiveId)];
  return !!(p && p.passed);
}

function isMajorUnlocked(electiveId) {
  return hasMinor(electiveId);
}

function getEarnedMajors() {
  return ELECTIVES.filter(e => hasMajor(e.id));
}

function getEarnedMinors() {
  return ELECTIVES.filter(e => hasMinor(e.id));
}

/* ---------- Advanced tier, compatibility & couples/play-partner gating ----------
   "Advanced Certified" members have done extra in-depth training (2+ Majors)
   or upgraded to LoveLearn+ (a free demo toggle). They can view every
   profile; everyone else sees a locked preview for Advanced-tier profiles
   and can request access. */
function isAdvancedTier() {
  return getEarnedMajors().length >= 2 || !!(state.user && state.user.loveLearnPlus);
}

function isProfileLocked(profile) {
  if (profile.tier !== 'advanced') return false;
  if (isAdvancedTier()) return false;
  const req = state.requests[profile.id];
  return !req || req.status !== 'approved';
}

/* "Special training" for couples seeking play partners: only members who
   earned a Major in Polyamory & ENM or Kink & Consent see the couple/play
   partner indicators on Discover. */
function canSeePlayPartnerInfo() {
  return hasMajor('polyamory') || hasMajor('kink-consent');
}

/* Compatibility score based on shared Majors & Minors — "users with similar
   majors and minors are more comparable." */
function getCompatibilityScore(profile) {
  const mySpecs = new Set([
    ...getEarnedMajors().map(e => e.id),
    ...getEarnedMinors().map(e => e.id)
  ]);
  const theirSpecs = new Set([...(profile.majors || []), ...(profile.minors || [])]);
  let shared = 0;
  mySpecs.forEach(id => { if (theirSpecs.has(id)) shared++; });
  return Math.min(99, 60 + shared * 12);
}

function getSharedSpecializations(profile) {
  const theirSpecs = new Set([...(profile.majors || []), ...(profile.minors || [])]);
  return ELECTIVES.filter(e => (hasMajor(e.id) || hasMinor(e.id)) && theirSpecs.has(e.id));
}

/* ---------- Advanced access requests ---------- */
function requestAccess(profileId) {
  const p = PROFILES.find(x => x.id === profileId);
  if (!p) return;
  state.requests[profileId] = { status: 'pending' };
  saveState();
  toast('Request sent');
  if (currentScreen === 'discover') renderDiscover();
  setTimeout(() => {
    const approved = Math.random() < 0.6;
    if (approved) {
      state.requests[profileId] = { status: 'approved' };
      toast(`${p.name} approved your request!`);
    } else {
      delete state.requests[profileId];
      toast(`${p.name} isn't accepting requests right now`);
    }
    saveState();
    if (currentScreen === 'discover') renderDiscover();
  }, 2000);
}

function toggleLoveLearnPlus(on) {
  state.user.loveLearnPlus = on;
  saveState();
  toast(on ? "LoveLearn+ activated (demo) ⭐" : 'LoveLearn+ cancelled.');
  renderProfile();
}

function getLessonIdForQuiz(quizId) {
  if (isCapstone(quizId)) return quizId;
  const elective = getElectiveByQuizId(quizId);
  return elective ? elective.id : quizId;
}

/* ---------- XP & leveling ---------- */
function getQuizXP(quizDef, score) {
  const passingScore = getPassingScore(quizDef);
  if (score < passingScore) return 0;
  let base = 100;
  let bonusPerExtra = 20;
  if (isCapstone(quizDef.id)) {
    base = 300;
    bonusPerExtra = 25;
  } else if (isElectiveMajorId(quizDef.id)) {
    base = 250;
    bonusPerExtra = 25;
  } else if (isElectiveMinorId(quizDef.id)) {
    base = 150;
    bonusPerExtra = 20;
  }
  return base + (score - passingScore) * bonusPerExtra;
}

function getModuleXP(id) {
  const prog = state.progress[id];
  if (!prog || !prog.passed) return 0;
  return getQuizXP(getQuizDef(id), prog.score);
}

function getTotalXP() {
  let xp = 0;
  CURRICULUM.forEach(m => { xp += getModuleXP(m.id); });
  xp += getModuleXP(CAPSTONE_EXAM.id);
  ELECTIVES.forEach(el => {
    xp += getModuleXP(minorQuizId(el.id));
    xp += getModuleXP(majorQuizId(el.id));
  });
  return xp;
}

function getLevel(xp) {
  let levelIndex = 0;
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].xp) levelIndex = i;
  }
  const current = LEVELS[levelIndex];
  const next = LEVELS[levelIndex + 1];
  const xpIntoLevel = xp - current.xp;
  const xpForNext = next ? next.xp - current.xp : 0;
  const progressPct = next ? Math.min(100, Math.round((xpIntoLevel / xpForNext) * 100)) : 100;
  return {
    index: levelIndex,
    number: levelIndex + 1,
    name: current.name,
    icon: current.icon,
    xp,
    xpIntoLevel,
    next,
    progressPct
  };
}

/* ---------- Streak ---------- */
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function updateStreak() {
  if (!state.streak) state.streak = { count: 0, lastDate: null };
  const today = todayStr();
  if (state.streak.lastDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  state.streak.count = state.streak.lastDate === yesterday ? state.streak.count + 1 : 1;
  state.streak.lastDate = today;
  saveState();
}

/* ---------- Confetti ---------- */
function launchConfetti(count = 60) {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  const colors = ['#a855f7', '#ec4899', '#fbbf24', '#34d399', '#38bdf8', '#fb923c'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = piece.style.height = `${6 + Math.random() * 6}px`;
    piece.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 3500);
  }
}

/* ---------- Screen / nav management ---------- */
function showScreen(name) {
  currentScreen = name;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + name);
  if (target) target.classList.add('active');
}

function activeNavFor(screen) {
  if (['academy', 'module', 'quiz', 'quiz-result'].includes(screen)) return 'academy';
  if (screen === 'chat') return 'matches';
  if (['discover', 'matches', 'profile'].includes(screen)) return screen;
  return null;
}

function updateNav() {
  const nav = document.getElementById('bottom-nav');
  nav.style.display = state.user ? 'flex' : 'none';
  const active = activeNavFor(currentScreen);
  const locked = !isCertified();
  nav.querySelectorAll('.nav-btn').forEach(btn => {
    const name = btn.dataset.nav;
    btn.classList.toggle('active', name === active);
    let lockDot = btn.querySelector('.lock-dot');
    if ((name === 'discover' || name === 'matches') && locked) {
      if (!lockDot) {
        lockDot = document.createElement('span');
        lockDot.className = 'lock-dot';
        lockDot.textContent = '🔒';
        btn.appendChild(lockDot);
      }
    } else if (lockDot) {
      lockDot.remove();
    }
  });
}

function updateHeaderProgress() {
  const pills = document.getElementById('header-pills');
  const xpBarWrap = document.getElementById('xp-bar-wrap');
  if (!state.user) {
    pills.style.display = 'none';
    xpBarWrap.style.display = 'none';
    return;
  }
  pills.style.display = 'flex';
  xpBarWrap.style.display = 'block';
  const level = getLevel(getTotalXP());
  document.getElementById('level-pill').textContent = `${level.icon} Lv.${level.number}`;
  document.getElementById('streak-pill').textContent = `🔥 ${state.streak.count}`;
  document.getElementById('xp-bar').style.width = `${level.progressPct}%`;
}

function scrollMainToTop() {
  document.querySelector('.app-main').scrollTop = 0;
}

function navigateTo(screen) {
  showScreen(screen);
  if (screen === 'academy') renderAcademy();
  else if (screen === 'discover') renderDiscover();
  else if (screen === 'matches') renderMatches();
  else if (screen === 'profile') renderProfile();
  else if (screen === 'certificate') renderCertificate();
  else if (screen === 'electives') renderElectives();
  updateNav();
  updateHeaderProgress();
  scrollMainToTop();
}

function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- Locked screen ---------- */
function lockedScreenHtml(which) {
  const completed = countPassed();
  const total = CURRICULUM.length;
  const examReady = allModulesPassed();
  let label = 'Matches';
  if (which === 'discover') label = 'Discover';
  else if (which === 'electives') label = 'Electives';
  const verb = which === 'electives' ? 'are' : 'is';
  return `
    <div class="locked-screen">
      <div class="lock-emoji">🔒</div>
      <h2>${label} ${verb} locked</h2>
      <p>${examReady
        ? `You've finished all ${total} modules! Pass the LoveLearn Certification Exam to earn your Relationship-Readiness Certification and unlock ${label.toLowerCase()}.`
        : `Earn your LoveLearn Relationship-Readiness Certification to unlock ${label.toLowerCase()}. You're ${completed} of ${total} modules in!`}</p>
      <div class="progress-wrap"><div class="progress-bar" style="width:${(completed / total) * 100}%"></div></div>
      <div class="btn-stack">
        <button class="btn btn-primary" data-action="academy">${examReady ? 'Take the Exam' : 'Go to Academy'}</button>
      </div>
    </div>
  `;
}

/* ---------- Academy ---------- */
function renderAcademy() {
  const completed = countPassed();
  const total = CURRICULUM.length;
  document.getElementById('academy-progress-text').textContent = `${completed} / ${total} complete`;
  document.getElementById('academy-progress-bar').style.width = `${(completed / total) * 100}%`;

  let html = CURRICULUM.map(m => {
    const status = getModuleStatus(m);
    const prog = state.progress[m.id];
    let statusIcon = '🔒';
    let extra = '';
    let cardClass = '';
    if (status === 'completed') {
      statusIcon = '✅';
      cardClass = 'completed';
      extra = `<span class="module-score">${prog.score}/${m.quiz.length}</span>`;
    } else if (status === 'unlocked') {
      statusIcon = '▶️';
      cardClass = 'in-progress';
    } else {
      cardClass = 'locked';
    }
    return `
      <div class="module-card ${cardClass}" data-module="${m.id}">
        <div class="module-icon">${m.icon}</div>
        <div class="module-info">
          <h3>${escapeHtml(m.title)}</h3>
          <p>${escapeHtml(m.expert)}</p>
        </div>
        ${extra}
        <div class="module-status">${statusIcon}</div>
      </div>
    `;
  }).join('');

  const capStatus = getCapstoneStatus();
  const capProg = state.progress[CAPSTONE_EXAM.id];
  let capIcon = '🔒';
  let capExtra = '';
  let capClass = 'locked';
  if (capStatus === 'completed') {
    capIcon = '🏅';
    capClass = 'completed';
    capExtra = `<span class="module-score">${capProg.score}/${CAPSTONE_EXAM.quiz.length}</span>`;
  } else if (capStatus === 'unlocked') {
    capIcon = '▶️';
    capClass = 'in-progress';
  }
  html += `
    <div class="module-card capstone ${capClass}" data-module="${CAPSTONE_EXAM.id}">
      <div class="module-icon">${CAPSTONE_EXAM.icon}</div>
      <div class="module-info">
        <h3>${escapeHtml(CAPSTONE_EXAM.title)}</h3>
        <p>${escapeHtml(CAPSTONE_EXAM.expert)}</p>
      </div>
      ${capExtra}
      <div class="module-status">${capIcon}</div>
    </div>
  `;

  if (isCertified()) {
    const earnedCount = ELECTIVES.filter(e => hasMinor(e.id)).length;
    html += `
      <div class="module-card elective-cta" data-nav="electives">
        <div class="module-icon">🎓</div>
        <div class="module-info">
          <h3>LoveLearn Electives</h3>
          <p>Major or minor in specialized topics — ${earnedCount}/${ELECTIVES.length} started</p>
        </div>
        <div class="module-status">➡️</div>
      </div>
    `;
  }

  document.getElementById('module-list').innerHTML = html;
}

function handleModuleClick(moduleId) {
  if (isCapstone(moduleId)) {
    if (getCapstoneStatus() === 'locked') {
      toast('Finish all 8 modules to unlock the certification exam 🔒');
      return;
    }
    openModule(moduleId);
    return;
  }
  if (getElective(moduleId)) {
    openModule(moduleId);
    return;
  }
  const module = getModule(moduleId);
  if (getModuleStatus(module) === 'locked') {
    toast('Complete the previous module to unlock this one 🔒');
    return;
  }
  openModule(moduleId);
}

/* ---------- Module detail ---------- */
function openModule(moduleId) {
  currentModuleId = moduleId;
  showScreen('module');
  renderModuleDetail(moduleId);
  const backBtn = document.querySelector('#screen-module .back-btn');
  if (getElective(moduleId)) {
    backBtn.textContent = '← Back to Electives';
    backBtn.dataset.nav = 'electives';
  } else {
    backBtn.textContent = '← Back to Academy';
    backBtn.dataset.nav = 'academy';
  }
  updateNav();
  scrollMainToTop();
}

function renderCapstoneDetail() {
  const prog = state.progress[CAPSTONE_EXAM.id];
  document.getElementById('module-detail').innerHTML = `
    <div class="expert-tag gold">${escapeHtml(CAPSTONE_EXAM.expert)}</div>
    <h1 class="title">${CAPSTONE_EXAM.icon} ${escapeHtml(CAPSTONE_EXAM.title)}</h1>
    <p class="subtitle">${escapeHtml(CAPSTONE_EXAM.summary)}</p>
    <div class="card">
      <h2 class="section-title" style="margin-top:0">What's covered</h2>
      <ul class="takeaway-list plain-list">
        ${CURRICULUM.map(m => `<li>${m.icon} ${escapeHtml(m.title)}</li>`).join('')}
      </ul>
    </div>
    ${prog && prog.passed ? `<div class="card" style="text-align:center;color:var(--success);font-weight:700;">🏅 Certified with ${prog.score}/${CAPSTONE_EXAM.quiz.length}</div>` : ''}
    <button class="btn btn-gold" id="btn-take-quiz">${prog && prog.passed ? 'Retake Exam' : `Start Certification Exam (${CAPSTONE_EXAM.passingScore}/${CAPSTONE_EXAM.quiz.length} to pass)`}</button>
  `;
}

function renderModuleDetail(moduleId) {
  if (isCapstone(moduleId)) {
    renderCapstoneDetail();
    return;
  }
  const m = getModule(moduleId);
  if (!m) {
    renderElectiveDetail(moduleId);
    return;
  }
  const prog = state.progress[m.id];
  let videoHtml;

  if (m.video.type === 'embed') {
    videoHtml = `
      <div class="video-embed">
        <iframe src="https://www.youtube-nocookie.com/embed/${m.video.videoId}" title="${escapeHtml(m.video.label)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen loading="lazy"></iframe>
      </div>
    `;
  } else {
    videoHtml = `
      <a class="video-link-card" href="${m.video.url}" target="_blank" rel="noopener noreferrer">
        <div class="play-icon">▶</div>
        <div>
          <div class="label">${escapeHtml(m.video.label)}</div>
          <div class="sub">Opens YouTube in a new tab</div>
        </div>
      </a>
    `;
  }

  document.getElementById('module-detail').innerHTML = `
    <div class="expert-tag">${escapeHtml(m.expert)}</div>
    <h1 class="title">${m.icon} ${escapeHtml(m.title)}</h1>
    <p class="subtitle">${escapeHtml(m.summary)}</p>
    ${videoHtml}
    <h2 class="section-title">Key Takeaways</h2>
    <ul class="takeaway-list">
      ${m.takeaways.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
    </ul>
    ${prog && prog.passed ? `<div class="card" style="text-align:center;color:var(--success);font-weight:700;">✅ Passed with ${prog.score}/${m.quiz.length}</div>` : ''}
    <button class="btn btn-primary" id="btn-take-quiz">${prog && prog.passed ? 'Retake Quiz' : `Take the Quiz (${PASSING_SCORE}/${m.quiz.length} to unlock next)`}</button>
  `;
}

/* ---------- Electives (Majors & Minors) ---------- */
function renderElectives() {
  const container = document.getElementById('electives-content');
  if (!electivesUnlocked()) {
    container.innerHTML = `<h1 class="title">🎓 LoveLearn Electives</h1>` + lockedScreenHtml('electives');
    return;
  }
  const cards = ELECTIVES.map(el => {
    const minorPassed = hasMinor(el.id);
    const majorPassed = hasMajor(el.id);
    let statusIcon = '▶️';
    let cardClass = 'in-progress';
    let extra = '';
    if (majorPassed) {
      statusIcon = '🏆';
      cardClass = 'completed major';
      extra = `<span class="module-score gold">Major</span>`;
    } else if (minorPassed) {
      statusIcon = '🎓';
      cardClass = 'completed';
      extra = `<span class="module-score">Minor</span>`;
    }
    return `
      <div class="module-card elective ${cardClass}" data-module="${el.id}">
        <div class="module-icon">${el.icon}</div>
        <div class="module-info">
          <h3>${escapeHtml(el.title)}</h3>
          <p>${escapeHtml(el.expert)}</p>
        </div>
        ${extra}
        <div class="module-status">${statusIcon}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <h1 class="title">🎓 LoveLearn Electives</h1>
    <p class="subtitle">Major or minor in specialized topics. Pass the Minor Assessment (${PASSING_SCORE}/5) to earn a Minor, then the Major Thesis Exam to earn a Major.</p>
    <div id="elective-list">${cards}</div>
  `;
}

function renderElectiveDetail(electiveId) {
  const el = getElective(electiveId);
  const minorProg = state.progress[minorQuizId(el.id)];
  const majorProg = state.progress[majorQuizId(el.id)];
  const minorPassed = !!(minorProg && minorProg.passed);
  const majorPassed = !!(majorProg && majorProg.passed);
  const majorUnlocked = isMajorUnlocked(el.id);
  let videoHtml;

  if (el.video.type === 'embed') {
    videoHtml = `
      <div class="video-embed">
        <iframe src="https://www.youtube-nocookie.com/embed/${el.video.videoId}" title="${escapeHtml(el.video.label)}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen loading="lazy"></iframe>
      </div>
    `;
  } else {
    videoHtml = `
      <a class="video-link-card" href="${el.video.url}" target="_blank" rel="noopener noreferrer">
        <div class="play-icon">▶</div>
        <div>
          <div class="label">${escapeHtml(el.video.label)}</div>
          <div class="sub">Opens YouTube in a new tab</div>
        </div>
      </a>
    `;
  }

  document.getElementById('module-detail').innerHTML = `
    <div class="expert-tag elective-tag">${escapeHtml(el.expert)}</div>
    <h1 class="title">${el.icon} ${escapeHtml(el.title)}</h1>
    <p class="subtitle">${escapeHtml(el.summary)}</p>
    ${videoHtml}
    <h2 class="section-title">Key Takeaways</h2>
    <ul class="takeaway-list">
      ${el.takeaways.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
    </ul>
    ${minorPassed ? `<div class="card" style="text-align:center;color:var(--success);font-weight:700;">🎓 Minor earned — ${minorProg.score}/${el.minorQuiz.length}</div>` : ''}
    <button class="btn btn-primary" data-action="elective-quiz" data-quiz="${minorQuizId(el.id)}">${minorPassed ? 'Retake Minor Assessment' : `Take Minor Assessment (${PASSING_SCORE}/${el.minorQuiz.length} to earn Minor)`}</button>
    ${majorPassed ? `<div class="card" style="text-align:center;color:var(--gold-dark);font-weight:700;margin-top:10px;">🏆 Major earned — ${majorProg.score}/${el.majorQuiz.length}</div>` : ''}
    <button class="btn ${majorUnlocked ? 'btn-gold' : 'btn-secondary'}" style="margin-top:10px;" ${majorUnlocked ? '' : 'disabled'} data-action="elective-quiz" data-quiz="${majorQuizId(el.id)}">${majorUnlocked
      ? (majorPassed ? 'Retake Major Thesis Exam' : `Take Major Thesis Exam (${PASSING_SCORE}/${el.majorQuiz.length} to earn Major)`)
      : '🔒 Pass the Minor Assessment to unlock'}</button>
  `;
}

/* ---------- Quiz ---------- */
function startQuiz(moduleId) {
  quizState = { moduleId, index: 0, score: 0, answered: false };
  showScreen('quiz');
  renderQuizQuestion();
  updateNav();
  scrollMainToTop();
}

function renderQuizQuestion() {
  const m = getQuizDef(quizState.moduleId);
  const q = m.quiz[quizState.index];
  document.getElementById('quiz-content').innerHTML = `
    <div class="quiz-progress">Question ${quizState.index + 1} of ${m.quiz.length} · ${escapeHtml(m.title)}</div>
    <div class="quiz-question">${escapeHtml(q.q)}</div>
    <div id="quiz-options">
      ${q.options.map((opt, i) => `<button class="quiz-option" data-i="${i}">${escapeHtml(opt)}</button>`).join('')}
    </div>
    <div id="quiz-explanation"></div>
    <button class="btn btn-primary" id="btn-quiz-next" style="display:none;margin-top:6px;">Next Question</button>
  `;
}

function selectAnswer(i) {
  if (quizState.answered) return;
  quizState.answered = true;
  const m = getQuizDef(quizState.moduleId);
  const q = m.quiz[quizState.index];
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correct) btn.classList.add('correct');
    if (idx === i && i !== q.correct) btn.classList.add('incorrect');
    if (idx === i) btn.classList.add('selected');
  });
  if (i === q.correct) quizState.score++;
  document.getElementById('quiz-explanation').innerHTML =
    `<div class="quiz-explanation">${escapeHtml(q.explanation)}</div>`;
  const nextBtn = document.getElementById('btn-quiz-next');
  nextBtn.style.display = 'flex';
  nextBtn.textContent = quizState.index === m.quiz.length - 1 ? 'See Results' : 'Next Question';
}

function nextQuestion() {
  const m = getQuizDef(quizState.moduleId);
  if (quizState.index < m.quiz.length - 1) {
    quizState.index++;
    quizState.answered = false;
    renderQuizQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  const m = getQuizDef(quizState.moduleId);
  const passingScore = getPassingScore(m);
  const passed = quizState.score >= passingScore;
  const prev = state.progress[m.id];
  const wasPassed = prev ? prev.passed : false;
  const prevLevel = getLevel(getTotalXP()).number;
  const bestScore = prev ? Math.max(prev.score, quizState.score) : quizState.score;
  state.progress[m.id] = {
    passed: passed || wasPassed,
    score: bestScore,
    attempts: (prev ? prev.attempts : 0) + 1,
    certifiedAt: prev ? prev.certifiedAt : undefined,
    certId: prev ? prev.certId : undefined
  };
  if (isCapstone(m.id) && passed && !wasPassed) {
    state.progress[m.id].certifiedAt = Date.now();
    state.progress[m.id].certId = generateCertId();
  }
  saveState();
  const newLevel = getLevel(getTotalXP());
  const leveledUp = passed && !wasPassed && newLevel.number > prevLevel;
  showScreen('quiz-result');
  renderQuizResult(passed && !wasPassed, leveledUp ? newLevel : null);
  updateNav();
  updateHeaderProgress();
  scrollMainToTop();
}

function renderQuizResult(justPassed, leveledUpTo) {
  const m = getQuizDef(quizState.moduleId);
  const total = m.quiz.length;
  const score = quizState.score;
  const passingScore = getPassingScore(m);
  const passed = score >= passingScore;
  const capstone = isCapstone(m.id);
  const elective = getElectiveByQuizId(m.id);
  const isMajor = !!(elective && m.id === majorQuizId(elective.id));
  const isMinor = !!(elective && m.id === minorQuizId(elective.id));

  let resultEmoji = '📚';
  let resultTitle = 'So close!';
  let resultText = `You need ${passingScore}/${total} (${Math.round((passingScore / total) * 100)}%) to pass. Review the lesson and try again — you've got this!`;

  let buttonsHtml = '<div class="btn-stack">';
  if (passed) {
    if (capstone) {
      resultEmoji = '🏅';
      resultTitle = 'Certified!';
      resultText = `You scored ${Math.round((score / total) * 100)}% — congratulations on earning your LoveLearn Relationship-Readiness Certification!`;
      buttonsHtml += `<div class="grad-banner gold">🏅 You're LoveLearn Certified!<br>Discover &amp; Matches are now unlocked.</div>`;
      buttonsHtml += `<button class="btn btn-gold" data-action="certificate">View My Certificate</button>`;
      buttonsHtml += `<button class="btn btn-primary" data-action="discover">Go to Discover</button>`;
    } else if (elective) {
      resultEmoji = isMajor ? '🏆' : '🎓';
      resultTitle = isMajor ? 'Major Earned!' : 'Minor Earned!';
      resultText = `You scored ${Math.round((score / total) * 100)}%${isMajor
        ? ` — congratulations on earning a Major in ${elective.title}!`
        : ` — you earned a Minor in ${elective.title}.`}`;
      if (isMinor) {
        buttonsHtml += `<div class="grad-banner">🎓 Minor in ${escapeHtml(elective.title)} earned!</div>`;
        buttonsHtml += `<button class="btn btn-gold" data-action="lesson" data-module="${elective.id}">Take the Major Thesis Exam</button>`;
      } else {
        buttonsHtml += `<div class="grad-banner gold">🏆 Major in ${escapeHtml(elective.title)} earned!</div>`;
        buttonsHtml += `<button class="btn btn-gold" data-action="certificate">View My Certificate</button>`;
      }
      buttonsHtml += `<button class="btn btn-secondary" data-action="electives">Back to Electives</button>`;
    } else {
      resultEmoji = '🎉';
      resultTitle = 'Module Complete!';
      resultText = `You scored ${Math.round((score / total) * 100)}% and unlocked the next lesson.`;
      const nextModule = CURRICULUM.find(mm => mm.order === m.order + 1);
      if (allModulesPassed()) {
        buttonsHtml += `<div class="grad-banner">🎉 You've completed all ${CURRICULUM.length} modules!<br>Take the Certification Exam to unlock dating.</div>`;
        buttonsHtml += `<button class="btn btn-gold" data-action="lesson" data-module="${CAPSTONE_EXAM.id}">Start Certification Exam</button>`;
      } else if (nextModule) {
        buttonsHtml += `<button class="btn btn-primary" data-action="lesson" data-module="${nextModule.id}">Continue to "${escapeHtml(nextModule.title)}"</button>`;
      }
      buttonsHtml += `<button class="btn btn-secondary" data-action="academy">Back to Academy</button>`;
    }
  } else if (elective) {
    buttonsHtml += `<button class="btn btn-primary" data-action="elective-quiz" data-quiz="${m.id}">Try Again</button>`;
    buttonsHtml += `<button class="btn btn-secondary" data-action="lesson" data-module="${elective.id}">Review Lesson</button>`;
    buttonsHtml += `<button class="btn btn-ghost" data-action="electives">Back to Electives</button>`;
  } else {
    buttonsHtml += `<button class="btn btn-primary" data-action="quiz" data-module="${m.id}">Try Again</button>`;
    buttonsHtml += `<button class="btn btn-secondary" data-action="lesson" data-module="${m.id}">Review Lesson</button>`;
    buttonsHtml += `<button class="btn btn-ghost" data-action="academy">Back to Academy</button>`;
  }
  buttonsHtml += '</div>';

  const xpGained = justPassed ? getQuizXP(m, score) : 0;

  document.getElementById('quiz-result-content').innerHTML = `
    <div class="result-hero">
      <div class="result-emoji">${resultEmoji}</div>
      <h2>${resultTitle}</h2>
      <div class="result-score">${score}/${total}</div>
      ${xpGained ? `<div class="xp-earned">+${xpGained} XP</div>` : ''}
      <p>${resultText}</p>
    </div>
    ${buttonsHtml}
  `;

  if (justPassed) {
    launchConfetti(capstone ? 140 : (isMajor ? 100 : 60));
  }
  if (leveledUpTo) {
    setTimeout(() => showLevelUpModal(leveledUpTo), 700);
  }
}

function handleResultAction(action, moduleId) {
  if (action === 'lesson') openModule(moduleId);
  else if (action === 'quiz') startQuiz(moduleId);
  else if (action === 'academy') navigateTo('academy');
  else if (action === 'discover') navigateTo('discover');
  else if (action === 'certificate') navigateTo('certificate');
  else if (action === 'electives') navigateTo('electives');
}

/* ---------- Level-up modal ---------- */
function showLevelUpModal(level) {
  document.getElementById('levelup-emoji').textContent = level.icon;
  document.getElementById('levelup-text').textContent = `You're now Level ${level.number}: ${level.name}`;
  document.getElementById('levelup-modal').classList.add('show');
  launchConfetti(50);
}

function hideLevelUpModal() {
  document.getElementById('levelup-modal').classList.remove('show');
}

/* ---------- Certificate ---------- */
function renderCertificate() {
  const container = document.getElementById('certificate-content');
  const prog = state.progress[CAPSTONE_EXAM.id];
  if (!prog || !prog.passed) {
    container.innerHTML = `<h1 class="title">Certificate</h1>` + lockedScreenHtml('matches');
    return;
  }
  const dateStr = new Date(prog.certifiedAt || Date.now()).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const majors = getEarnedMajors();
  const minorOnly = ELECTIVES.filter(e => hasMinor(e.id) && !hasMajor(e.id));
  const specTags = [
    ...majors.map(e => `<span class="cert-spec-tag major">🏆 Major in ${escapeHtml(e.shortTitle)}</span>`),
    ...minorOnly.map(e => `<span class="cert-spec-tag minor">🎓 Minor in ${escapeHtml(e.shortTitle)}</span>`)
  ].join('');

  container.innerHTML = `
    <h1 class="title">My Certificate</h1>
    <div class="certificate-card">
      <div class="cert-seal">🏅</div>
      <div class="cert-kicker">LoveLearn Academy</div>
      <h2 class="cert-title">Relationship-Readiness Certification</h2>
      <p class="cert-awarded-to">This certifies that</p>
      <h2 class="cert-name">${escapeHtml(state.user.name)}</h2>
      <p class="cert-body">has completed all ${CURRICULUM.length} modules of LoveLearn Academy and passed the
      Certification Exam, demonstrating the self-awareness, communication skills, and emotional readiness
      to pursue a healthy relationship.</p>
      <div class="cert-meta">
        <div><span>Date</span><strong>${dateStr}</strong></div>
        <div><span>Certificate ID</span><strong>${escapeHtml(prog.certId || '—')}</strong></div>
        <div><span>Score</span><strong>${prog.score}/${CAPSTONE_EXAM.quiz.length}</strong></div>
      </div>
      ${specTags ? `<div class="cert-specializations">${specTags}</div>` : ''}
    </div>
    <div class="btn-stack">
      <button class="btn btn-gold" id="btn-share-cert">📤 Share Certificate</button>
      <button class="btn btn-secondary" id="btn-copy-cert-text">📋 Copy Share Text</button>
    </div>
    <div class="btn-stack">
      <button class="btn btn-primary" data-nav="discover">Go to Discover</button>
      <button class="btn btn-secondary" data-action="academy">Back to Academy</button>
    </div>
  `;
}

/* ---------- Shareable certificate ---------- */
function shareSummaryText() {
  const majors = getEarnedMajors();
  const minorOnly = ELECTIVES.filter(e => hasMinor(e.id) && !hasMajor(e.id));
  let txt = `🏅 I'm LoveLearn Certified — Relationship-Readiness Certification!`;
  if (majors.length) txt += ` 🏆 Major in ${majors.map(e => e.shortTitle).join(' & ')}.`;
  if (minorOnly.length) txt += ` 🎓 Minor in ${minorOnly.map(e => e.shortTitle).join(' & ')}.`;
  txt += ' #LoveLearn #RelationshipReady';
  return txt;
}

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function generateCertificateCanvas() {
  const prog = state.progress[CAPSTONE_EXAM.id];
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
  bgGrad.addColorStop(0, '#a855f7');
  bgGrad.addColorStop(0.55, '#ec4899');
  bgGrad.addColorStop(1, '#38bdf8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 630);

  ctx.fillStyle = '#ffffff';
  drawRoundedRect(ctx, 50, 50, 1100, 530, 28);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.font = '64px sans-serif';
  ctx.fillText('🏅', 600, 150);

  ctx.fillStyle = '#a855f7';
  ctx.font = '600 22px sans-serif';
  ctx.fillText('LOVELEARN ACADEMY', 600, 195);

  ctx.fillStyle = '#1f1147';
  ctx.font = 'bold 30px sans-serif';
  ctx.fillText('Relationship-Readiness Certification', 600, 235);

  ctx.font = '20px sans-serif';
  ctx.fillStyle = '#6b6480';
  ctx.fillText('This certifies that', 600, 280);

  ctx.fillStyle = '#1f1147';
  ctx.font = 'bold 52px sans-serif';
  ctx.fillText(state.user ? state.user.name : 'A LoveLearn Graduate', 600, 345);

  const dateStr = new Date((prog && prog.certifiedAt) || Date.now())
    .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  ctx.font = '18px sans-serif';
  ctx.fillStyle = '#6b6480';
  ctx.fillText(`Certified ${dateStr} · ID ${(prog && prog.certId) || '—'}`, 600, 385);

  const majors = getEarnedMajors();
  const minorOnly = ELECTIVES.filter(e => hasMinor(e.id) && !hasMajor(e.id));
  let y = 445;
  ctx.font = '600 20px sans-serif';
  if (majors.length) {
    ctx.fillStyle = '#f59e0b';
    ctx.fillText(`🏆 Major: ${majors.map(e => e.shortTitle).join(' · ')}`, 600, y);
    y += 34;
  }
  if (minorOnly.length) {
    ctx.fillStyle = '#a855f7';
    ctx.fillText(`🎓 Minor: ${minorOnly.map(e => e.shortTitle).join(' · ')}`, 600, y);
    y += 34;
  }

  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#a8a2bd';
  ctx.fillText('💞 Get certified at LoveLearn Academy', 600, 545);

  return canvas;
}

function shareCertificate() {
  const canvas = generateCertificateCanvas();
  canvas.toBlob(async (blob) => {
    if (!blob) return;
    const file = new File([blob], 'lovelearn-certificate.png', { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'LoveLearn Certified', text: shareSummaryText() });
        return;
      } catch (e) {
        // user cancelled or share unsupported — fall back to download
      }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lovelearn-certificate.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast('Certificate image downloaded! 📥');
  }, 'image/png');
}

function copyCertificateText() {
  const text = shareSummaryText();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => toast('Copied to clipboard! 📋'))
      .catch(() => toast('Could not copy — try again.'));
  } else {
    toast('Clipboard not available in this browser.');
  }
}

/* ---------- Discover ---------- */
function getAvailableProfiles() {
  return PROFILES.filter(p => !state.swiped[p.id]);
}

function renderDiscover() {
  const container = document.getElementById('discover-content');
  if (!isCertified()) {
    container.innerHTML = `<h1 class="title">Discover</h1>` + lockedScreenHtml('discover');
    return;
  }
  const profiles = getAvailableProfiles();
  if (!profiles.length) {
    container.innerHTML = `
      <h1 class="title">Discover</h1>
      <div class="empty-stack">
        <div class="empty-emoji">✨</div>
        <h2>You've seen everyone for now</h2>
        <p>Check back later for new profiles, or visit your matches.</p>
        <div class="btn-stack"><button class="btn btn-primary" data-nav="matches">Go to Matches</button></div>
      </div>
    `;
    return;
  }
  const p = profiles[0];
  const locked = isProfileLocked(p);
  let cardHtml;
  let actionsHtml;

  if (locked) {
    const req = state.requests[p.id];
    const pending = !!(req && req.status === 'pending');
    cardHtml = `
      <div class="profile-card locked-card">
        <div class="profile-photo locked-photo">${p.avatar}</div>
        <div class="lock-overlay">
          <div class="lock-overlay-icon">🔒</div>
          <div class="lock-overlay-text">Advanced member</div>
        </div>
        <div class="profile-body">
          <h2>${escapeHtml(p.name)}, ${p.age}</h2>
          <p class="profile-bio">This member has completed in-depth advanced training. Get Advanced Certified or request access to view their full profile.</p>
        </div>
      </div>
    `;
    actionsHtml = `
      <button class="btn ${pending ? 'btn-secondary' : 'btn-gold'}" data-action="request-access" data-profile="${p.id}" ${pending ? 'disabled' : ''}>
        ${pending ? '⏳ Request sent — awaiting review...' : '🔒 Request Access'}
      </button>
    `;
  } else {
    const compat = getCompatibilityScore(p);
    const showCouple = p.relationshipStructure === 'couple' && p.openToPlayPartners && canSeePlayPartnerInfo();
    cardHtml = `
      <div class="profile-card">
        <div class="profile-photo">
          ${p.avatar}
          <div class="compat-badge">🧩 ${compat}% Match</div>
        </div>
        <div class="profile-body">
          <h2>${escapeHtml(p.name)}, ${p.age}${p.tier === 'advanced' ? ' <span class="advanced-badge" title="Advanced Certified">⭐</span>' : ''}</h2>
          ${showCouple ? `<div class="profile-tags"><span class="profile-tag couple-badge">👫 Couple</span><span class="profile-tag play-partner-tag">Open to play partners</span></div>` : ''}
          <div class="profile-tags">${p.tags.map(t => `<span class="profile-tag">${escapeHtml(t)}</span>`).join('')}</div>
          <p class="profile-bio">${escapeHtml(p.bio)}</p>
          <div class="profile-prompt">"${escapeHtml(p.prompt)}"</div>
        </div>
      </div>
    `;
    actionsHtml = `
      <button class="swipe-btn pass" data-action="pass" title="Pass">✕</button>
      <button class="swipe-btn like" data-action="like" title="Like">💖</button>
    `;
  }

  container.innerHTML = `
    <h1 class="title">Discover</h1>
    <p class="subtitle">${profiles.length} profile${profiles.length === 1 ? '' : 's'} to review</p>
    <div class="card-stack">${cardHtml}</div>
    <div class="swipe-actions${locked ? ' single' : ''}">${actionsHtml}</div>
  `;
}

function swipeProfile(action) {
  const profiles = getAvailableProfiles();
  if (!profiles.length) return;
  const p = profiles[0];
  state.swiped[p.id] = action;

  if (action === 'like' && Math.random() < 0.6) {
    state.matches.push(p.id);
    state.chats[p.id] = [{ from: 'them', text: p.prompt }];
    saveState();
    showMatchModal(p);
    renderDiscover();
    return;
  }
  saveState();
  renderDiscover();
}

function showMatchModal(p) {
  matchedProfileId = p.id;
  document.getElementById('match-modal-text').textContent = `You and ${p.name} just matched. Say hi!`;
  document.getElementById('match-modal').classList.add('show');
}

function hideMatchModal() {
  document.getElementById('match-modal').classList.remove('show');
}

/* ---------- Matches & Chat ---------- */
function renderMatches() {
  const container = document.getElementById('matches-content');
  if (!isCertified()) {
    container.innerHTML = `<h1 class="title">Matches</h1>` + lockedScreenHtml('matches');
    return;
  }
  if (!state.matches.length) {
    container.innerHTML = `
      <h1 class="title">Matches</h1>
      <div class="empty-stack">
        <div class="empty-emoji">💌</div>
        <h2>No matches yet</h2>
        <p>Head to Discover and start saying hi!</p>
        <div class="btn-stack"><button class="btn btn-primary" data-nav="discover">Go to Discover</button></div>
      </div>
    `;
    return;
  }
  container.innerHTML = `
    <h1 class="title">Matches</h1>
    ${state.matches.map(id => {
      const p = PROFILES.find(x => x.id === id);
      const chat = state.chats[id] || [];
      const last = chat[chat.length - 1];
      return `
        <div class="match-item" data-profile="${p.id}">
          <div class="match-avatar">${p.avatar}</div>
          <div class="match-info">
            <h3>${escapeHtml(p.name)}, ${p.age}</h3>
            <p>${last ? escapeHtml(last.text).slice(0, 50) : 'Say hi!'}</p>
          </div>
        </div>
      `;
    }).join('')}
  `;
}

function openChat(profileId) {
  currentChatProfileId = profileId;
  showScreen('chat');
  renderChat();
  updateNav();
  scrollMainToTop();
}

function renderChat() {
  const p = PROFILES.find(x => x.id === currentChatProfileId);
  const messages = state.chats[currentChatProfileId] || [];
  document.getElementById('chat-content').innerHTML = `
    <button class="back-btn" data-nav="matches">← Back to Matches</button>
    <div class="card" style="display:flex;align-items:center;gap:12px;">
      <div class="match-avatar">${p.avatar}</div>
      <div>
        <h3 style="font-size:16px;">${escapeHtml(p.name)}, ${p.age}</h3>
        <p style="font-size:12px;color:var(--text-light)">${p.tags.map(escapeHtml).join(' · ')}</p>
      </div>
    </div>
    <div class="chat-container">
      <div class="chat-messages" id="chat-messages">
        ${messages.map(m => `<div class="chat-bubble ${m.from === 'me' ? 'me' : 'them'}">${escapeHtml(m.text)}</div>`).join('')}
      </div>
      <div class="chat-input-row">
        <input type="text" id="chat-input" placeholder="Type a message..." maxlength="200" />
        <button id="chat-send">➤</button>
      </div>
    </div>
  `;
  scrollChatToBottom();
}

function scrollChatToBottom() {
  const el = document.getElementById('chat-messages');
  if (el) el.scrollTop = el.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  state.chats[currentChatProfileId] = state.chats[currentChatProfileId] || [];
  state.chats[currentChatProfileId].push({ from: 'me', text });
  input.value = '';
  saveState();
  renderChat();
  setTimeout(() => {
    const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
    state.chats[currentChatProfileId].push({ from: 'them', text: reply });
    saveState();
    if (currentScreen === 'chat') renderChat();
  }, 900);
}

/* ---------- Profile ---------- */
function renderProfile() {
  const completed = countPassed();
  const total = CURRICULUM.length;
  const certified = isCertified();
  const likeCount = Object.values(state.swiped).filter(v => v === 'like').length;
  const xp = getTotalXP();
  const level = getLevel(xp);

  const badges = CURRICULUM.map(m => {
    const earned = !!(state.progress[m.id] && state.progress[m.id].passed);
    return `
      <div class="badge ${earned ? 'earned' : ''}">
        <div class="badge-icon">${m.icon}</div>
        <div class="badge-name">${escapeHtml(m.title.split(':')[0])}</div>
      </div>
    `;
  }).join('');

  const certBadge = `
    <div class="badge ${certified ? 'earned gold' : ''}">
      <div class="badge-icon">🏅</div>
      <div class="badge-name">Certified</div>
    </div>
  `;

  const advanced = isAdvancedTier();
  const advancedBadge = `
    <div class="badge ${advanced ? 'earned gold' : ''}">
      <div class="badge-icon">⭐</div>
      <div class="badge-name">Advanced Certified</div>
    </div>
  `;

  const loveLearnPlusHtml = `
    <div class="card love-plus-card">
      <div class="love-plus-row">
        <div class="love-plus-icon">⭐</div>
        <div>
          <div class="love-plus-title">LoveLearn+</div>
          <div class="love-plus-sub">Advanced Certified members (2+ Majors) can view every Discover profile, including those reserved for in-depth training graduates.</div>
        </div>
      </div>
      ${advanced
        ? `<div class="grad-banner gold">⭐ Advanced Certified — you can view every profile.</div>${state.user.loveLearnPlus && getEarnedMajors().length < 2 ? '<button class="btn btn-secondary" id="btn-cancel-plus">Cancel LoveLearn+ (demo)</button>' : ''}`
        : '<button class="btn btn-gold" id="btn-upgrade-plus">Upgrade to LoveLearn+ (demo)</button>'}
    </div>
  `;

  const electiveBadges = ELECTIVES.map(el => {
    const minorPassed = hasMinor(el.id);
    const majorPassed = hasMajor(el.id);
    let cls = '';
    let tier = '';
    if (majorPassed) { cls = 'earned gold'; tier = '🏆 Major'; }
    else if (minorPassed) { cls = 'earned'; tier = '🎓 Minor'; }
    return `
      <div class="badge ${cls}">
        <div class="badge-icon">${el.icon}</div>
        <div class="badge-name">${escapeHtml(el.shortTitle)}</div>
        ${tier ? `<div class="badge-tier">${tier}</div>` : ''}
      </div>
    `;
  }).join('');

  const levelProgressHtml = level.next
    ? `<div class="progress-wrap"><div class="progress-bar" style="width:${level.progressPct}%"></div></div>
       <div class="progress-label"><span>${level.xpIntoLevel} / ${level.next.xp - LEVELS[level.index].xp} XP</span><span>Next: ${level.next.icon} ${escapeHtml(level.next.name)}</span></div>`
    : `<div class="progress-wrap"><div class="progress-bar" style="width:100%"></div></div>
       <div class="progress-label"><span>Max level reached! 🎉</span></div>`;

  document.getElementById('profile-content').innerHTML = `
    <div class="profile-header">
      <div class="profile-avatar">${state.user.avatar}</div>
      <h2>${escapeHtml(state.user.name)}, ${escapeHtml(String(state.user.age))}</h2>
      <p>${escapeHtml(state.user.gender)} · Looking for ${escapeHtml(state.user.lookingFor)}${state.user.relationshipStructure === 'couple' ? ' · 👫 Couple (open to play partners)' : ''}</p>
    </div>
    ${certified ? `<div class="grad-banner gold">🏅 LoveLearn Certified — Discover &amp; Matches unlocked!</div>` : ''}
    <div class="card level-card">
      <div class="level-row">
        <div class="level-icon">${level.icon}</div>
        <div>
          <div class="level-name">Level ${level.number}: ${escapeHtml(level.name)}</div>
          <div class="level-xp">${xp} XP total</div>
        </div>
        <div class="streak-display">🔥 ${state.streak.count} day${state.streak.count === 1 ? '' : 's'}</div>
      </div>
      ${levelProgressHtml}
    </div>
    ${certified ? loveLearnPlusHtml : ''}
    <div class="card">
      <div style="font-size:13px;color:var(--text-light);margin-bottom:6px;">About me</div>
      <p style="font-size:14px;line-height:1.5">${state.user.bio ? escapeHtml(state.user.bio) : 'No bio yet.'}</p>
    </div>
    <h2 class="section-title">My Badges</h2>
    <div class="badge-grid">${badges}${certBadge}${certified ? advancedBadge : ''}</div>
    ${certified ? `
    <h2 class="section-title">Majors &amp; Minors</h2>
    <div class="badge-grid">${electiveBadges}</div>
    <div class="btn-stack"><button class="btn btn-secondary" data-nav="electives">Explore Electives</button></div>
    ` : ''}
    <div class="card">
      <div class="progress-label"><span>Academy progress</span><span>${completed} / ${total}</span></div>
      <div class="progress-wrap"><div class="progress-bar" style="width:${(completed / total) * 100}%"></div></div>
      <div style="margin-top:12px;font-size:13px;color:var(--text-light)">
        ❤️ Likes sent: ${likeCount} &nbsp;·&nbsp; 💬 Matches: ${state.matches.length}
      </div>
    </div>
    ${certified ? `<div class="btn-stack"><button class="btn btn-gold" data-nav="certificate">View My Certificate</button></div>` : ''}
    <div class="btn-stack">
      <button class="btn btn-secondary" id="btn-reset-progress">Reset Academy Progress</button>
      <button class="btn btn-ghost" id="btn-reset-all">Sign Out &amp; Reset Everything</button>
    </div>
  `;
}

function resetProgress() {
  if (!confirm('Reset your LoveLearn Academy progress? Discover and Matches will re-lock.')) return;
  state.progress = {};
  saveState();
  toast('Academy progress reset.');
  navigateTo('academy');
}

function resetAll() {
  if (!confirm('Sign out and erase all LoveLearn data on this device?')) return;
  localStorage.removeItem(STORAGE_KEY);
  state = createInitialState();
  matchedProfileId = null;
  currentChatProfileId = null;
  currentModuleId = null;
  quizState = null;
  showScreen('welcome');
  updateNav();
  updateHeaderProgress();
  scrollMainToTop();
}

/* ---------- Sign up ---------- */
function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  const age = document.getElementById('f-age').value;
  const relationshipStructure = document.getElementById('f-relationship').value;
  state.user = {
    name: name || 'Friend',
    age: age || '18',
    avatar: document.getElementById('f-avatar').value,
    gender: document.getElementById('f-gender').value,
    lookingFor: document.getElementById('f-looking').value,
    bio: document.getElementById('f-bio').value.trim(),
    relationshipStructure,
    openToPlayPartners: relationshipStructure === 'couple',
    loveLearnPlus: false
  };
  saveState();
  updateStreak();
  navigateTo('academy');
  toast(`Welcome, ${state.user.name}! Let's start learning.`);
}

/* ---------- Event wiring ---------- */
function attachEventListeners() {
  document.getElementById('signup-form').addEventListener('submit', handleSignup);

  document.addEventListener('click', (e) => {
    const navBtn = e.target.closest('[data-nav]');
    if (navBtn) {
      navigateTo(navBtn.dataset.nav);
      return;
    }

    const moduleCard = e.target.closest('.module-card');
    if (moduleCard) {
      handleModuleClick(moduleCard.dataset.module);
      return;
    }

    const quizOption = e.target.closest('.quiz-option');
    if (quizOption && !quizOption.disabled) {
      selectAnswer(parseInt(quizOption.dataset.i, 10));
      return;
    }

    const swipeBtn = e.target.closest('.swipe-btn');
    if (swipeBtn) {
      swipeProfile(swipeBtn.dataset.action);
      return;
    }

    const matchItem = e.target.closest('.match-item');
    if (matchItem) {
      openChat(matchItem.dataset.profile);
      return;
    }

    const resultBtn = e.target.closest('[data-action]');
    if (resultBtn) {
      if (resultBtn.dataset.action === 'elective-quiz') {
        startQuiz(resultBtn.dataset.quiz);
      } else if (resultBtn.dataset.action === 'request-access') {
        if (!resultBtn.disabled) requestAccess(resultBtn.dataset.profile);
      } else {
        handleResultAction(resultBtn.dataset.action, resultBtn.dataset.module);
      }
      return;
    }

    switch (e.target.id) {
      case 'btn-get-started':
        showScreen('signup');
        break;
      case 'signup-back':
        showScreen('welcome');
        break;
      case 'quiz-back':
        openModule(getLessonIdForQuiz(quizState.moduleId));
        break;
      case 'btn-take-quiz':
        startQuiz(currentModuleId);
        break;
      case 'btn-quiz-next':
        nextQuestion();
        break;
      case 'match-modal-close':
        hideMatchModal();
        break;
      case 'match-modal-chat':
        hideMatchModal();
        openChat(matchedProfileId);
        break;
      case 'levelup-modal-close':
        hideLevelUpModal();
        break;
      case 'chat-send':
        sendMessage();
        break;
      case 'btn-share-cert':
        shareCertificate();
        break;
      case 'btn-copy-cert-text':
        copyCertificateText();
        break;
      case 'btn-reset-progress':
        resetProgress();
        break;
      case 'btn-reset-all':
        resetAll();
        break;
      case 'btn-upgrade-plus':
        toggleLoveLearnPlus(true);
        break;
      case 'btn-cancel-plus':
        toggleLoveLearnPlus(false);
        break;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.target.id === 'chat-input' && e.key === 'Enter') {
      sendMessage();
    }
  });
}

/* ---------- Init ---------- */
function init() {
  loadState();
  attachEventListeners();
  if (state.user) {
    updateStreak();
    navigateTo('academy');
  } else {
    showScreen('welcome');
    updateNav();
  }
  updateHeaderProgress();
}

document.addEventListener('DOMContentLoaded', init);
