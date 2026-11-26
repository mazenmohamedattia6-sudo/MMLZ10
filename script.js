const $ = id => document.getElementById(id);
const NS = 'http://www.w3.org/2000/svg';
function el(name, attrs, parent) {
  const e = document.createElementNS(NS, name);
  for (const k in (attrs || {})) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}

/* ───────────── data ───────────── */
const PLANETS = [
  { x: 82,  y: 482, r: 30, name: 'كوكب الحنان', obj: '🌠', taps: 3, hint: 'اصطادي النجمة الهاربة 3 مرات',
    item: '🗝️', itemName: 'مفتاح الحنان', clue: 'انتي أحن حضن في حياتي كلها 🤍', kind: 'ring' },
  { x: 278, y: 388, r: 30, name: 'كوكب الضحك', obj: '🛸', taps: 3, hint: 'ساعدي الفضائي الصغير 3 مرات',
    item: '🧭', itemName: 'بوصلة الضحك', clue: 'ضحكتك بتنوّر أي مكان بتدخليه ✨', kind: 'smile' },
  { x: 84,  y: 294, r: 30, name: 'كوكب الشغف', obj: '☄️', taps: 3, hint: 'امسكي المذنب 3 مرات',
    item: '🔭', itemName: 'تلسكوب الشغف', clue: 'انتي رجّعتيلي الشغف في حياتي تاني 🌅', kind: 'fire' },
  { x: 276, y: 200, r: 30, name: 'كوكب الأمان', obj: '🌕', taps: 3, hint: 'نوّري القمر 3 مرات',
    item: '💎', itemName: 'جوهرة الأمان', clue: 'انتي مصدر أماني وطمأنينتي 🤍', kind: 'earth' },
  { x: 164, y: 104, r: 40, name: 'كوكب الكنز', final: true, kind: 'gold' }
];
const START = { x: 180, y: 590 };

// نقطة الرسو: على جنب الكوكب عشان الصاروخ ميغطيش الاسم
function dock(i) {
  const s = PLANETS[i];
  const side = s.x < 180 ? 1 : -1;
  return { x: s.x + side * (s.r + 48), y: s.y + 8 };
}

/* ───────────── characters (heads) ───────────── */
function catHead() {
  return `
<path d="M30 40 L32 10 L56 30 Z" fill="#F2B98A"/><path d="M90 40 L88 10 L64 30 Z" fill="#F2B98A"/>
<path d="M36 34 L37 19 L49 30 Z" fill="#F4B6C2"/><path d="M84 34 L83 19 L71 30 Z" fill="#F4B6C2"/>
<circle cx="60" cy="62" r="34" fill="#F2B98A"/>
<path d="M39 46 q4 -7 8 0 M73 46 q4 -7 8 0" stroke="#E9A56F" stroke-width="3" fill="none" stroke-linecap="round"/>
<ellipse cx="47" cy="62" rx="4.6" ry="5.4" fill="#3A2530"/><ellipse cx="73" cy="62" rx="4.6" ry="5.4" fill="#3A2530"/>
<circle cx="48.6" cy="60" r="1.7" fill="#fff"/><circle cx="74.6" cy="60" r="1.7" fill="#fff"/>
<path d="M56 71 h8 l-4 5 z" fill="#E58AA0"/>
<path d="M60 76 q-5 6 -10 2 M60 76 q5 6 10 2" stroke="#3A2530" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<path d="M30 68 l-17 -3 M30 74 l-17 3 M90 68 l17 -3 M90 74 l17 3" stroke="#8a6a58" stroke-width="1.4" stroke-linecap="round"/>
<ellipse cx="38" cy="72" rx="6" ry="4" fill="#F4A9B8" opacity=".5"/><ellipse cx="82" cy="72" rx="6" ry="4" fill="#F4A9B8" opacity=".5"/>
<path d="M36 25 l-10 -6 v12 z M36 25 l10 -6 v12 z" fill="#C9758F"/><circle cx="36" cy="25" r="2.8" fill="#E58AA0"/>`;
}

