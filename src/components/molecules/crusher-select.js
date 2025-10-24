import { LitElement, html, css } from 'lit';

export class CrusherSelect extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    value: { type: String, reflect: true },
    placeholder: { type: String },
    items: { type: Array },              // optional static: [{value,label}]
    src: { type: String, reflect: true },// optional URL returning [{value,label}] (supports ?q=)
    loading: { type: Boolean, reflect: true },
    filter: { type: String, state: true }
  };

  constructor() {
    super();
    this.open = false;
    this.value = '';
    this.placeholder = 'Select…';
    this.items = undefined;
    this.src = '';
    this.loading = false;
    this.filter = '';
    this._idx = -1;
    this._onDocClick = (e) => { if (!this.contains(e.target)) this._close(); };
    this._onDocKey = (e) => this._handleKey(e);
    this._debounce = 0;
    this._typeBuf = '';
    this._typeTimer = 0;
  }

  static styles = css`
    :host { position: relative; display: inline-block; min-width: 220px; }
    .control {
      display:flex; align-items:center; gap:.5rem; justify-content: space-between;
      background: var(--crusher-surface); color: var(--crusher-fg);
      border: 1px solid var(--crusher-border);
      border-radius: var(--crusher-radius-md);
      padding: .5rem .6rem; cursor: pointer;
    }
    .value { color: var(--crusher-fg); }
    .placeholder { color: var(--crusher-fg-muted); }

    .panel {
      position: absolute; inset: auto 0 auto 0; top: calc(100% + .35rem);
      max-height: 260px; overflow: auto;
      background: var(--crusher-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: 1px solid var(--crusher-border);
      border-radius: var(--crusher-radius-lg);
      box-shadow: var(--crusher-shadow-2);
      padding: .25rem; display: none; z-index: var(--crusher-z-dropdown,100);
    }
    :host([open]) .panel { display: block; }

    .search { padding:.25rem; position: sticky; top: 0; background: inherit; }
    .search input {
      width:100%; padding:.5rem .6rem; border-radius: var(--crusher-radius-md);
      border: 1px solid var(--crusher-border);
      background: transparent; color: var(--crusher-fg); outline: none;
    }

    .item { display:flex; align-items:center; gap:.5rem;
      padding: .5rem .5rem; border-radius: var(--crusher-radius-md);
      color: var(--crusher-fg); cursor: pointer; }
    .item[aria-selected="true"] { background: color-mix(in srgb, var(--crusher-fg) 10%, transparent); }
    .item[aria-current="true"]::after { content:"✓"; margin-left:auto; opacity:.7; }

    .empty, .busy { color: var(--crusher-fg-muted); padding:.75rem; display:flex; align-items:center; gap:.5rem; }
    .spinner {
      width: 14px; height: 14px; border-radius: 50%;
      border: 2px solid color-mix(in srgb,var(--crusher-fg) 25%, transparent);
      border-top-color: var(--crusher-fg);
      animation: spin .9s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .sr { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
  `;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onDocClick);
    document.addEventListener('keydown', this._onDocKey);
  }
  disconnectedCallback() {
    document.removeEventListener('click', this._onDocClick);
    document.removeEventListener('keydown', this._onDocKey);
    super.disconnectedCallback();
  }

  async _ensureData() {
    if (Array.isArray(this.items) || !this.src) return;
    this.loading = true;
    try {
      const url = new URL(this.src, location.origin);
      if (this.filter) url.searchParams.set('q', this.filter);
      const res = await fetch(url, { headers: { 'accept': 'application/json' }});
      const json = await res.json();
      if (Array.isArray(json)) this.items = json;
    } catch (e) {
      console.warn('select fetch failed', e);
      this.items = [];
    } finally {
      this.loading = false;
      this._announce(`${this.items?.length ?? 0} result${(this.items?.length||0)===1?'':'s'}`);
    }
  }

  _toggle() { this.open ? this._close() : this._open(); }
  async _open() {
    this.open = true;
    await this._ensureData();
    this.updateComplete.then(() => this.renderRoot.querySelector('input')?.focus());
  }
  _close() { this.open = false; this._idx = -1; this._setFilter(''); this._resetTypeAhead(); }

  _allItems() {
    if (Array.isArray(this.items)) return this.items;
    const nodes = this.shadowRoot.querySelector('slot')?.assignedElements({ flatten: true }) ?? [];
    return nodes.filter(n => !(n.classList && n.classList.contains('sep'))).map(n => ({
      value: n.getAttribute('value') ?? n.textContent.trim(),
      label: n.textContent.trim()
    }));
  }

  _filtered() {
    const q = (this.filter || '').toLowerCase();
    const arr = this._allItems();
    const out = q ? arr.filter(it => it.label.toLowerCase().includes(q) || String(it.value).toLowerCase().includes(q)) : arr;
    return out;
  }

  _setFilter(v) {
    this.filter = v;
    clearTimeout(this._debounce);
    this._debounce = setTimeout(async () => {
      if (this.src) await this._ensureData();
      this._idx = 0; this.requestUpdate();
    }, 180);
  }

  _select(it) {
    this.value = it.value;
    this.dispatchEvent(new CustomEvent('change', { detail: { value: it.value, label: it.label } }));
    this._announce(`Selected ${it.label}`);
    this._close();
  }

  _announce(text) {
    const el = this.renderRoot?.getElementById?.('live');
    if (!el) return;
    el.textContent = ''; // flush
    // queue microtask to ensure screenreaders pick it up
    setTimeout(() => { el.textContent = text; }, 10);
  }

  _resetTypeAhead() { this._typeBuf = ''; clearTimeout(this._typeTimer); }
  _typeAhead(char) {
    this._typeBuf += char.toLowerCase();
    clearTimeout(this._typeTimer);
    this._typeTimer = setTimeout(() => this._resetTypeAhead(), 800);

    const items = this._filtered();
    const i = items.findIndex(n => (n.label || '').toLowerCase().startsWith(this._typeBuf));
    if (i >= 0) { this._idx = i; this.requestUpdate(); }
  }

  _handleKey(e) {
    if (!this.open || !this.isConnected) return;
    const items = this._filtered();
    if (!items.length) return;

    if (e.key === 'Escape') { e.preventDefault(); this._close(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); this._idx = Math.min(items.length - 1, this._idx + 1); this.requestUpdate(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); this._idx = Math.max(0, this._idx - 1); this.requestUpdate(); }
    if (e.key === 'Home') { e.preventDefault(); this._idx = 0; this.requestUpdate(); }
    if (e.key === 'End') { e.preventDefault(); this._idx = items.length - 1; this.requestUpdate(); }
    if (e.key === 'Enter') { e.preventDefault(); this._select(items[this._idx]); }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      this._typeAhead(e.key);
    }
  }

  render() {
    const items = this._filtered();
    const selectedLabel =
      Array.isArray(this.items)
        ? (this.items.find(i => String(i.value) === String(this.value))?.label)
        : this._allItems().find(i => String(i.value) === String(this.value))?.label;

    return html`
      <div class="control" role="combobox" aria-expanded=${this.open ? 'true' : 'false'} aria-haspopup="listbox" @click=${() => this._toggle()}>
        <span class=${selectedLabel ? 'value' : 'placeholder'}>${selectedLabel || this.placeholder}</span>
        ${this.loading ? html`<span class="spinner" aria-hidden="true"></span>` : html`
          <svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M5.5 7.5l4.5 4.5 4.5-4.5z"/></svg>
        `}
      </div>

      <div class="panel" role="listbox" aria-label="Options">
        <div class="search">
          <input type="text" placeholder="Type to filter…" .value=${this.filter} @input=${(e) => this._setFilter(e.target.value)} />
        </div>

        ${this.loading ? html`
          <div class="busy"><span class="spinner"></span> Loading…</div>
        ` : items.length ? items.map((it, i) => html`
          <div class="item" role="option"
               aria-selected=${i === this._idx}
               aria-current=${String(it.value) === String(this.value)}
               @click=${() => this._select(it)}>
            ${it.label}
          </div>
        `) : html`<div class="empty">No results</div>`}

        <slot hidden></slot>
      </div>

      <div id="live" class="sr" aria-live="polite"></div>
    `;
  }
}

customElements.define('crusher-select', CrusherSelect);
