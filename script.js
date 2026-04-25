/* ===========================
   CO-SPAYZE — script.js
   =========================== */

// ─── Navbar scroll effect ───────────────────────────────────────────
const navbar = document.getElementById('navbar');

if (navbar) {
  const handleScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  // Run once on load in case page is already scrolled
  handleScroll();
}

// ─── Mobile Menu ───────────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
  });
}

if (closeMenu && mobileMenu) {
  closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
  });
}

// Close menu when clicking a link
document.querySelectorAll('.mobile-nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// logo
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ─── Smooth scroll for "How it works" nav link ───────────────────────
document.querySelectorAll('a[href*="#how-it-works"], a[href="#how-it-works"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.getElementById('how-it-works');
    if (target) {
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Smooth scroll for all anchor links ──────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = navbar ? navbar.offsetHeight : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Contact form ─────────────────────────────────────────────────────
const sendBtn = document.getElementById('sendBtn');
const cancelBtn = document.getElementById('cancelBtn');
const toast = document.getElementById('toast');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Simulate send
    sendBtn.innerHTML = '<i class="fa fa-spinner fa-spin" style="margin-right:6px;font-size:13px;"></i> Sending...';
    sendBtn.disabled = true;

    setTimeout(() => {
      sendBtn.innerHTML = '<i class="fa fa-paper-plane" style="margin-right:6px;font-size:13px;"></i> Send Message';
      sendBtn.disabled = false;

      // Clear form
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('subject').value = '';
      document.getElementById('message').value = '';

      // Show toast
      showToast('✅ Message sent successfully!');
    }, 1400);
  });
}

if (cancelBtn) {
  cancelBtn.addEventListener('click', () => {
    const fields = ['name', 'email', 'subject', 'message'];
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
  });
}

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ─── Scroll-reveal animation ──────────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.listing-card, .why-card, .step-card, .platform-inner, .how-header, .listings-header'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger sibling cards
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ─── Hero search: Explore Now button ─────────────────────────────────
const exploreBtn = document.querySelector('.btn-explore');
if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    const listingsSection = document.querySelector('.listings-section');
    if (listingsSection) {
      const offset = navbar ? navbar.offsetHeight : 80;
      const top = listingsSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
}