function parrotHead() {
  return `
<path d="M60 18 Q50 2 42 7 Q49 15 56 22 Z" fill="#F4B6C2"/>
<path d="M60 18 Q59 -2 70 2 Q66 12 63 22 Z" fill="#FFD27A"/>
<path d="M63 20 Q75 6 83 13 Q73 19 66 26 Z" fill="#C9758F"/>
<circle cx="60" cy="62" r="36" fill="#7ED6A5"/>
<ellipse cx="60" cy="72" rx="26" ry="22" fill="#B8EBCB"/>
<circle cx="44" cy="56" r="11" fill="#fff"/><circle cx="76" cy="56" r="11" fill="#fff"/>
<circle cx="46" cy="57" r="5.5" fill="#3A2530"/><circle cx="74" cy="57" r="5.5" fill="#3A2530"/>
<circle cx="47.8" cy="55" r="1.8" fill="#fff"/><circle cx="75.8" cy="55" r="1.8" fill="#fff"/>
<path d="M50 68 Q60 60 70 68 Q69 84 60 90 Q51 84 50 68 Z" fill="#F6A55E" stroke="#E08B3F" stroke-width="1.5"/>
<path d="M54 73 Q60 77 66 73" stroke="#E08B3F" stroke-width="1.5" fill="none" stroke-linecap="round"/>
<ellipse cx="31" cy="73" rx="6" ry="4" fill="#F4A9B8" opacity=".6"/><ellipse cx="89" cy="73" rx="6" ry="4" fill="#F4A9B8" opacity=".6"/>`;
}

function hedgeHead() {
  const pts = [];
  for (let a = 160, k = 0; a <= 380; a += 11, k++) {
    const r = k % 2 ? 40 : 56, rad = a * Math.PI / 180;
    pts.push((60 + r * Math.cos(rad)).toFixed(1) + ',' + (68 + r * Math.sin(rad)).toFixed(1));
  }
  return `
<polygon points="${pts.join(' ')}" fill="#8C6B57" stroke="#6B4E3C" stroke-width="1.5" stroke-linejoin="round"/>
<circle cx="37" cy="47" r="8" fill="#F0D5B2"/><circle cx="37" cy="47" r="4.2" fill="#F4B6C2"/>
<circle cx="83" cy="47" r="8" fill="#F0D5B2"/><circle cx="83" cy="47" r="4.2" fill="#F4B6C2"/>
<ellipse cx="60" cy="70" rx="31" ry="29" fill="#F0D5B2"/>
<ellipse cx="60" cy="81" rx="16" ry="12" fill="#FBE9D2"/>
<circle cx="47" cy="66" r="4.2" fill="#3A2530"/><circle cx="73" cy="66" r="4.2" fill="#3A2530"/>
<circle cx="48.3" cy="64.4" r="1.4" fill="#fff"/><circle cx="74.3" cy="64.4" r="1.4" fill="#fff"/>
<ellipse cx="60" cy="75" rx="5.5" ry="4" fill="#3A2530"/>
<path d="M60 79 q-4 5 -8 2 M60 79 q4 5 8 2" stroke="#3A2530" stroke-width="1.6" fill="none" stroke-linecap="round"/>
<ellipse cx="38" cy="76" rx="5.5" ry="3.6" fill="#F4A9B8" opacity=".55"/><ellipse cx="82" cy="76" rx="5.5" ry="3.6" fill="#F4A9B8" opacity=".55"/>`;
}

const HEADS = { cat: catHead(), parrot: parrotHead(), hedge: hedgeHead() };

function helmet(inner) {
  return `<svg viewBox="0 0 120 120">
  <circle cx="60" cy="60" r="55" fill="rgba(255,255,255,.55)"/>
  <g transform="translate(60 60) scale(.86) translate(-60 -60)">${inner}</g>
  <circle cx="60" cy="60" r="55" fill="rgba(200,225,255,.2)" stroke="#fff" stroke-width="4"/>
  <path d="M24 40 A42 42 0 0 1 52 14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>
</svg>`;
}
function teamHTML() {
  return ['cat', 'parrot', 'hedge'].map((k, i) =>
    `<div class="mate m${i}" data-k="${k}">${helmet(HEADS[k])}</div>`).join('');
}
$('teamStart').innerHTML = teamHTML();
$('team').innerHTML = teamHTML();

