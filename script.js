// Smooth scroll functionality with reduced motion support
const smoothScroll = (target) => {
  const element = document.querySelector(target);
  if (!element) return;
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    element.scrollIntoView();
  } else {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Payment button handler
const handlePayment = () => {
  window.open('https://rzp.io/rzp/qlBAO86N', '_blank', 'noopener');
};

// Objection handling functionality
const initObjectionHandling = () => {
  const chips = document.querySelectorAll('.chip');
  const answers = document.querySelectorAll('.answer');
  
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const objection = chip.dataset.objection;
      
      // Update active chip
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      
      // Update active answer
      answers.forEach(answer => {
        answer.classList.remove('active');
        if (answer.dataset.answer === objection) {
          answer.classList.add('active');
        }
      });
    });
    
    // Keyboard support for chips
    chip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        chip.click();
      }
    });
  });
};

// FAQ accordion functionality
const initFAQ = () => {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      const answerId = question.getAttribute('aria-controls');
      const answer = document.getElementById(answerId);
      
      // Close all other FAQs
      faqQuestions.forEach(q => {
        if (q !== question) {
          q.setAttribute('aria-expanded', 'false');
          const otherId = q.getAttribute('aria-controls');
          const otherAnswer = document.getElementById(otherId);
          otherAnswer.classList.remove('open');
        }
      });
      
      // Toggle current FAQ
      question.setAttribute('aria-expanded', !isExpanded);
      answer.classList.toggle('open');
    });
    
    // Keyboard support for FAQ
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });
};

// Button click handlers
const initButtons = () => {
  // Payment buttons
  const paymentButtons = document.querySelectorAll('[data-payment="true"]');
  paymentButtons.forEach(button => {
    button.addEventListener('click', handlePayment);
  });
  
  // Scroll buttons
  const scrollButtons = document.querySelectorAll('[data-scroll]');
  scrollButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const target = '#' + button.dataset.scroll;
      smoothScroll(target);
    });
  });
};

// Entrance animations observer
const initAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  // Observe elements for entrance animations
  document.querySelectorAll('.pain-card, .timeline-item, .proof-badge').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
};

// Keyboard navigation enhancement
const initKeyboardNav = () => {
  // Add focus styles for keyboard users
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
};

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
  initObjectionHandling();
  initFAQ();
  initButtons();
  initAnimations();
  initKeyboardNav();
  
  // Preload critical interactions
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    // Add subtle loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '1';
    }, 100);
  }
});