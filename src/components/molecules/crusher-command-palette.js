import { LitElement, html, css } from 'lit';

const PALETTE_EVT = 'crusher:palette';

/* Tiny fuzzy: score 0..1, with lightweight acronym bonuses */
function fuzzyScore(query, text) {
  if (!query) return 0;
  query = query.toLowerCase().trim();
  text = text.toLowerCase();
  let qi = 0, ti = 0, score = 0, streak = 0, acr = 0;
  while (qi < query.length && ti < text.length) {
    if (query[qi] === text[ti]) { qi++; streak++; score += 1 + Math.min(0.5, streak*0.05); }
    else { streak = 0; }
    // acronym boost (char matches after space or delimiter)
    if (query[qi-1] && text[ti] === query[qi-1] && (ti === 0 || /[\s_\-./]/.test(text[ti-1]))) acr += 0.2;
    ti++;
  }
  if (qi < query.length) return 0;
  const norm = (score / (text.length + 1)) + acr;
  return Math.min(1, norm);
}

export class CrusherCommandPalette extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    query: { type: String },
    items: { type: Array },   // [{ id, label, group?, keywords?, run?:fn }]
    provider: { type: Function }, // async (query) => [{...}]
    placeholder: { type: String }
  };

  constructor() {
    super();
    this.open = false;
    this.query = '';
    this.items = [];
    this.placeholder = 'Jump to…';
    this._busy = false;
    this._idx = 0;
    this._debounce = 0;
    this._docKey = (e) => this._onDocKey(e);
    this._paletteEvent = (e) => this._onPaletteEvent(e);
  }

  static styles = css`
    :host { position: fixed; inset: 0; display: none; z-index: var(--crusher-z-palette); }
    :host([open]) { display: block; }

    .overlay { position: absolute; inset: 0; background: rgba(0,0,0,.5); }
    .panel {
      position: absolute; left: 50%; top: 12%;
      transform: translateX(-50%);
      width: min(800px, 92vw);
      background: var(--crusher-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: 1px solid var(--crusher-border);
      border-radius: var(--crusher-radius-lg);
      box-shadow: var(--crusher-shadow-2);
      display: grid; grid-template-rows: auto 1fr;
    }
    .search { padding: .5rem .75rem; }
    .search input {
      width: 100%; padding: .6rem .7rem; border-radius: var(--crusher-radius-md);
      border: 1px solid var(--crusher-border); background: transparent; color: var(--crusher-fg);
    }
    .results { max-height: 60vh; overflow: auto; padding: .25rem; }
    .group { padding: .4rem .5rem; font-size: var(--crusher-font-size-sm); color: var(--crusher-fg-muted); }
    .item {
      padding: .45rem .5rem; border-radius: var(--crusher-radius-md);
      display:flex; align-items:center; gap:.5rem; cursor: pointer;
    }
    .item[aria-selected="true"] { background: color-mix(in srgb, var(--crusher-fg) 10%, transparent); }
    .busy, .empty { padding: .75rem; color: var(--crusher-fg-muted); }
    .spinner {
      width: 14px; height: 14px; border-radius: 50%;
      border: 2px solid color-mix(in srgb,var(--crusher-fg) 25%, transparent);
      border-top-color: var(--crusher-fg);
      animation: spin .9s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._docKey);
    window.addEventListener(PALETTE_EVT, this._paletteEvent);
  }
  disconnectedCallback() {
    document.removeEventListener('keydown', this._docKey);
    window.removeEventListener(PALETTE_EVT, this._paletteEvent);
    super.disconnectedCallback();
  }

  openPalette() { this._open(); }
  closePalette() { this._close(); }
  togglePalette() { this.open ? this._close() : this._open(); }

  _open() { this.open = true; this.updateComplete.then(() => this.renderRoot.querySelector('input')?.focus()); }
  _close() { this.open = false; this.query = ''; this._idx = 0; }

  async _runSearch() {
    clearTimeout(this._debounce);
    this._debounce = setTimeout(async () => {
      if (typeof this.provider === 'function') {
        this._busy = true; this.requestUpdate();
        try {
          const res = await this.provider(this.query);
          if (Array.isArray(res)) this.items = res;
        } catch (e) { console.warn('palette provider failed', e); }
        this._busy = false;
      }
      this.requestUpdate();
    }, 120);
  }

  _filtered() {
    const q = (this.query || '').trim();
    if (!q) return this._grouped(this.items);
    const scored = this.items
      .map(it => {
        const hay = [it.label, ...(it.keywords || [])].filter(Boolean).join(' ');
        return { it, s: fuzzyScore(q, hay) };
      })
      .filter(x => x.s > 0.08) // threshold
      .sort((a,b) => b.s - a.s)
      .map(x => x.it);
    return this._grouped(scored);
  }

  _grouped(arr) {
    const map = new Map();
    arr.forEach(it => {
      const g = it.group || 'General';
      if (!map.has(g)) map.set(g, []);
      map.get(g).push(it);
    });
    return Array.from(map.entries()); // [group, items[]]
  }

  _onPaletteEvent(e) {
    const detail = e?.detail || {};
    if (detail.toggle || detail.action === 'toggle') {
      this.togglePalette();
      return;
    }
    if (detail.open === true || detail.action === 'open') {
      this._open();
      return;
    }
    if (detail.open === false || detail.action === 'close') {
      this._close();
    }
  }

  _onDocKey(e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      if (e.defaultPrevented) return;
      e.preventDefault(); this.togglePalette(); return;
    }
    if (!this.open) return;
    const groups = this._filtered();
    const flat = groups.flatMap(([g, arr]) => arr);
    if (e.key === 'Escape') { this._close(); }
    if (e.key === 'ArrowDown') { e.preventDefault(); this._idx = Math.min(flat.length-1, this._idx+1); this.requestUpdate(); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); this._idx = Math.max(0, this._idx-1); this.requestUpdate(); }
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = flat[this._idx];
      if (target?.run) target.run();
      this.dispatchEvent(new CustomEvent('run', { detail: target }));
      this._close();
    }
  }

  render() {
    const g = this._filtered();
    const flat = g.flatMap(([_, arr]) => arr);

    return html`
      <div class="overlay" @click=${() => this._close()}></div>
      <div class="panel" role="dialog" aria-modal="true">
        <div class="search">
          <input type="text" .value=${this.query} placeholder=${this.placeholder}
                 @input=${(e) => { this.query = e.target.value; this._runSearch(); }} />
        </div>
        <div class="results" role="listbox" aria-label="Commands">
          ${this._busy ? html`<div class="busy"><span class="spinner"></span> Searching…</div>` : null}
          ${!this._busy && flat.length === 0 ? html`<div class="empty">No results</div>` : null}
          ${g.map(([group, arr]) => html`
            <div class="group">${group}</div>
            ${arr.map((it, i0) => {
              const i = g.slice(0, g.findIndex(([gg]) => gg===group)).reduce((acc,[,a]) => acc+a.length,0) + i0;
              return html`
                <div class="item" role="option" aria-selected=${i===this._idx}
                     @click=${() => { it.run?.(); this.dispatchEvent(new CustomEvent('run', { detail: it })); this._close(); }}>
                  ${it.icon ? it.icon : ''}
                  <div>${it.label}</div>
                </div>
              `;
            })}
          `)}
        </div>
      </div>
    `;
  }
}
customElements.define('crusher-command-palette', CrusherCommandPalette);