const SAY = {
  cat:    ['مياو 💗', 'مرررر 🐾', 'مياو مياو ✨'],
  parrot: ['بحبك يا ملك! 🦜', 'كاك كاك 💗', 'ملك أحلى كابتن!'],
  hedge:  ['هرش هرش 🦔', 'أنا هنا معاكي 🤍', 'هرررش 💗']
};
const sayN = { cat: 0, parrot: 0, hedge: 0 };
const nextSay = k => SAY[k][sayN[k]++ % SAY[k].length];

/* ───────────── space background ───────────── */
const defs = $('defs');
const starsG = $('stars');

// nebula blobs
[[60, 120, 90, 'rgba(255,255,255,.55)'], [300, 330, 110, 'rgba(244,182,194,.40)'],
 [70, 520, 100, 'rgba(190,170,240,.35)'], [290, 60, 80, 'rgba(255,226,170,.35)']].forEach(b => {
  el('ellipse', { class: 'neb', cx: b[0], cy: b[1], rx: b[2], ry: b[2] * .55, fill: b[3] }, starsG);
});
for (let i = 0; i < 70; i++) {
  const x = Math.random() * 360, y = Math.random() * 640;
  const big = Math.random() > .82;
  let s;
  if (big) {
    s = el('path', {
      class: 'star',
      d: `M${x} ${y - 5} L${x + 1.4} ${y - 1.4} L${x + 5} ${y} L${x + 1.4} ${y + 1.4} L${x} ${y + 5} L${x - 1.4} ${y + 1.4} L${x - 5} ${y} L${x - 1.4} ${y - 1.4} Z`,
      fill: Math.random() > .5 ? '#FFD98A' : '#fff'
    }, starsG);
  } else {
    s = el('circle', { class: 'star', cx: x, cy: y, r: .6 + Math.random() * 1.3, fill: Math.random() > .6 ? '#FFD98A' : '#fff' }, starsG);
  }
  s.style.animationDelay = (-Math.random() * 3) + 's';
  s.style.animationDuration = (2 + Math.random() * 3) + 's';
}

/* ───────────── route guides ───────────── */
const routesG = $('routes');
const legs = [];
function ctrl(a, b, k) {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  const dx = b.x - a.x, dy = b.y - a.y;
  return { x: mx - dy * k, y: my + dx * k };
}
(function buildRoutes() {
  let prev = START;
  PLANETS.forEach((_, i) => {
    const d = dock(i);
    const c = ctrl(prev, d, i % 2 ? 0.18 : -0.18);
    const path = el('path', { class: 'route', d: `M${prev.x} ${prev.y} Q${c.x} ${c.y} ${d.x} ${d.y}` }, routesG);
    legs.push({ from: prev, to: d, c, path });
    prev = d;
  });
})();

/* ───────────── planets ───────────── */
const PAL = {
  ring:  ['#FFD3DF', '#F29BB5'],
  smile: ['#FFF3B5', '#FFD166'],
  fire:  ['#FFC3B0', '#F27C6B'],
  earth: ['#C9E8FF', '#7FB7E8'],
  gold:  ['#FFEFB5', '#F2C14E']
};
Object.keys(PAL).forEach(k => {
  const g = el('radialGradient', { id: 'g-' + k, cx: '.35', cy: '.3', r: '.85' }, defs);
  el('stop', { offset: 0, 'stop-color': PAL[k][0] }, g);
  el('stop', { offset: 1, 'stop-color': PAL[k][1] }, g);
});
const sh = el('radialGradient', { id: 'shade', cx: '.3', cy: '.28', r: '.9' }, defs);
el('stop', { offset: 0, 'stop-color': '#fff', 'stop-opacity': .45 }, sh);
el('stop', { offset: .55, 'stop-color': '#fff', 'stop-opacity': 0 }, sh);
el('stop', { offset: 1, 'stop-color': '#5B3A45', 'stop-opacity': .22 }, sh);

