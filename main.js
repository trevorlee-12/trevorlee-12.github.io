/* =============================================
   TREVOR LEE PORTFOLIO — main.js
   ============================================= */

// ---- NAVBAR: add .scrolled class on scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
let mobileMenu = null;

function buildMobileMenu() {
  const menu = document.createElement('div');
  menu.className = 'nav-mobile';
  const links = [
    ['#about', 'About'],
    ['#experience', 'Experience'],
    ['#leadership', 'Leadership'],
    ['#skills', 'Skills'],
    ['#contact', 'Contact'],
  ];
  links.forEach(([href, label]) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    a.addEventListener('click', closeMobileMenu);
    menu.appendChild(a);
  });
  document.body.appendChild(menu);
  return menu;
}

function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  if (!mobileMenu) mobileMenu = buildMobileMenu();
  mobileMenu.classList.toggle('open');
});

// ---- SCROLL REVEAL ----
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // Once revealed, no need to keep observing
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ---- SKILL BAR ANIMATION ----
const skillBars = document.querySelectorAll('.skill-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const pct = entry.target.dataset.pct || 0;
      entry.target.style.width = pct + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));

// ---- ACTIVE NAV LINK HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + id) {
          link.style.color = 'var(--blue)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));

// ---- SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
