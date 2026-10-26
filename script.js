(() => {
  'use strict';
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const mobileQuery = window.matchMedia('(max-width: 640px)');

  function setMenu(open, returnFocus = false) {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('span').textContent = open ? 'Fechar' : 'Menu';
    navigation.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    if (returnFocus) menuButton.focus();
  }

  menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (menuButton.getAttribute('aria-expanded') !== 'true') return;
    if (event.key === 'Escape') setMenu(false, true);
    if (event.key === 'Tab') {
      const focusable = [menuButton, ...navigation.querySelectorAll('a')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  mobileQuery.addEventListener('change', event => { if (!event.matches) setMenu(false); });

  const timelineTabs = [...document.querySelectorAll('.timeline [role="tab"]')];
  function activateYear(tab, focus = false) {
    timelineTabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) tab.focus();
  }
  timelineTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateYear(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % timelineTabs.length;
      if (event.key === 'ArrowLeft') next = (index + timelineTabs.length - 1) % timelineTabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = timelineTabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activateYear(timelineTabs[next], true); }
    });
  });

  const stageImage = document.getElementById('stage-image');
  const chapters = [...document.querySelectorAll('.chapter')];
  let imageRequest = 0;
  let imageAnimation;
  chapters.forEach((chapter, index) => {
    chapter.addEventListener('click', async () => {
      const request = ++imageRequest;
      const src = `assets/${chapter.dataset.image}${window.innerWidth < 641 ? '-small' : ''}.webp`;
      const preload = new Image();
      preload.src = src;
      try { await preload.decode(); } catch { return; }
      if (request !== imageRequest) return;
      chapters.forEach(item => {
        item.classList.toggle('is-active', item === chapter);
        item.setAttribute('aria-pressed', String(item === chapter));
      });
      stageImage.src = src;
      stageImage.alt = chapter.dataset.alt;
      document.getElementById('stage-caption').textContent = chapter.dataset.caption;
      document.getElementById('stage-count').textContent = String(index + 1).padStart(2, '0');
      if (imageAnimation) imageAnimation.cancel();
      if (!motionQuery.matches) imageAnimation = stageImage.animate([{ opacity: .35, transform: 'scale(1.025)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 850, easing: 'cubic-bezier(.22,1,.36,1)' });
    });
  });

  const titles = [...document.querySelectorAll('[data-title]')];
  if ('IntersectionObserver' in window && !motionQuery.matches) {
    const titleObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          titleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px 30px 0px' });
    titles.forEach(title => {
      title.classList.add('title-reveal');
      titleObserver.observe(title);
    });
    motionQuery.addEventListener('change', () => {
      if (motionQuery.matches) {
        titles.forEach(title => title.classList.add('is-visible'));
        titleObserver.disconnect();
      }
    });
  }

  const progress = document.querySelector('.reading-progress');
  const navLinks = [...navigation.querySelectorAll('a')];
  const sections = navLinks.map(link => ({ link, section: document.querySelector(link.hash) }));
  let ticking = false;
  function updateScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
    let active;
    for (const item of sections) { if (item.section.getBoundingClientRect().top < 180) active = item.link; }
    navLinks.forEach(link => {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; window.requestAnimationFrame(updateScroll); }
  }, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();

  let printedDetails = [];
  window.addEventListener('beforeprint', () => {
    printedDetails = [...document.querySelectorAll('details:not([open])')];
    printedDetails.forEach(item => item.open = true);
  });
  window.addEventListener('afterprint', () => printedDetails.forEach(item => item.open = false));
})();