function buildPlanet(i) {
  const s = PLANETS[i], r = s.r;
  const outer = el('g', { class: 'isl-wrap', transform: `translate(${s.x} ${s.y})`, 'data-i': i }, $('islands'));
  const g = el('g', { class: 'isl', 'data-i': i }, outer);
  const body = el('g', { class: 'body' }, g);

  el('circle', { class: 'glow', cx: 0, cy: 0, r: r + 18, fill: '#FFF7C9' }, body);
  el('circle', { class: 'pulse', cx: 0, cy: 0, r: r + 8 }, body);

  // ring behind
  if (s.kind === 'ring') {
    el('ellipse', { cx: 0, cy: 0, rx: r + 18, ry: 9, fill: 'none', stroke: '#FFE3B8', 'stroke-width': 5, transform: 'rotate(-18)' }, body);
  }
  if (s.kind === 'earth') {
    el('ellipse', { cx: 0, cy: 0, rx: r + 22, ry: 12, fill: 'none', stroke: '#fff', 'stroke-width': 1.5, 'stroke-dasharray': '3 4', transform: 'rotate(-22)', opacity: .9 }, body);
  }

  // planet disk + clipped details
  const clip = el('clipPath', { id: 'clip' + i }, defs);
  el('circle', { cx: 0, cy: 0, r }, clip);
  el('circle', { cx: 0, cy: 0, r, fill: `url(#g-${s.kind})` }, body);
  const det = el('g', { 'clip-path': `url(#clip${i})` }, body);

  switch (s.kind) {
    case 'ring':
      el('ellipse', { cx: 0, cy: -8, rx: r, ry: 5, fill: '#fff', opacity: .25 }, det);
      el('ellipse', { cx: 0, cy: 10, rx: r, ry: 6, fill: '#fff', opacity: .2 }, det);
      el('circle', { cx: -10, cy: 14, r: 4, fill: '#E67FA0', opacity: .4 }, det);
      break;
    case 'smile':
      el('ellipse', { cx: -9, cy: -4, rx: 3.2, ry: 4.4, fill: '#5B3A45' }, det);
      el('ellipse', { cx: 9, cy: -4, rx: 3.2, ry: 4.4, fill: '#5B3A45' }, det);
      el('path', { d: 'M-10 7 Q0 19 10 7', fill: 'none', stroke: '#5B3A45', 'stroke-width': 3, 'stroke-linecap': 'round' }, det);
      el('ellipse', { cx: -17, cy: 6, rx: 4.5, ry: 3, fill: '#F4A9B8', opacity: .7 }, det);
      el('ellipse', { cx: 17, cy: 6, rx: 4.5, ry: 3, fill: '#F4A9B8', opacity: .7 }, det);
      break;
    case 'fire':
      el('circle', { cx: -9, cy: -9, r: 6, fill: '#E56B5A', opacity: .45 }, det);
      el('circle', { cx: 11, cy: 6, r: 8, fill: '#E56B5A', opacity: .4 }, det);
      el('circle', { cx: -8, cy: 15, r: 4, fill: '#E56B5A', opacity: .45 }, det);
      el('path', { d: `M-${r} -2 Q-10 -12 0 -2 T${r} -4`, fill: 'none', stroke: '#fff', 'stroke-width': 3, opacity: .35 }, det);
      break;
    case 'earth':
      el('path', { d: 'M-22 -6 Q-12 -22 -2 -10 Q4 2 -8 6 Q-20 8 -22 -6 Z', fill: '#A8E0B0' }, det);
      el('path', { d: 'M6 8 Q18 -2 24 10 Q18 24 8 20 Z', fill: '#A8E0B0' }, det);
      el('ellipse', { cx: 6, cy: -18, rx: 10, ry: 3, fill: '#fff', opacity: .55 }, det);
      break;
    case 'gold':
      el('ellipse', { cx: 0, cy: -16, rx: r, ry: 6, fill: '#fff', opacity: .3 }, det);
      el('ellipse', { cx: 0, cy: 18, rx: r, ry: 7, fill: '#fff', opacity: .22 }, det);
      el('text', { x: 0, y: 11, 'text-anchor': 'middle', 'font-size': 34, fill: '#fff', opacity: .95 }, det).textContent = '♥';
      break;
  }
  // light/shade overlay
  el('circle', { cx: 0, cy: 0, r, fill: 'url(#shade)' }, body);

  // front part of the ring
  if (s.kind === 'ring') {
    el('path', { d: `M-${r + 18} 0 A${r + 18} 9 0 0 0 ${r + 18} 0`, fill: 'none', stroke: '#FFE3B8', 'stroke-width': 5, transform: 'rotate(-18)' }, body);
  }
  if (s.kind === 'earth') {
    el('circle', { cx: r + 8, cy: -14, r: 6, fill: '#fff', stroke: '#E4DDF3', 'stroke-width': 1 }, body);
    el('circle', { cx: r + 10, cy: -15, r: 1.6, fill: '#E4DDF3' }, body);
  }
  if (s.kind === 'gold') {
    [[-46, -14], [46, -20], [-40, 30], [44, 28]].forEach(p => {
      el('text', { x: p[0], y: p[1], 'text-anchor': 'middle', 'font-size': 14 }, body).textContent = '✨';
    });
  }

  // flag (visited)
  const fl = el('g', { class: 'flag', transform: `translate(${r * .62} ${-r * .72})` }, body);
  el('line', { x1: 0, y1: 8, x2: 0, y2: -16, stroke: '#8F6A44', 'stroke-width': 2 }, fl);
  el('path', { d: 'M0 -16 L14 -11 L0 -6 Z', fill: '#C9758F' }, fl);

  const t = el('text', { class: 'lbl', x: 0, y: r + 20 }, outer);
  t.textContent = s.name;

  outer.addEventListener('click', () => onPlanet(i));
}
PLANETS.forEach((_, i) => buildPlanet(i));
const islEls = [...document.querySelectorAll('.isl')];

