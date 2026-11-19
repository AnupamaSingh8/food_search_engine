// MiniGoogle Pizza Finder - Application Logic & 3D Interactive Controllers

class MiniGoogleApp {
  constructor() {
    this.places = typeof FOOD_PLACES !== 'undefined' ? [...FOOD_PLACES] : (typeof PIZZA_PLACES !== 'undefined' ? [...PIZZA_PLACES] : []);
    this.webPages = typeof INDEXED_WEB_PAGES !== 'undefined' ? [...INDEXED_WEB_PAGES] : [];
    this.currentCategory = "all";
    this.searchQuery = "";
    this.sortBy = "rating";
    this.viewMode = "places"; // "places" or "web"
    this.userCoords = { lat: 18.5204, lng: 73.8402, label: "FC Road, Pune" }; // Default reference
    this.soundEnabled = true;
    this.audioCtx = null;

    this.init();
  }

  init() {
    // 1. Calculate initial distances
    this.recomputeDistances();

    // 2. Render Cards & Stats
    this.renderCards();
    this.renderStats();

    // 3. Attach Event Listeners
    this.bindEvents();

    // 4. Attach 3D Card Tilt Effects
    this.initCardTiltEffects();
  }

  // Audio SFX via Web Audio API (tactile feedback without external asset loading)
  playSfx(type = "pop") {
    if (!this.soundEnabled) return;
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === "pop") {
        osc.frequency.setValueAtTime(420, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(780, this.audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.08);
      } else if (type === "swoosh") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(280, this.audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, this.audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.15);
      }
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Haversine distance formula in kilometers
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1));
  }

  recomputeDistances() {
    this.places.forEach(p => {
      p.distanceKm = this.calculateDistance(
        this.userCoords.lat,
        this.userCoords.lng,
        p.lat,
        p.lng
      );
    });
  }

  bindEvents() {
    // Search input instant filter
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        if (this.viewMode === "web") {
          this.renderWebResults();
        } else {
          this.renderCards();
        }
      });
    }

    // Filter Chips
    const chips = document.querySelectorAll(".chip-btn");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.currentCategory = chip.dataset.category;
        this.playSfx("pop");
        this.renderCards();
      });
    });

    // Sort Dropdown
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortBy = e.target.value;
        this.playSfx("swoosh");
        this.renderCards();
      });
    }

    // GPS Detect Button
    const gpsBtn = document.getElementById("gps-btn");
    if (gpsBtn) {
      gpsBtn.addEventListener("click", () => this.detectLiveLocation());
    }

    // Location Pill Dropdown
    const locPill = document.getElementById("location-pill");
    if (locPill) {
      locPill.addEventListener("click", () => this.promptAreaSelector());
    }

    // Sound toggle button
    const soundBtn = document.getElementById("sound-toggle-btn");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        this.soundEnabled = !this.soundEnabled;
        soundBtn.innerHTML = this.soundEnabled ? "🔊" : "🔇";
        if (this.soundEnabled) this.playSfx("pop");
      });
    }

    // Modal Close
    const modalClose = document.getElementById("modal-close-btn");
    const modalOverlay = document.getElementById("modal-overlay");
    if (modalClose && modalOverlay) {
      modalClose.addEventListener("click", () => {
        modalOverlay.classList.remove("active");
        this.playSfx("swoosh");
      });
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove("active");
          this.playSfx("swoosh");
        }
      });
    }

    // ESC key to close modal
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay) {
        modalOverlay.classList.remove("active");
      }
    });
  }

  detectLiveLocation() {
    const locLabel = document.getElementById("current-location-text");
    const gpsBtn = document.getElementById("gps-btn");

    if (!navigator.geolocation) {
      alert("GPS Geolocation is not supported by your browser. Using Pune reference.");
      return;
    }

    gpsBtn.innerHTML = "📡 Locating...";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userCoords.lat = position.coords.latitude;
        this.userCoords.lng = position.coords.longitude;
        this.userCoords.label = `GPS: ${this.userCoords.lat.toFixed(3)}, ${this.userCoords.lng.toFixed(3)}`;
        if (locLabel) locLabel.textContent = "📍 " + this.userCoords.label;
        gpsBtn.innerHTML = "📍 GPS Active";
        this.recomputeDistances();
        this.sortBy = "distance";
        const sortSelect = document.getElementById("sort-select");
        if (sortSelect) sortSelect.value = "distance";
        this.playSfx("pop");
        this.renderCards();
        this.renderStats();
      },
      (error) => {
        console.warn("Geolocation denied or error:", error);
        gpsBtn.innerHTML = "📍 FC Road, Pune";
        alert("GPS access was not permitted. You can select an area from the location button at the top!");
      },
      { timeout: 7000 }
    );
  }

  promptAreaSelector() {
    const areaNames = POPULAR_AREAS.filter(a => a.lat !== null).map(a => a.name);
    const chosen = prompt("Select a location to see nearest pizza spots:\n\n" + areaNames.join("\n"), "FC Road / Deccan");
    if (!chosen) return;

    const matched = POPULAR_AREAS.find(a => a.name.toLowerCase().includes(chosen.toLowerCase()));
    if (matched && matched.lat !== null) {
      this.userCoords.lat = matched.lat;
      this.userCoords.lng = matched.lng;
      this.userCoords.label = matched.name;
      const locLabel = document.getElementById("current-location-text");
      if (locLabel) locLabel.textContent = "📍 " + matched.name;
      this.recomputeDistances();
      this.renderCards();
      this.renderStats();
      this.playSfx("pop");
    }
  }

  getFilteredPlaces() {
    return this.places.filter(place => {
      // Category Match
      const matchesCat = (this.currentCategory === "all") || (place.category === this.currentCategory);

      // Search Query Match (Food, Area, City, Dish, Tags, Canteen, etc.)
      const q = this.searchQuery;
      const matchesQuery = !q ||
        place.name.toLowerCase().includes(q) ||
        place.area.toLowerCase().includes(q) ||
        place.city.toLowerCase().includes(q) ||
        place.category.toLowerCase().includes(q) ||
        place.categoryLabel.toLowerCase().includes(q) ||
        place.featuredDish.toLowerCase().includes(q) ||
        place.tags.some(t => t.toLowerCase().includes(q)) ||
        (place.menuHighlights && place.menuHighlights.some(m => m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q))) ||
        place.description.toLowerCase().includes(q);

      return matchesCat && matchesQuery;
    }).sort((a, b) => {
      if (this.sortBy === "rating") return b.rating - a.rating;
      if (this.sortBy === "distance") return a.distanceKm - b.distanceKm;
      if (this.sortBy === "price_asc") {
        const pA = parseInt(a.price.replace(/[^\d]/g, "")) || 0;
        const pB = parseInt(b.price.replace(/[^\d]/g, "")) || 0;
        return pA - pB;
      }
      if (this.sortBy === "reviews") return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }

  renderStats() {
    const totalCount = document.getElementById("stat-total-count");
    const topRated = document.getElementById("stat-top-rated");
    const closestDist = document.getElementById("stat-closest-dist");

    if (totalCount) totalCount.textContent = this.places.length;
    if (topRated) {
      const best = Math.max(...this.places.map(p => p.rating));
      topRated.textContent = best.toFixed(1) + " ★";
    }
    if (closestDist) {
      const minD = Math.min(...this.places.map(p => p.distanceKm));
      closestDist.textContent = minD + " km";
    }
  }

  renderCards() {
    const grid = document.getElementById("pizza-grid");
    const resultsCountEl = document.getElementById("results-count-number");
    if (!grid) return;

    const filtered = this.getFilteredPlaces();
    if (resultsCountEl) resultsCountEl.textContent = filtered.length;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="font-size: 48px; margin-bottom: 12px;">🍽️🔍</div>
          <h3 style="font-size: 22px; color: #fff; margin-bottom: 8px;">No Food Places Found</h3>
          <p style="color: #94a3b8; font-size: 15px;">Try searching for 'Pizza', 'Biryani', 'Vada Pav', 'Misal', 'Chai', 'Dosa', 'FC Road', or 'Camp'.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(place => {
      return `
        <article class="pizza-card" data-id="${place.id}">
          <div class="card-image-box">
            <img 
              src="${place.images.cover}" 
              alt="${place.name}" 
              class="card-img" 
              id="img-${place.id}"
              loading="lazy"
            />
            <div class="badge-rating">
              <span class="star">★</span> ${place.rating.toFixed(1)}
              <span style="font-size: 11px; opacity: 0.8; font-weight: normal;">(${place.reviewsCount})</span>
            </div>
            <div class="badge-distance">
              <span>📍</span> ${place.distanceKm} km
            </div>
            <button 
              class="photo-badge-toggle" 
              onclick="event.stopPropagation(); window.appInstance.toggleCardPhoto('${place.id}')"
              title="Switch between Pizza and Restaurant front"
            >
              🔄 Food / Storefront
            </button>
          </div>

          <div class="card-body">
            <div class="card-title-row">
              <h3 class="place-name">${place.name}</h3>
              <span class="place-price-range">${place.priceRange}</span>
            </div>

            <div class="place-area-row">
              <span>📍</span> <span>${place.area}</span>
              <span style="margin: 0 4px; opacity: 0.4">•</span>
              <span style="color: #10b981; font-weight: 600;">${place.isOpen ? "🟢 Open Now" : "🔴 Closed"}</span>
            </div>

            <span class="place-type-pill">${place.categoryLabel}</span>

            <p class="place-desc">${place.description}</p>

            <div class="featured-dish-box">
              <div class="dish-left">
                <span class="dish-label">Top Highlight</span>
                <span class="dish-name">${place.featuredDish}</span>
              </div>
              <div class="dish-price">${place.price}</div>
            </div>

            <div class="card-footer">
              <button 
                class="btn-details" 
                onclick="window.appInstance.openModal('${place.id}')"
              >
                <span>🔍 View Details & Menu</span>
              </button>
              <a 
                href="tel:${place.phone}" 
                class="btn-call" 
                onclick="event.stopPropagation();"
                title="Call Restaurant"
              >
                📞
              </a>
            </div>
          </div>
        </article>
      `;
    }).join("");

    // Reattach 3D tilt handlers to freshly rendered cards
    this.initCardTiltEffects();
  }

  // Switch between 3D Places Radar and Web Index Mode
  switchViewMode(mode) {
    this.viewMode = mode;
    this.playSfx("swoosh");

    const tabPlaces = document.getElementById("tab-3d-places");
    const tabWeb = document.getElementById("tab-web-pagerank");
    const placesSection = document.getElementById("places-section");
    const radarSection = document.getElementById("radar-section");
    const webSection = document.getElementById("web-section");
    const searchInput = document.getElementById("search-input");

    if (mode === "web") {
      if (tabPlaces) tabPlaces.classList.remove("active");
      if (tabWeb) tabWeb.classList.add("active");
      if (placesSection) placesSection.style.display = "none";
      if (radarSection) radarSection.style.display = "none";
      if (webSection) webSection.style.display = "block";
      if (searchInput) searchInput.placeholder = "Search web pages (e.g. wood-fired, cheese pizza, student reviews)...";
      this.renderWebResults();
    } else {
      if (tabWeb) tabWeb.classList.remove("active");
      if (tabPlaces) tabPlaces.classList.add("active");
      if (placesSection) placesSection.style.display = "block";
      if (radarSection) radarSection.style.display = "flex";
      if (webSection) webSection.style.display = "none";
      if (searchInput) searchInput.placeholder = "Search food or area (e.g. Pizza, Biryani, Vada Pav, Misal, Chai, FC Road, Camp)...";
      this.renderCards();
    }
  }

  // Render Web Pages with PageRank algorithm results
  renderWebResults() {
    const container = document.getElementById("web-results-container");
    const webCountEl = document.getElementById("web-results-count");
    if (!container) return;

    const q = this.searchQuery;
    const filteredWeb = this.webPages.filter(p => {
      if (!q) return true;
      return p.title.toLowerCase().includes(q) ||
        p.snippet.toLowerCase().includes(q) ||
        p.url.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q));
    }).sort((a, b) => b.pageRank - a.pageRank);

    if (webCountEl) webCountEl.textContent = filteredWeb.length;

    if (filteredWeb.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: #94a3b8;">
          <div style="font-size: 36px; margin-bottom: 10px;">🌐🔍</div>
          <h3>No web pages match your search</h3>
          <p>Try searching for "pizza", "wood-fired", "canteen", or "pune"</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredWeb.map(page => `
      <div class="web-result-card">
        <div class="web-url-row">
          <span>🌐 ${page.url}</span>
          <span class="web-pagerank-badge">PageRank: ${page.pageRank.toFixed(4)} (${page.rankBadge})</span>
        </div>
        <a href="${page.url}" target="_blank" rel="noopener" class="web-title">${page.title}</a>
        <p class="web-snippet">${page.snippet}</p>
        <div class="web-links-info">
          <span>📥 Incoming links from node(s): <strong>[${page.incomingLinks.join(", ") || "None"}]</strong></span>
          <span>📤 Outgoing links to node(s): <strong>[${page.linksTo.join(", ")}]</strong></span>
          ${page.tags.map(t => `<span class="web-link-tag">#${t}</span>`).join("")}
        </div>
      </div>
    `).join("");
  }

  // Toggle between cover pizza and storefront photo on the card
  toggleCardPhoto(placeId) {
    const place = this.places.find(p => p.id === placeId);
    const imgEl = document.getElementById(`img-${placeId}`);
    if (!place || !imgEl) return;

    this.playSfx("pop");

    if (imgEl.src === place.images.cover) {
      imgEl.src = place.images.storefront;
    } else {
      imgEl.src = place.images.cover;
    }
  }

  // 3D Card Interactive Tilt Effect (Hardware-accelerated)
  initCardTiltEffects() {
    const cards = document.querySelectorAll(".pizza-card");

    cards.forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
        const rotateY = ((x - centerX) / centerX) * 9;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
      });

      // Clicking card opens modal
      card.addEventListener("click", () => {
        const placeId = card.dataset.id;
        this.openModal(placeId);
      });
    });
  }

  // Open 3D Detailed Modal View
  openModal(placeId) {
    const place = this.places.find(p => p.id === placeId);
    if (!place) return;

    this.playSfx("swoosh");

    const modalOverlay = document.getElementById("modal-overlay");
    const modalMainImg = document.getElementById("modal-main-img");
    const modalThumbnails = document.getElementById("modal-thumbnails");
    const modalTitle = document.getElementById("modal-title");
    const modalMeta = document.getElementById("modal-meta");
    const modalMenuList = document.getElementById("modal-menu-list");
    const modalReviewsList = document.getElementById("modal-reviews-list");
    const modalDirectionsBtn = document.getElementById("modal-directions-btn");
    const modalCallBtn = document.getElementById("modal-call-btn");

    // Images list (cover, storefront, plus gallery)
    const allImages = [place.images.cover, place.images.storefront, ...place.images.gallery];

    // Set Main Image
    if (modalMainImg) modalMainImg.src = allImages[0];

    // Set Thumbnails
    if (modalThumbnails) {
      modalThumbnails.innerHTML = allImages.map((src, idx) => `
        <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="window.appInstance.switchModalImage('${src}', this)">
          <img src="${src}" alt="Preview" />
        </div>
      `).join("");
    }

    // Set Header
    if (modalTitle) modalTitle.textContent = place.name;
    if (modalMeta) {
      modalMeta.innerHTML = `
        <span style="color: #fbbf24; font-weight: 700;">★ ${place.rating.toFixed(1)} (${place.reviewsCount} reviews)</span>
        <span>•</span>
        <span>📍 ${place.area} (${place.distanceKm} km away)</span>
        <span>•</span>
        <span>💰 ${place.avgCostForTwo}</span>
        <span>•</span>
        <span>⏰ ${place.timing}</span>
      `;
    }

    // Menu highlights
    if (modalMenuList) {
      modalMenuList.innerHTML = place.menuHighlights.map(item => `
        <div class="menu-dish-card">
          <div class="dish-header-row">
            <span>🍕 ${item.name}</span>
            <span style="color: #fbbf24;">${item.price}</span>
          </div>
          <div class="dish-desc-row">${item.desc}</div>
        </div>
      `).join("");
    }

    // Reviews
    if (modalReviewsList) {
      modalReviewsList.innerHTML = place.reviews.map(rev => `
        <div class="review-bubble">
          <div class="review-user-row">
            <span>👤 ${rev.user}</span>
            <span style="color: #fbbf24;">★ ${rev.rating} • ${rev.time}</span>
          </div>
          <p class="review-text">"${rev.comment}"</p>
        </div>
      `).join("");
    }

    // CTA links
    if (modalDirectionsBtn) {
      modalDirectionsBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + place.area + " " + place.city)}`;
    }
    if (modalCallBtn) {
      modalCallBtn.href = `tel:${place.phone}`;
    }

    if (modalOverlay) {
      modalOverlay.classList.add("active");
    }
  }

  switchModalImage(src, thumbElement) {
    const modalMainImg = document.getElementById("modal-main-img");
    if (modalMainImg) modalMainImg.src = src;

    const allThumbs = document.querySelectorAll(".thumb-item");
    allThumbs.forEach(t => t.classList.remove("active"));
    if (thumbElement) thumbElement.classList.add("active");

    this.playSfx("pop");
  }
}

// Global Launcher
window.addEventListener("DOMContentLoaded", () => {
  window.appInstance = new MiniGoogleApp();
});
