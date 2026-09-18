(() => {
  const hero = document.querySelector('[data-hero]');
  const image = document.querySelector('[data-hero-image]');
  const light = document.querySelector('[data-hero-light]');
  const copy = document.querySelector('[data-hero-copy]');
  if (!hero || !image) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;

  function update() {
    const rect = hero.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
    const mobile = window.matchMedia('(max-width: 780px)').matches;

    if (!reduceMotion) {
      if (mobile) {
        const scale = 1.12 + p * .055;
        const y = p * 34;
        image.style.transform = `scale(${scale}) translate3d(0,${y}px,0)`;
        image.style.filter = `brightness(${1 - p*.12}) saturate(${1 + p*.05})`;
        if (light) {
          light.style.transform = `translate3d(${p*14}px,${-p*12}px,0)`;
          light.style.opacity = String(.35 - p*.12);
        }
        if (copy) {
          copy.style.transform = `translate3d(0,${-p*22}px,0)`;
          copy.style.opacity = String(1-p*.72);
        }
      } else {
        const scale = 1.04 + p*.02;
        image.style.transform = `scale(${scale}) translate3d(0,${p*18}px,0)`;
        if (light) light.style.transform = `translate3d(${p*9}px,${-p*7}px,0)`;
        if (copy) {
          copy.style.transform = `translate3d(0,${-p*20}px,0)`;
          copy.style.opacity = String(1-p*.45);
        }
      }
    }
    ticking=false;
  }

  function requestUpdate(){
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(update);
  }
  update();
  addEventListener('scroll',requestUpdate,{passive:true});
  addEventListener('resize',requestUpdate);
})();