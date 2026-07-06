document.addEventListener('DOMContentLoaded', () => {
  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // ========================================
  // DARK MODE TOGGLE
  // ========================================
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // Mobile overlay theme toggle
  const mobileThemeToggle = document.querySelector('.mobile-theme-toggle');
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }

  // ========================================
  // NAV COLLAPSE ON SCROLL
  // ========================================
  const mainNav = document.getElementById('mainNav');

  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    // Collapse when scrolling down past 100px
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      mainNav.classList.add('nav-collapsed');
      mainNav.classList.remove('mobile-open'); // Auto-close mobile menu on scroll down
      document.body.style.overflow = ''; // unlock scroll
    } else {
      // Expand when scrolling up
      mainNav.classList.remove('nav-collapsed');
    }
    lastScrollY = currentScrollY;
  });

  // Mobile Menu Toggle
  const navDots = document.querySelector('.nav-dots');
  const navLinks = document.querySelectorAll('.nav-center a, .nav-right a');
  
  if (navDots) {
    navDots.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-open');
      if (mainNav.classList.contains('mobile-open')) {
        document.body.style.overflow = 'hidden'; // lock scroll
      } else {
        document.body.style.overflow = ''; // unlock scroll
      }
    });
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('mobile-open');
      document.body.style.overflow = ''; // unlock scroll
    });
  });
  // ========================================
  // HERO ENTRANCE ANIMATIONS
  // ========================================
  gsap.from('.nav-wrapper', { y: -50, opacity: 0, duration: 1, ease: 'power3.out' });
  gsap.from('.hero-heading', { opacity: 0, y: 40, duration: 1, delay: 0.3, ease: 'power3.out' });
  gsap.from('.subtitle', { opacity: 0, y: 20, duration: 1, delay: 0.5, ease: 'power3.out' });
  
  // Image cards cascade
  gsap.from('.card-back', { x: 100, y: 100, rotation: 0, opacity: 0, duration: 1.2, delay: 0.6, ease: 'back.out(1.2)' });
  gsap.from('.card-middle', { x: 50, y: 50, rotation: 0, opacity: 0, duration: 1.2, delay: 0.8, ease: 'back.out(1.2)' });
  gsap.from('.card-front', { x: 0, y: 0, rotation: 0, opacity: 0, duration: 1.2, delay: 1.0, ease: 'back.out(1.2)' });

  // ========================================
  // MOUSE PARALLAX ON IMAGE FAN
  // ========================================
  const heroVisual = document.querySelector('.hero-visual');
  const cardBack = document.querySelector('.card-back');
  const cardMiddle = document.querySelector('.card-middle');
  const cardFront = document.querySelector('.card-front');

  if (heroVisual && window.innerWidth > 1024) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      gsap.to(cardFront, { 
        x: -40 + (x * 30), y: -30 + (y * 30), rotation: -12 + (x * 5),
        duration: 0.5, ease: 'power2.out' 
      });
      gsap.to(cardMiddle, { 
        x: -20 + (x * 15), y: 20 + (y * 15), rotation: -4 + (x * 2),
        duration: 0.5, ease: 'power2.out' 
      });
      gsap.to(cardBack, { 
        x: 20 + (x * 5), y: 60 + (y * 5), rotation: 8 + (x * 1),
        duration: 0.5, ease: 'power2.out' 
      });
    });

    heroVisual.addEventListener('mouseleave', () => {
      gsap.to(cardFront, { x: -40, y: -30, rotation: -12, duration: 1, ease: 'elastic.out(1, 0.5)' });
      gsap.to(cardMiddle, { x: -20, y: 20, rotation: -4, duration: 1, ease: 'elastic.out(1, 0.5)' });
      gsap.to(cardBack, { x: 20, y: 60, rotation: 8, duration: 1, ease: 'elastic.out(1, 0.5)' });
    });
  }

  // Continuous subtle floating
  gsap.to('.card-front', { y: '-=10', duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  gsap.to('.card-middle', { y: '-=8', duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.5 });
  gsap.to('.card-back', { y: '-=5', duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1 });

  // ========================================
  // MARQUEE — speed up on hover
  // ========================================
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationDuration = '10s';
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationDuration = '25s';
    });
  }

  // ========================================
  // PROJECTS — scroll-triggered entrance
  // ========================================
  gsap.utils.toArray('.project-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: { trigger: card, start: 'top 85%' },
      y: 80, opacity: 0, duration: 1, delay: i * 0.15, ease: 'power3.out'
    });
  });

  // ========================================
  // FLOATING CTA — popup with notification sound
  // ========================================
  const ctaPill = document.querySelector('.cta-pill');
  let ctaSoundPlayed = false;

  // Create notification sound using Web Audio API
  function playNotificationSound() {
    if (ctaSoundPlayed) return;
    ctaSoundPlayed = true;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // First tone (higher pitch)
    const osc1 = audioCtx.createOscillator();
    const gain1 = audioCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, audioCtx.currentTime);
    gain1.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    osc1.connect(gain1);
    gain1.connect(audioCtx.destination);
    osc1.start(audioCtx.currentTime);
    osc1.stop(audioCtx.currentTime + 0.3);

    // Second tone (even higher, slight delay for a "ding-ding")
    const osc2 = audioCtx.createOscillator();
    const gain2 = audioCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1175, audioCtx.currentTime + 0.15);
    gain2.gain.setValueAtTime(0, audioCtx.currentTime);
    gain2.gain.setValueAtTime(0.12, audioCtx.currentTime + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    osc2.connect(gain2);
    gain2.connect(audioCtx.destination);
    osc2.start(audioCtx.currentTime + 0.15);
    osc2.stop(audioCtx.currentTime + 0.5);
  }

  if (ctaPill) {
    gsap.set(ctaPill, { y: 120, opacity: 0, scale: 0.8 });

    ScrollTrigger.create({
      trigger: '.projects-section',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        // Play the notification sound
        playNotificationSound();

        // Popup animation with bounce
        gsap.to(ctaPill, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.7)',
          onComplete: () => {
            // Subtle pulse after appearing
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const pulseColor = isDark ? '59, 130, 246' : '232, 115, 74';
            
            gsap.fromTo(ctaPill, 
              { boxShadow: `0 0 0 0 rgba(${pulseColor}, 0.4)` },
              { boxShadow: `0 0 0 12px rgba(${pulseColor}, 0)`, duration: 0.8, ease: 'power2.out' }
            );

            // Floating animation
            gsap.to(ctaPill, {
              y: -8,
              yoyo: true,
              repeat: -1,
              duration: 2.5,
              ease: 'sine.inOut'
            });
          }
        });
      }
    });
  }

  // ========================================
  // ROLE TEXT CYCLING
  // ========================================
  const roleItems = document.querySelectorAll('#heroRole .role-item');
  if (roleItems.length > 0) {
    let roleIndex = 0;

    setInterval(() => {
      const currentRole = roleItems[roleIndex];
      roleIndex = (roleIndex + 1) % roleItems.length;
      const nextRole = roleItems[roleIndex];

      const tl = gsap.timeline();
      
      // Smoothly fade out the current text first
      tl.to(currentRole, {
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.inOut"
      });

      // Then fade in the next text (no overlay)
      tl.fromTo(nextRole, 
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.inOut"
        }
      );
    }, 4000); // Switch every 4 seconds
  }

  // ========================================
  // ACCORDION TOGGLE
  // ========================================
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const wasActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-toggle').textContent = '+';
      });

      // Open clicked (if it wasn't already active)
      if (!wasActive) {
        item.classList.add('active');
        item.querySelector('.accordion-toggle').textContent = '\u2212';
      }
    });
  });

  // ========================================
  // THINKING SECTION ANIMATIONS
  // ========================================
  const thinkingSection = document.querySelector('.thinking-section');
  if (thinkingSection) {
    gsap.from('.thinking-heading', {
      scrollTrigger: { trigger: '.thinking-section', start: 'top 80%' },
      y: 60, opacity: 0, duration: 1, ease: 'power3.out'
    });

    gsap.utils.toArray('.accordion-item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 90%' },
        y: 30, opacity: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out'
      });
    });
  }

  // ========================================
  // FOOTER ANIMATIONS
  // ========================================
  const siteFooter = document.querySelector('.site-footer');
  if (siteFooter) {
    gsap.from('.footer-heading', {
      scrollTrigger: { trigger: '.site-footer', start: 'top 80%' },
      y: 60, opacity: 0, duration: 1, ease: 'power3.out'
    });

    gsap.from('.footer-contact-row', {
      scrollTrigger: { trigger: '.footer-contact-row', start: 'top 90%' },
      y: 30, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out'
    });

    gsap.from('.footer-big-name', {
      scrollTrigger: { trigger: '.footer-big-name', start: 'top 95%' },
      scale: 0.8, opacity: 0, duration: 1.2, ease: 'power3.out'
    });
  }

  // ========================================
  // PROJECT DETAIL MODAL & HASH ROUTER
  // ========================================
  const projectsData = {
    billzy: {
      title: "Billzy - Simple Invoice Generator App",
      subtitle: "A mobile invoice app case study — create bills faster, manage your shop better.",
      category: "Mobile Product Design",
      role: "Lead Product Designer",
      year: "2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: "App Store Rating", value: "4.9 ★" },
        { label: "Active Downloads", value: "250,000+" },
        { label: "Invoice Speed", value: "< 30s" }
      ],
      description: "Billzy is engineered for fast-paced retail owners and freelancers who need to issue professional, tax-compliant invoices in seconds right from their phone.",
      features: [
        "Instant PDF invoice generation with 1-tap WhatsApp sharing",
        "Offline-first sync supporting multi-currency & localized taxes",
        "Integrated inventory lookup with barcode camera scanner",
        "Automated payment reminders & client balance tracking"
      ],
      tech: ["Figma", "React Native", "GSAP", "Node.js", "MongoDB"]
    },
    tools: {
      title: "Tools - Emergency Service App",
      subtitle: "On-demand repair, technician dispatch, and tool rental platform.",
      category: "On-Demand Logistics / Mobile",
      role: "Senior UX Designer",
      year: "2023 — 2024",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: "Avg Dispatch", value: "12 mins" },
        { label: "Verified Mechanics", value: "1,500+" },
        { label: "User Satisfaction", value: "98%" }
      ],
      description: "Tools solves home & automotive emergencies by connecting users with nearby certified handymen and specialty tool rentals in real time.",
      features: [
        "Live GPS tracking for dispatched technicians and tool delivery",
        "Transparent flat-rate pricing calculator with instant quotes",
        "Peer-to-peer equipment rental with digital damage insurance",
        "In-app video diagnostics for quick remote estimation"
      ],
      tech: ["Figma", "Flutter", "Mapbox API", "Firebase", "WebSockets"]
    },
    nexhome: {
      title: "NexHome - Smart Living Dashboard",
      subtitle: "A centralized IoT dashboard for controlling smart home devices efficiently.",
      category: "IoT / Web & Mobile Ecosystem",
      role: "Product Design Lead",
      year: "2023",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: "Connected Devices", value: "2M+" },
        { label: "Energy Savings", value: "24%" },
        { label: "Automation Routines", value: "15k / day" }
      ],
      description: "NexHome aggregates fragmented smart home ecosystems (lighting, security, climate, solar) into an elegant glassmorphic dashboard with AI energy routines.",
      features: [
        "Custom room scenes & one-tap contextual automation routines",
        "Real-time energy consumption telemetry & predictive cost alerts",
        "Low-latency HD security camera streaming with AI motion tags",
        "Multi-user permission levels for family members and guests"
      ],
      tech: ["Figma", "Next.js", "TailwindCSS", "MQTT", "WebSockets"]
    },
    vault: {
      title: "Vault - Personal Finance & Wealth",
      subtitle: "Intelligent expense tracking & automated investment management.",
      category: "Fintech / iOS & Web App",
      role: "Senior Product Designer",
      year: "2022 — 2023",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      stats: [
        { label: "Tracked Assets", value: "$450M+" },
        { label: "Active Investors", value: "180,000" },
        { label: "Sync Accuracy", value: "99.9%" }
      ],
      description: "Vault simplifies net-worth tracking, portfolio rebalancing, and daily budget goals with interactive charts and automated bank statement categorization.",
      features: [
        "Zero-knowledge encrypted bank sync powered by Plaid API",
        "Predictive cash-flow forecasting & monthly savings benchmarks",
        "Multi-asset portfolio breakdown (Stocks, Crypto, Real Estate)",
        "Custom financial goal progress widgets with smart nudges"
      ],
      tech: ["Figma", "SwiftUI", "D3.js", "Plaid API", "Node.js"]
    }
  };

  const projectModal = document.getElementById('projectModal');
  const projectModalContent = document.getElementById('projectModalContent');
  const projectModalClose = document.getElementById('projectModalClose');
  const projectModalBackdrop = document.getElementById('projectModalBackdrop');

  function renderProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    projectModalContent.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-hero-img">
      <span class="modal-category-badge">${data.category}</span>
      <h2 class="modal-project-title">${data.title}</h2>
      <p class="modal-project-subtitle">${data.subtitle}</p>

      <div class="modal-stats-grid">
        ${data.stats.map(s => `
          <div class="modal-stat-card">
            <div class="modal-stat-value">${s.value}</div>
            <div class="modal-stat-label">${s.label}</div>
          </div>
        `).join('')}
      </div>

      <h3 class="modal-section-title">Overview</h3>
      <p style="font-size:1.1rem; line-height:1.7; color:var(--text-gray); margin-bottom:2rem;">${data.description}</p>

      <h3 class="modal-section-title">Key UX Features</h3>
      <ul class="modal-features-list">
        ${data.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h3 class="modal-section-title">Technologies & Tools</h3>
      <div class="modal-tech-tags">
        ${data.tech.map(t => `<span class="modal-tech-tag">${t}</span>`).join('')}
      </div>

      <div class="modal-actions">
        <button class="modal-btn-primary" onclick="closeProjectModal()">
          Close Case Study ✕
        </button>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  window.closeProjectModal = function() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (window.location.hash.startsWith('#project-')) {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    }
  };

  function handleProjectHash() {
    const hash = window.location.hash;
    if (hash.startsWith('#project-')) {
      const projectId = hash.replace('#project-', '');
      renderProjectModal(projectId);
    } else {
      if (projectModal && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
    }
  }

  // Event Listeners for project cards and links
  document.querySelectorAll('[data-project-id]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      const projectId = elem.getAttribute('data-project-id');
      if (projectId) {
        window.location.hash = `#project-${projectId}`;
      }
    });
  });

  if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
  if (projectModalBackdrop) projectModalBackdrop.addEventListener('click', closeProjectModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  window.addEventListener('hashchange', handleProjectHash);
  // Check hash on page load
  handleProjectHash();

});
