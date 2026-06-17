/* ============================================
   STACKLY — Global Animation Engine
   Built on GSAP + ScrollTrigger + SplitText-style logic
   ============================================ */

gsap.registerPlugin(ScrollTrigger);

/* ---------- Lenis-style smooth scroll (lightweight) ---------- */
(function smoothScrollInit(){
  if (window.matchMedia('(max-width: 768px)').matches) return;
  let target = window.scrollY, current = window.scrollY, ease = 0.085;
  let ticking = false;
  function raf(){
    current += (target - current) * ease;
    if (Math.abs(target-current) > 0.05){ window.__smoothY = current; ticking = true; } else { ticking = false; }
    requestAnimationFrame(raf);
  }
  raf();
})();

/* ---------- Navbar scroll state ---------- */
const navbar = document.querySelector('.navbar');
if (navbar){
  ScrollTrigger.create({
    start: 'top -60',
    onUpdate: (self) => {
      navbar.classList.toggle('scrolled', self.scroll() > 60);
    }
  });
}

/* ---------- Scroll progress bar ---------- */
const progressBar = document.querySelector('.scroll-progress');
if (progressBar){
  gsap.to(progressBar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: { scrub: true, start:'top top', end:'bottom bottom' }
  });
}

/* ---------- Mobile drawer ---------- */
const burger = document.querySelector('.nav-burger');
const drawer = document.querySelector('.mobile-drawer');
const drawerClose = document.querySelector('.mobile-drawer-close');
if (burger && drawer){
  burger.addEventListener('click', () => drawer.classList.add('open'));
  drawerClose?.addEventListener('click', () => drawer.classList.remove('open'));
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', () => drawer.classList.remove('open')));
}

/* ---------- Cursor glow (desktop only) ---------- */
if (window.matchMedia('(min-width: 1024px)').matches){
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);
  let gx = window.innerWidth/2, gy = window.innerHeight/2;
  window.addEventListener('mousemove', e => { gx = e.clientX; gy = e.clientY; });
  gsap.ticker.add(() => {
    gsap.set(glow, { x: gx, y: gy });
  });
}

/* ---------- Custom text splitter (chars / words / lines) ---------- */
function splitText(el, type='words'){
  const text = el.textContent;
  el.textContent = '';
  el.setAttribute('aria-label', text);
  const units = type === 'chars' ? text.split('') : text.split(' ');
  units.forEach((unit, i) => {
    const wrap = document.createElement('span');
    wrap.style.display = 'inline-block';
    wrap.style.overflow = 'hidden';
    wrap.style.verticalAlign = 'top';
    const inner = document.createElement('span');
    inner.style.display = 'inline-block';
    inner.textContent = unit === '' ? '\u00A0' : unit;
    if (type === 'words' && i < units.length - 1) inner.textContent += '\u00A0';
    wrap.appendChild(inner);
    el.appendChild(wrap);
  });
  return el.querySelectorAll(':scope > span > span');
}

/* ---------- Hero text reveal (GSAP-style stagger from chars) ---------- */
document.querySelectorAll('[data-split="chars"]').forEach(el => {
  const chars = splitText(el, 'chars');
  gsap.fromTo(chars, { yPercent: 120, opacity:0 }, {
    yPercent:0, opacity:1, duration:0.9, ease:'power4.out',
    stagger:0.018, delay: parseFloat(el.dataset.delay || 0)
  });
});

document.querySelectorAll('[data-split="words"]').forEach(el => {
  const words = splitText(el, 'words');
  gsap.fromTo(words, { yPercent: 120, opacity:0 }, {
    yPercent:0, opacity:1, duration:0.9, ease:'power4.out',
    stagger:0.05, delay: parseFloat(el.dataset.delay || 0)
  });
});

