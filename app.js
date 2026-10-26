/**
 * UPRISE STUDIO — INTERACTIVE CLIENT VIDEO VAULT & ENGINE
 * Powers: 50 Client Videos, Filters, Real-time Search, Canvas Poster Generator,
 * Modal Lightbox Reel Player, Footfall Calculator & Micro-Interactions.
 */

(function () {
  'use strict';

  // State Management
  const state = {
    videos: (typeof window !== 'undefined' && window.UPRISE_VIDEOS && window.UPRISE_VIDEOS.length) ? window.UPRISE_VIDEOS : (typeof UPRISE_VIDEOS !== 'undefined' ? UPRISE_VIDEOS : []),
    categories: (typeof window !== 'undefined' && window.UPRISE_CATEGORIES && window.UPRISE_CATEGORIES.length) ? window.UPRISE_CATEGORIES : (typeof UPRISE_CATEGORIES !== 'undefined' ? UPRISE_CATEGORIES : []),
    styles: (typeof window !== 'undefined' && window.UPRISE_STYLES && window.UPRISE_STYLES.length) ? window.UPRISE_STYLES : (typeof UPRISE_STYLES !== 'undefined' ? UPRISE_STYLES : []),
    activeCategory: 'all',
    activeStyle: 'all',
    searchQuery: '',
    sortBy: 'views', // 'views', 'leads', 'default'
    viewMode: 'grid', // 'grid' | 'feed'
    currentModalIndex: 0,
    filteredVideos: [],
    isPlaying: true,
    isMuted: true
  };

  // DOM Elements Cache
  const el = {
    // Nav
    siteNav: document.getElementById('siteNav'),
    // Gallery controls
    categoryFilterBar: document.getElementById('categoryFilterBar'),
    styleFilterRow: document.getElementById('styleFilterRow'),
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    sortSelect: document.getElementById('sortSelect'),
    viewGridBtn: document.getElementById('viewGridBtn'),
    viewFeedBtn: document.getElementById('viewFeedBtn'),
    resultsCount: document.getElementById('resultsCount'),
    videoGridContainer: document.getElementById('videoGridContainer'),
    videoFeedContainer: document.getElementById('videoFeedContainer'),
    vaultEmptyState: document.getElementById('vaultEmptyState'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),
    // Modal
    videoModal: document.getElementById('videoModal'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalPrevBtn: document.getElementById('modalPrevBtn'),
    modalNextBtn: document.getElementById('modalNextBtn'),
    modalIndexCounter: document.getElementById('modalIndexCounter'),
    modalVideoStream: document.getElementById('modalVideoStream'),
    modalPhoneBezel: document.getElementById('modalPhoneBezel'),
    reelPlayTrigger: document.getElementById('reelPlayTrigger'),
    reelSoundToggle: document.getElementById('reelSoundToggle'),
    reelProgressBar: document.getElementById('reelProgressBar'),
    reelProgressFill: document.getElementById('reelProgressFill'),
    reelLikeBtn: document.getElementById('reelLikeBtn'),
    reelLikeCount: document.getElementById('reelLikeCount'),
    reelShareBtn: document.getElementById('reelShareBtn'),
    reelAvatar: document.getElementById('reelAvatar'),
    reelUsername: document.getElementById('reelUsername'),
    reelHookCaption: document.getElementById('reelHookCaption'),
    modalNicheBadge: document.getElementById('modalNicheBadge'),
    modalStyleBadge: document.getElementById('modalStyleBadge'),
    modalStoreTitle: document.getElementById('modalStoreTitle'),
    modalStoreLocation: document.getElementById('modalStoreLocation'),
    modalStatViews: document.getElementById('modalStatViews'),
    modalStatLeads: document.getElementById('modalStatLeads'),
    modalStatGrowth: document.getElementById('modalStatGrowth'),
    modalHookText: document.getElementById('modalHookText'),
    modalEditingText: document.getElementById('modalEditingText'),
    modalResultText: document.getElementById('modalResultText'),
    modalUncleQuote: document.getElementById('modalUncleQuote'),
    modalUncleClient: document.getElementById('modalUncleClient'),
    modalWhatsAppBtn: document.getElementById('modalWhatsAppBtn'),
    // Footfall Calculator
    calcCategoryBtns: document.querySelectorAll('.calc-choice-btn'),
    calcReelSlider: document.getElementById('calcReelSlider'),
    calcReelCountVal: document.getElementById('calcReelCountVal'),
    calcEstViews: document.getElementById('calcEstViews'),
    calcEstWalkins: document.getElementById('calcEstWalkins'),
    calcEstRevenue: document.getElementById('calcEstRevenue'),
    calcBookBtn: document.getElementById('calcBookBtn'),
    // FAQs
    faqItems: document.querySelectorAll('.faq-item')
  };

  /**
   * INITIALIZATION
   */
  function init() {
    state.filteredVideos = [...state.videos];
    renderCategoryPills();
    renderStylePills();
    applyFilterAndSort();
    setupEventListeners();
    setupFootfallCalculator();
    setupHeroVideoLoop();
  }

  /**
   * RENDER CATEGORY PILLS WITH EMOJIS & DYNAMIC COUNTS
   */
  function renderCategoryPills() {
    if (!el.categoryFilterBar) return;
    el.categoryFilterBar.innerHTML = '';

    state.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `category-pill ${cat.id === state.activeCategory ? 'active' : ''}`;
      btn.setAttribute('data-category', cat.id);
      btn.innerHTML = `
        <span>${cat.name}</span>
        <span class="category-count">${cat.count}</span>
      `;
      btn.addEventListener('click', () => {
        state.activeCategory = cat.id;
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        applyFilterAndSort();
      });
      el.categoryFilterBar.appendChild(btn);
    });
  }

  /**
   * RENDER STYLE PILLS
   */
  function renderStylePills() {
    if (!el.styleFilterRow) return;
    el.styleFilterRow.innerHTML = '<span class="style-label">Editing Vibe:</span>';

    state.styles.forEach(style => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `style-pill ${style.id === state.activeStyle ? 'active' : ''}`;
      btn.setAttribute('data-style', style.id);
      btn.textContent = style.name;
      btn.addEventListener('click', () => {
        state.activeStyle = style.id;
        document.querySelectorAll('.style-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        applyFilterAndSort();
      });
      el.styleFilterRow.appendChild(btn);
    });
  }

  /**
   * DRAW HIGH-OCTANE CANVAS POSTER THUMBNAIL
   * Generates vibrant stylized retail visuals with glowing gradients, sound waves, and badges
   */
  function drawCanvasPoster(canvas, video) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width = 450;
    const h = canvas.height = 700;

    // Background Gradient based on category color
    const baseColor = video.accentColor || '#6366f1';
    const grad = ctx.createRadialGradient(w * 0.7, h * 0.3, 20, w * 0.5, h * 0.5, w * 0.9);
    grad.addColorStop(0, hexToRgba(baseColor, 0.45));
    grad.addColorStop(0.5, '#0d111d');
    grad.addColorStop(1, '#07080e');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Dynamic Graphic Overlay: Stylized Retail Silhouette / Graphic Grid
    ctx.save();
    ctx.strokeStyle = hexToRgba('#ffffff', 0.05);
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 45) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 45) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    ctx.restore();

    // Central Glowing Orb
    ctx.save();
    const orbGrad = ctx.createRadialGradient(w * 0.5, h * 0.45, 10, w * 0.5, h * 0.45, 160);
    orbGrad.addColorStop(0, hexToRgba(baseColor, 0.35));
    orbGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = orbGrad;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.45, 160, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Category Motif / Retail Badge in Center
    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = '900 48px "Space Grotesk", sans-serif';
    
    // Draw Category Icon or initials
    const categoryIcons = {
      jewelry: '💎',
      clothes: '👗',
      electronics: '📱',
      fireworks: '🎆',
      decor: '🛋️',
      hardware: '🔧',
      footwear: '👟',
      wholesale: '📦',
      sweets: '🍧',
      auto_gym: '⚡'
    };
    const icon = categoryIcons[video.category] || '🔥';
    ctx.fillText(icon, w * 0.5, h * 0.42);

    // Bold Poster Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 24px "Space Grotesk", sans-serif';
    ctx.letterSpacing = '1px';
    const posterLines = wrapText(ctx, video.posterText || video.title.toUpperCase(), 360);
    let startY = h * 0.50;
    posterLines.slice(0, 2).forEach(line => {
      ctx.fillText(line, w * 0.5, startY);
      startY += 30;
    });

    // Sound Wave Simulation at bottom of poster
    ctx.fillStyle = hexToRgba(baseColor, 0.7);
    const barCount = 18;
    const barWidth = 6;
    const gap = 8;
    const totalW = (barWidth + gap) * barCount;
    const startX = (w - totalW) / 2;
    for (let i = 0; i < barCount; i++) {
      const barH = 10 + Math.sin(i * 0.7 + video.id.length) * 22 + Math.random() * 8;
      ctx.fillRect(startX + i * (barWidth + gap), h * 0.72 - barH / 2, barWidth, barH);
    }

    // Client Store City Stamp
    ctx.fillStyle = '#94a3b8';
    ctx.font = '600 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`📍 ${video.city}`, w * 0.5, h * 0.82);

    ctx.restore();
  }

  function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const r = parseInt(hex.substring(0, 2), 16) || 210;
    const g = parseInt(hex.substring(2, 4), 16) || 255;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  /**
   * FILTER & SORT LOGIC
   */
  function applyFilterAndSort() {
    let result = [...state.videos];

    // Filter Category
    if (state.activeCategory !== 'all') {
      result = result.filter(v => v.category === state.activeCategory);
    }

    // Filter Style
    if (state.activeStyle !== 'all') {
      result = result.filter(v => v.style === state.activeStyle);
    }

    // Filter Search Query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      result = result.filter(v =>
        v.title.toLowerCase().includes(q) ||
        v.client.toLowerCase().includes(q) ||
        v.city.toLowerCase().includes(q) ||
        v.hook.toLowerCase().includes(q) ||
        v.categoryName.toLowerCase().includes(q) ||
        v.styleName.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (state.sortBy === 'views') {
      result.sort((a, b) => parseMetric(b.views) - parseMetric(a.views));
    } else if (state.sortBy === 'leads') {
      result.sort((a, b) => parseMetric(b.leads) - parseMetric(a.leads));
    }

    state.filteredVideos = result;

    // Update Results Count
    if (el.resultsCount) {
      el.resultsCount.textContent = result.length;
    }

    // Show / Hide Empty State
    if (result.length === 0) {
      if (el.videoGridContainer) el.videoGridContainer.style.display = 'none';
      if (el.videoFeedContainer) el.videoFeedContainer.style.display = 'none';
      if (el.vaultEmptyState) el.vaultEmptyState.style.display = 'block';
    } else {
      if (el.vaultEmptyState) el.vaultEmptyState.style.display = 'none';
      if (state.viewMode === 'grid') {
        if (el.videoGridContainer) el.videoGridContainer.style.display = 'grid';
        if (el.videoFeedContainer) el.videoFeedContainer.style.display = 'none';
        renderGridView(result);
      } else {
        if (el.videoGridContainer) el.videoGridContainer.style.display = 'none';
        if (el.videoFeedContainer) el.videoFeedContainer.style.display = 'flex';
        renderFeedView(result);
      }
    }
  }

  function parseMetric(val) {
    if (!val) return 0;
    const str = val.replace(/[^0-9.KkMm+]/g, '');
    let num = parseFloat(str);
    if (val.includes('M') || val.includes('m')) num *= 1000000;
    else if (val.includes('K') || val.includes('k')) num *= 1000;
    return isNaN(num) ? 0 : num;
  }

  /**
   * RENDER VIDEO GRID VIEW
   */
  function renderGridView(videos) {
    if (!el.videoGridContainer) return;
    el.videoGridContainer.innerHTML = '';

    videos.forEach((video, index) => {
      const card = document.createElement('div');
      card.className = 'video-card';
      card.setAttribute('data-id', video.id);
      card.setAttribute('id', `card-${video.id}`);

      card.innerHTML = `
        <div class="card-thumbnail-container">
          <canvas class="dynamic-poster-canvas" id="canvas-${video.id}"></canvas>
          <video class="card-video-preview" src="${video.videoSrc}" muted loop playsinline preload="none"></video>
          
          <div class="card-poster-overlay">
            <div class="card-top-badges">
              <span class="card-category-badge">${video.categoryName}</span>
              <span class="card-views-badge">🔥 ${video.views}</span>
            </div>

            <div class="card-play-hover">▶</div>

            <div class="card-bottom-tags">
              <span class="card-style-tag">⚡ ${video.styleName}</span>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div class="card-client-row">
            <span class="card-client-name" title="${video.client}">${video.client}</span>
            <span class="card-city-tag">📍 ${video.city.split(',')[1] || video.city}</span>
          </div>
          
          <h3 class="card-title">${video.title}</h3>
          <p class="card-hook-text">${video.hook}</p>

          <div class="card-metrics-strip">
            <div class="card-metric-block">
              <span class="card-metric-val">${video.leads}</span>
              <span class="card-metric-label">In-Store Footfall</span>
            </div>
            <div class="card-metric-block" style="text-align: right;">
              <span class="card-metric-val" style="color: var(--accent-lime);">${video.growth}</span>
              <span class="card-metric-label">Client Impact</span>
            </div>
          </div>
        </div>
      `;

      // Draw poster canvas on next animation frame
      requestAnimationFrame(() => {
        const canvas = document.getElementById(`canvas-${video.id}`);
        drawCanvasPoster(canvas, video);
      });

      // Hover video play preview
      const previewVideo = card.querySelector('.card-video-preview');
      card.addEventListener('mouseenter', () => {
        if (previewVideo) {
          previewVideo.currentTime = 1;
          previewVideo.play().catch(() => {});
        }
      });
      card.addEventListener('mouseleave', () => {
        if (previewVideo) {
          previewVideo.pause();
        }
      });

      // Click to open Modal
      card.addEventListener('click', () => {
        openModal(index);
      });

      el.videoGridContainer.appendChild(card);
    });
  }

  /**
   * RENDER VIDEO FEED VIEW (VERTICAL REELS)
   */
  function renderFeedView(videos) {
    if (!el.videoFeedContainer) return;
    el.videoFeedContainer.innerHTML = '';

    videos.forEach((video, index) => {
      const feedItem = document.createElement('div');
      feedItem.className = 'feed-card';

      feedItem.innerHTML = `
        <div class="feed-phone-col">
          <div class="feed-phone-frame">
            <canvas class="dynamic-poster-canvas" id="feed-canvas-${video.id}"></canvas>
            <div class="phone-overlay-ui">
              <span class="phone-pill-tag">${video.categoryName}</span>
              <div class="phone-bottom-info">
                <span class="phone-client-tag">🏬 ${video.client}</span>
                <p class="phone-hook-text">${video.hook}</p>
                <span class="phone-stats-pill">🔥 ${video.views} Views · 📍 ${video.city}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="feed-info-col">
          <div>
            <div style="display: flex; gap: 8px; margin-bottom: 12px;">
              <span class="eyebrow-badge" style="margin: 0;">${video.categoryName}</span>
              <span class="eyebrow-badge gold" style="margin: 0;">${video.styleName}</span>
            </div>
            <h3 style="font-size: 1.6rem; margin-bottom: 12px;">${video.title}</h3>
            <p style="margin-bottom: 16px;"><strong>The Viral Hook:</strong> ${video.hook}</p>
            <p style="margin-bottom: 16px;"><strong>The Strategy:</strong> ${video.strategy}</p>
            <div class="quote-uncle-box" style="margin-bottom: 20px;">
              <p>${video.uncleQuote}</p>
              <small>— ${video.client} (${video.city})</small>
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;">
            <div>
              <strong style="color: var(--accent-lime); font-size: 1.4rem; font-family: var(--font-display);">${video.leads}</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Verified Walk-in Footfall</div>
            </div>
            <button class="btn btn-lime open-modal-btn" data-index="${index}">
              ▶ Watch Full Reel & Breakdown
            </button>
          </div>
        </div>
      `;

      requestAnimationFrame(() => {
        const canvas = document.getElementById(`feed-canvas-${video.id}`);
        drawCanvasPoster(canvas, video);
      });

      feedItem.querySelector('.open-modal-btn').addEventListener('click', () => {
        openModal(index);
      });

      el.videoFeedContainer.appendChild(feedItem);
    });
  }

  /**
   * LIGHTBOX MODAL REEL PLAYER
   */
  function openModal(index) {
    state.currentModalIndex = index;
    const video = state.filteredVideos[index];
    if (!video) return;

    // Populate Modal Content
    el.modalIndexCounter.textContent = `${index + 1} / ${state.filteredVideos.length}`;
    el.modalNicheBadge.textContent = video.categoryName;
    el.modalStyleBadge.textContent = video.styleName;
    el.modalStoreTitle.textContent = video.title;
    el.modalStoreLocation.textContent = `📍 ${video.client} · ${video.city}`;
    
    el.modalStatViews.textContent = video.views;
    el.modalStatLeads.textContent = video.leads;
    el.modalStatGrowth.textContent = video.growth;

    el.modalHookText.textContent = video.hook;
    el.modalEditingText.textContent = video.editingTechnique;
    el.modalResultText.textContent = video.footfallResult;
    el.modalUncleQuote.textContent = video.uncleQuote;
    el.modalUncleClient.textContent = `— ${video.client} (${video.city})`;

    // WhatsApp Direct Prefill Button
    const waText = encodeURIComponent(
      `Namaste Prateek & Unnati! I saw the "${video.title}" reel you made for ${video.client} in ${video.city}. I have a ${video.categoryName} shop and want similar viral footfall reels for my store. Please share shoot availability.`
    );
    el.modalWhatsAppBtn.href = `https://wa.me/919109990888?text=${waText}`;

    // Reel UI Details inside Phone
    el.reelAvatar.textContent = video.client.charAt(0);
    el.reelUsername.innerHTML = `${video.client.replace(/\s+/g, '').toLowerCase()} <span class="verified-badge">✓</span>`;
    el.reelHookCaption.textContent = video.hook;
    el.reelLikeCount.textContent = `${Math.floor(parseFloat(video.views) * 32) || 45}K`;

    // Video Playback
    if (el.modalVideoStream) {
      el.modalVideoStream.src = video.videoSrc || 'hero-video.mp4';
      el.modalVideoStream.muted = state.isMuted;
      el.modalVideoStream.currentTime = 0;
      el.modalVideoStream.play().then(() => {
        state.isPlaying = true;
        updatePlayStateUI();
      }).catch(() => {
        state.isPlaying = false;
        updatePlayStateUI();
      });
    }

    // Show Modal
    el.videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    el.videoModal.classList.remove('active');
    document.body.style.overflow = '';
    if (el.modalVideoStream) {
      el.modalVideoStream.pause();
    }
  }

  function nextModalVideo() {
    if (state.currentModalIndex < state.filteredVideos.length - 1) {
      openModal(state.currentModalIndex + 1);
    } else {
      openModal(0); // loop back
    }
  }

  function prevModalVideo() {
    if (state.currentModalIndex > 0) {
      openModal(state.currentModalIndex - 1);
    } else {
      openModal(state.filteredVideos.length - 1);
    }
  }

  function togglePlayPause() {
    if (!el.modalVideoStream) return;
    if (el.modalVideoStream.paused) {
      el.modalVideoStream.play();
      state.isPlaying = true;
    } else {
      el.modalVideoStream.pause();
      state.isPlaying = false;
    }
    updatePlayStateUI();
  }

  function updatePlayStateUI() {
    if (!el.reelPlayTrigger) return;
    el.reelPlayTrigger.textContent = state.isPlaying ? '❚❚' : '▶';
  }

  function toggleMute() {
    if (!el.modalVideoStream) return;
    state.isMuted = !state.isMuted;
    el.modalVideoStream.muted = state.isMuted;
    el.reelSoundToggle.textContent = state.isMuted ? '🔇' : '🔊';
  }

  /**
   * FOOTFALL SIMULATOR / ROI CALCULATOR FOR SHOPKEEPER UNCLE
   */
  function setupFootfallCalculator() {
    if (!el.calcReelSlider) return;

    let selectedNicheMultiplier = 1.2;

    el.calcCategoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        el.calcCategoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedNicheMultiplier = parseFloat(btn.getAttribute('data-multiplier')) || 1.0;
        updateCalculatorOutputs();
      });
    });

    el.calcReelSlider.addEventListener('input', () => {
      updateCalculatorOutputs();
    });

    function updateCalculatorOutputs() {
      const reelsCount = parseInt(el.calcReelSlider.value, 10);
      if (el.calcReelCountVal) {
        el.calcReelCountVal.textContent = `${reelsCount} Reels / Month`;
      }

      // Calculations based on actual offline retail campaign metrics
      const estViewsPerReel = 75000 * selectedNicheMultiplier;
      const totalViews = Math.round((reelsCount * estViewsPerReel) / 1000) * 1000;
      
      const walkinRate = 0.0008; // 0.08% of local views walk into store
      const estWalkins = Math.round(totalViews * walkinRate);
      
      const avgBillValue = 3500 * selectedNicheMultiplier;
      const estRevenueLakhs = ((estWalkins * 0.45 * avgBillValue) / 100000).toFixed(1);

      if (el.calcEstViews) {
        el.calcEstViews.textContent = totalViews >= 1000000
          ? `${(totalViews / 1000000).toFixed(1)}M+`
          : `${Math.round(totalViews / 1000)}K+`;
      }
      if (el.calcEstWalkins) {
        el.calcEstWalkins.textContent = `${estWalkins}+ Walk-ins`;
      }
      if (el.calcEstRevenue) {
        el.calcEstRevenue.textContent = `₹${estRevenueLakhs}L+`;
      }

      // Update WhatsApp book link
      if (el.calcBookBtn) {
        const activeCat = document.querySelector('.calc-choice-btn.active')?.textContent.trim() || 'Retail Shop';
        const msg = encodeURIComponent(
          `Namaste Prateek & Unnati, I checked your Footfall Calculator for my ${activeCat}. For ${reelsCount} reels/month, it estimates ${estWalkins}+ customer walk-ins. Let's schedule an in-store shoot call!`
        );
        el.calcBookBtn.href = `https://wa.me/919109990888?text=${msg}`;
      }
    }

    updateCalculatorOutputs();
  }

  /**
   * HERO VIDEO LOOP & STATUS
   */
  function setupHeroVideoLoop() {
    const heroVideo = document.getElementById('heroVideoElement');
    if (heroVideo) {
      heroVideo.muted = true;
      heroVideo.play().catch(() => {});
    }
  }

  /**
   * EVENT LISTENERS
   */
  function setupEventListeners() {
    // Nav Scroll
    window.addEventListener('scroll', () => {
      if (el.siteNav) {
        el.siteNav.classList.toggle('scrolled', window.scrollY > 40);
      }
    });

    // Search Input
    if (el.searchInput) {
      el.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (el.clearSearchBtn) {
          el.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
        }
        applyFilterAndSort();
      });
    }

    if (el.clearSearchBtn) {
      el.clearSearchBtn.addEventListener('click', () => {
        el.searchInput.value = '';
        state.searchQuery = '';
        el.clearSearchBtn.style.display = 'none';
        applyFilterAndSort();
      });
    }

    // Sort Dropdown
    if (el.sortSelect) {
      el.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        applyFilterAndSort();
      });
    }

    // View Switchers
    if (el.viewGridBtn) {
      el.viewGridBtn.addEventListener('click', () => {
        state.viewMode = 'grid';
        el.viewGridBtn.classList.add('active');
        el.viewFeedBtn.classList.remove('active');
        applyFilterAndSort();
      });
    }
    if (el.viewFeedBtn) {
      el.viewFeedBtn.addEventListener('click', () => {
        state.viewMode = 'feed';
        el.viewFeedBtn.classList.add('active');
        el.viewGridBtn.classList.remove('active');
        applyFilterAndSort();
      });
    }

    // Reset Filters Button in Empty State
    if (el.resetFiltersBtn) {
      el.resetFiltersBtn.addEventListener('click', () => {
        state.activeCategory = 'all';
        state.activeStyle = 'all';
        state.searchQuery = '';
        if (el.searchInput) el.searchInput.value = '';
        if (el.clearSearchBtn) el.clearSearchBtn.style.display = 'none';
        renderCategoryPills();
        renderStylePills();
        applyFilterAndSort();
      });
    }

    // Modal Events
    if (el.modalCloseBtn) {
      el.modalCloseBtn.addEventListener('click', closeModal);
    }
    if (el.modalPrevBtn) {
      el.modalPrevBtn.addEventListener('click', prevModalVideo);
    }
    if (el.modalNextBtn) {
      el.modalNextBtn.addEventListener('click', nextModalVideo);
    }
    if (el.reelPlayTrigger) {
      el.reelPlayTrigger.addEventListener('click', togglePlayPause);
    }
    if (el.reelSoundToggle) {
      el.reelSoundToggle.addEventListener('click', toggleMute);
    }
    if (el.modalPhoneBezel) {
      el.modalPhoneBezel.addEventListener('click', (e) => {
        // Prevent clicking controls from triggering play/pause
        if (e.target.closest('button') || e.target.closest('.reel-progress-track')) return;
        togglePlayPause();
      });
    }

    // Video Timeupdate for Progress Bar
    if (el.modalVideoStream) {
      el.modalVideoStream.addEventListener('timeupdate', () => {
        if (!el.modalVideoStream.duration) return;
        const progress = (el.modalVideoStream.currentTime / el.modalVideoStream.duration) * 100;
        if (el.reelProgressFill) {
          el.reelProgressFill.style.width = `${progress}%`;
        }
      });
      el.modalVideoStream.addEventListener('ended', () => {
        el.modalVideoStream.currentTime = 0;
        el.modalVideoStream.play().catch(() => {});
      });
    }

    // Scrubber click
    if (el.reelProgressBar) {
      el.reelProgressBar.addEventListener('click', (e) => {
        if (!el.modalVideoStream || !el.modalVideoStream.duration) return;
        const rect = el.reelProgressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        el.modalVideoStream.currentTime = pos * el.modalVideoStream.duration;
      });
    }

    // Reel Like Animation
    if (el.reelLikeBtn) {
      el.reelLikeBtn.addEventListener('click', () => {
        el.reelLikeBtn.style.color = '#f43f5e';
        el.reelLikeBtn.style.transform = 'scale(1.3)';
        setTimeout(() => {
          el.reelLikeBtn.style.transform = 'scale(1)';
        }, 200);
      });
    }

    // Backdrop Click to close
    if (el.videoModal) {
      el.videoModal.addEventListener('click', (e) => {
        if (e.target === el.videoModal) closeModal();
      });
    }

    // Keyboard Shortcuts (Binge Watching & Controls)
    window.addEventListener('keydown', (e) => {
      if (!el.videoModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeModal();
      else if (e.key === 'ArrowRight') nextModalVideo();
      else if (e.key === 'ArrowLeft') prevModalVideo();
      else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    });

    // FAQs Accordion
    el.faqItems.forEach(item => {
      const qBtn = item.querySelector('.faq-question-btn');
      if (qBtn) {
        qBtn.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          el.faqItems.forEach(f => f.classList.remove('open'));
          if (!isOpen) item.classList.add('open');
        });
      }
    });
  }

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
