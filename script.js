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
  handleScroll();
}

// ─── Mobile Menu (CLEAN VERSION) ───────────────────────────────────
const toggle = document.getElementById("menu-toggle");

if (toggle && navbar) {
  toggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

// ─── Smooth scroll for "How it works" ───────────────────────────────
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

// ─── Smooth scroll for all anchor links ─────────────────────────────
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

// ─── Contact form ───────────────────────────────────────────────────
const sendBtn = document.getElementById('sendBtn');
const cancelBtn = document.getElementById('cancelBtn');
const toast = document.getElementById('toast');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    sendBtn.innerHTML = '<i class="fa fa-spinner fa-spin" style="margin-right:6px;font-size:13px;"></i> Sending...';
    sendBtn.disabled = true;

    setTimeout(() => {
      sendBtn.innerHTML = '<i class="fa fa-paper-plane" style="margin-right:6px;font-size:13px;"></i> Send Message';
      sendBtn.disabled = false;

      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('subject').value = '';
      document.getElementById('message').value = '';

      showToast('✅ Message sent successfully!');
    }, 1400);
  });
}

if (cancelBtn) {
  cancelBtn.addEventListener('click', () => {
    ['name', 'email', 'subject', 'message'].forEach(id => {
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

// ─── Scroll reveal animation ────────────────────────────────────────
const revealTargets = document.querySelectorAll(
  '.listing-card, .why-card, .step-card, .platform-inner, .how-header, .listings-header'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ─── Hero button scroll ─────────────────────────────────────────────
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

// create account and role selection


let currentScreen = 'screen-role';
  let selectedRole  = 'flatmate';
 
  function setDots(active) {
    for (let i = 0; i < 4; i++) {
      document.getElementById('dot' + i).className = 'dot ' + (i === active ? 'active' : 'inactive');
    }
  }
 
  function showScreen(id, dotIndex) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    setDots(dotIndex);
    currentScreen = id;
    document.querySelector('.right-panel').scrollTop = 0;
  }
 
  function goToRole()    { showScreen('screen-role',    0); }
  function goToProfile() { showScreen('screen-profile', 1); }
  function goToSignIn()  { showScreen('screen-signin',  2); }
 
  function goBack() {
    if (currentScreen === 'screen-profile') goToRole();
    else if (currentScreen === 'screen-signin') {
      selectedRole === 'flatmate' ? goToProfile() : goToRole();
    }
  }
 
  function goFromRole() {
    selectedRole === 'flatmate' ? goToProfile() : goToSignIn();
  }
 
  function selectRole(el, role) {
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    selectedRole = role;
  }
 
  function togglePw() {
    const input = document.getElementById('pw-input');
    const slash = document.getElementById('eye-slash');
    if (input.type === 'password') { input.type = 'text';     slash.style.display = 'none'; }
    else                           { input.type = 'password'; slash.style.display = '';     }
  }
 
  function submitForm() {
    let email = 'yourname@email.com';
    const emailInput = document.getElementById('email-input');
    const profileEmail = document.getElementById('profile-email');
    const emailField = document.getElementById('email');
    
    if (emailInput && emailInput.value.trim()) email = emailInput.value.trim();
    else if (profileEmail && profileEmail.value.trim()) email = profileEmail.value.trim();
    else if (emailField && emailField.value.trim()) email = emailField.value.trim();

    const modalEmail = document.getElementById('modal-email');
    if (modalEmail) modalEmail.textContent = email;
    
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) modalOverlay.classList.add('show');
    
    try {
      if (typeof setDots === 'function') setDots(3);
    } catch(e) {}
  }
 
  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('show');
    goToRole();
  }