/* ---------- Scroll-triggered word/char reveals (re-usable lower in page) ---------- */
document.querySelectorAll('[data-split-scroll="words"]').forEach(el => {
  const words = splitText(el, 'words');
  gsap.fromTo(words, { yPercent: 110, opacity:0 }, {
    yPercent:0, opacity:1, duration:0.8, ease:'power4.out', stagger:0.035,
    scrollTrigger:{ trigger: el, start:'top 85%' }
  });
});

/* ---------- Generic reveal-on-scroll ---------- */
gsap.utils.toArray('.reveal').forEach((el, i) => {
  gsap.fromTo(el, { opacity:0, y:50 }, {
    opacity:1, y:0, duration:1, ease:'power3.out',
    scrollTrigger:{ trigger: el, start:'top 88%' }
  });
});

gsap.utils.toArray('.reveal-stagger').forEach(group => {
  const items = group.children;
  gsap.fromTo(items, { opacity:0, y:60 }, {
    opacity:1, y:0, duration:0.9, ease:'power3.out', stagger:0.12,
    scrollTrigger:{ trigger: group, start:'top 85%' }
  });
});

gsap.utils.toArray('.reveal-scale').forEach(el => {
  gsap.fromTo(el, { opacity:0, scale:0.85 }, {
    opacity:1, scale:1, duration:1, ease:'power3.out',
    scrollTrigger:{ trigger: el, start:'top 88%' }
  });
});

/* ---------- Image reveal mask (clip from bottom) ---------- */
gsap.utils.toArray('.img-frame').forEach(frame => {
  const overlay = frame.querySelector('.frame-overlay');
  const img = frame.querySelector('img');
  if (!overlay) return;
  gsap.fromTo(overlay, { scaleY:1 }, {
    scaleY:0, duration:1.1, ease:'power4.inOut',
    scrollTrigger:{ trigger: frame, start:'top 85%' }
  });
  if (img){
    gsap.fromTo(img, { scale:1.3 }, {
      scale:1.05, duration:1.4, ease:'power3.out',
      scrollTrigger:{ trigger: frame, start:'top 85%' }
    });
  }
});

/* ---------- Parallax images ---------- */
gsap.utils.toArray('[data-parallax]').forEach(el => {
  const strength = parseFloat(el.dataset.parallax) || 60;
  gsap.fromTo(el, { y: -strength }, {
    y: strength, ease:'none',
    scrollTrigger:{ trigger: el.parentElement || el, start:'top bottom', end:'bottom top', scrub:true }
  });
});

/* ---------- Counter animation ---------- */
gsap.utils.toArray('[data-counter]').forEach(el => {
  const end = parseFloat(el.dataset.counter);
  const decimals = (el.dataset.counter.split('.')[1] || '').length;
  const suffix = el.dataset.suffix || '';
  gsap.fromTo(el, { textContent:0 }, {
    textContent: end,
    duration:1.6,
    ease:'power2.out',
    snap:{ textContent: decimals ? 1/Math.pow(10,decimals) : 1 },
    scrollTrigger:{ trigger: el, start:'top 88%' },
    onUpdate: function(){
      el.textContent = parseFloat(el.textContent).toFixed(decimals) + suffix;
    }
  });
});

/* ---------- Magnetic buttons ---------- */
document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
  const btn = wrap.querySelector('.btn');
  if (!btn) return;
  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const x = e.clientX - r.left - r.width/2;
    const y = e.clientY - r.top - r.height/2;
    gsap.to(btn, { x: x*0.3, y: y*0.4, duration:0.4, ease:'power3.out' });
  });
  wrap.addEventListener('mouseleave', () => {
    gsap.to(btn, { x:0, y:0, duration:0.5, ease:'elastic.out(1,0.4)' });
  });
});

/* ---------- Marquee duplication (seamless loop) ---------- */
document.querySelectorAll('.marquee-track').forEach(track => {
  track.innerHTML += track.innerHTML;
  const totalWidth = track.scrollWidth / 2;
  gsap.to(track, {
    x: -totalWidth,
    duration: parseFloat(track.dataset.speed || 28),
    ease: 'none',
    repeat: -1
  });
});

