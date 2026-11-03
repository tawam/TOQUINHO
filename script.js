(() => {
  'use strict';

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const progress = document.querySelector('.reading-line');
  const handoff = document.querySelector('.handoff');
  const scenes = [...document.querySelectorAll('[data-drift]')];
  const clamp = (number, min = 0, max = 1) => Math.min(max, Math.max(min, number));

  let scrollFrame = 0;
  let act = 'seven';

  function paintScroll() {
    const viewport = window.innerHeight;
    const scrollMax = document.documentElement.scrollHeight - viewport;
    progress.style.transform = 'scaleX(' + clamp(scrollMax ? window.scrollY / scrollMax : 0) + ')';

    const nextAct = handoff.getBoundingClientRect().top < viewport * .46 ? 'toquinho' : 'seven';
    if (nextAct !== act) {
      document.body.dataset.act = nextAct;
      act = nextAct;
    }

    if (!motion.matches) {
      for (const scene of scenes) {
        const bounds = scene.getBoundingClientRect();
        if (bounds.bottom < -120 || bounds.top > viewport + 120) continue;
        const timeline = clamp((viewport - bounds.top) / (viewport + bounds.height));
        const distance = Math.min(28, bounds.height * .034);
        scene.style.setProperty('--drift', ((timeline * 2 - 1) * distance).toFixed(2) + 'px');
        scene.style.setProperty('--exposure', clamp(timeline * 2.25, .55, 1).toFixed(3));
        scene.style.setProperty('--settle', (Math.pow(1 - clamp(timeline * 2), 2) * 42).toFixed(2) + 'px');
      }
    }
    scrollFrame = 0;
  }

  function scheduleScroll() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(paintScroll);
  }

  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll, { passive: true });
  motion.addEventListener('change', scheduleScroll);
  scheduleScroll();

  const wordmark = document.querySelector('.wordmark');
  if (motion.matches || wordmark.getBoundingClientRect().bottom < 0) return;

  const canvas = wordmark.querySelector('canvas');
  const context = canvas.getContext('2d');
  if (!context) return;

  // Coordinates sampled from the supplied SVG. Encoding the mask also supports file://.
  const mask = atob('DAQOBBAEEQQTBBUEFgQYBAcOCQ4LDgwODg4QDhEOEw4VDhYOGA4aDhsOKg4sDi4OLw4xDjMONA42DjgOOQ47Dj0OPg5ADkIORA5FDkcOSQ5KDk8OUQ5TDnIOdA52DnsOfA5+DoAOgQ6DDoUOhg6IDooOiw6NDo8OkA6SDpQOlQ6XDpkOmg6hDqMOpA6mDsQOxg7IDssOzQ7ODtAO0g7TDtUO1w7YDtoO3A7dDusO7A7uDvAO8Q7zDvUO9g74DvoO+w79DgYXBxcJFwsXDBcOFxAXERcTFxUXFhcYFxoXGxcdFx8XKhcsFy4XLxcxFzMXNBc2FzgXORc7Fz0XPhdAF0IXRBdFF0cXSRdKF08XURdTF1QXchd0F3YXexd8F34XgBeBF4MXhReGF4gXiheLF40XjxeQF5IXlBeVF5cXmReaF6EXoxekF6YXqBfEF8YXyBfNF84X0BfSF9MX1RfXF9gX2hfcF90X3xfrF+wX7hfwF/EX8xf1F/YX+Bf6F/sXBCEGIQchCSEaIRshHSEfISAhKiEsIS4hUSFTIVQhcSFyIXQheyF8IX4hoSGjIaQhpiGoIakhxCHGIcghziHQIdIh0yHVIdch2CHaIdwh3SHfIeEh8CHxIfMh9SH2Ifgh+iECKwQrBisHKx0rHysgKyorLCsuK1ErUytUK3Ercit0K3srfCt+K6EroyukK6YrqCupK6srxCvGK8grzivQK9Ir0yvVK9cr2CvaK9wr3SvfK+Er4ivwK/Er8yv1K/Yr+Cv6KwI1BDUGNR01HzUgNSI1KjUsNS41UzVUNVY1bzVxNXI1ezV8NX41oTWjNaQ1qDWpNas1rTXENcY1yDXQNdI10zXVNdc12DXaNdw13TXfNeE14jXkNe418DXxNfM19TX2Nfg1Aj4EPgY+Hz4gPiI+Kj4sPi4+Uz5UPlY+bz5xPnI+ez58Pn4+oT6jPqQ+qD6pPqs+rT7EPsY+yD7SPtM+1T7XPtg+2j7cPt0+3z7hPuI+5D7sPu4+8D7xPvM+9T72PgJIBEgGSB9IIEgiSCpILEguSFNIVEhWSFhIbUhvSHFIckh7SHxIfkihSKNIpEipSKtIrUiuSMRIxkjISNNI1UjXSNhI2kjcSN1I30jhSOJI5EjmSOtI7EjuSPBI8UjzSPVIAlIEUgZSKlIsUi5SVFJWUlhSbVJvUnFSe1J8Un5SoVKjUqRSq1KtUq5SsFLEUsZSyFLTUtVS11LYUtpS3FLdUt9S4VLiUuRS5lLnUgJbBFsGWwdbKlssWy5bVFtWW1hbWVttW29bcVt7W3xbfluhW6NbpFutW65bsFuyW8RbxlvIW9Vb11vYW9pb3FvdW99b4VviW+Rb5lvnW+lbBGUGZQdlCWULZSplLGUuZVZlWGVZZWxlbWVvZXtlfGV+ZaFlo2WkZa5lsGWyZbNlxGXGZchl12XYZdpl3GXdZd9l4WXiZeRl5mXnZell62UGbwdvCW8LbwxvDm8QbxFvKm8sby5vL28xbzNvNG82bzhvOW87bz1vPm9Ab0JvRG9Fb0dvSW9Wb1hvWW9bb2xvbW9vb3tvfG9+b4BvgW+Db4Vvhm+Ib4pvi2+Nb49vkG+Sb5RvlW+Xb5lvoW+jb6RvsG+yb7NvtW/Eb8ZvyG/Yb9pv3G/db99v4W/ib+Rv5m/nb+lv628HeQl5C3kMeQ55EHkReRN5FXkWeRh5GnkqeSx5LnkveTF5M3k0eTZ5OHk5eTt5PXk+eUB5QnlEeUV5R3lJeVh5WXlbeWp5bHlteXt5fHl+eYB5gXmDeYV5hnmIeYp5i3mNeY95kHmSeZR5lXmXeZl5oXmjeaR5sHmyebN5tXnEecZ5yHnaedx53XnfeeF54nnkeeZ553npeet57HkMgg6CEIIRghOCFYIWghiCGoIbgh2CH4IqgiyCLoIvgjGCM4I0gjaCOII5gjuCPYI+gkCCQoJEgkWCR4JJgliCWYJbgmqCbIJtgnuCfIJ+goCCgYKDgoWChoKIgoqCi4KNgo+CkIKSgpSClYKXgpmCoYKjgqSCsoKzgrWCt4LEgsaCyILagtyC3YLfguGC4oLkguaC54LpguuC7ILughaMGIwajBuMHYwfjCCMKowsjC6MWYxbjF2MaIxqjGyMe4x8jH6MoYyjjKSMs4y1jLeMuIzEjMaMyIzYjNqM3IzdjN+M4YzijOSM5oznjOmM64zsjO6M8Iwblh2WH5YgliKWKpYsli6WWZZbll2WaJZqlmyWe5Z8ln6WoZajlqSWtZa3lriWupbElsaWyJbXltiW2pbclt2W35bhluKW5JbmlueW6ZbrluyW7pbwlvGWH6AgoCKgKqAsoC6gWaBboF2gXqBnoGigaqBsoHugfKB+oKGgo6CkoLeguKC6oLygxKDGoMig1aDXoNig2qDcoN2g36DhoOKg5KDmoOeg6aDroOyg7qDwoPGgAakCqQSpH6kgqSKpJKkqqSypLqlbqV2pXqlnqWipaql7qXypfqmhqaOppKm4qbqpvKnEqcapyKnVqdep2Knaqdyp3anfqeGp4qnkqeap56npqeup7KnuqfCp8anzqQGzArMEsyCzIrMksyqzLLMus1uzXbNes2CzZ7Nos2qze7N8s36zobOjs6SzuLO6s7yzvbPEs8azyLPTs9Wz17PYs9qz3LPds9+z4bPis+Sz5rPns+mz67Pss+6z8LPxs/Oz9bMBvQK9BL0fvSC9Ir0kvSq9LL0uvV29Xr1gvWW9Z71ovXu9fL1+vaG9o72kvbq9vL29vb+9xL3Gvci90r3TvdW9173Yvdq93L3dvd+94b3iveS95r3nvem9673sve698L3xvfO99b32vQLHBMcGxx/HIMcixyrHLMcux13HXsdgx2XHZ8dox3vHfMd+x6HHo8ekx7zHvce/x8HHxMfGx8jH0MfSx9PH1cfXx9jH2sfcx93H38fhx+LH5Mfmx+fH6cfrx+zH7sfwx/HH88f1x/bHAtAE0AbQB9Ad0B/QINAi0CrQLNAu0F7QYNBi0GPQZdBn0HvQfNB+0KHQo9Ck0L3Qv9DB0MPQxNDG0MjQ0NDS0NPQ1dDX0NjQ2tDc0N3Q39Dh0OLQ5tDn0OnQ69Ds0O7Q8NDx0PPQ9dD20PjQBNoG2gfaCdob2h3aH9og2iLaKtos2i7aXtpg2mLaY9pl2mfae9p82n7aodqj2qTav9rB2sPaxNrG2sjaztrQ2tLa09rV2tfa2Nra2tza3drf2uHa59rp2uva7Nru2vDa8drz2vXa9tr42vraBOQG5AfkCeQL5AzkDuQQ5BbkGOQa5BvkHeQf5CDkKuQs5C7kL+Qx5DPkNOQ25DjkOeQ75D3kPuRA5ELkRORF5EfkSeRK5GDkYuRj5GXke+R85H7kgOSB5IPkheSG5IjkiuSL5I3kj+SQ5JLklOSV5JfkmeSa5KHko+Sk5MHkw+TE5MbkyOTN5M7k0OTS5NPk1eTX5Njk2uTc5N3k3+Tn5Onk6+Ts5O7k8OTx5PPk9eT25Pjk+uT75AftCe0L7QztDu0Q7RHtE+0V7RbtGO0a7RvtHe0f7SrtLO0u7S/tMe0z7TTtNu047TntO+097T7tQO1C7UTtRe1H7UntSu1g7WLtY+1l7XvtfO1+7YDtge2D7YXthu2I7Yrti+2N7Y/tkO2S7ZTtle2X7Zntmu2h7aPtpO3B7cPtxO3G7cjty+3N7c7t0O3S7dPt1e3X7djt2u3c7d3t3+3p7evt7O3u7fDt8e3z7fXt9u347frt++397Qv3DPcO9xD3EfcT9xX3FvcY9xr3Kvcs9y73L/cx9zP3NPc29zj3Ofc79z33PvdA90L3RPdF90f3SfdK92D3Yvdj92X3e/d89373gPeB94P3hfeG94j3iveL9433j/eQ95L3lPeV95f3mfea96H3o/ek98T3xvfI98n3y/fN98730PfS99P31ffX99j32vfc99336/fs9+738Pfx9/P39ff29/j3+vf79/33');
  const bounds = wordmark.getBoundingClientRect();
  const margin = 64;
  const width = bounds.width + margin * 2;
  const height = bounds.height + margin * 2;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  context.scale(ratio, ratio);

  let seed = 709;
  function random() {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  }
  const points = [];
  for (let i = 0; i < mask.length; i += 2) {
    const x = margin + mask.charCodeAt(i) / 255 * bounds.width;
    const y = margin + mask.charCodeAt(i + 1) / 255 * bounds.height;
    points.push({
      x, y,
      fromX: random() * width,
      fromY: random() * height,
      offset: random() * 350,
      curve: (random() - .5) * 42,
      size: .62 + random() * 1.16
    });
  }

  const image = wordmark.querySelector('img');
  let animationFrame = 0;
  let start;
  function finishLogo() {
    cancelAnimationFrame(animationFrame);
    wordmark.classList.remove('is-animating');
    image.style.removeProperty('opacity');
    canvas.style.removeProperty('opacity');
    window.removeEventListener('resize', finishLogo);
    motion.removeEventListener('change', finishLogo);
  }

  function paintLogo(now) {
    start ??= now;
    const elapsed = now - start;
    const lock = clamp((elapsed - 1120) / 390);
    if (lock >= 1 || wordmark.getBoundingClientRect().bottom < 0) {
      finishLogo();
      return;
    }
    context.clearRect(0, 0, width, height);
    context.fillStyle = elapsed < 790 ? '#eee64e' : '#f7f3e9';
    for (const point of points) {
      const t = clamp((elapsed - point.offset) / 860);
      const eased = t * t * (3 - 2 * t);
      const x = point.fromX + (point.x - point.fromX) * eased;
      const y = point.fromY + (point.y - point.fromY) * eased + Math.sin(t * Math.PI) * point.curve;
      context.globalAlpha = .29 + .64 * eased;
      context.fillRect(x, y, point.size, point.size);
    }
    image.style.opacity = String(lock);
    canvas.style.opacity = String(1 - lock);
    animationFrame = requestAnimationFrame(paintLogo);
  }

  wordmark.classList.add('is-animating');
  window.addEventListener('resize', finishLogo);
  motion.addEventListener('change', finishLogo);
  animationFrame = requestAnimationFrame(paintLogo);
})();
