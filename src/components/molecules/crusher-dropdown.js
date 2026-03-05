import { LitElement, html, css } from 'lit';

export class CrusherDropdown extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    label: { type: String },
    placement: { type: String }, // bottom-start | bottom-end | top-start | top-end
    value: { type: String, reflect: true }
  };

  constructor() {
    super();
    this.open = false;
    this.label = 'Menu';
    this.placement = 'bottom-start';
    this.value = '';
    this._idx = -1;
    this._typeBuf = '';
    this._typeTimer = 0;
  }

  static styles = css`
    :host { position: relative; display: inline-block; }
    .trigger {
      display:flex; align-items:center; gap:var(--crusher-spacing-2);
      background: var(--crusher-surface);
      color: var(--crusher-fg);
      border: var(--crusher-component-border-weight) solid var(--crusher-border);
      border-radius: var(--crusher-radius-md);
      padding: var(--crusher-spacing-2) var(--crusher-spacing-3); cursor: pointer;
    }
    .panel {
      position: absolute;
      min-width: calc(var(--crusher-spacing-10) * 5);
      max-width: calc(var(--crusher-spacing-10) * 9);
      background: var(--crusher-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: var(--crusher-component-border-weight) solid var(--crusher-border);
      border-radius: var(--crusher-radius-lg);
      box-shadow: var(--crusher-shadow-2);
      padding: var(--crusher-spacing-1);
      margin-top: calc((var(--crusher-spacing-1) + var(--crusher-spacing-2)) / 2);
      display: none; z-index: var(--crusher-z-dropdown,100);
    }
    :host([open]) .panel { display: block; }

    .item {
      display:flex; align-items:center; gap:var(--crusher-spacing-2);
      padding: var(--crusher-spacing-2) var(--crusher-spacing-2); border-radius: var(--crusher-radius-md);
      color: var(--crusher-fg); cursor: pointer; position: relative;
    }
    .item[aria-selected="true"] {
      background: color-mix(in srgb, var(--crusher-fg) 10%, transparent);
    }
    .item[aria-current="true"]::after { content:"✓"; margin-left:auto; opacity:.7; }
    .sep { height:var(--crusher-component-border-weight); background: var(--crusher-border); margin:var(--crusher-spacing-1) 0; }

    .item[submenu]::after { content:'›'; margin-left:auto; opacity:.65; }
    .submenu {
      position: absolute; left: 100%; top: 0; min-width: calc(var(--crusher-spacing-10) * 5);
      background: var(--crusher-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: var(--crusher-component-border-weight) solid var(--crusher-border);
      border-radius: var(--crusher-radius-lg);
      box-shadow: var(--crusher-shadow-2);
      padding: var(--crusher-spacing-1); display: none;
    }
    .item[sub-open] > .submenu { display: block; }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._onDocKey = (e) => this._handleDocKey(e);
    this._onDocClick = (e) => { if (!this.contains(e.target)) this._close(); };
    document.addEventListener('keydown', this._onDocKey);
    document.addEventListener('click', this._onDocClick);
  }
  disconnectedCallback() {
    document.removeEventListener('keydown', this._onDocKey);
    document.removeEventListener('click', this._onDocClick);
    super.disconnectedCallback();
  }

  _toggle() { this.open ? this._close() : this._open(); }
  _open() { this.open = true; this.updateComplete.then(() => this._focusFirst()); }
  _close() { this.open = false; this._idx = -1; this._closeAllSubmenus(); this._resetTypeAhead(); }

  _items() { return Array.from(this.renderRoot.querySelectorAll('.item:not([submenu])')); }
  _menuItems() { return Array.from(this.renderRoot.querySelectorAll('.item')); }

  _focus(idx) {
    const items = this._items();
    if (!items.length) return;
    this._idx = (idx + items.length) % items.length;
    items[this._idx]?.focus();
  }
  _focusFirst() { this._focus(0); }

  _closeAllSubmenus() { this._menuItems().forEach(n => n.removeAttribute('sub-open')); }

  _handleDocKey(e) {
    if (!this.open || !this.isConnected) return;
    const items = this._items();
    if (!items.length) return;

    const active = items[this._idx];

    if (e.key === 'Escape') { e.preventDefault(); this._close(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); this._focus(this._idx + 1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); this._focus(this._idx - 1); }
    if (e.key === 'Home') { e.preventDefault(); this._focus(0); }
    if (e.key === 'End') { e.preventDefault(); this._focus(items.length - 1); }

    if (e.key === 'ArrowRight' && active) {
      const parent = active.closest('.item'); if (parent?.hasAttribute('submenu')) parent.setAttribute('sub-open','');
    }
    if (e.key === 'ArrowLeft') {
      const openSub = this.renderRoot.querySelector('.item[sub-open]'); if (openSub) openSub.removeAttribute('sub-open');
    }
    if (e.key === 'Enter' || e.key === ' ') {
      const el = items[this._idx]; if (el) { e.preventDefault(); el.click(); }
    }

    // type-ahead: a–z / 0–9 / space
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      this._typeAhead(e.key);
    }
  }

  _typeAhead(char) {
    this._typeBuf += char.toLowerCase();
    clearTimeout(this._typeTimer);
    this._typeTimer = setTimeout(() => this._resetTypeAhead(), 800);

    const items = this._items();
    const i = items.findIndex(n => (n.textContent || '').trim().toLowerCase().startsWith(this._typeBuf));
    if (i >= 0) this._focus(i);
  }
  _resetTypeAhead() { this._typeBuf = ''; }

  _select(value) {
    this.value = value;
    this.dispatchEvent(new CustomEvent('change', { detail: { value } }));
    this._close();
  }

  _renderPlacementStyle() {
    const p = this.placement;
    if (p.includes('bottom')) return 'top:100%; left:0;';
    if (p.includes('top')) return 'bottom:100%; left:0;';
    return 'top:100%; left:0;';
  }

  render() {
    return html`
      <button class="trigger" aria-haspopup="menu" aria-expanded=${this.open ? 'true' : 'false'} @click=${this._toggle}>
        <slot name="label">${this.label}</slot>
        <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M5.5 7.5l4.5 4.5 4.5-4.5z"/></svg>
      </button>

      <div class="panel" role="menu" style=${this._renderPlacementStyle()}>
        <slot @slotchange=${() => this._wire()}></slot>
      </div>
    `;
  }

  _wire() {
    const nodes = this.shadowRoot.querySelector('slot').assignedElements({ flatten: true });

    nodes.forEach((n) => {
      if (n.classList.contains('sep')) { n.setAttribute('role','separator'); return; }

      n.classList.add('item');
      n.setAttribute('role', 'menuitemradio');
      n.setAttribute('tabindex', '-1');
      n.setAttribute('aria-selected', 'false');

      const submenu = n.querySelector('[slot="submenu"]');
      if (submenu) {
        n.setAttribute('submenu', '');
        const wrap = document.createElement('div'); wrap.className = 'submenu';
        const kids = Array.from(submenu.childNodes); kids.forEach(k => wrap.appendChild(k));
        submenu.remove(); n.appendChild(wrap);
        n.addEventListener('mouseenter', () => n.setAttribute('sub-open',''));
        n.addEventListener('mouseleave', () => n.removeAttribute('sub-open'));
      }

      n.addEventListener('click', (ev) => {
        if (n.hasAttribute('submenu')) return;
        const val = n.getAttribute('value') ?? n.textContent.trim();
        this._menuItems().forEach(i => i.setAttribute('aria-current', 'false'));
        n.setAttribute('aria-current', 'true');
        this._select(val);
        ev.stopPropagation();
      }, { passive: true });
    });
  }
}

customElements.define('crusher-dropdown', CrusherDropdown);