/* ---------- Nav active link underline on scroll sections (home page) ---------- */
gsap.utils.toArray('section[id]').forEach(sec => {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top center',
    end: 'bottom center',
    onEnter: () => setActiveNav(sec.id),
    onEnterBack: () => setActiveNav(sec.id),
  });
});
function setActiveNav(id){
  document.querySelectorAll(`.nav-links a[href="#${id}"]`).forEach(a=>{
    document.querySelectorAll('.nav-links a').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
  });
}

/* ---------- Animated SVG growth-line background (hero signature motif) ---------- */
function animateGrowthLine(svgSelector){
  const path = document.querySelector(svgSelector);
  if (!path) return;
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2.4,
    ease: 'power3.inOut',
    delay: 0.3
  });
}
window.animateGrowthLine = animateGrowthLine;

/* ---------- Horizontal scroll rail (Projects) ---------- */
function initHorizontalRail(railSelector, wrapSelector){
  const rail = document.querySelector(railSelector);
  const wrap = document.querySelector(wrapSelector);
  if (!rail || !wrap) return;
  function build(){
    ScrollTrigger.getAll().forEach(st => { if (st.vars.trigger === wrap) st.kill(); });
    const distance = rail.scrollWidth - wrap.offsetWidth;
    if (distance <= 0) return;
    gsap.to(rail, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: () => '+=' + distance,
        scrub: 0.6,
        pin: true,
        invalidateOnRefresh: true
      }
    });
  }
  build();
  window.addEventListener('resize', () => ScrollTrigger.refresh());
}
window.initHorizontalRail = initHorizontalRail;

/* ---------- Tilt-on-hover for cards ---------- */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left)/r.width - 0.5;
    const y = (e.clientY - r.top)/r.height - 0.5;
    gsap.to(card, { rotateY: x*10, rotateX: -y*10, transformPerspective:600, duration:0.4, ease:'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateY:0, rotateX:0, duration:0.6, ease:'power3.out' });
  });
});

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  if (!q || !a) return;
  gsap.set(a, { height:0, opacity:0 });
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(open => {
      if (open !== item){
        open.classList.remove('open');
        gsap.to(open.querySelector('.faq-a'), { height:0, opacity:0, duration:0.4, ease:'power2.inOut' });
      }
    });
    item.classList.toggle('open', !isOpen);
    if (!isOpen){
      gsap.set(a, { height:'auto' });
      const h = a.offsetHeight;
      gsap.fromTo(a, { height:0, opacity:0 }, { height:h, opacity:1, duration:0.45, ease:'power2.inOut' });
    } else {
      gsap.to(a, { height:0, opacity:0, duration:0.4, ease:'power2.inOut' });
    }
  });
});

/* ---------- Tabs (services / dashboard) ---------- */
document.querySelectorAll('[data-tabs]').forEach(tabGroup => {
  const buttons = tabGroup.querySelectorAll('[data-tab-btn]');
  const panels = tabGroup.querySelectorAll('[data-tab-panel]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tabBtn;
      panels.forEach(p => {
        if (p.dataset.tabPanel === target){
          p.style.display = 'block';
          gsap.fromTo(p, { opacity:0, y:16 }, { opacity:1, y:0, duration:0.5, ease:'power3.out' });
        } else {
          p.style.display = 'none';
        }
      });
    });
  });
});

/* ---------- Preloader ---------- */
window.addEventListener('load', () => {
  const pre = document.querySelector('.preloader');
  if (!pre) return;
  gsap.to(pre, {
    opacity:0, duration:0.6, delay:0.3, ease:'power2.inOut',
    onComplete: () => pre.style.display = 'none'
  });
});

/* ---------- Refresh ScrollTrigger after images load ---------- */
window.addEventListener('load', () => ScrollTrigger.refresh());
