// ===== BeemaDukan — script.js (Clean, no inline JS) =====
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) setTimeout(() => loader.classList.add('hidden'), 600);
});

document.addEventListener('DOMContentLoaded', () => {

  // ── UTILITY ──────────────────────────────────────────────
  function scrollToSection(id) {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── DEEP LINK CALCULATOR HIGHLIGHT ─────────────────────────
  const urlParams = new URLSearchParams(window.location.search);
  const calcParam = urlParams.get('calc');
  if (calcParam) {
    const targetCard = document.getElementById(`calc-card-${calcParam}`);
    if (targetCard) {
      setTimeout(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.classList.add('highlight-pulse');
        setTimeout(() => {
          targetCard.classList.remove('highlight-pulse');
        }, 3000);
      }, 800);
    }
  }

  // ── NAVBAR SCROLL ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── SMOOTH NAV LINKS ──────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (!href || href === '#') { e.preventDefault(); return; }
      try {
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      } catch (_) {}
    });
  });

  // ── HAMBURGER MENU ────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ── CTA BUTTONS (all wired by ID) ─────────────────────────
  const btnMap = {
    loginBtn:           () => openModal(),
    getProtectedBtn:    () => scrollToSection('#categories'),
    heroExplorePlans:   () => scrollToSection('#categories'),
    heroCalcBtn:        () => scrollToSection('#calculator'),
    ctaGetStarted:      () => scrollToSection('#categories'),
    ctaAdvisor:         () => scrollToSection('#faq'),
    mobileGetProtected: () => scrollToSection('#categories'),
    mobileLogin:        () => openModal(),
    supportAssistant:   () => openSupportChat(),
    googleLoginBtn:     () => alert('Google login coming soon! 🚀'),
    phoneLoginBtn:      () => alert('OTP login coming soon! 📱'),
  };
  Object.entries(btnMap).forEach(([id, fn]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', fn);
  });

  // ── LIVE TOAST NOTIFICATIONS ──────────────────────────────
  const toastContainer = document.getElementById('toast-container');
  const toastMessages = [
    { title: 'Claim #IN-8492 Approved', time: 'Just now' },
    { title: 'SecureLife Plus Activated', time: '1 min ago' },
    { title: 'Document Verified', time: 'Just now' },
    { title: 'Family Shield Care Renewed', time: '5 mins ago' }
  ];
  function showToast() {
    if (!toastContainer) return;
    const msg = toastMessages[Math.floor(Math.random() * toastMessages.length)];
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<div class="toast-icon"><i class="ph-fill ph-check-circle"></i></div><div class="toast-content"><p>${msg.title}</p><span>${msg.time}</span></div>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 400);
    }, 5000);
  }
  setTimeout(() => setInterval(showToast, 18000), 4000);

  // ── CURSOR MAGNETIC TRACKING ──────────────────────────────
  const heroBg = document.querySelector('.hero-bg-effects');
  if (heroBg) {
    document.addEventListener('mousemove', e => {
      heroBg.style.setProperty('--x', e.clientX + 'px');
      heroBg.style.setProperty('--y', e.clientY + 'px');
    });
  }

  // ── DASHBOARD SUBTLE ANIMATIONS ───────────────────────────
  const chartBars = document.querySelectorAll('.w-chart .bar');
  if (chartBars.length > 0) {
    setInterval(() => {
      const bar = chartBars[Math.floor(Math.random() * chartBars.length)];
      const currentH = parseInt(bar.style.getPropertyValue('--h')) || 50;
      const newH = Math.max(20, Math.min(100, currentH + (Math.random() > 0.5 ? 15 : -15)));
      bar.style.setProperty('--h', newH + '%');
    }, 3500);
  }

  // ── PRICING TABS & TOGGLES ────────────────────────────────
  const pricingTabs = document.querySelectorAll('.ptab');
  const pricingGrids = document.querySelectorAll('.pricing-grid');
  pricingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      pricingTabs.forEach(t => t.classList.remove('active'));
      pricingGrids.forEach(g => g.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      const targetGrid = document.getElementById(targetId);
      if(targetGrid) targetGrid.classList.add('active');
    });
  });

  const billingSwitch = document.getElementById('billingSwitch');
  const amountElements = document.querySelectorAll('.pc-price .amount');
  const periodElements = document.querySelectorAll('.pc-price .period');
  if (billingSwitch) {
    billingSwitch.addEventListener('change', () => {
      const isYearly = billingSwitch.checked;
      amountElements.forEach(el => {
        const val = isYearly ? el.getAttribute('data-yearly') : el.getAttribute('data-monthly');
        // Simple fade animation for price change
        el.style.opacity = 0;
        setTimeout(() => {
          el.innerText = Number(val).toLocaleString('en-IN');
          el.style.opacity = 1;
        }, 150);
      });
      periodElements.forEach(el => {
        el.style.opacity = 0;
        setTimeout(() => {
          el.innerText = isYearly ? '/year' : '/month';
          el.style.opacity = 1;
        }, 150);
      });
    });
    // Add transition to elements for fade effect
    amountElements.forEach(el => el.style.transition = 'opacity 0.15s ease');
    periodElements.forEach(el => el.style.transition = 'opacity 0.15s ease');
    
    // Initialize correct format
    billingSwitch.dispatchEvent(new Event('change'));
  }

  // ── SCROLL ANIMATIONS ─────────────────────────────────────
  const animObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); animObs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-anim]').forEach(el => animObs.observe(el));

  // ── COUNTER ANIMATION ─────────────────────────────────────
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, suffix = el.dataset.suffix || '';
      let current = 0;
      const inc = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + inc, target);
        el.textContent = target >= 1000 ? Math.floor(current / 1000) + 'K+' : current + suffix;
        if (current >= target) clearInterval(timer);
      }, 30);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-number[data-count]').forEach(el => counterObs.observe(el));

  // ── LIFE JOURNEY TIMELINE ─────────────────────────────────
  const stages = document.querySelectorAll('.journey-stage');
  const jCards  = document.querySelectorAll('.journey-card');
  const jFill   = document.getElementById('journeyFill');
  stages.forEach((stage, idx) => {
    stage.addEventListener('click', () => {
      const s = stage.dataset.stage;
      stages.forEach(st => st.classList.remove('active'));
      jCards.forEach(c  => c.classList.remove('active'));
      stage.classList.add('active');
      if (jFill) jFill.style.width = (idx / (stages.length - 1) * 100) + '%';
      const card = document.querySelector(`.journey-card[data-stage="${s}"]`);
      if (card) card.classList.add('active');
    });
  });

  // ── QUIZ ──────────────────────────────────────────────────
  let quizStep = 1;
  const quizAnswers = {}, totalSteps = 4;

  document.querySelectorAll('.quiz-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      quizAnswers[quizStep] = btn.dataset.value;
      document.querySelector(`.quiz-step[data-step="${quizStep}"]`).classList.remove('active');
      quizStep++;
      document.getElementById('quizProgress').style.width = ((quizStep - 1) / totalSteps * 100) + '%';
      if (quizStep <= totalSteps) {
        document.querySelector(`.quiz-step[data-step="${quizStep}"]`).classList.add('active');
      } else {
        showQuizResults();
      }
    });
  });

  function showQuizResults() {
    document.getElementById('quizProgress').style.width = '100%';
    const plans = [
      { 
        icon: 'ph-bold ph-heartbeat', 
        name: 'Shikhar Arogya Health Care', 
        type: 'Health Insurance', 
        premium: 'रु450/month', 
        link: 'health-insurance.html' 
      }
    ];
    if (['married','married-kids'].includes(quizAnswers[2])) {
      plans.push({ 
        icon: 'ph-bold ph-shield-check', 
        name: 'Nepal Life Term Shield', 
        type: 'Life Insurance', 
        premium: 'रु600/month', 
        link: 'life-insurance.html' 
      });
    }
    if (quizAnswers[2] === 'married-kids') {
      plans.push({ 
        icon: 'ph-bold ph-baby', 
        name: 'National Child Education Protection', 
        type: 'Child Life Policy', 
        premium: 'रु800/month', 
        link: 'life-insurance.html' 
      });
    }
    if (quizAnswers[3] !== 'none') {
      plans.push({ 
        icon: 'ph-bold ph-car-profile', 
        name: 'NLG Comprehensive Motor Care', 
        type: 'Vehicle Insurance', 
        premium: 'रु350/month', 
        link: 'vehicle-insurance.html' 
      });
    }
    if (quizAnswers[4] === 'frequently') {
      plans.push({ 
        icon: 'ph-bold ph-airplane-tilt', 
        name: 'Sagarmatha Overseas Travel Plan', 
        type: 'Travel Insurance', 
        premium: 'रु1,200/trip', 
        link: 'travel-insurance.html' 
      });
    }
    if (quizAnswers[1] === '50+') {
      plans.push({ 
        icon: 'ph-bold ph-first-aid', 
        name: 'Neco Care Critical Illness Shield', 
        type: 'Critical Illness Cover', 
        premium: 'रु250/month', 
        link: 'health-insurance.html' 
      });
    }

    document.getElementById('resultPlans').innerHTML = plans.map(p => `
      <div class="result-plan glass-card" style="padding: 24px; text-align: left; display: flex; flex-direction: column; justify-content: space-between; gap: 16px; border: 1px solid var(--glass-border); border-radius: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <div style="background: rgba(37,99,235,0.1); padding: 10px; border-radius: 50%; color: var(--primary); display: flex; align-items: center; justify-content: center;">
              <i class="${p.icon}" style="font-size: 1.5rem;"></i>
            </div>
            <div>
              <span style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">${p.type}</span>
              <h4 style="font-size: 1.05rem; margin: 2px 0 0; color: var(--text); font-family: 'Manrope', sans-serif;">${p.name}</h4>
            </div>
          </div>
          <p style="margin: 0; font-size: 0.9rem; color: #10B981; font-weight: 600;">Est. Premium: ${p.premium}</p>
        </div>
        <button class="btn-primary w-100" style="padding: 10px 16px; font-size: 0.85rem;" onclick="window.location.href='${p.link}'">View Policy Details</button>
      </div>
    `).join('');
    
    // Adjust result layout style
    const rpContainer = document.getElementById('resultPlans');
    rpContainer.style.display = 'grid';
    rpContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(250px, 1fr))';
    rpContainer.style.gap = '20px';
    rpContainer.style.marginTop = '24px';
    rpContainer.style.marginBottom = '24px';

    document.getElementById('quizResult').classList.add('active');
  }

  // retake button wired via id in HTML with onclick="resetQuiz()" — keep it global
  window.resetQuiz = () => {
    quizStep = 1;
    document.getElementById('quizProgress').style.width = '0%';
    document.getElementById('quizResult').classList.remove('active');
    document.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('active'));
    document.querySelector('.quiz-step[data-step="1"]').classList.add('active');
  };

  // ── FAQ ACCORDION ─────────────────────────────────────────
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement, isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── TESTIMONIAL CAROUSEL ──────────────────────────────────
  const track    = document.getElementById('carouselTrack');
  let carouselIdx = 0;
  function getVisible() { return window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3; }
  function updateCarousel() {
    const max = Math.max(0, track.children.length - getVisible());
    carouselIdx = Math.min(carouselIdx, max);
    track.style.transform = `translateX(-${carouselIdx * (track.children[0].offsetWidth + 24)}px)`;
  }
  document.getElementById('prevBtn').addEventListener('click', () => { if (carouselIdx > 0) { carouselIdx--; updateCarousel(); } });
  document.getElementById('nextBtn').addEventListener('click', () => { carouselIdx++; updateCarousel(); });
  window.addEventListener('resize', updateCarousel);

  // ── CALCULATORS ───────────────────────────────────────────
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = 'रु' + Math.floor(progress * (end - start) + start).toLocaleString('en-IN') + '/yr';
      if (progress < 1) { window.requestAnimationFrame(step); }
    };
    window.requestAnimationFrame(step);
  }

  function updateSliderFill(el) {
    const val = (el.value - el.min) / (el.max - el.min) * 100;
    el.style.setProperty('--slider-val', val + '%');
  }

  function wire(ids, fn) { 
    ids.forEach(id => {
      const el = document.getElementById(id);
      if(el) {
        el.addEventListener('input', () => { updateSliderFill(el); fn(); });
        updateSliderFill(el);
      }
    }); 
    fn(true); 
  }

  let healthPrev = 0, vehPrev = 0, lifePrev = 0;

  wire(['calcAge','calcMembers','calcCoverage'], (init) => {
    const age = +document.getElementById('calcAge').value;
    const mem = +document.getElementById('calcMembers').value;
    const cov = +document.getElementById('calcCoverage').value;
    document.getElementById('calcAgeVal').textContent      = age;
    document.getElementById('calcMembersVal').textContent  = mem;
    document.getElementById('calcCoverageVal').textContent = 'रु' + cov + 'L';
    const target = Math.round((200 + age*80 + mem*1800 + cov*420)/100)*100;
    if(init) { document.getElementById('calcPremium').textContent = 'रु' + target.toLocaleString('en-IN') + '/yr'; }
    else { animateValue(document.getElementById('calcPremium'), healthPrev, target, 300); }
    healthPrev = target;
  });

  wire(['vehValue','vehAge'], (init) => {
    const val = +document.getElementById('vehValue').value;
    const age = +document.getElementById('vehAge').value;
    document.getElementById('vehValueVal').textContent = 'रु' + val + 'L';
    document.getElementById('vehAgeVal').textContent   = age;
    const target = Math.max(Math.round(val*100000*0.028*(1-age*0.03)/100)*100, 2000);
    if(init) { document.getElementById('vehPremium').textContent = 'रु' + target.toLocaleString('en-IN') + '/yr'; }
    else { animateValue(document.getElementById('vehPremium'), vehPrev, target, 300); }
    vehPrev = target;
  });

  wire(['lifeAge','lifeCover'], (init) => {
    const age  = +document.getElementById('lifeAge').value;
    const cover = +document.getElementById('lifeCover').value;
    document.getElementById('lifeAgeVal').textContent  = age;
    document.getElementById('lifeCoverVal').textContent = 'रु' + cover + 'Cr';
    const target = Math.round((cover*4800 + age*180)/100)*100;
    if(init) { document.getElementById('lifePremium').textContent = 'रु' + target.toLocaleString('en-IN') + '/yr'; }
    else { animateValue(document.getElementById('lifePremium'), lifePrev, target, 300); }
    lifePrev = target;
  });

  // ── PARTICLE CANVAS ───────────────────────────────────────
  // Particles removed for a cleaner, premium UI.

  // ── LOGIN MODAL ───────────────────────────────────────────
  const modal       = document.getElementById('loginModal');
  const modalClose  = document.getElementById('modalClose');
  const modalTabs   = document.querySelectorAll('.modal-tab');
  const modalForms  = document.querySelectorAll('.modal-form');
  const modalSuccess = document.getElementById('modalSuccess');

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === 'login'));
      modalForms.forEach(f => f.classList.toggle('active', f.dataset.tab === 'login'));
      modalSuccess.classList.remove('active');
    }, 400);
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const t = tab.dataset.tab;
      modalTabs.forEach(tb => tb.classList.toggle('active', tb.dataset.tab === t));
      modalForms.forEach(f  => f.classList.toggle('active', f.dataset.tab === t));
      modalSuccess.classList.remove('active');
    });
  });

  document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault(); modalForms.forEach(f => f.classList.remove('active')); modalSuccess.classList.add('active');
  });
  document.getElementById('signupForm').addEventListener('submit', e => {
    e.preventDefault(); modalForms.forEach(f => f.classList.remove('active')); modalSuccess.classList.add('active');
  });
  document.getElementById('successClose').addEventListener('click', () => {
    closeModal(); setTimeout(() => scrollToSection('#categories'), 500);
  });
  // ── INSURANCE CALCULATOR LOGIC ─────────────────────────────
  const calcAge = document.getElementById('calcAge');
  if (calcAge) {
    const calcMembers = document.getElementById('calcMembers');
    const calcCoverage = document.getElementById('calcCoverage');
    const calcAgeVal = document.getElementById('calcAgeVal');
    const calcMembersVal = document.getElementById('calcMembersVal');
    const calcCoverageVal = document.getElementById('calcCoverageVal');
    const calcPremium = document.getElementById('calcPremium');
    const calcEDI = document.getElementById('calcEDI');

    const vehValue = document.getElementById('vehValue');
    const vehAge = document.getElementById('vehAge');
    const vehValueVal = document.getElementById('vehValueVal');
    const vehAgeVal = document.getElementById('vehAgeVal');
    const vehPremium = document.getElementById('vehPremium');
    const vehEDI = document.getElementById('vehEDI');

    const lifeAge = document.getElementById('lifeAge');
    const lifeCover = document.getElementById('lifeCover');
    const lifeAgeVal = document.getElementById('lifeAgeVal');
    const lifeCoverVal = document.getElementById('lifeCoverVal');
    const lifePremium = document.getElementById('lifePremium');
    const lifeEDI = document.getElementById('lifeEDI');

    function formatNumber(num) {
      return new Intl.NumberFormat('en-IN').format(Math.round(num));
    }

    function updateHealth() {
      const age = parseInt(calcAge.value);
      const members = parseInt(calcMembers.value);
      const coverage = parseInt(calcCoverage.value);

      calcAgeVal.textContent = age;
      calcMembersVal.textContent = members;
      calcCoverageVal.textContent = 'रु' + coverage + 'L';

      const base = coverage * 600;
      const memberFactor = 1 + 0.25 * (members - 1);
      const ageFactor = 1 + 0.015 * (age - 30);
      const premium = base * memberFactor * Math.max(0.5, ageFactor);
      
      calcPremium.textContent = 'रु' + formatNumber(premium) + '/yr';
      calcEDI.textContent = 'रु' + formatNumber(premium / 365) + '/day';
      updateSliderGradient(calcAge);
      updateSliderGradient(calcMembers);
      updateSliderGradient(calcCoverage);
    }

    function updateVehicle() {
      const val = parseInt(vehValue.value);
      const age = parseInt(vehAge.value);

      vehValueVal.textContent = 'रु' + val + 'L';
      vehAgeVal.textContent = age;

      const base = val * 1500;
      const ageFactor = 1 + 0.05 * age;
      const premium = base * ageFactor;

      vehPremium.textContent = 'रु' + formatNumber(premium) + '/yr';
      vehEDI.textContent = 'रु' + formatNumber(premium / 365) + '/day';
      updateSliderGradient(vehValue);
      updateSliderGradient(vehAge);
    }

    function updateLife() {
      const age = parseInt(lifeAge.value);
      const cover = parseInt(lifeCover.value);

      lifeAgeVal.textContent = age;
      lifeCoverVal.textContent = 'रु' + cover + 'Cr';

      const base = cover * 6000;
      const ageFactor = 1 + 0.04 * (age - 30);
      const premium = base * Math.max(0.5, ageFactor);

      lifePremium.textContent = 'रु' + formatNumber(premium) + '/yr';
      lifeEDI.textContent = 'रु' + formatNumber(premium / 365) + '/day';
      updateSliderGradient(lifeAge);
      updateSliderGradient(lifeCover);
    }

    function updateSliderGradient(slider) {
      const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
      slider.style.setProperty('--slider-val', pct + '%');
    }

    calcAge.addEventListener('input', updateHealth);
    calcMembers.addEventListener('input', updateHealth);
    calcCoverage.addEventListener('input', updateHealth);

    vehValue.addEventListener('input', updateVehicle);
    vehAge.addEventListener('input', updateVehicle);

    lifeAge.addEventListener('input', updateLife);
    lifeCover.addEventListener('input', updateLife);

    // Initial calculations
    updateHealth();
    updateVehicle();
    updateLife();
  }

  // ── CLAIMS PORTAL TAB SWITCHING & FUNCTIONALITY ──
  const claimTabs = document.querySelectorAll('.claim-tab-btn');
  if (claimTabs.length > 0) {
    const claimPanels = document.querySelectorAll('.claim-panel');
    claimTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        claimTabs.forEach(t => {
          t.classList.remove('active');
          t.style.borderBottomColor = 'transparent';
          t.style.color = 'var(--text-dim)';
        });
        tab.classList.add('active');
        tab.style.borderBottomColor = 'var(--primary)';
        tab.style.color = '#fff';

        claimPanels.forEach(p => {
          p.style.display = 'none';
          p.classList.remove('active');
        });

        const activePanel = document.getElementById(tab.getAttribute('data-tab'));
        if (activePanel) {
          activePanel.style.display = 'block';
          activePanel.classList.add('active');
        }
      });
    });

    // Claim Tracker Logic
    const trackInput = document.getElementById('trackInput');
    const trackSubmitBtn = document.getElementById('trackSubmitBtn');
    const trackResult = document.getElementById('trackResult');
    const trackError = document.getElementById('trackError');

    const mockClaims = {
      'BD-9841': {
        status: "Document Verification in Progress",
        timeline: {
          registered: "May 18, 2026 - 10:30 AM",
          review: "May 19, 2026 - 09:15 AM",
          approved: null,
          payout: null
        }
      }
    };

    trackSubmitBtn.addEventListener('click', () => {
      const id = trackInput.value.trim().toUpperCase();
      trackResult.style.display = 'none';
      trackError.style.display = 'none';

      if (mockClaims[id]) {
        const claim = mockClaims[id];
        document.getElementById('trackTitle').textContent = `Claim Status: ${claim.status}`;
        
        // Step 1: Registered (always checked)
        document.getElementById('time-registered').textContent = claim.timeline.registered;
        
        // Step 2: Review
        const dotReview = document.getElementById('dot-review');
        const titleReview = document.getElementById('title-review');
        const timeReview = document.getElementById('time-review');
        if (claim.timeline.review) {
          dotReview.style.background = '#10B981';
          dotReview.style.boxShadow = '0 0 10px rgba(16,185,129,0.5)';
          titleReview.style.color = '#fff';
          timeReview.textContent = claim.timeline.review;
          timeReview.style.color = 'var(--text-dim)';
        } else {
          dotReview.style.background = 'rgba(255,255,255,0.2)';
          dotReview.style.boxShadow = 'none';
          titleReview.style.color = 'var(--text-dim)';
          timeReview.textContent = 'Pending review';
        }

        // Step 3: Approved
        const dotApproved = document.getElementById('dot-approved');
        const titleApproved = document.getElementById('title-approved');
        const timeApproved = document.getElementById('time-approved');
        if (claim.timeline.approved) {
          dotApproved.style.background = '#10B981';
          dotApproved.style.boxShadow = '0 0 10px rgba(16,185,129,0.5)';
          titleApproved.style.color = '#fff';
          timeApproved.textContent = claim.timeline.approved;
        } else {
          dotApproved.style.background = 'rgba(255,255,255,0.2)';
          dotApproved.style.boxShadow = 'none';
          titleApproved.style.color = 'var(--text-dim)';
          timeApproved.textContent = 'Awaiting verification';
        }

        // Step 4: Payout
        const dotPayout = document.getElementById('dot-payout');
        const titlePayout = document.getElementById('title-payout');
        const timePayout = document.getElementById('time-payout');
        if (claim.timeline.payout) {
          dotPayout.style.background = '#10B981';
          dotPayout.style.boxShadow = '0 0 10px rgba(16,185,129,0.5)';
          titlePayout.style.color = '#fff';
          timePayout.textContent = claim.timeline.payout;
        } else {
          dotPayout.style.background = 'rgba(255,255,255,0.2)';
          dotPayout.style.boxShadow = 'none';
          titlePayout.style.color = 'var(--text-dim)';
          timePayout.textContent = 'Awaiting approval';
        }

        trackResult.style.display = 'block';
      } else {
        trackError.style.display = 'block';
      }
    });

    // File a Claim form submit logic
    const claimFormSubmitBtn = document.getElementById('claimFormSubmitBtn');
    const claimFileInput = document.getElementById('claimFileInput');
    const uploadProgressContainer = document.getElementById('uploadProgressContainer');
    const uploadProgressBar = document.getElementById('uploadProgressBar');
    const uploadProgressPct = document.getElementById('uploadProgressPct');
    const fileClaimForm = document.getElementById('fileClaimForm');
    const claimFormSuccess = document.getElementById('claimFormSuccess');

    claimFormSubmitBtn.addEventListener('click', () => {
      // Validate fields manually
      const policyNo = document.getElementById('claimPolicyInput').value.trim();
      const fullName = document.getElementById('claimNameInput').value.trim();
      const dateVal = document.getElementById('claimDateInput').value.trim();

      if (!policyNo || !fullName || !dateVal) {
        alert("Please fill in all required fields.");
        return;
      }

      // Show mock file upload progress
      uploadProgressContainer.style.display = 'block';
      let pct = 0;
      claimFormSubmitBtn.disabled = true;
      claimFormSubmitBtn.innerText = "Processing Claim...";

      const interval = setInterval(() => {
        pct += 10;
        uploadProgressBar.style.width = pct + '%';
        uploadProgressPct.textContent = pct + '%';

        if (pct >= 100) {
          clearInterval(interval);
          
          // Generate mock claim ID
          const claimIdNum = Math.floor(1000 + Math.random() * 9000);
          const generatedId = `BD-${claimIdNum}`;
          
          // Add to local database
          const nowStr = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }) + ' - ' + new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          });

          mockClaims[generatedId] = {
            status: "Document Verification Pending",
            timeline: {
              registered: nowStr,
              review: null,
              approved: null,
              payout: null
            }
          };

          // Update UI
          document.getElementById('generatedClaimId').textContent = generatedId;
          fileClaimForm.style.display = 'none';
          claimFormSuccess.style.display = 'block';
          
          // Pre-populate tracker
          trackInput.value = generatedId;
        }
      }, 100);
    });

    const claimResetBtn = document.getElementById('claimResetBtn');
    if (claimResetBtn) {
      claimResetBtn.addEventListener('click', () => {
        fileClaimForm.reset();
        uploadProgressContainer.style.display = 'none';
        uploadProgressBar.style.width = '0%';
        uploadProgressPct.textContent = '0%';
        claimFormSubmitBtn.disabled = false;
        claimFormSubmitBtn.innerText = "Submit Claim Intimation";
        
        claimFormSuccess.style.display = 'none';
        fileClaimForm.style.display = 'flex';
      });
    }
  }

  // ── CUSTOMER SUPPORT HELPDESK CHAT ──────────────────────────
  function openSupportChat() {
    const existing = document.getElementById('supportChatBubble');
    if (existing) { existing.remove(); return; }
    const bubble = document.createElement('div');
    bubble.id = 'supportChatBubble';
    bubble.innerHTML = `
      <div class="support-chat-header"><span><i class="ph-fill ph-chat-circle-dots"></i> BeemaDukan Helpdesk</span><button id="supportClose">×</button></div>
      <div class="support-chat-body">
        <div class="support-msg bot">Hi! I'm your BeemaDukan support assistant. How can we help you today? 👋</div>
        <div class="support-quick-actions">
          <button class="support-qa-btn">Compare Plans</button>
          <button class="support-qa-btn">Track Claim</button>
          <button class="support-qa-btn">Contact Support</button>
        </div>
      </div>
      <div class="support-chat-input">
        <input type="text" id="supportInput" placeholder="Type your message...">
        <button id="supportSend">→</button>
      </div>`;
    document.body.appendChild(bubble);
    
    document.querySelectorAll('.support-qa-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const supportInput = document.getElementById('supportInput');
        supportInput.value = btn.innerText;
        document.getElementById('supportSend').click();
      });
    });
    document.getElementById('supportClose').addEventListener('click', () => bubble.remove());
    const supportInput = document.getElementById('supportInput');
    const supportBody  = bubble.querySelector('.support-chat-body');
    function sendMsg() {
      const msg = supportInput.value.trim(); if (!msg) return;
      supportBody.innerHTML += `<div class="support-msg user">${msg}</div>`;
      supportInput.value = '';
      const q = msg.toLowerCase();
      let reply = "Our support team is active 24/7. You can also reach us directly at support@beemadukan.com or call 1660-01-0888 (Toll-Free).";
      if (q.includes('health')) reply = "Our Health Insurance plans offer cashless claims at network hospitals with coverage from रु3L to रु1Cr. Would you like to check the Health Insurance page?";
      else if (q.includes('claim')) reply = "You can submit claims digitally on our Claims page and track progress with your Claim ID. Most claims are processed within 24 hours.";
      else if (q.includes('price')||q.includes('premium')||q.includes('cost')) reply = "Use our Calculator section on the homepage for instant estimates! Premiums start as low as रु499/year.";
      else if (q.includes('life')) reply = "Term Life Insurance offers up to रु1Cr coverage with flexible plans. View details on the Life Insurance page!";
      else if (q.includes('vehicle')||q.includes('car')||q.includes('bike')) reply = "Vehicle Insurance covers third-party liability and own damage with instant policy issuance. View our Vehicle Insurance page!";
      setTimeout(() => {
        supportBody.innerHTML += `<div class="support-msg bot">${reply}</div>`;
        supportBody.scrollTop = supportBody.scrollHeight;
      }, 600);
    }
    document.getElementById('supportSend').addEventListener('click', sendMsg);
    supportInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendMsg(); });
    // Add chat bubble CSS once
    if (!document.getElementById('supportChatStyle')) {
      const s = document.createElement('style');
      s.id = 'supportChatStyle';
      s.textContent = `
        #supportChatBubble { position: fixed; bottom: 100px; right: 24px; width: 320px; background: #FFFFFF; border: 1px solid var(--glass-border); border-radius: 16px; z-index: 960; box-shadow: 0 10px 30px rgba(0,0,0,0.08); font-family: 'Inter', sans-serif; overflow: hidden; }
        .support-chat-header { padding: 14px 18px; background: var(--primary); display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: .95rem; color: #FFFFFF; }
        .support-chat-header button { background: none; border: none; color: #fff; font-size: 1.3rem; cursor: pointer; line-height: 1; }
        .support-chat-body { padding: 16px; height: 220px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; background: #F8FAFC; }
        .support-msg { padding: 10px 14px; border-radius: 12px; font-size: .85rem; line-height: 1.5; max-width: 85%; }
        .support-msg.bot { background: #FFFFFF; border: 1px solid var(--glass-border); color: var(--text); align-self: flex-start; }
        .support-msg.user { background: var(--primary); color: #fff; align-self: flex-end; }
        .support-chat-input { padding: 12px; display: flex; gap: 8px; border-top: 1px solid var(--glass-border); background: #FFFFFF; }
        .support-chat-input input { flex: 1; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--glass-border); background: #FFFFFF; color: var(--text); font-size: .85rem; outline: none; font-family: 'Inter', sans-serif; }
        .support-chat-input button { padding: 10px 14px; border-radius: 8px; background: var(--primary); border: none; color: #fff; cursor: pointer; font-size: 1rem; }
        .support-quick-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
        .support-qa-btn { padding: 6px 12px; border-radius: 12px; background: #FFFFFF; border: 1px solid var(--glass-border); color: var(--text-dim); font-size: .75rem; cursor: pointer; transition: all .2s; }
        .support-qa-btn:hover { background: rgba(37,99,235,0.08); border-color: var(--primary); color: var(--primary); }
        `;
      document.head.appendChild(s);
    }
  }

  // ── DYNAMIC GLOBAL FLOATING WIDGETS INJECTION ──
  // 1. Ensure floating Support Assistant button is present on all pages
  if (!document.getElementById('supportAssistant')) {
    const supportBtn = document.createElement('button');
    supportBtn.className = 'support-assistant';
    supportBtn.id = 'supportAssistant';
    supportBtn.title = 'Chat with Support';
    supportBtn.innerHTML = `<i class="ph-fill ph-chat-circle-dots"></i><span class="support-tooltip">Live Help</span>`;
    document.body.appendChild(supportBtn);
    supportBtn.addEventListener('click', openSupportChat);
  }

  // 2. Inject floating Request a Callback button
  if (!document.getElementById('callbackWidget')) {
    const cbBtn = document.createElement('button');
    cbBtn.className = 'callback-widget';
    cbBtn.id = 'callbackWidget';
    cbBtn.title = 'Request a Callback';
    cbBtn.innerHTML = `<i class="ph-fill ph-phone"></i><span class="callback-tooltip">Request Callback</span>`;
    document.body.appendChild(cbBtn);
    
    cbBtn.addEventListener('click', () => {
      const existingBubble = document.getElementById('callbackBubble');
      if (existingBubble) {
        existingBubble.remove();
        return;
      }
      
      const cbBubble = document.createElement('div');
      cbBubble.id = 'callbackBubble';
      cbBubble.innerHTML = `
        <div class="callback-header">
          <span><i class="ph-fill ph-phone-call"></i> Agent Callback</span>
          <button id="cbClose">×</button>
        </div>
        <div class="callback-body" id="cbBody">
          <form id="cbForm" onsubmit="return false;" style="display: flex; flex-direction: column;">
            <label>Your Name</label>
            <input type="text" id="cbName" required placeholder="Ram Bahadur" style="margin-bottom: 12px;">
            
            <label>Phone Number</label>
            <input type="tel" id="cbPhone" required placeholder="98XXXXXXXX" pattern="9[78]\\d{8}" title="Please enter a valid 10-digit Nepalese mobile number starting with 98 or 97" style="margin-bottom: 12px;">
            
            <label>Your City</label>
            <select id="cbCity" style="margin-bottom: 16px;">
              <option>Kathmandu</option>
              <option>Pokhara</option>
              <option>Lalitpur</option>
              <option>Biratnagar</option>
              <option>Bharatpur</option>
            </select>
            
            <button type="button" id="cbSubmitBtn">Call Me Back</button>
          </form>
          <div id="cbSuccess" style="display: none; text-align: center; padding: 10px 0;">
            <i class="ph-fill ph-check-circle" style="font-size: 2.5rem; color: #10B981; margin-bottom: 12px; display: block;"></i>
            <h5 style="color: var(--text); margin: 0 0 6px; font-size: 0.95rem;">Request Registered!</h5>
            <p style="color: var(--text-dim); font-size: 0.8rem; margin: 0 0 10px;">Our local agent is dialling your number.</p>
            <div style="font-size: 1.2rem; font-weight: 700; color: #10B981;" id="cbTimer">15:00</div>
          </div>
        </div>
      `;
      document.body.appendChild(cbBubble);
      
      document.getElementById('cbClose').addEventListener('click', () => cbBubble.remove());
      
      const cbSubmitBtn = document.getElementById('cbSubmitBtn');
      cbSubmitBtn.addEventListener('click', () => {
        const name = document.getElementById('cbName').value.trim();
        const phone = document.getElementById('cbPhone').value.trim();
        
        if (!name || !phone) {
          alert("Please enter your name and phone number.");
          return;
        }

        if (!/^9[78]\d{8}$/.test(phone)) {
          alert("Please enter a valid 10-digit Nepalese phone number starting with 98 or 97.");
          return;
        }

        document.getElementById('cbForm').style.display = 'none';
        document.getElementById('cbSuccess').style.display = 'block';
        
        let seconds = 900; // 15 minutes
        const timerEl = document.getElementById('cbTimer');
        const timerInterval = setInterval(() => {
          seconds--;
          if (seconds <= 0) {
            clearInterval(timerInterval);
            cbBubble.remove();
          } else if (document.getElementById('cbTimer')) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
          } else {
            clearInterval(timerInterval);
          }
        }, 1000);
      });
    });
  }

}); // end DOMContentLoaded

