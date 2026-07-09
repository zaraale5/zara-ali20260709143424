// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});
// Keyboard navigation support
navMenu.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.focus();
  }
});

// Smooth scroll navigation with accessibility
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e){
    if (this.hash && document.querySelector(this.hash)) {
      e.preventDefault();
      document.querySelector(this.hash).scrollIntoView({behavior:'smooth',block:'start'});
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// IntersectionObserver for scroll-trigger fade-ins
function fadeInSectionObserver() {
  if (!('IntersectionObserver' in window)) return;
  const sections = document.querySelectorAll('.fade-in:not(.visible)');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting || entry.intersectionRatio > 0.21) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.17 });
  sections.forEach(s => observer.observe(s));
}
document.addEventListener('DOMContentLoaded', fadeInSectionObserver);

// Filters: accessible focus feedback
const filterForm = document.querySelector('.filters-form');
if (filterForm) {
  filterForm.addEventListener('submit', e => {
    e.preventDefault();
    // For demo, just a visual feedback
    filterForm.querySelector('button[type="submit"]').focus();
  });
}

// Accessible <details> toggle animation
const detailsList = document.querySelectorAll('.product-card details');
detailsList.forEach(d => {
  d.addEventListener('toggle', () => {
    if(d.open) d.setAttribute('aria-expanded', "true");
    else d.setAttribute('aria-expanded', "false");
  });
});

// Keyboard: Always close mobile nav on tab away
window.addEventListener('click', e => {
  if (!navMenu.contains(e.target) && e.target !== navToggle) {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// Chatbot simulation
const chatbotToggleBtn = document.getElementById('chatbot-toggle');
const chatbotBox = document.querySelector('.chatbot-box');
const chatbotForm = document.querySelector('.chatbot-form');
const chatbotMessages = document.querySelector('.chatbot-messages');

if (chatbotToggleBtn && chatbotBox && chatbotForm && chatbotMessages) {
  chatbotToggleBtn.addEventListener('click', () => {
    chatbotBox.classList.toggle('active');
    if (chatbotBox.classList.contains('active')) {
      setTimeout(() => chatbotForm.querySelector('input').focus(), 300);
    }
  });
  chatbotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = chatbotForm.querySelector('input');
    if (input.value.trim().length === 0) return;
    const question = input.value.trim();
    chatbotMessages.innerHTML += `<div class="user-msg">${question}</div>`;
    input.value = '';
    setTimeout(() => chatbotMessages.innerHTML += `<div class="bot-msg">Thank you for your question! Our expert will be with you shortly.</div>`, 600);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  });
}

// Accessibility: keyboard navigation for .category-card grid
const catCards = document.querySelectorAll('.categories-grid .category-card');
catCards.forEach(card => {
  card.addEventListener('keydown', e => {
    if(e.key === 'Enter' || e.key === ' ') {
      card.click();
    }
  });
});

// Accessibility: reduced motion means disable scroll/fade
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.fade-in').forEach(s=>s.classList.add('visible'));
}
