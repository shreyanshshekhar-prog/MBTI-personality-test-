// TypeVision MBTI Application Logic
document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    currentIndex: 0,
    answers: new Array(MBTI_DATA.questions.length).fill(null),
    currentResult: null,
    theme: localStorage.getItem('mbti_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    activeFilter: 'all'
  };

  // Trait metadata for the 4 letters
  const TRAIT_INFO = {
    E: { name: "Extraversion", axis: "Energy", opp: "Introversion", oppKey: "I", color: "#3b82f6", desc: "Draws stamina from the external world, action, social engagement, and expressive interaction." },
    I: { name: "Introversion", axis: "Energy", opp: "Extraversion", oppKey: "E", color: "#3b82f6", desc: "Draws stamina from inner reflection, quiet solitude, depth of focus, and independent thought." },
    S: { name: "Sensing", axis: "Information", opp: "Intuition", oppKey: "N", color: "#10b981", desc: "Processes concrete, observable realities, practical details, and battle-tested methods." },
    N: { name: "Intuition", axis: "Information", opp: "Sensing", oppKey: "S", color: "#10b981", desc: "Processes patterns, abstract metaphors, overarching big-picture visions, and future possibilities." },
    T: { name: "Thinking", axis: "Decisions", opp: "Feeling", oppKey: "F", color: "#f59e0b", desc: "Prioritizes objective logic, impartial principles, consistency, and rational clarity." },
    F: { name: "Feeling", axis: "Decisions", opp: "Thinking", oppKey: "T", color: "#f59e0b", desc: "Prioritizes empathy, interpersonal harmony, emotional nuance, and core human values." },
    J: { name: "Judging", axis: "Lifestyle", opp: "Perceiving", oppKey: "P", color: "#8b5cf6", desc: "Prefers structure, checklists, clear deadlines, closure, and planned organization." },
    P: { name: "Perceiving", axis: "Lifestyle", opp: "Judging", oppKey: "J", color: "#8b5cf6", desc: "Prefers flexibility, open options, spontaneous adaptation, and bursts of inspired energy." }
  };

  // DOM Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const navHome = document.getElementById('navHome');
  const navTest = document.getElementById('navTest');
  const navResult = document.getElementById('navResult');
  const navTypes = document.getElementById('navTypes');
  const heroStartBtn = document.getElementById('heroStartBtn');
  const heroSavedResultBtn = document.getElementById('heroSavedResultBtn');

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
  const quickCalculateBtn = document.getElementById('quickCalculateBtn');
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

  // Check for Saved Results
  const savedResultJSON = localStorage.getItem('mbti_latest_result');
  if (savedResultJSON) {
    try {
      state.currentResult = JSON.parse(savedResultJSON);
      if (state.currentResult && state.currentResult.type) {
        showResultNavButtons(state.currentResult.type);
      }
    } catch (e) {
      console.warn("Could not parse saved result:", e);
    }
  }

  function showResultNavButtons(typeCode) {
    if (navResult) {
      navResult.style.display = 'inline-block';
      navResult.textContent = `Result (${typeCode})`;
    }
    if (heroSavedResultBtn) {
      heroSavedResultBtn.style.display = 'inline-flex';
      heroSavedResultBtn.textContent = `View Saved Result (${typeCode}) 📊`;
    }
  }

  // View Navigation Router (Safe from hash loops)
  function showView(viewId, updateHash = true) {
    const views = [homeView, testView, resultView, typesView];
    const navs = [navHome, navTest, navResult, navTypes];

    views.forEach(v => { if (v) v.classList.remove('active'); });
    navs.forEach(n => { if (n) n.classList.remove('active'); });

    if (viewId === 'home') {
      homeView.classList.add('active');
      navHome.classList.add('active');
      if (updateHash) history.replaceState(null, '', '#home');
    } else if (viewId === 'test') {
      testView.classList.add('active');
      navTest.classList.add('active');
      renderQuestion();
      if (updateHash) history.replaceState(null, '', '#test');
    } else if (viewId === 'result') {
      resultView.classList.add('active');
      if (navResult) navResult.classList.add('active');
      if (state.currentResult && updateHash) {
        history.replaceState(null, '', `#result=${state.currentResult.type}`);
      }
    } else if (viewId === 'types') {
      typesView.classList.add('active');
      navTypes.classList.add('active');
      renderTypesDirectory();
      if (updateHash) history.replaceState(null, '', '#types');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Navigation Event Listeners
  navHome.addEventListener('click', () => showView('home'));
  navTest.addEventListener('click', () => showView('test'));
  if (navResult) {
    navResult.addEventListener('click', () => {
      if (state.currentResult) {
        renderResultUI(state.currentResult);
        showView('result');
      } else {
        calculateAndDisplayResults();
      }
    });
  }
  navTypes.addEventListener('click', () => showView('types'));
  if (heroStartBtn) heroStartBtn.addEventListener('click', () => showView('test'));
  if (heroSavedResultBtn) {
    heroSavedResultBtn.addEventListener('click', () => {
      if (state.currentResult) {
        renderResultUI(state.currentResult);
        showView('result');
      }
    });
  }

  document.querySelectorAll('[data-route]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const route = el.getAttribute('data-route');
      if (route === 'result') {
        if (state.currentResult) {
          renderResultUI(state.currentResult);
          showView('result');
        } else {
          calculateAndDisplayResults();
        }
      } else {
        showView(route);
      }
    });
  });

  // Restore Saved Question Progress from LocalStorage
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
      console.warn("Could not restore saved answers:", e);
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

  if (quickCalculateBtn) {
    quickCalculateBtn.addEventListener('click', () => {
      calculateAndDisplayResults();
    });
  }

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

  // Generate Profile Result from 4-letter code
  function generateProfileResult(code) {
    const mbti = code.toUpperCase();
    const profile = MBTI_DATA.profiles[mbti] || MBTI_DATA.profiles["INTJ"];
    return {
      type: mbti,
      profile: profile,
      breakdown: {
        EI: { lead: mbti[0], pct: 72 },
        SN: { lead: mbti[1], pct: 68 },
        TF: { lead: mbti[2], pct: 76 },
        JP: { lead: mbti[3], pct: 65 }
      }
    };
  }

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

    // Normalized Percentages (54% to 96%)
    const getPct = (lead, other) => {
      const diff = Math.max(0, scores[lead] - scores[other]);
      const raw = 50 + Math.round((diff / 24) * 50);
      return Math.min(96, Math.max(54, raw));
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

    // Save to LocalStorage
    try {
      localStorage.setItem('mbti_latest_result', JSON.stringify(state.currentResult));
    } catch (e) {
      console.warn("Storage quota:", e);
    }

    showResultNavButtons(mbti);
    renderResultUI(state.currentResult);
    showView('result');
  }

  // Render Result UI
  function renderResultUI(res) {
    if (!res || !res.profile) return;
    const { type, profile, breakdown } = res;
    const groupInfo = MBTI_DATA.groups[profile.group];

    // Hero Type Banner
    document.getElementById('resTypeBadge').textContent = type;
    document.getElementById('resArchetypeTitle').textContent = profile.archetype;
    document.getElementById('resNickname').textContent = `"${profile.nickname}"`;
    document.getElementById('resRoleGroup').textContent = groupInfo.name;
    document.getElementById('resRoleGroup').style.backgroundColor = `${groupInfo.color}25`;
    document.getElementById('resRoleGroup').style.color = groupInfo.color;
    document.getElementById('resQuote').textContent = `“${profile.quote}”`;
    document.getElementById('resSummary').textContent = profile.summary;

    // The 4 Personality Letters Breakdown Cards Grid
    const fourLettersGrid = document.getElementById('resFourLettersGrid');
    if (fourLettersGrid) {
      const letters = [
        { code: breakdown.EI.lead, pct: breakdown.EI.pct, axis: "Energy" },
        { code: breakdown.SN.lead, pct: breakdown.SN.pct, axis: "Information" },
        { code: breakdown.TF.lead, pct: breakdown.TF.pct, axis: "Decisions" },
        { code: breakdown.JP.lead, pct: breakdown.JP.pct, axis: "Lifestyle" }
      ];

      fourLettersGrid.innerHTML = letters.map(item => {
        const info = TRAIT_INFO[item.code] || { name: item.code, color: "var(--primary)", desc: "" };
        return `
          <div class="four-trait-card" style="--card-accent: ${info.color};">
            <div class="four-trait-header">
              <span class="four-trait-letter">${item.code}</span>
              <span class="four-trait-pct" style="background: ${info.color}15; color: ${info.color};">${item.pct}% Dominant</span>
            </div>
            <div class="four-trait-dimension">${item.axis}</div>
            <div class="four-trait-title">${info.name}</div>
            <div class="four-trait-desc">${info.desc}</div>
          </div>
        `;
      }).join('');
    }

    // 4 Dimension Balance Bars
    renderTraitBar('barEI', 'Extraversion (E)', 'Introversion (I)', breakdown.EI.lead === 'E', breakdown.EI.pct, '#3b82f6');
    renderTraitBar('barSN', 'Sensing (S)', 'Intuition (N)', breakdown.SN.lead === 'S', breakdown.SN.pct, '#10b981');
    renderTraitBar('barTF', 'Thinking (T)', 'Feeling (F)', breakdown.TF.lead === 'T', breakdown.TF.pct, '#f59e0b');
    renderTraitBar('barJP', 'Judging (J)', 'Perceiving (P)', breakdown.JP.lead === 'J', breakdown.JP.pct, '#8b5cf6');

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

  function renderTraitBar(containerId, leftLabel, rightLabel, isLeftDominant, pct, accentColor) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const leftPct = isLeftDominant ? pct : 100 - pct;
    const rightPct = isLeftDominant ? 100 - pct : pct;

    el.innerHTML = `
      <div class="trait-labels">
        <span style="${isLeftDominant ? `color: ${accentColor}; font-weight: 800;` : 'color: var(--text-muted);'}">
          ${isLeftDominant ? '★ ' : ''}${leftLabel} (${leftPct}%)
        </span>
        <span style="${!isLeftDominant ? `color: ${accentColor}; font-weight: 800;` : 'color: var(--text-muted);'}">
          ${!isLeftDominant ? '★ ' : ''}${rightLabel} (${rightPct}%)
        </span>
      </div>
      <div class="trait-bar-track">
        <div class="trait-bar-fill-left" style="width: ${leftPct}%; background: ${isLeftDominant ? accentColor : 'var(--border-color)'};"></div>
        <div class="trait-bar-fill-right" style="width: ${rightPct}%; background: ${!isLeftDominant ? accentColor : 'var(--border-color)'};"></div>
      </div>
    `;
  }

  // Result Actions: Share, Retake, Print
  const shareBtn = document.getElementById('shareResultBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const typeCode = state.currentResult ? state.currentResult.type : 'INTJ';
      const url = `${window.location.origin}${window.location.pathname}#result=${typeCode}`;
      navigator.clipboard.writeText(url).then(() => {
        const orig = shareBtn.innerHTML;
        shareBtn.innerHTML = '✓ Link Copied!';
        setTimeout(() => { shareBtn.innerHTML = orig; }, 2000);
      }).catch(() => {
        prompt("Copy this link to share your MBTI result:", url);
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
      if (confirm("Would you like to restart the test from question 1?")) {
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
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash || hash === 'home') {
      showView('home', false);
    } else if (hash === 'test') {
      showView('test', false);
    } else if (hash === 'types') {
      showView('types', false);
    } else if (hash.startsWith('result=') || hash.startsWith('type=')) {
      const targetType = hash.split('=')[1].toUpperCase();
      if (MBTI_DATA.profiles[targetType]) {
        state.currentResult = generateProfileResult(targetType);
        showResultNavButtons(targetType);
        renderResultUI(state.currentResult);
        showView('result', false);
      } else {
        showView('home', false);
      }
    } else if (hash === 'result') {
      if (state.currentResult) {
        renderResultUI(state.currentResult);
        showView('result', false);
      } else {
        calculateAndDisplayResults();
      }
    } else {
      showView('home', false);
    }
  }

  window.addEventListener('hashchange', handleHash);
  handleHash();
});