/* ───────────── rocket ───────────── */
const ship = $('ship');
const shipPos = el('g', {}, ship);
const shipFlip = el('g', {}, shipPos);
const shipBob = el('g', { class: 'bob' }, shipFlip);
shipBob.style.transformBox = 'fill-box';
shipBob.style.transformOrigin = 'center';

// flame
const flame = el('g', { class: 'flame' }, shipBob);
el('path', { d: 'M-44 -7 Q-66 0 -44 7 Q-52 0 -44 -7 Z', fill: '#FFB86B' }, flame);
el('path', { d: 'M-44 -4 Q-58 0 -44 4 Z', fill: '#FFE9A8' }, flame);
// fins
el('path', { d: 'M-36 -15 L-46 -30 L-22 -15 Z', fill: '#C9758F' }, shipBob);
el('path', { d: 'M-36 15 L-46 30 L-22 15 Z', fill: '#C9758F' }, shipBob);
// body
el('rect', { x: -46, y: -16, width: 84, height: 32, rx: 16, fill: '#fff', stroke: '#E9C5CF', 'stroke-width': 2 }, shipBob);
el('path', { d: 'M34 -16 Q60 0 34 16 Z', fill: '#C9758F' }, shipBob);
el('rect', { x: -40, y: -2.5, width: 70, height: 5, rx: 2.5, fill: '#F0C9D4' }, shipBob);
el('text', { x: 38, y: 4, 'font-size': 9, fill: '#fff', 'text-anchor': 'middle' }, shipBob).textContent = '♥';

// windows with the team
const WIN = [
  { k: 'hedge',  x: -26 },
  { k: 'parrot', x: -4 },
  { k: 'cat',    x: 18 }
];
WIN.forEach((w, i) => {
  const cp = el('clipPath', { id: 'win' + i }, defs);
  el('circle', { cx: w.x, cy: 0, r: 8.6 }, cp);
  el('circle', { cx: w.x, cy: 0, r: 9.4, fill: '#E8F1FF', stroke: '#C9758F', 'stroke-width': 1.6 }, shipBob);
  const cg = el('g', { 'clip-path': `url(#win${i})` }, shipBob);
  const hg = el('g', { transform: `translate(${w.x} 1) scale(.205) translate(-60 -62)` }, cg);
  hg.innerHTML = HEADS[w.k];
  const hit = el('circle', { class: 'hit', cx: w.x, cy: 0, r: 11, fill: 'transparent' }, shipBob);
  hit.addEventListener('click', e => { e.stopPropagation(); speak(w.k); });
});

