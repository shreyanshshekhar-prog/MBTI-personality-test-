// MBTI Personality Application Logic
document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    currentIndex: 0,
    answers: new Array(MBTI_DATA.questions.length).fill(null),
    currentResult: null,
    theme: localStorage.getItem('mbti_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    activeFilter: 'all'
  };

  // DOM Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const navHome = document.getElementById('navHome');
  const navTest = document.getElementById('navTest');
  const navTypes = document.getElementById('navTypes');
  const heroStartBtn = document.getElementById('heroStartBtn');

  const homeView = document.getElementById('homeView');
  const testView = document.getElementById('testView');
  const resultView = document.getElementById('resultView');
  const typesView = document.getElementById('typesView');

  // Test DOM Elements
  const questionNumText = document.getElementById('questionNumText');
  const dimensionBadge = document.getElementById('dimensionBadge');
  const questionText = document.getElementById('questionText');
  const progressBar = document.getElementById('progressBar');
  const progressPercentText = document.getElementById('progressPercentText');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const likertButtons = document.querySelectorAll('.likert-btn');

  // Modal Elements
  const typeModal = document.getElementById('typeModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  // Initialize Theme
  applyTheme(state.theme);

  themeToggleBtn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('mbti_theme', state.theme);
    applyTheme(state.theme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggleBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  // View Navigation Router
  function showView(viewId) {
    [homeView, testView, resultView, typesView].forEach(v => {
      if (v) v.classList.remove('active');
    });

    [navHome, navTest, navTypes].forEach(n => {
      if (n) n.classList.remove('active');
    });

    if (viewId === 'home') {
      homeView.classList.add('active');
      navHome.classList.add('active');
      window.location.hash = 'home';
    } else if (viewId === 'test') {
      testView.classList.add('active');
      navTest.classList.add('active');
      renderQuestion();
      window.location.hash = 'test';
    } else if (viewId === 'result') {
      resultView.classList.add('active');
      if (state.currentResult) {
        window.location.hash = `result=${state.currentResult.type}`;
      }
    } else if (viewId === 'types') {
      typesView.classList.add('active');
      navTypes.classList.add('active');
      renderTypesDirectory();
      window.location.hash = 'types';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Navigation Event Listeners
  navHome.addEventListener('click', () => showView('home'));
  navTest.addEventListener('click', () => showView('test'));
  navTypes.addEventListener('click', () => showView('types'));
  if (heroStartBtn) heroStartBtn.addEventListener('click', () => showView('test'));

  document.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const route = el.getAttribute('data-route');
      showView(route);
    });
  });

  // Restore Saved Progress from LocalStorage
  const savedAnswers = localStorage.getItem('mbti_saved_answers');
  if (savedAnswers) {
    try {
      const parsed = JSON.parse(savedAnswers);
      if (Array.isArray(parsed) && parsed.length === MBTI_DATA.questions.length) {
        state.answers = parsed;
        const firstUnanswered = parsed.findIndex(a => a === null);
        state.currentIndex = firstUnanswered !== -1 ? firstUnanswered : 0;
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Render Current Question
  function renderQuestion() {
    const q = MBTI_DATA.questions[state.currentIndex];
    if (!q) return;

    questionNumText.textContent = `Question ${state.currentIndex + 1} of ${MBTI_DATA.questions.length}`;
    dimensionBadge.textContent = q.dimension;
    questionText.textContent = q.text;

    const percent = Math.round(((state.currentIndex + 1) / MBTI_DATA.questions.length) * 100);
    progressBar.style.width = `${percent}%`;
    progressPercentText.textContent = `${percent}%`;

    // Highlight active selected answer
    const currentAns = state.answers[state.currentIndex];
    likertButtons.forEach(btn => {
      const val = parseInt(btn.getAttribute('data-val'), 10);
      if (val === currentAns) {
        btn.classList.add('selected');
      } else {
        btn.classList.remove('selected');
      }
    });

    prevBtn.disabled = (state.currentIndex === 0);
    nextBtn.disabled = (currentAns === null);
    nextBtn.textContent = (state.currentIndex === MBTI_DATA.questions.length - 1) ? "View Results 🎉" : "Next →";
  }

  // Likert Button Selection
  likertButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseInt(btn.getAttribute('data-val'), 10);
      recordAnswer(val);
    });
  });

  function recordAnswer(val) {
    state.answers[state.currentIndex] = val;
    localStorage.setItem('mbti_saved_answers', JSON.stringify(state.answers));
    renderQuestion();

    // Auto-advance with pleasant micro-delay
    setTimeout(() => {
      if (state.currentIndex < MBTI_DATA.questions.length - 1) {
        state.currentIndex++;
        renderQuestion();
      } else {
        calculateAndDisplayResults();
      }
    }, 180);
  }

  // Previous / Next Buttons
  prevBtn.addEventListener('click', () => {
    if (state.currentIndex > 0) {
      state.currentIndex--;
      renderQuestion();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (state.answers[state.currentIndex] !== null) {
      if (state.currentIndex < MBTI_DATA.questions.length - 1) {
        state.currentIndex++;
        renderQuestion();
      } else {
        calculateAndDisplayResults();
      }
    }
  });

  // Keyboard Shortcuts (1-5, Arrow Keys)
  window.addEventListener('keydown', (e) => {
    if (!testView.classList.contains('active')) return;

    if (e.key >= '1' && e.key <= '5') {
      recordAnswer(parseInt(e.key, 10));
    } else if (e.key === 'ArrowLeft') {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderQuestion();
      }
    } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
      if (state.answers[state.currentIndex] !== null) {
        if (state.currentIndex < MBTI_DATA.questions.length - 1) {
          state.currentIndex++;
          renderQuestion();
        } else {
          calculateAndDisplayResults();
        }
      }
    }
  });

  // Score Calculation
  function calculateAndDisplayResults() {
    const scores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };

    MBTI_DATA.questions.forEach((q, idx) => {
      const val = state.answers[idx] !== null ? state.answers[idx] : 3;
      const weight = val - 3; // -2 to +2
      const target = q.direction;
      const opp = q.axis.replace(target, "");

      scores[target] += weight;
      scores[opp] -= weight;
    });

    const l1 = scores.E >= scores.I ? "E" : "I";
    const l2 = scores.S > scores.N ? "S" : "N";
    const l3 = scores.T >= scores.F ? "T" : "F";
    const l4 = scores.J >= scores.P ? "J" : "P";

    const mbti = `${l1}${l2}${l3}${l4}`;
    const profile = MBTI_DATA.profiles[mbti] || MBTI_DATA.profiles["INTJ"];

    // Normalized Percentages (52% to 98%)
    const getPct = (lead, other) => {
      const diff = Math.max(0, scores[lead] - scores[other]);
      const raw = 50 + Math.round((diff / 24) * 50);
      return Math.min(98, Math.max(52, raw));
    };

    const pctEI = getPct(l1, l1 === "E" ? "I" : "E");
    const pctSN = getPct(l2, l2 === "S" ? "N" : "S");
    const pctTF = getPct(l3, l3 === "T" ? "F" : "T");
    const pctJP = getPct(l4, l4 === "J" ? "P" : "J");

    state.currentResult = {
      type: mbti,
      profile: profile,
      breakdown: {
        EI: { lead: l1, pct: pctEI },
        SN: { lead: l2, pct: pctSN },
        TF: { lead: l3, pct: pctTF },
        JP: { lead: l4, pct: pctJP }
      }
    };

    renderResultUI(state.currentResult);
    showView('result');
  }

  // Render Result UI
  function renderResultUI(res) {
    const { type, profile, breakdown } = res;
    const groupInfo = MBTI_DATA.groups[profile.group];

    document.getElementById('resTypeBadge').textContent = type;
    document.getElementById('resArchetypeTitle').textContent = profile.archetype;
    document.getElementById('resNickname').textContent = `"${profile.nickname}"`;
    document.getElementById('resRoleGroup').textContent = groupInfo.name;
    document.getElementById('resRoleGroup').style.backgroundColor = `${groupInfo.color}20`;
    document.getElementById('resRoleGroup').style.color = groupInfo.color;
    document.getElementById('resQuote').textContent = `“${profile.quote}”`;
    document.getElementById('resSummary').textContent = profile.summary;

    // Breakdown Bars
    renderTraitBar('barEI', 'Extraversion', 'Introversion', breakdown.EI.lead === 'E', breakdown.EI.pct);
    renderTraitBar('barSN', 'Sensing', 'Intuition', breakdown.SN.lead === 'S', breakdown.SN.pct);
    renderTraitBar('barTF', 'Thinking', 'Feeling', breakdown.TF.lead === 'T', breakdown.TF.pct);
    renderTraitBar('barJP', 'Judging', 'Perceiving', breakdown.JP.lead === 'J', breakdown.JP.pct);

    // Strengths & Blindspots
    const strengthsList = document.getElementById('resStrengthsList');
    strengthsList.innerHTML = profile.strengths.map(s => `<li>${s}</li>`).join('');

    const blindspotsList = document.getElementById('resBlindspotsList');
    blindspotsList.innerHTML = profile.blindspots.map(b => `<li>${b}</li>`).join('');

    // Work Style & Careers
    document.getElementById('resWorkStyle').textContent = profile.workStyle;
    const careersContainer = document.getElementById('resCareerTags');
    careersContainer.innerHTML = profile.careers.map(c => 
      `<span class="badge-tag" style="background: var(--bg-subtle); border: 1px solid var(--border-color);">${c}</span>`
    ).join('');

    // Notable People
    const notableContainer = document.getElementById('resNotableTags');
    notableContainer.innerHTML = profile.notable.map(n => 
      `<span class="badge-tag" style="background: var(--primary-subtle); color: var(--primary);">${n}</span>`
    ).join('');

    // Compatibility
    document.getElementById('resCompatibility').textContent = profile.compatibility;

    // Cognitive Stack
    const stackContainer = document.getElementById('resCognitiveStack');
    if (stackContainer) {
      stackContainer.innerHTML = profile.cognitiveStack.map((cog, i) => `
        <div style="padding: 0.5rem 0.75rem; background: var(--bg-subtle); border: 1px solid var(--border-color); border-radius: 8px; font-size: 0.85rem;">
          <span style="font-weight: 700; color: var(--primary); font-size: 0.75rem; display: block;">${['Dominant', 'Auxiliary', 'Tertiary', 'Inferior'][i]}</span>
          ${cog}
        </div>
      `).join('');
    }
  }

  function renderTraitBar(containerId, leftLabel, rightLabel, isLeftDominant, pct) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const leftPct = isLeftDominant ? pct : 100 - pct;
    const rightPct = isLeftDominant ? 100 - pct : pct;

    el.innerHTML = `
      <div class="trait-labels">
        <span style="${isLeftDominant ? 'color: var(--primary); font-weight: 700;' : 'color: var(--text-muted);'}">
          ${leftLabel} (${leftPct}%)
        </span>
        <span style="${!isLeftDominant ? 'color: var(--primary); font-weight: 700;' : 'color: var(--text-muted);'}">
          ${rightLabel} (${rightPct}%)
        </span>
      </div>
      <div class="trait-bar-track">
        <div class="trait-bar-fill-left" style="width: ${leftPct}%;"></div>
        <div class="trait-bar-fill-right" style="width: ${rightPct}%;"></div>
      </div>
    `;
  }

  // Result Actions: Share, Retake, Print
  const shareBtn = document.getElementById('shareResultBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const url = `${window.location.origin}${window.location.pathname}#type=${state.currentResult.type}`;
      navigator.clipboard.writeText(url).then(() => {
        const orig = shareBtn.innerHTML;
        shareBtn.innerHTML = '✓ Link Copied!';
        setTimeout(() => { shareBtn.innerHTML = orig; }, 2000);
      });
    });
  }

  const printBtn = document.getElementById('printResultBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const retakeBtn = document.getElementById('retakeTestBtn');
  if (retakeBtn) {
    retakeBtn.addEventListener('click', () => {
      if (confirm("Are you sure you want to restart the assessment?")) {
        state.answers.fill(null);
        state.currentIndex = 0;
        localStorage.removeItem('mbti_saved_answers');
        showView('test');
      }
    });
  }

  // 16 Types Directory View Rendering
  function renderTypesDirectory() {
    const grid = document.getElementById('typesGrid');
    const searchInput = document.getElementById('typeSearchInput');
    const filterButtons = document.querySelectorAll('.type-filter-btn');

    function filterAndRender() {
      const query = (searchInput.value || '').toLowerCase().trim();
      grid.innerHTML = '';

      Object.keys(MBTI_DATA.profiles).forEach(code => {
        const item = MBTI_DATA.profiles[code];
        const group = MBTI_DATA.groups[item.group];

        const matchesGroup = (state.activeFilter === 'all' || item.group === state.activeFilter);
        const matchesQuery = (
          code.toLowerCase().includes(query) ||
          item.archetype.toLowerCase().includes(query) ||
          item.nickname.toLowerCase().includes(query) ||
          group.name.toLowerCase().includes(query)
        );

        if (matchesGroup && matchesQuery) {
          const card = document.createElement('div');
          card.className = 'type-card';
          card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 1.4rem; font-weight: 800; color: ${group.color};">${code}</span>
              <span class="badge-tag" style="background: ${group.color}20; color: ${group.color};">${group.name}</span>
            </div>
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main);">${item.archetype}</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${item.nickname}</p>
            <p style="font-size: 0.82rem; color: var(--text-subtle); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-top: 0.25rem;">
              ${item.summary}
            </p>
          `;
          card.addEventListener('click', () => openTypeModal(code, item, group));
          grid.appendChild(card);
        }
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeFilter = btn.getAttribute('data-filter');
        filterAndRender();
      });
    });

    searchInput.addEventListener('input', filterAndRender);
    filterAndRender();
  }

  // Modal Detail View
  function openTypeModal(code, profile, group) {
    modalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1rem;">
        <div>
          <span class="badge-tag" style="background: ${group.color}20; color: ${group.color}; margin-bottom: 0.25rem;">${group.name}</span>
          <h2 style="font-size: 2rem; font-weight: 900; color: var(--text-main);">${code} — ${profile.archetype}</h2>
          <span style="font-size: 0.95rem; color: var(--text-muted); font-style: italic;">"${profile.nickname}"</span>
        </div>
      </div>
      
      <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem; color: var(--text-main);">${profile.summary}</p>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
        <div>
          <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: #10b981; margin-bottom: 0.5rem;">Core Strengths</h4>
          <ul style="font-size: 0.85rem; color: var(--text-muted); padding-left: 1.2rem; line-height: 1.5;">
            ${profile.strengths.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: #f59e0b; margin-bottom: 0.5rem;">Blindspots & Growth</h4>
          <ul style="font-size: 0.85rem; color: var(--text-muted); padding-left: 1.2rem; line-height: 1.5;">
            ${profile.blindspots.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="margin-bottom: 1.25rem;">
        <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--primary); margin-bottom: 0.4rem;">High-Match Careers</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${profile.careers.map(c => `<span class="badge-tag" style="background: var(--bg-subtle); border: 1px solid var(--border-color);">${c}</span>`).join('')}
        </div>
      </div>

      <div style="margin-bottom: 1rem;">
        <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.4rem;">Famous Examples</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted);">${profile.notable.join(', ')}</p>
      </div>
    `;
    typeModal.classList.add('active');
  }

  modalCloseBtn.addEventListener('click', () => typeModal.classList.remove('active'));
  typeModal.addEventListener('click', (e) => {
    if (e.target === typeModal) typeModal.classList.remove('active');
  });

  // URL Hash Routing on Load
  function handleHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'test') {
      showView('test');
    } else if (hash === 'types') {
      showView('types');
    } else if (hash.startsWith('type=')) {
      const targetType = hash.split('=')[1].toUpperCase();
      if (MBTI_DATA.profiles[targetType]) {
        state.currentResult = {
          type: targetType,
          profile: MBTI_DATA.profiles[targetType],
          breakdown: {
            EI: { lead: targetType[0], pct: 70 },
            SN: { lead: targetType[1], pct: 68 },
            TF: { lead: targetType[2], pct: 74 },
            JP: { lead: targetType[3], pct: 65 }
          }
        };
        renderResultUI(state.currentResult);
        showView('result');
      }
    } else {
      showView('home');
    }
  }

  window.addEventListener('hashchange', handleHash);
  handleHash();
});
