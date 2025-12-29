// CleanLife - Professional Air & Water Solutions
console.log("🌿 CleanLife website loaded successfully");

// Smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Add scroll animation for elements
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.classList.add('reveal');
    }
  });
}, observerOptions);

document.querySelectorAll('.feature, .service, .stats > div, .info-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(el);
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showNotification('❌ Please enter a valid email address.', 'error');
      return false;
    }
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      showNotification('⚠️ Please fill in all required fields.', 'warning');
      return false;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = '#06b6d4';
    submitBtn.disabled = true;
    
    // Reset form after 2 seconds
    setTimeout(() => {
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      showNotification('✨ Thank you! We\'ll be in touch soon.', 'success');
    }, 2000);
  });
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 1000;
    animation: slideInRight 0.3s ease;
    ${type === 'success' ? 'background: #10b981;' : ''}
    ${type === 'error' ? 'background: #ef4444;' : ''}
    ${type === 'warning' ? 'background: #f59e0b;' : ''}
    ${type === 'info' ? 'background: #0a4d68;' : ''}
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Active navigation link
window.addEventListener('scroll', () => {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const rect = targetSection.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 100) {
          navLinks.forEach(l => l.style.opacity = '0.6');
          link.style.opacity = '1';
        }
      }
    }
  });
});

// Counter animation for stats
function animateCounters() {
  const statElements = document.querySelectorAll('.stats h3');
  const observerStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const text = entry.target.textContent;
        const number = parseInt(text);
        const increment = Math.ceil(number / 50);
        let current = 0;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= number) {
            entry.target.textContent = text;
            entry.target.dataset.animated = 'true';
            clearInterval(counter);
          } else {
            entry.target.textContent = current + '+';
          }
        }, 30);
      }
    });
  }, { threshold: 0.5 });
  
  statElements.forEach(el => observerStats.observe(el));
}

// Initialize animations
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateCounters);
} else {
  animateCounters();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(30px);
    }
  }
  
  .reveal {
    animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}

// Load analytics or tracking (when ready)
window.addEventListener('load', function() {
  console.log('CleanLife website fully loaded and ready');
});