// speech bubble
const bubble = el('g', { class: 'bubble', opacity: 0 }, shipPos);
const bubRect = el('rect', { x: -40, y: -70, width: 80, height: 22, rx: 11, fill: '#fff', stroke: '#F0C9D4' }, bubble);
const bubTail = el('path', { d: 'M-4 -48 l4 8 l4 -8 z', fill: '#fff' }, bubble);
const bubTxt = el('text', { x: 0, y: -55, 'text-anchor': 'middle', 'font-size': 11, 'font-weight': 700, fill: '#5B3A45' }, bubble);

let pos = { x: START.x, y: START.y }, dir = 1;
function placeShip(x, y, d) {
  pos = { x, y }; if (d) dir = d;
  shipPos.setAttribute('transform', `translate(${x} ${y})`);
  shipFlip.setAttribute('transform', `scale(${dir} 1)`);
}
placeShip(START.x, START.y, 1);

let speakT = null;
function speak(k) {
  const txt = nextSay(k);
  bubTxt.textContent = txt;
  const w = Math.max(70, txt.length * 8 + 22);
  bubRect.setAttribute('x', -w / 2); bubRect.setAttribute('width', w);
  bubble.setAttribute('opacity', 1);
  burst(['💗'], 3);
  clearTimeout(speakT);
  speakT = setTimeout(() => bubble.setAttribute('opacity', 0), 1500);
}

/* ───────────── effects ───────────── */
const fx = $('fx');
function burst(syms, n) {
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const h = document.createElement('span');
      h.className = 'fl';
      h.textContent = syms[Math.floor(Math.random() * syms.length)];
      h.style.left = (8 + Math.random() * 84) + 'vw';
      h.style.fontSize = (16 + Math.random() * 18) + 'px';
      h.style.animationDuration = (2.6 + Math.random() * 1.8) + 's';
      fx.appendChild(h);
      setTimeout(() => h.remove(), 4600);
    }, i * 110);
  }
}
function coinRain(n) {
  for (let i = 0; i < n; i++) {
    setTimeout(() => {
      const c = document.createElement('span');
      c.className = 'coin';
      c.textContent = Math.random() > .35 ? '🪙' : '⭐';
      c.style.left = (Math.random() * 96) + 'vw';
      c.style.fontSize = (18 + Math.random() * 16) + 'px';
      c.style.animationDuration = (1.8 + Math.random() * 1.2) + 's';
      fx.appendChild(c);
      setTimeout(() => c.remove(), 3600);
    }, i * 70);
  }
}
const toastEl = $('toast');
let toastT = null;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => toastEl.classList.remove('show'), 2200);
}

/* ───────────── game state ───────────── */
let next = 0;
let sailing = false;
let inPanel = false;
const collected = [];

function markNext() {
  islEls.forEach((g, i) => {
    g.classList.toggle('next', i === next);
    g.classList.toggle('visited', i < next);
  });
}
markNext();

