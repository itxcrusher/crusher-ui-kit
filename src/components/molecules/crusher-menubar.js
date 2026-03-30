import { LitElement, html, css } from 'lit';

export class CrusherMenubar extends LitElement {
  static properties = {
    value: { type: String, reflect: true },      // open top-level id
    collapseAt: { type: Number, attribute: 'collapse-at' } // px; overflow into "More" below this width
  };

  constructor() {
    super();
    this.value = '';
    this.collapseAt = 760;
    this._docKey = (e) => this._onDocKey(e);
    this._docClick = (e) => { if (!this.contains(e.target)) this._closeAll(); };
    this._ro = null;
    this._overflowIds = new Set();
  }

  static styles = css`
    :host { display: block; position: relative; z-index: var(--crusher-z-dropdown); }
    .bar {
      display: flex; gap: var(--crusher-menubar-gap, var(--crusher-spacing-2)); align-items: center; flex-wrap: nowrap;
      background: var(--crusher-menubar-bg, var(--crusher-toolbar-bg, color-mix(in srgb, var(--crusher-surface) 92%, transparent)));
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: var(--crusher-component-border-weight) solid var(--crusher-menubar-border, var(--crusher-toolbar-border, var(--crusher-border)));
      border-radius: var(--crusher-menubar-radius, var(--crusher-radius-lg));
      box-shadow: var(--crusher-menubar-shadow, var(--crusher-toolbar-shadow, var(--crusher-shadow-1)));
      padding-block: var(--crusher-menubar-padding-block, calc(var(--crusher-spacing-1) + 2px));
      padding-inline: var(--crusher-menubar-padding-inline, var(--crusher-spacing-4));
      overflow: hidden;
    }
    ::slotted([slot="menu"]) {
      appearance: none;
      background: transparent;
      border: none;
      cursor: default;
      padding:
        var(--crusher-menubar-item-padding-block, calc(var(--crusher-spacing-1) + 2px))
        var(--crusher-menubar-item-padding-inline, calc(var(--crusher-spacing-4) + 2px));
      border-radius: var(--crusher-menubar-item-radius, var(--crusher-radius-md));
      color: var(--crusher-fg);
      font: inherit;
      font-weight: var(--crusher-font-weight-medium);
      letter-spacing: 0.01em;
      white-space: nowrap;
      box-shadow: var(--crusher-menubar-item-shadow, none);
      transition:
        background var(--crusher-motion-duration-fast) var(--crusher-motion-easing-inout),
        color var(--crusher-motion-duration-fast) var(--crusher-motion-easing-inout),
        box-shadow var(--crusher-motion-duration-fast) var(--crusher-motion-easing-inout);
    }
    ::slotted([slot="menu"]:hover) {
      background: var(--crusher-menubar-item-bg-hover, var(--crusher-nav-item-bg-hover, color-mix(in srgb, var(--crusher-fg) 6%, transparent)));
      box-shadow: var(--crusher-menubar-item-shadow-hover, 0 0 0 var(--crusher-component-border-weight) color-mix(in srgb, var(--crusher-border) 88%, transparent));
    }
    ::slotted([slot="menu"][hidden]) { display: none !important; }
    ::slotted([slot="menu"][aria-expanded="true"]) {
      background: var(--crusher-menubar-item-bg-active, var(--crusher-nav-item-bg-active, color-mix(in srgb, var(--crusher-color-brand-primary) 14%, transparent)));
      box-shadow: var(--crusher-menubar-item-shadow-active, 0 0 0 var(--crusher-component-border-weight) var(--crusher-menubar-item-border-active, var(--crusher-nav-item-border-active, color-mix(in srgb, var(--crusher-color-brand-primary) 38%, var(--crusher-border)))));
    }

    .menu {
      position: absolute; min-width: calc(var(--crusher-spacing-10) * 5.5);
      background: var(--crusher-toolbar-bg, var(--crusher-surface));
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: var(--crusher-component-border-weight) solid var(--crusher-toolbar-border, var(--crusher-border));
      border-radius: var(--crusher-radius-lg);
      box-shadow: var(--crusher-toolbar-shadow, var(--crusher-shadow-2));
      padding: var(--crusher-spacing-1); display: none;
      margin-top: var(--crusher-spacing-1);
    }
    .menu[open] { display: block; }

    .item {
      display:flex; align-items:center; gap:var(--crusher-spacing-2);
      padding: var(--crusher-spacing-2) var(--crusher-spacing-3);
      border-radius: var(--crusher-radius-md);
      color: var(--crusher-fg); cursor: default;
    }
    .item[aria-disabled="true"] { opacity:.5; cursor: not-allowed; }
    .item[aria-selected="true"] { background: color-mix(in srgb, var(--crusher-fg) 10%, transparent); }

    .sep { height:var(--crusher-component-border-weight); background: var(--crusher-border); margin:var(--crusher-spacing-1) 0; }
    .item[submenu]::after { content: '›'; margin-inline-start: auto; opacity:.65; }
    .submenu {
      position: absolute; top: 0; inset-inline-start: 100%; min-width: calc(var(--crusher-spacing-10) * 5.5);
      background: var(--crusher-toolbar-bg, var(--crusher-surface));
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: var(--crusher-component-border-weight) solid var(--crusher-toolbar-border, var(--crusher-border));
      border-radius: var(--crusher-radius-lg);
      box-shadow: var(--crusher-toolbar-shadow, var(--crusher-shadow-2));
      padding: var(--crusher-spacing-1); display: none; margin-inline-start: var(--crusher-spacing-1);
    }
    .item[sub-open] > .submenu { display: block; }
  `;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._docKey);
    document.addEventListener('click', this._docClick);
    this._ro = new ResizeObserver(() => this._measure());
  }
  disconnectedCallback() {
    document.removeEventListener('keydown', this._docKey);
    document.removeEventListener('click', this._docClick);
    this._ro?.disconnect();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this._wireTop();
    this._ro.observe(this.renderRoot.querySelector('.bar'));
    this._measure();
  }

  _wireTop() {
    const triggers = this._triggers();
    const menus = this._menus();

    triggers.forEach((t, i) => {
      t.setAttribute('role', 'menuitem');
      t.tabIndex = 0;
      if (!t.id) t.id = `menubar-${i+1}`;
      t.addEventListener('click', () => this._toggle(t.id));
      t.addEventListener('keydown', (e) => this._onTopKey(e, i));
    });

    menus.forEach((m, i) => {
      m.setAttribute('role', 'menu');
      m.setAttribute('aria-labelledby', triggers[i]?.id || '');
      this._wireMenu(m);
    });
  }

  _wireMenu(menuRoot) {
    const items = Array.from(menuRoot.children);
    items.forEach((n) => {
      if (n.classList.contains('sep')) { n.setAttribute('role', 'separator'); return; }
      n.classList.add('item');
      n.setAttribute('role', 'menuitem');
      n.tabIndex = -1;

      const submenuSlot = n.querySelector('[slot="submenu"]');
      if (submenuSlot) {
        n.setAttribute('submenu','');
        const wrap = document.createElement('div');
        wrap.className = 'submenu';
        Array.from(submenuSlot.childNodes).forEach(k => wrap.appendChild(k));
        submenuSlot.remove();
        n.appendChild(wrap);
        n.addEventListener('mouseenter', () => n.setAttribute('sub-open',''));
        n.addEventListener('mouseleave', () => n.removeAttribute('sub-open'));
      }

      n.addEventListener('click', (ev) => {
        if (n.hasAttribute('submenu')) return;
        if (n.getAttribute('aria-disabled') === 'true') return;
        this.dispatchEvent(new CustomEvent('action', { detail: { value: n.getAttribute('value') || n.textContent.trim() }}));
        this._closeAll();
        ev.stopPropagation();
      }, { passive: true });
    });
  }

  _triggers() { return this.renderRoot.querySelector('slot[name="menu"]')?.assignedElements({ flatten: true }) ?? []; }
  _menus()    { return Array.from(this.renderRoot.querySelectorAll('.menu')); }

  _toggle(id) { this.value === id ? this._closeAll() : this._open(id); }
  _open(id) {
    this.value = id;
    const idx = this._triggers().findIndex(t => t.id === id);
    this._menus().forEach((m, i) => m.toggleAttribute('open', i === idx));
    this._triggers().forEach((t, i) => t.setAttribute('aria-expanded', i === idx ? 'true' : 'false'));
    this._menus()[idx]?.querySelector('.item[role="menuitem"]')?.focus();
  }
  _closeAll() {
    this.value = '';
    this._menus().forEach(m => m.removeAttribute('open'));
    this._triggers().forEach(t => t.setAttribute('aria-expanded','false'));
  }

  _onTopKey(e, i) {
    const triggers = this._triggers();
    if (e.key === 'ArrowRight') { e.preventDefault(); triggers[(i+1)%triggers.length].focus(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); triggers[(i-1+triggers.length)%triggers.length].focus(); }
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._open(triggers[i].id); }
    if (e.key === 'Escape') { e.preventDefault(); this._closeAll(); triggers[i].focus(); }
  }
  _onDocKey(e) {
    if (!this.value) return;
    const idx = this._triggers().findIndex(t => t.id === this.value);
    const menu = this._menus()[idx];
    if (!menu) return;

    const items = Array.from(menu.querySelectorAll('.item[role="menuitem"]'));
    const curIndex = items.indexOf(document.activeElement);

    if (e.key === 'Escape') { e.preventDefault(); this._closeAll(); this._triggers()[idx].focus(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(curIndex+1)%items.length]?.focus(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); items[(curIndex-1+items.length)%items.length]?.focus(); }
    if (e.key === 'Home')      { e.preventDefault(); items[0]?.focus(); }
    if (e.key === 'End')       { e.preventDefault(); items[items.length-1]?.focus(); }
    if (e.key === 'ArrowRight') {
      const sub = document.activeElement?.querySelector?.('.submenu');
      if (sub) { document.activeElement.setAttribute('sub-open',''); sub.querySelector('.item')?.focus(); e.preventDefault(); }
      else { this._open(this._triggers()[(idx+1)%this._triggers().length].id); e.preventDefault(); }
    }
    if (e.key === 'ArrowLeft') {
      const parentSubItem = document.activeElement?.closest?.('.item[sub-open]');
      if (parentSubItem) { parentSubItem.removeAttribute('sub-open'); parentSubItem.focus(); e.preventDefault(); }
      else { this._open(this._triggers()[(idx-1+this._triggers().length)%this._triggers().length].id); e.preventDefault(); }
    }
    if (e.key === 'Enter' || e.key === ' ') { document.activeElement?.click(); e.preventDefault(); }
  }

  _measure() {
    const bar = this.renderRoot.querySelector('.bar');
    if (!bar) return;
    const triggers = this._triggers();
    const fits = bar.clientWidth > this.collapseAt;
    // Overflow rule: when smaller than collapseAt, keep first N visible, rest to "More"
    this._overflowIds.clear();
    if (!fits) {
      let cursor = 0;
      const maxW = bar.clientWidth - 80; // leave room for "More"
      let used = 0;
      for (const t of triggers) {
        const w = t.getBoundingClientRect().width;
        if (used + w < maxW) { used += w; t.hidden = false; }
        else { t.hidden = true; this._overflowIds.add(t.id); }
        cursor++;
      }
    } else {
      triggers.forEach(t => t.hidden = false);
    }
    this.requestUpdate();
  }

  _overflowMenuTemplate() {
    if (this._overflowIds.size === 0) return null;
    const items = Array.from(this._overflowIds);
    return html`
      <button id="more" slot="menu" aria-expanded="false">More</button>
      <div data-for="more">
        ${items.map(id => {
          const menu = this.querySelector(`[data-for="${id}"]`);
          if (!menu) return html``;
          // replicate its top-level entries into More/*
          const cloned = menu.cloneNode(true);
          return html`${cloned.childNodes}`;
        })}
      </div>
    `;
  }

  render() {
    // Adopt external menus under triggers
    const triggerEls = this._triggers();
    const adoptedMenus = triggerEls.map((t) => {
      const menu = this.querySelector(`[data-for="${t.id}"]`);
      if (!menu) return null;
      const cloned = menu.cloneNode(true);
      cloned.classList.add('menu');
      cloned.removeAttribute('slot');
      return cloned;
    });

    return html`
      <div class="bar" role="menubar">
        <slot name="menu"></slot>
        ${this._overflowMenuTemplate()}
      </div>

      ${adoptedMenus}

      <slot hidden @slotchange=${() => this.requestUpdate()}></slot>
    `;
  }
}
customElements.define('crusher-menubar', CrusherMenubar);
