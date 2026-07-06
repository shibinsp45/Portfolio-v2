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
  gsap.from('.badge', { opacity: 0, y: 20, duration: 1, delay: 0.2, ease: 'power3.out' });
  gsap.from('.hero-heading', { opacity: 0, y: 40, duration: 1, delay: 0.4, ease: 'power3.out' });
  gsap.from('.subtitle', { opacity: 0, y: 20, duration: 1, delay: 0.6, ease: 'power3.out' });
  
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
  gsap.from('.projects-heading', {
    scrollTrigger: { trigger: '.projects', start: 'top 80%' },
    y: 60, opacity: 0, duration: 1, ease: 'power3.out'
  });

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
      trigger: '.marquee-section',
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

    gsap.from('.linkedin-card', {
      scrollTrigger: { trigger: '.thinking-right', start: 'top 85%' },
      y: 40, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out'
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

});
