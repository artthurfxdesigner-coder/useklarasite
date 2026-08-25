/* ==========================================================================
   USE KLARA — scripts do site
   ========================================================================== */
(function () {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const brl = n => 'R$ ' + n.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  /* ------------------------------------------------------------------ *
   *  Catálogo (fonte única de dados)
   * ------------------------------------------------------------------ */
  const IMG = {
    hero:  'photo-1558769132-cb1aea458c5e',
    look:  ['photo-1441986300917-64674bd600d8','photo-1567401893414-76b7b1e5a7a5','photo-1445205170230-053b83016050',
            'photo-1620799140408-edc6dcb6d633','photo-1516762689617-e1cffcef479d','photo-1607345366928-199ea26cfe3e',
            'photo-1594633312681-425c7b97ccd1','photo-1603252109303-2751441dd157','photo-1598033129183-c4f50c736f10',
            'photo-1608234808654-2a8875faa7fd','photo-1571945153237-4929e783af4a','photo-1631541909061-71e349d1f203'],
    cat:   { vestidos:'photo-1595777457583-95e059d581b8', macacao:'photo-1608234808654-2a8875faa7fd',
             blusas:'photo-1554568218-0f1715e72254', acessorios:'photo-1523381210434-271e8be1f52b' }
  };
  const u = (id, w = 800) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + w + '&q=80';

  const pick = i => IMG.look[i % IMG.look.length];

  const CATALOG = {
    novidades: [
      { name:'Camiseta Manga Curta', price:189.90 },
      { name:'Camisa Manga Curta', price:249.90 },
      { name:'Camisa com Segunda Pele', price:279.90 },
      { name:'Moletom com Capuz', price:319.90 },
      { name:'Jaqueta Jeans', price:389.90 },
      { name:'Tênis Casual', price:299.90 },
      { name:'Jaqueta Corta-Vento', price:349.90 },
      { name:'Vestido Midi Floral', price:289.90 }
    ],
    vestidos: [
      { name:'Vestido Midi Floral', price:289.90 },
      { name:'Vestido Longo Marrom', price:349.90 },
      { name:'Vestido Tubinho Bege', price:219.90, old:299.90 },
      { name:'Vestido Chemise Linho', price:259.90 },
      { name:'Vestido Envelope Areia', price:279.90 },
      { name:'Vestido Tricô Canelado', price:199.90 },
      { name:'Vestido Ombro a Ombro', price:319.90, old:459.90 },
      { name:'Vestido Godê Nude', price:269.90 },
      { name:'Vestido Camisa Xadrez', price:239.90 },
      { name:'Vestido Slip Acetinado', price:229.90 },
      { name:'Vestido Plissado Terra', price:299.90 },
      { name:'Vestido Manga Bufante', price:249.90, old:329.90 }
    ],
    macacao: [
      { name:'Macacão Pantacourt Preto', price:329.90 },
      { name:'Macacão Alça Fina Areia', price:289.90 },
      { name:'Macacão Pantalona Linho', price:359.90, old:499.90 },
      { name:'Macacão Curto Marrom', price:259.90 },
      { name:'Macacão Tomara que Caia', price:279.90 },
      { name:'Macacão Utilitário Caramelo', price:349.90 },
      { name:'Macacão Frente Única', price:269.90, old:379.90 },
      { name:'Macacão Manga Longa Nude', price:299.90 },
      { name:'Macacão Jeans Reto', price:319.90 },
      { name:'Macacão Cropped Bege', price:229.90 },
      { name:'Macacão Amarração Terra', price:289.90 },
      { name:'Macacão Alfaiataria Chocolate', price:389.90, old:529.90 }
    ],
    blusas: [
      { name:'Blusa de Tricô Canelado', price:179.90 },
      { name:'Blusa Cropped Areia', price:129.90 },
      { name:'Blusa Manga Bufante', price:159.90, old:219.90 },
      { name:'Blusa Gola Alta Marrom', price:169.90 },
      { name:'Blusa Ombro a Ombro', price:149.90 },
      { name:'Blusa Regata Acetinada', price:119.90 },
      { name:'Blusa Ampla Linho', price:189.90, old:259.90 },
      { name:'Blusa Renda Nude', price:199.90 },
      { name:'Blusa Básica Off-White', price:99.90 },
      { name:'Blusa Nó Frontal Terra', price:139.90 },
      { name:'Blusa Manga Longa Caramelo', price:169.90, old:229.90 },
      { name:'Blusa Decote V Bege', price:149.90 }
    ]
  };

  /* SVG icons */
  const ICON = {
    search:'<circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/>',
    bag:'<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
    insta:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
    fb:'<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v6h4v-6h3l1-4h-4V8.5A.5.5 0 0 1 14 8z"/>',
    yt:'<rect x="2" y="6" width="20" height="12" rx="3"/><path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none"/>',
    x:'<path d="M4 4l16 16M20 4L4 20"/>'
  };
  const svg = (body, s = 20) => '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '">' + body + '</svg>';

  /* ------------------------------------------------------------------ *
   *  Header + Footer injetados (mantém as páginas DRY)
   * ------------------------------------------------------------------ */
  const NAV = [
    { label:'Início', href:'index.html', key:'home' },
    { label:'Categorias', href:'vestidos.html', key:'cat' },
    { label:'Sobre nós', href:'sobre.html', key:'about' },
    { label:'Contato', href:'#', key:'contact' }
  ];

  // Categorias do mega-menu popup
  const CATS = [
    { label:'Vestidos', href:'vestidos.html', img:'assets/cat-vestidos.png' },
    { label:'Macacão', href:'macacao.html', img:'assets/cat-macacao.png' },
    { label:'Blusas', href:'blusas.html', img:'assets/cat-blusas.png' }
  ];
  const CAT_LINKS = ['Vestidos','Macacão','Blusas','Calças','Saias','Acessórios','Novidades','Promoção'];

  function megamenuHTML() {
    const cards = CATS.map(c =>
      '<a href="' + c.href + '" class="mm-card"><img src="' + c.img + '" alt="' + c.label + '" data-ph><span>' + c.label + '</span></a>'
    ).join('');
    const links = CAT_LINKS.map((l, i) => {
      const href = (i < 3) ? CATS[i].href : 'vestidos.html';
      return '<a href="' + href + '">' + l + '</a>';
    }).join('');
    return '<div class="megamenu" id="megamenu" role="dialog" aria-label="Categorias"><div class="megamenu__inner">' +
        '<div class="megamenu__cards">' + cards + '</div>' +
        '<div class="megamenu__links"><h4>Todas as categorias</h4>' + links + '</div>' +
      '</div></div>';
  }

  function injectHeader() {
    const host = $('#site-header');
    if (!host) return;
    const active = host.dataset.active || '';
    host.innerHTML =
      '<div class="announcement"><p>Ganhe <strong>20% de desconto</strong> na primeira compra e <strong>Frete Grátis</strong> em pedidos acima de R$ 250.</p></div>' +
      '<header class="header" id="header"><div class="container header__inner">' +
        '<a href="index.html" class="logo"><img src="assets/logo.svg" alt="Use Klara"></a>' +
        '<nav class="nav" id="nav">' +
          NAV.map(n => {
            if (n.key === 'cat') {
              return '<button class="nav__link nav__cat' + (n.key === active ? ' is-active' : '') + '" id="catTrigger" aria-haspopup="true" aria-expanded="false">' + n.label +
                '<svg class="nav__chev" viewBox="0 0 24 24" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg></button>';
            }
            return '<a href="' + n.href + '" class="nav__link' + (n.key === active ? ' is-active' : '') + '">' + n.label + '</a>';
          }).join('') +
        '</nav>' +
        '<div class="header__actions">' +
          '<button class="icon-btn" id="searchToggle" aria-label="Buscar">' + svg(ICON.search) + '</button>' +
          '<button class="icon-btn" id="cartToggle" aria-label="Carrinho">' + svg(ICON.bag) + '<span class="icon-btn__badge" id="cartCount">0</span></button>' +
          '<button class="icon-btn burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</div>' +
      '<div class="searchbar" id="searchbar"><div class="container"><form class="searchbar__form" onsubmit="return false;">' +
        svg(ICON.search) + '<input type="search" id="searchInput" placeholder="Buscar produtos..."></form></div></div>' +
      megamenuHTML() +
      '</header>';
  }

  function injectFooter() {
    const host = $('#site-footer');
    if (!host) return;
    const col = (h, links) => '<div class="footer__col"><h4>' + h + '</h4>' +
      links.map(([t, href]) => '<a href="' + (href || '#') + '">' + t + '</a>').join('') + '</div>';
    host.innerHTML =
      '<footer class="footer"><div class="container">' +
        '<div class="footer__grid">' +
          '<div class="footer__col">' +
            '<a href="index.html" class="logo logo--light"><img src="assets/logo.svg" alt="Use Klara"></a>' +
            '<p class="footer__about">Loja de moda moderna e elegante, com layout limpo e vitrine sofisticada.</p>' +
            '<div class="footer__social">' +
              '<a href="#" aria-label="Instagram">' + svg(ICON.insta, 18) + '</a>' +
              '<a href="#" aria-label="Facebook">' + svg(ICON.fb, 18) + '</a>' +
              '<a href="#" aria-label="YouTube">' + svg(ICON.yt, 18) + '</a>' +
              '<a href="#" aria-label="X">' + svg(ICON.x, 18) + '</a>' +
            '</div>' +
          '</div>' +
          col('Loja', [['Novidades','index.html'],['Vestidos','vestidos.html'],['Macacão','macacao.html'],['Blusas','blusas.html']]) +
          col('Empresa', [['Sobre nós','sobre.html'],['Contato'],['Carreiras'],['Lojas']]) +
          col('Ajuda', [['Envio e entrega'],['Trocas e devoluções'],['Guia de medidas'],['Política de privacidade']]) +
        '</div>' +
        '<div class="footer__bottom">' +
          '<p>© 2026 Use Klara. Todos os direitos reservados.</p>' +
          '<div class="footer__locale"><span>Português ▾</span><span>R$ ▾</span></div>' +
        '</div>' +
      '</div></footer>';
  }

  /* ------------------------------------------------------------------ *
   *  Grades de produto renderizadas a partir do catálogo
   * ------------------------------------------------------------------ */
  function cardHTML(p, i) {
    // Slot de imagem em areia, igual ao Figma (sem foto de produto).
    // Para usar foto real, adicione `img:'<id-unsplash>'` no item do CATALOG.
    const media = p.img
      ? '<img src="' + u(p.img) + '" alt="' + p.name + '" data-ph>'
      : '';
    return '<article class="card reveal" data-name="' + p.name + '" data-price="' + p.price + '">' +
      '<div class="card__media">' + media +
        (p.old ? '<span class="card__badge">Promoção</span>' : '') +
        '<span class="card__peek">Ver produto <span>&rsaquo;</span></span>' + '</div>' +
      '<h3 class="card__name">' + p.name + '</h3>' +
      '<div class="card__price"><span class="now">' + brl(p.price) + '</span>' +
        (p.old ? '<span class="old">' + brl(p.old) + '</span>' : '') + '</div>' +
      '<button class="card__cart">Adicionar ao carrinho <span>&rsaquo;</span></button>' +
      '</article>';
  }
  function renderCollections() {
    $$('[data-collection]').forEach(host => {
      const key = host.dataset.collection;
      const limit = parseInt(host.dataset.limit || '999', 10);
      const list = (CATALOG[key] || []).slice(0, limit);
      host.innerHTML = list.map(cardHTML).join('');
    });
  }

  /* ------------------------------------------------------------------ *
   *  Fallback de imagem (placeholder SVG)
   * ------------------------------------------------------------------ */
  function ph(label) {
    const s = '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="760"><rect width="600" height="760" fill="#CDBAA6"/><text x="300" y="380" text-anchor="middle" font-family="Jost,sans-serif" font-size="24" fill="#5D412E">' + label + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
  }
  function wireFallback() {
    $$('img[data-ph]').forEach(img => {
      img.addEventListener('error', function h() { img.removeEventListener('error', h); img.src = ph(img.alt || 'Use Klara'); });
    });
  }

  /* ------------------------------------------------------------------ *
   *  Carrinho (localStorage) + drawer
   * ------------------------------------------------------------------ */
  const KEY = 'useklara-cart';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };

  function buildDrawer() {
    if ($('#cartDrawer')) return;
    const wrap = document.createElement('div');
    wrap.innerHTML =
      '<div class="overlay" id="overlay"></div>' +
      '<aside class="drawer" id="cartDrawer" aria-label="Carrinho">' +
        '<div class="drawer__head"><h3>Seu carrinho</h3><button class="drawer__close" id="drawerClose" aria-label="Fechar">&times;</button></div>' +
        '<div class="drawer__body" id="drawerBody"></div>' +
        '<div class="drawer__foot"><div class="drawer__total"><span>Total</span><strong id="drawerTotal">R$ 0,00</strong></div>' +
        '<button type="button" class="btn btn--dark btn--block" id="checkoutBtn">Finalizar compra</button></div>' +
      '</aside>';
    document.body.appendChild(wrap);
  }

  function renderCart() {
    const body = $('#drawerBody'); if (!body) return;
    if (!cart.length) body.innerHTML = '<p class="drawer__empty">Seu carrinho está vazio.</p>';
    else body.innerHTML = cart.map((it, i) =>
      '<div class="drawer-item"><div class="drawer-item__info"><p class="drawer-item__name">' + it.name + '</p>' +
      '<p class="drawer-item__price">' + brl(it.price) + '</p></div>' +
      '<div class="drawer-item__qty"><button data-act="dec" data-i="' + i + '">&minus;</button><span>' + it.qty + '</span>' +
      '<button data-act="inc" data-i="' + i + '">+</button></div></div>').join('');
    const qty = cart.reduce((s, it) => s + it.qty, 0);
    const total = cart.reduce((s, it) => s + it.qty * it.price, 0);
    const t = $('#drawerTotal'); if (t) t.textContent = brl(total);
    const c = $('#cartCount'); if (c) { c.textContent = qty; c.classList.toggle('is-visible', qty > 0); }
  }
  function addToCart(name, price) {
    const found = cart.find(it => it.name === name);
    if (found) found.qty += 1; else cart.push({ name, price, qty: 1 });
    save(); renderCart(); toast(name + ' adicionado ao carrinho');
  }

  /* Toast */
  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('is-visible');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2200);
  }

  /* ------------------------------------------------------------------ *
   *  Interações gerais
   * ------------------------------------------------------------------ */
  function wireHeader() {
    const header = $('#header');
    if (header) { const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8); window.addEventListener('scroll', onScroll, { passive:true }); onScroll(); }
    const burger = $('#burger'), nav = $('#nav');
    if (burger && nav) burger.addEventListener('click', () => { burger.classList.toggle('is-open'); nav.classList.toggle('is-open'); });
    const st = $('#searchToggle'), sb = $('#searchbar'), si = $('#searchInput');
    if (st && sb) st.addEventListener('click', () => { const o = sb.classList.toggle('is-open'); if (o && si) setTimeout(() => si.focus(), 200); });
    if (si) si.addEventListener('input', () => {
      const term = si.value.trim().toLowerCase();
      $$('[data-collection] .card, .products .card').forEach(card => {
        const n = (card.dataset.name || '').toLowerCase();
        card.style.display = n.includes(term) ? '' : 'none';
      });
    });
  }
  function wireCart() {
    const open = () => { $('#cartDrawer').classList.add('is-open'); $('#overlay').classList.add('is-open'); };
    const close = () => { $('#cartDrawer').classList.remove('is-open'); $('#overlay').classList.remove('is-open'); };
    const ct = $('#cartToggle'); if (ct) ct.addEventListener('click', open);
    const cc = $('#drawerClose'); if (cc) cc.addEventListener('click', close);
    const ov = $('#overlay'); if (ov) ov.addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    const body = $('#drawerBody');
    if (body) body.addEventListener('click', e => {
      const b = e.target.closest('button[data-act]'); if (!b) return;
      const i = +b.dataset.i;
      if (b.dataset.act === 'inc') cart[i].qty += 1; else if (--cart[i].qty <= 0) cart.splice(i, 1);
      save(); renderCart();
    });
    document.addEventListener('click', e => {
      const b = e.target.closest('.card__cart'); if (!b) return;
      const card = b.closest('.card'); addToCart(card.dataset.name, parseFloat(card.dataset.price));
    });
    const checkout = $('#checkoutBtn');
    if (checkout) checkout.addEventListener('click', () => toast('Checkout disponível em breve.'));
  }

  /* Product detail: galeria, tamanhos, cores, stepper, tabs, add */
  function wirePDP() {
    const pdp = $('.pdp'); if (!pdp) return;
    $$('.gallery__thumbs button').forEach(t => t.addEventListener('click', () => {
      $$('.gallery__thumbs button').forEach(x => x.classList.remove('is-active'));
      t.classList.add('is-active');
      const main = $('.gallery__main img'), src = t.querySelector('img'); if (main && src) main.src = src.src;
    }));
    $$('.swatch').forEach(s => s.addEventListener('click', () => { $$('.swatch').forEach(x => x.classList.remove('is-active')); s.classList.add('is-active'); }));
    $$('.size').forEach(s => s.addEventListener('click', () => { $$('.size').forEach(x => x.classList.remove('is-active')); s.classList.add('is-active'); }));
    const q = $('#pdpQty'); let n = 1;
    const dec = $('#pdpDec'), inc = $('#pdpInc');
    if (dec) dec.addEventListener('click', () => { n = Math.max(1, n - 1); q.textContent = n; });
    if (inc) inc.addEventListener('click', () => { n += 1; q.textContent = n; });
    const addAll = () => { for (let k = 0; k < n; k++) addToCart(pdp.dataset.name, parseFloat(pdp.dataset.price)); };
    const add = $('#pdpAdd');
    if (add) add.addEventListener('click', addAll);
    // Barra de compra fixa (mobile)
    const addMobile = $('#pdpAddMobile');
    if (addMobile) { addMobile.addEventListener('click', addAll); document.body.classList.add('has-buybar'); }
    $$('.tabnav button').forEach(b => b.addEventListener('click', () => {
      $$('.tabnav button').forEach(x => x.classList.remove('is-active'));
      $$('.tabpanel').forEach(x => x.classList.remove('is-active'));
      b.classList.add('is-active'); $('#' + b.dataset.tab).classList.add('is-active');
    }));
  }

  /* Account tabs */
  function wireAccount() {
    const menu = $('.acctmenu'); if (!menu) return;
    $$('.acctmenu button').forEach(b => b.addEventListener('click', () => {
      const tab = b.dataset.tab; if (!tab) return;
      $$('.acctmenu button').forEach(x => x.classList.remove('is-active'));
      $$('.acctpanel').forEach(x => x.classList.remove('is-active'));
      b.classList.add('is-active'); const p = $('#' + tab); if (p) p.classList.add('is-active');
    }));
  }

  /* Category filters (visual) + painel de filtros no mobile */
  function wireFilters() {
    $$('.filter__sizes button, .filter__colors button').forEach(b => b.addEventListener('click', () => {
      const sib = b.parentElement.children;
      [...sib].forEach(x => x.classList.remove('is-active')); b.classList.add('is-active');
    }));

    const filters = $('.filters'), toolbar = $('.listing__toolbar'), overlay = $('#overlay');
    if (!filters || !toolbar || !overlay) return;

    // Botão "Filtrar" na toolbar (aparece só no mobile via CSS)
    const toggle = document.createElement('button');
    toggle.className = 'filter-toggle';
    toggle.innerHTML = '<svg viewBox="0 0 24 24"><line x1="4" y1="6" x2="20" y2="6"/><line x1="7" y1="12" x2="17" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>Filtrar';
    toolbar.insertBefore(toggle, toolbar.firstChild);

    // Botão de fechar dentro do painel
    const close = document.createElement('button');
    close.className = 'filters__close'; close.setAttribute('aria-label', 'Fechar filtros'); close.innerHTML = '&times;';
    filters.insertBefore(close, filters.firstChild);

    const open = () => { filters.classList.add('is-open'); overlay.classList.add('is-open'); };
    const shut = () => { filters.classList.remove('is-open'); overlay.classList.remove('is-open'); };
    toggle.addEventListener('click', open);
    close.addEventListener('click', shut);
    overlay.addEventListener('click', shut);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') shut(); });
  }

  /* Mega-menu de categorias (popup) */
  function wireMegamenu() {
    const trigger = $('#catTrigger'), mm = $('#megamenu'), header = $('#header');
    if (!trigger || !mm) return;
    const open = () => { mm.classList.add('is-open'); trigger.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); };
    const close = () => { mm.classList.remove('is-open'); trigger.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); };
    trigger.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); mm.classList.contains('is-open') ? close() : open(); });
    mm.addEventListener('click', e => e.stopPropagation());
    document.addEventListener('click', e => { if (!header.contains(e.target)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    window.addEventListener('scroll', () => { if (mm.classList.contains('is-open')) close(); }, { passive: true });
    // hover no desktop
    if (window.matchMedia('(min-width:861px)').matches) {
      let t;
      const wrap = trigger.parentElement;
      wrap.addEventListener('mouseenter', () => { clearTimeout(t); open(); });
      wrap.addEventListener('mouseleave', () => { t = setTimeout(close, 180); });
      mm.addEventListener('mouseenter', () => clearTimeout(t));
      mm.addEventListener('mouseleave', () => { t = setTimeout(close, 180); });
    }
  }

  /* Newsletter */
  function wireNewsletter() {
    const f = $('#newsletterForm'); if (!f) return;
    f.addEventListener('submit', e => { e.preventDefault(); $('#newsletterNote').textContent = 'Obrigado! Seu cupom de 20% foi enviado por e-mail.'; f.reset(); });
  }

  /* Reveal on scroll */
  function wireReveal() {
    const targets = $$('.reveal');
    if (!('IntersectionObserver' in window)) { targets.forEach(t => t.classList.add('is-in')); return; }
    const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { threshold:.12, rootMargin:'0px 0px -40px' });
    targets.forEach((t) => {
      // escalona itens irmãos (mesmo pai) para um efeito em cascata
      const sibs = t.parentElement ? [...t.parentElement.children].filter(c => c.classList.contains('reveal')) : [t];
      const idx = sibs.indexOf(t);
      t.style.transitionDelay = (idx >= 0 ? idx % 6 : 0) * 90 + 'ms';
      io.observe(t);
    });
  }

  /* ------------------------------------------------------------------ *
   *  Efeitos imersivos (parallax, progresso, header, tilt)
   * ------------------------------------------------------------------ */
  function wireEffects() {
    const root = document.documentElement;
    root.classList.add('js');
    const reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    // Hero: entrada encenada
    const hero = $('.hero');
    if (hero) requestAnimationFrame(() => hero.classList.add('is-ready'));
    if (reduce) return;

    // Barra de progresso de rolagem
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    // Header some ao descer, volta ao subir
    const header = $('#header');
    let lastY = window.scrollY;

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
      const y = window.scrollY;
      if (header) {
        if (y > lastY && y > 320) header.classList.add('is-hidden');
        else header.classList.remove('is-hidden');
      }
      // parallax do hero ao rolar
      if (heroMedia && y < window.innerHeight) heroMedia.style.transform = 'translateY(' + (y * 0.10) + 'px)';
      lastY = y;
    };

    // Parallax do hero (rolagem + mouse) — mais intenso
    const heroMedia = $('.hero__media');
    const heroContent = $('.hero__content');
    if (heroMedia && window.matchMedia('(min-width:861px)').matches) {
      heroMedia.addEventListener('mousemove', e => {
        const r = heroMedia.getBoundingClientRect();
        const dx = ((e.clientX - r.left) / r.width - .5) * 34;
        const dy = ((e.clientY - r.top) / r.height - .5) * 34;
        heroMedia.style.transform = 'translate(' + dx + 'px,' + (window.scrollY * 0.22 + dy) + 'px)';
        if (heroContent) heroContent.style.transform = 'translate(' + (dx * -.35) + 'px,' + (dy * -.35) + 'px)';
      });
      heroMedia.addEventListener('mouseleave', () => {
        heroMedia.style.transform = 'translateY(' + (window.scrollY * 0.22) + 'px)';
        if (heroContent) heroContent.style.transform = '';
      });
    }

    // Parallax genérico em qualquer elemento com data-parallax
    const parallaxEls = $$('[data-parallax]');

    const runParallax = (y) => {
      if (heroMedia && y < window.innerHeight) heroMedia.style.transform = 'translateY(' + (y * 0.22) + 'px)';
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed * -1;
        el.style.transform = 'translateY(' + offset + 'px)';
      });
    };
    const _origOnScroll = onScroll;

    window.addEventListener('scroll', () => { runParallax(window.scrollY); }, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    runParallax(window.scrollY);

    // Tilt 3D acentuado em cards
    if (window.matchMedia('(min-width:861px)').matches) {
      $$('.card, .cat, .value, .mm-card').forEach(el => {
        el.classList.add('tilt');
        const img = el.querySelector('img');
        el.addEventListener('mousemove', e => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - .5;
          const py = (e.clientY - r.top) / r.height - .5;
          el.style.transform = 'perspective(800px) rotateX(' + (-py * 10) + 'deg) rotateY(' + (px * 10) + 'deg) translateY(-8px) scale(1.02)';
          if (img) img.style.transform = 'scale(1.12) translate(' + (px * -12) + 'px,' + (py * -12) + 'px)';
        });
        el.addEventListener('mouseleave', () => { el.style.transform = ''; if (img) img.style.transform = ''; });
      });
    }

    // Cursor customizado + botões magnéticos
    if (window.matchMedia('(hover:hover) and (min-width:861px)').matches) {
      const dot = document.createElement('div'); dot.className = 'cursor-dot';
      const ring = document.createElement('div'); ring.className = 'cursor-ring';
      document.body.appendChild(dot); document.body.appendChild(ring);
      // Nascem fora da tela até o primeiro movimento do mouse (evita círculo solto no canto)
      dot.style.transform = ring.style.transform = 'translate(-200px,-200px)';
      let rx = -200, ry = -200, mx = -200, my = -200;
      document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = 'translate(' + mx + 'px,' + my + 'px) translate(-50%,-50%)';
      });
      const loop = () => { rx += (mx - rx) * .18; ry += (my - ry) * .18; ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)'; requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
      // Esconde o cursor personalizado sobre produtos
      document.addEventListener('mouseover', e => {
        if (e.target.closest('.card')) { dot.classList.add('is-hidden'); ring.classList.add('is-hidden'); }
      });
      document.addEventListener('mouseout', e => {
        if (e.target.closest('.card')) { dot.classList.remove('is-hidden'); ring.classList.remove('is-hidden'); }
      });

      // Expande o anel só em elementos interativos (produtos ficam de fora)
      const hoverSel = 'a, button, .cat, .value, .mm-card, input, .swatch, .size';
      document.addEventListener('mouseover', e => { if (e.target.closest(hoverSel) && !e.target.closest('.card')) ring.classList.add('is-hover'); });
      document.addEventListener('mouseout', e => { if (e.target.closest(hoverSel)) ring.classList.remove('is-hover'); });

      // Botões magnéticos
      $$('.btn').forEach(b => {
        b.addEventListener('mousemove', e => {
          const r = b.getBoundingClientRect();
          const mxb = e.clientX - r.left - r.width / 2;
          const myb = e.clientY - r.top - r.height / 2;
          b.style.transform = 'translate(' + (mxb * .3) + 'px,' + (myb * .4) + 'px)';
        });
        b.addEventListener('mouseleave', () => { b.style.transform = ''; });
      });
    }
  }

  /* ------------------------------------------------------------------ *
   *  Boot
   * ------------------------------------------------------------------ */
  document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
    renderCollections();
    buildDrawer();
    wireFallback();
    wireHeader();
    wireMegamenu();
    wireCart();
    wirePDP();
    wireAccount();
    wireFilters();
    wireNewsletter();
    renderCart();
    wireReveal();
    wireEffects();
  });
})();
