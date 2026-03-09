/* =============================================
   TREVOR LEE — PORTFOLIO SCRIPT
   ============================================= */

// ---- Hero photo fade-in on load ----
const heroPhoto = document.querySelector('.hero-photo');
if (heroPhoto) {
  if (heroPhoto.complete && heroPhoto.naturalWidth > 0) {
    heroPhoto.classList.add('loaded');
  } else {
    heroPhoto.addEventListener('load', () => heroPhoto.classList.add('loaded'));
    heroPhoto.addEventListener('error', () => {
      // Gracefully hide the frame if image is missing
      const frame = heroPhoto.closest('.hero-photo-frame');
      if (frame) frame.style.display = 'none';
    });
  }
}

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
};
window.addEventListener('scroll', onScroll, { passive: true });

// ---- Hamburger / mobile menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

revealEls.forEach(el => observer.observe(el));

// ---- Active nav link highlight on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--blue)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// ---- Smooth stat counter animation ----
function animateCounter(el, target, suffix = '') {
  const duration = 1400;
  const start = performance.now();
  const isDecimal = target % 1 !== 0;
  const formatter = new Intl.NumberFormat('en-US');

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = isDecimal
      ? (eased * target).toFixed(1)
      : Math.round(eased * target);

    el.textContent = formatter.format(current) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const rawText = el.textContent.trim();
      const suffix = rawText.replace(/[\d,.$]/g, '');
      const prefix = rawText.startsWith('$') ? '$' : '';
      const numericStr = rawText.replace(/[^0-9.]/g, '');
      const target = parseFloat(numericStr);

      if (!isNaN(target)) {
        el.textContent = prefix + '0' + suffix;
        // slight delay so it's visible
        setTimeout(() => animateCounter(el, target, suffix), 200);
      }
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statObserver.observe(el));