function ease(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

function sailTo(i, done) {
  const leg = legs[i];
  const from = leg.from, c = leg.c, to = leg.to;
  placeShip(from.x, from.y, to.x >= from.x ? 1 : -1);
  sailing = true;
  $('goal').classList.add('hide');
  const dur = 2600;
  const t0 = performance.now();
  let lastDot = 0;
  (function step(now) {
    const p = Math.min(1, (now - t0) / dur), t = ease(p);
    const u = 1 - t;
    const x = u * u * from.x + 2 * u * t * c.x + t * t * to.x;
    const y = u * u * from.y + 2 * u * t * c.y + t * t * to.y;
    const dx = 2 * u * (c.x - from.x) + 2 * t * (to.x - c.x);
    placeShip(x, y, dx >= 0 ? 1 : -1);
    if (p - lastDot > .04) {
      lastDot = p;
      const d = el('circle', { cx: x - dir * 50, cy: y + (Math.random() - .5) * 6, r: 2.4, fill: Math.random() > .5 ? '#FFD98A' : '#fff' }, $('wake'));
      d.animate([{ opacity: .9, transform: 'scale(1)' }, { opacity: 0, transform: 'scale(2.4)' }],
        { duration: 1400, fill: 'forwards' });
      setTimeout(() => d.remove(), 1500);
    }
    if (p < 1) requestAnimationFrame(step);
    else { sailing = false; leg.path.classList.add('done'); done(); }
  })(t0);
}

function onPlanet(i) {
  if (sailing || inPanel) return;
  if (i < next) { toast('زرتي الكوكب ده قبل كده ✓'); return; }
  if (i > next) { toast('لسه بدري.. روحي للكوكب اللي بينوّر ✨'); return; }
  sailTo(i, () => arrive(i));
}

/* ───────────── planet sheet ───────────── */
const sheet = $('sheet'), obj = $('obj'), dots = $('dots'), reveal = $('reveal');
let tapsLeft = 0, curI = 0;

function arrive(i) {
  curI = i;
  if (PLANETS[i].final) return openTreasure();
  const s = PLANETS[i];
  inPanel = true;
  $('sName').textContent = s.name;
  $('sHint').textContent = s.hint;
  obj.textContent = s.obj;
  obj.style.display = '';
  tapsLeft = s.taps;
  dots.innerHTML = '';
  for (let k = 0; k < s.taps; k++) dots.appendChild(document.createElement('i'));
  reveal.hidden = true;
  sheet.classList.add('open');
  sheet.setAttribute('aria-hidden', 'false');
}

obj.addEventListener('click', () => {
  if (tapsLeft <= 0) return;
  tapsLeft--;
  const s = PLANETS[curI];
  const done = s.taps - tapsLeft;
  [...dots.children].forEach((d, k) => d.classList.toggle('on', k < done));
  obj.classList.remove('shake'); void obj.offsetWidth; obj.classList.add('shake');
  burst(['✨'], 2);
  if (tapsLeft === 0) setTimeout(() => foundItem(curI), 350);
});

function foundItem(i) {
  const s = PLANETS[i];
  obj.style.display = 'none';
  $('sHint').textContent = 'لقيتي حاجة!';
  $('piece').textContent = s.item;
  $('pieceName').textContent = s.itemName;
  $('clue').textContent = s.clue;
  reveal.hidden = false;
  collected.push(s.item);
  const slot = document.querySelector(`.slot[data-k="${collected.length - 1}"]`);
  if (slot) { slot.textContent = s.item; slot.classList.add('on'); }
  burst(['💗', '✨'], 8);
}

$('go').addEventListener('click', () => {
  sheet.classList.remove('open');
  sheet.setAttribute('aria-hidden', 'true');
  inPanel = false;
  next++;
  markNext();
  if (next < PLANETS.length - 1) toast('كمّلي للكوكب اللي بينوّر 🚀');
  else toast('الكنز الكبير مستنيكي ✨');
  $('goal').textContent = next < PLANETS.length - 1 ? 'اضغطي على الكوكب اللي بينوّر ✨' : 'آخر كوكب.. كوكب الكنز! 💎';
  $('goal').classList.remove('hide');
});

/* ───────────── treasure ───────────── */
const treasure = $('treasure'), chestBtn = $('chestBtn');
let chestOpened = false;

function openTreasure() {
  inPanel = true;
  const locks = $('locks');
  locks.innerHTML = '';
  collected.forEach(c => { const sp = document.createElement('span'); sp.textContent = c; locks.appendChild(sp); });
  treasure.classList.add('open');
  treasure.setAttribute('aria-hidden', 'false');
}

chestBtn.addEventListener('click', () => {
  if (chestOpened) return;
  chestOpened = true;
  chestBtn.classList.add('chest-open');
  $('tHint').textContent = 'الكنز اتفتح!! ✨';
  coinRain(22);
  setTimeout(() => {
    $('tClosed').hidden = true;
    $('tOpened').hidden = false;
    treasure.scrollTop = 0;
    burst(['💗'], 5);
  }, 2000);
});

document.querySelectorAll('#team .mate').forEach(m => {
  m.addEventListener('click', () => {
    m.classList.remove('purr'); void m.offsetWidth; m.classList.add('purr');
    $('catSay').textContent = nextSay(m.dataset.k);
    burst(['💗'], 5);
  });
});

$('again').addEventListener('click', () => location.reload());

/* ───────────── start ───────────── */
$('startBtn').addEventListener('click', () => {
  $('start').classList.add('gone');
  speak('cat');
});
