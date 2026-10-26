/**
 * UPRISE STUDIO — INTERACTIVE CLIENT VIDEO VAULT & FOOTFALL ENGINE
 * Powers: 27 Real Shuffled Client Reels, In-Card Video Playback,
 * Interactive Fullscreen Modal Reel Player, Realistic Footfall Estimator & Mobile Navigation.
 */

(function () {
  'use strict';

  // State Management
  const state = {
    reels: (typeof window !== 'undefined' && window.UPRISE_REELS && window.UPRISE_REELS.length) 
      ? window.UPRISE_REELS 
      : [],
    currentModalIndex: 0,
    activeCategory: 'cloth',
    monthlyReels: 30,
    ticketSize: 2500,
    categoryMultiplier: 1.1
  };

  // DOM Elements
  const el = {
    siteNav: document.getElementById('siteNav'),
    videoGridContainer: document.getElementById('videoGridContainer'),
    // Modal
    videoModal: document.getElementById('videoModal'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalPrevBtn: document.getElementById('modalPrevBtn'),
    modalNextBtn: document.getElementById('modalNextBtn'),
    modalIndexCounter: document.getElementById('modalIndexCounter'),
    modalVideoStream: document.getElementById('modalVideoStream'),
    modalStoreTitle: document.getElementById('modalStoreTitle'),
    modalStoreLocation: document.getElementById('modalStoreLocation'),
    modalWhatsAppBtn: document.getElementById('modalWhatsAppBtn'),
    // Calculator
    calcCategoryBtns: document.querySelectorAll('.calc-choice-btn'),
    calcReelSlider: document.getElementById('calcReelSlider'),
    calcReelCountVal: document.getElementById('calcReelCountVal'),
    calcTicketSlider: document.getElementById('calcTicketSlider'),
    calcTicketVal: document.getElementById('calcTicketVal'),
    calcEstViews: document.getElementById('calcEstViews'),
    calcEstWalkins: document.getElementById('calcEstWalkins'),
    calcEstRevenue: document.getElementById('calcEstRevenue'),
    calcBookBtn: document.getElementById('calcBookBtn'),
    // Mobile Nav
    mobileNavToggle: document.getElementById('mobileNavToggle'),
    mobileNavDrawer: document.getElementById('mobileNavDrawer'),
    // FAQs
    faqItems: document.querySelectorAll('.faq-item')
  };

  /**
   * INITIALIZATION
   */
  function init() {
    renderReelsGrid();
    setupModalListeners();
    setupCalculator();
    setupMobileNav();
    setupFaqAccordion();
    setupNavScroll();
  }

  /**
   * RENDER 27 REAL SHUFFLED REEL CARDS
   */
  function renderReelsGrid() {
    if (!el.videoGridContainer) return;
    el.videoGridContainer.innerHTML = '';

    state.reels.forEach((reel, idx) => {
      const card = document.createElement('div');
      card.className = 'reel-card';
      card.setAttribute('data-id', reel.id);
      card.setAttribute('data-index', idx);
      card.id = `card-${reel.id}`;

      card.innerHTML = `
        <div class="reel-card-inner">
          <video class="reel-card-video"
                 src="${reel.videoSrc}"
                 poster="${reel.posterSrc}"
                 preload="none"
                 playsinline
                 loop
                 muted></video>

          <div class="reel-card-overlay">
            <div class="reel-card-header">
              <span class="reel-badge">Production #${String(idx + 1).padStart(2, '0')}</span>
              <span class="reel-format-badge">9:16 Reel</span>
            </div>

            <button class="reel-play-circle" type="button" aria-label="Play Reel Preview">
              <span class="play-icon">▶</span>
            </button>

            <div class="reel-card-footer">
              <div class="reel-pill-row">
                <span class="reel-meta-tag">⚡ In-Store Shoot</span>
                <span class="reel-meta-tag">📍 CG &amp; MP</span>
              </div>
              <div class="reel-actions-row">
                <button type="button" class="reel-audio-btn" title="Toggle Sound" aria-label="Toggle Sound">
                  <span class="audio-icon">🔇</span>
                </button>
                <button type="button" class="reel-expand-btn" title="Watch Full Reel">
                  <span>▶ Watch Reel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      // Video Hover / Tap Interactions
      const videoEl = card.querySelector('.reel-card-video');
      const audioBtn = card.querySelector('.reel-audio-btn');
      const audioIcon = card.querySelector('.audio-icon');
      const expandBtn = card.querySelector('.reel-expand-btn');
      const playCircle = card.querySelector('.reel-play-circle');

      // Desktop Hover Preview
      card.addEventListener('mouseenter', () => {
        videoEl.play().then(() => {
          playCircle.style.opacity = '0';
        }).catch(() => {});
      });

      card.addEventListener('mouseleave', () => {
        videoEl.pause();
        videoEl.currentTime = 0;
        playCircle.style.opacity = '1';
      });

      // Card Click -> Open Full Modal
      card.addEventListener('click', (e) => {
        // If clicked specifically on audio button, don't open modal
        if (e.target.closest('.reel-audio-btn')) {
          e.stopPropagation();
          videoEl.muted = !videoEl.muted;
          audioIcon.textContent = videoEl.muted ? '🔇' : '🔊';
          if (videoEl.paused) {
            videoEl.play().catch(() => {});
            playCircle.style.opacity = '0';
          }
          return;
        }

        openModal(idx);
      });

      el.videoGridContainer.appendChild(card);
    });
  }

  /**
   * FULLSCREEN REEL LIGHTBOX MODAL
   */
  function openModal(index) {
    if (!el.videoModal || !state.reels[index]) return;
    state.currentModalIndex = index;
    const reel = state.reels[index];

    // Pause all card videos
    document.querySelectorAll('.reel-card-video').forEach(v => {
      v.pause();
    });

    if (el.modalIndexCounter) {
      el.modalIndexCounter.textContent = `${index + 1} / ${state.reels.length}`;
    }

    if (el.modalStoreTitle) {
      el.modalStoreTitle.textContent = `Client Production #${String(index + 1).padStart(2, '0')}`;
    }

    if (el.modalVideoStream) {
      el.modalVideoStream.src = reel.videoSrc;
      el.modalVideoStream.poster = reel.posterSrc;
      el.modalVideoStream.currentTime = 0;
      el.modalVideoStream.muted = false; // Play with sound in modal!
      el.modalVideoStream.play().catch(() => {
        // Fallback to muted if browser blocks unmuted autoplay
        el.modalVideoStream.muted = true;
        el.modalVideoStream.play().catch(() => {});
      });
    }

    if (el.modalWhatsAppBtn) {
      const waText = encodeURIComponent(
        `Namaste Prateek & Unnati! I watched Production #${String(index + 1).padStart(2, '0')} on your Uprise Studio website. I want to discuss a similar reel package for my retail store.`
      );
      el.modalWhatsAppBtn.href = `https://wa.me/919109990888?text=${waText}`;
    }

    el.videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!el.videoModal) return;
    el.videoModal.classList.remove('active');
    document.body.style.overflow = '';
    if (el.modalVideoStream) {
      el.modalVideoStream.pause();
      el.modalVideoStream.removeAttribute('src');
      el.modalVideoStream.load();
    }
  }

  function stepModal(delta) {
    let nextIndex = state.currentModalIndex + delta;
    if (nextIndex < 0) nextIndex = state.reels.length - 1;
    if (nextIndex >= state.reels.length) nextIndex = 0;
    openModal(nextIndex);
  }

  function setupModalListeners() {
    if (el.modalCloseBtn) {
      el.modalCloseBtn.addEventListener('click', closeModal);
    }

    if (el.videoModal) {
      el.videoModal.addEventListener('click', (e) => {
        if (e.target === el.videoModal) closeModal();
      });
    }

    if (el.modalPrevBtn) {
      el.modalPrevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stepModal(-1);
      });
    }

    if (el.modalNextBtn) {
      el.modalNextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        stepModal(1);
      });
    }

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (!el.videoModal || !el.videoModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') stepModal(-1);
      if (e.key === 'ArrowRight') stepModal(1);
    });
  }

  /**
   * REALISTIC FOOTFALL ESTIMATOR (30-DAY / 1,00,000+ LOCAL VIEWS MODEL)
   */
  function setupCalculator() {
    if (!el.calcReelSlider) return;

    // Category Buttons
    el.calcCategoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        el.calcCategoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeCategory = btn.getAttribute('data-cat') || 'cloth';
        state.categoryMultiplier = parseFloat(btn.getAttribute('data-multiplier')) || 1.1;
        
        const defaultTicket = parseInt(btn.getAttribute('data-ticket'), 10);
        if (defaultTicket && el.calcTicketSlider) {
          el.calcTicketSlider.value = defaultTicket;
          state.ticketSize = defaultTicket;
        }
        updateCalculatorOutputs();
      });
    });

    // Reel Slider
    if (el.calcReelSlider) {
      el.calcReelSlider.addEventListener('input', (e) => {
        state.monthlyReels = parseInt(e.target.value, 10);
        updateCalculatorOutputs();
      });
    }

    // Ticket Slider
    if (el.calcTicketSlider) {
      el.calcTicketSlider.addEventListener('input', (e) => {
        state.ticketSize = parseInt(e.target.value, 10);
        updateCalculatorOutputs();
      });
    }

    updateCalculatorOutputs();
  }

  function updateCalculatorOutputs() {
    // 1. Reel Count label
    if (el.calcReelCountVal) {
      if (state.monthlyReels === 15) {
        el.calcReelCountVal.textContent = '15 Reels / Month (Alternate Days)';
      } else if (state.monthlyReels === 30) {
        el.calcReelCountVal.textContent = '30 Reels / Month (1 Post / Day — Recommended)';
      } else {
        el.calcReelCountVal.textContent = '45 Reels / Month (Hyper-Growth)';
      }
    }

    // 2. Ticket Size label
    if (el.calcTicketVal) {
      el.calcTicketVal.textContent = `₹${state.ticketSize.toLocaleString('en-IN')}`;
    }

    // 3. Realistic View Count
    // 30 reels = 1,00,000+ views in city radius
    let estViews = Math.round(state.monthlyReels * 3500);
    if (state.monthlyReels >= 30) {
      estViews = Math.round(100000 + (state.monthlyReels - 30) * 4000);
    }
    const formattedViews = estViews >= 100000 
      ? `${(estViews / 100000).toFixed(1)} Lakh+` 
      : `${(estViews / 1000).toFixed(0)}K+`;

    if (el.calcEstViews) {
      el.calcEstViews.textContent = formattedViews;
    }

    // 4. Realistic In-Store Walk-ins
    // ~180 to 240 genuine walk-ins for 30 daily reels
    const baseWalkins = Math.round(state.monthlyReels * 6.5 * state.categoryMultiplier);
    const minWalkins = Math.round(baseWalkins * 0.85);
    const maxWalkins = Math.round(baseWalkins * 1.15);

    if (el.calcEstWalkins) {
      el.calcEstWalkins.textContent = `~${minWalkins} - ${maxWalkins} Walk-ins`;
    }

    // 5. Realistic Extra Revenue
    // Conversion rate: 45% of walk-ins buy
    const buyers = baseWalkins * 0.45;
    const estRev = Math.round(buyers * state.ticketSize);
    const minRevLakhs = (estRev * 0.85 / 100000).toFixed(1);
    const maxRevLakhs = (estRev * 1.15 / 100000).toFixed(1);

    if (el.calcEstRevenue) {
      if (estRev >= 100000) {
        el.calcEstRevenue.textContent = `₹${minRevLakhs}L - ₹${maxRevLakhs}L+`;
      } else {
        el.calcEstRevenue.textContent = `₹${Math.round(estRev * 0.85).toLocaleString('en-IN')}+`;
      }
    }

    // 6. Update WhatsApp Lock Button
    if (el.calcBookBtn) {
      const activeBtn = document.querySelector('.calc-choice-btn.active');
      const catName = activeBtn ? activeBtn.textContent.trim() : 'Retail Store';
      const msg = encodeURIComponent(
        `Namaste Prateek & Unnati! I ran the Footfall Calculator for my ${catName}. With ${state.monthlyReels} reels/month, looking to generate ~${minWalkins}-${maxWalkins} in-store walk-ins. Please share available shoot dates.`
      );
      el.calcBookBtn.href = `https://wa.me/919109990888?text=${msg}`;
    }
  }

  /**
   * MOBILE NAVIGATION DRAWER
   */
  function setupMobileNav() {
    if (!el.mobileNavToggle || !el.mobileNavDrawer) return;

    el.mobileNavToggle.addEventListener('click', () => {
      const isActive = el.mobileNavToggle.classList.toggle('active');
      el.mobileNavDrawer.classList.toggle('active', isActive);
      el.mobileNavDrawer.setAttribute('aria-hidden', !isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    el.mobileNavDrawer.querySelectorAll('[data-close="true"]').forEach(link => {
      link.addEventListener('click', () => {
        el.mobileNavToggle.classList.remove('active');
        el.mobileNavDrawer.classList.remove('active');
        el.mobileNavDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /**
   * FAQ ACCORDION
   */
  function setupFaqAccordion() {
    el.faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (questionBtn) {
        questionBtn.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');
          el.faqItems.forEach(i => i.classList.remove('active'));
          if (!isOpen) item.classList.add('active');
        });
      }
    });
  }

  /**
   * SITE NAV SCROLL SHADOW
   */
  function setupNavScroll() {
    window.addEventListener('scroll', () => {
      if (el.siteNav) {
        el.siteNav.classList.toggle('scrolled', window.scrollY > 40);
      }
    });
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
