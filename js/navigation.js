(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const header = document.querySelector('[data-header]');
  const toast = document.querySelector('[data-toast]');

  function closeMenu() {
    if (!toggle || !nav) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle?.addEventListener('click', () => {
    const willOpen = !nav.classList.contains('open');
    nav.classList.toggle('open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
  });

  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 28);
  }, { passive: true });

  let toastTimer;
  document.querySelectorAll('[data-future-page]').forEach((el) => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      const label = el.getAttribute('data-future-page') || 'This page';
      if (!toast) return;
      toast.textContent = label + ' will be connected when that page is finished.';
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
    });
  });
})();
