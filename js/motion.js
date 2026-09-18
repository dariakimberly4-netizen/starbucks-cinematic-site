(() => {
  const hero = document.querySelector('[data-hero]');
  const image = document.querySelector('[data-hero-image]');
  const light = document.querySelector('[data-hero-light]');
  const copy = document.querySelector('[data-hero-copy]');

  if (!hero || !image) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  let ticking = false;

  function updateHeroMotion() {
    const rect = hero.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));

    // Keep motion restrained: 4–6% scale range and small vertical travel.
    const scale = 1.04 + progress * 0.02;
    const translateY = progress * 18;
    image.style.transform = `scale(${scale}) translate3d(0, ${translateY}px, 0)`;

    if (light) {
      light.style.transform = `translate3d(${progress * 9}px, ${-progress * 7}px, 0)`;
      light.style.opacity = String(0.52 - progress * 0.16);
    }

    if (copy) {
      copy.style.transform = `translate3d(0, ${-progress * 20}px, 0)`;
      copy.style.opacity = String(1 - progress * 0.45);
    }

    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateHeroMotion);
  }

  updateHeroMotion();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
})();
