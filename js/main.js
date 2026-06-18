/* ── MOBILE SIDEBAR ── */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  if (sidebar && overlay) {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  }
}

/* ── ACTIVE NAV LINK ── */
function setActive(el) {
  // Active links are now managed by the hash router dynamically.
  // We keep this function to ensure mobile sidebar closes on click.
  closeSidebar();
}

// Bind functions to window so they are accessible by inline HTML onclick handlers
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.setActive = setActive;

/* ── SPA HASH ROUTER ── */
function handleRoute() {
  const hash = window.location.hash || '#introduction';
  const targetSection = document.querySelector(hash);

  if (targetSection && targetSection.classList.contains('section')) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(s => {
      s.classList.add('hidden-page');
      s.classList.remove('fade-in');
    });

    // Display targeted section and trigger fade-in transition
    targetSection.classList.remove('hidden-page');
    
    // Force a browser reflow to restart CSS animations
    void targetSection.offsetWidth;
    targetSection.classList.add('fade-in');

    // Instantly reveal components on the active page
    targetSection.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });

    // Instantly scroll window back to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Synchronize active classes on sidebar links
    document.querySelectorAll('.nav-list a').forEach(a => {
      if (a.getAttribute('href') === hash) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }
}

// Bind router events
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);

document.addEventListener('DOMContentLoaded', () => {
  // Initial routing run on DOM content load
  handleRoute();
});

