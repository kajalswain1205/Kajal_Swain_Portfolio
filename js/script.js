(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const menuButton = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  const backToTop = document.getElementById('back-to-top');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitButton = form.querySelector('button[type="submit"]');
  const submitLabel = submitButton.querySelector('.submit-label');

  // Restore the visitor's theme preference.
  let savedTheme = null;
  try { savedTheme = localStorage.getItem('kajal-portfolio-theme'); } catch (_) {}
  if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
  updateThemeButton();

  function updateThemeButton() {
    const isLight = root.dataset.theme === 'light';
    themeIcon.textContent = isLight ? '☾' : '☼';
    themeButton.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
  }
  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('kajal-portfolio-theme', root.dataset.theme); } catch (_) {}
    updateThemeButton();
  });

  menuButton.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }));

  const sections = [...document.querySelectorAll('main section[id]')];
  const navItems = [...document.querySelectorAll('.nav-link')];
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  function onScroll() { backToTop.classList.toggle('visible', window.scrollY > 550); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.getElementById('year').textContent = new Date().getFullYear();

  // Netlify Forms captures submissions after deployment when form detection is enabled.
  // For local testing, use the mailto fallback. Never claim delivery if a request fails.
  form.addEventListener('submit', async event => {
    event.preventDefault();
    status.textContent = '';
    status.className = 'form-status';
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    if (String(data.get('bot-field') || '').trim()) {
      status.textContent = 'Unable to submit this message.';
      status.classList.add('error');
      return;
    }

    submitButton.disabled = true;
    submitLabel.textContent = 'Sending…';
    try {
      // Netlify Forms handles this endpoint on a deployed Netlify site.
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      });
      if (!response.ok) throw new Error('Form submission failed');
      status.textContent = 'Thanks! Your message was submitted. Netlify must be configured to notify kajalswain215@gmail.com.';
      status.classList.add('success');
      form.reset();
    } catch (error) {
      status.textContent = 'The form could not be submitted here. Please email kajalswain215@gmail.com directly.';
      status.classList.add('error');
    } finally {
      submitButton.disabled = false;
      submitLabel.textContent = 'Send message';
    }
  });
})();