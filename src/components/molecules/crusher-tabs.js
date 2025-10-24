import { LitElement, html, css } from 'lit';

export class CrusherTabs extends LitElement {
  static properties = {
    value: { type: String, reflect: true },
    syncHash: { type: Boolean, attribute: 'sync-hash', reflect: true }
  };

  constructor() {
    super();
    this.value = '';
    this.syncHash = false;
    this._onHash = () => this.syncHash && this._activateFromHash();
  }

  static styles = css`
    :host { display: block; }
    .list {
      display: flex; gap: .25rem; overflow-x: auto;
      border-bottom: 1px solid var(--crusher-border);
    }
    ::slotted([slot="tab"]) {
      appearance:none; background:transparent; border:none; cursor:pointer;
      padding: .5rem .75rem; border-radius: var(--crusher-radius-md) var(--crusher-radius-md) 0 0;
      color: var(--crusher-fg-muted); white-space: nowrap;
    }
    ::slotted([slot="tab"][aria-selected="true"]) {
      color: var(--crusher-fg);
      background: var(--crusher-surface);
      border: 1px solid var(--crusher-border);
      border-bottom-color: transparent;
    }
    .panel {
      border: 1px solid var(--crusher-border);
      border-radius: 0 var(--crusher-radius-lg) var(--crusher-radius-lg) var(--crusher-radius-lg);
      padding: var(--crusher-spacing-6);
      background: var(--crusher-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      box-shadow: var(--crusher-shadow-1);
    }

    .sr { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('hashchange', this._onHash);
  }
  disconnectedCallback() {
    window.removeEventListener('hashchange', this._onHash);
    super.disconnectedCallback();
  }

  firstUpdated() {
    const tabs = this._tabs();
    const panels = this._panels();

    // Generate ids if missing and wire aria
    tabs.forEach((t, i) => {
      if (!t.id) t.id = `tab-${i+1}`;
      const p = panels.find(p => p.id === `${t.id}-panel`) || panels[i];
      if (p) {
        if (!p.id) p.id = `${t.id}-panel`;
        t.setAttribute('aria-controls', p.id);
        p.setAttribute('aria-labelledby', t.id);
      }
      t.setAttribute('role','tab');
      t.tabIndex = -1;
      t.addEventListener('click', () => this._activate(t.id));
    });

    if (!this.value && tabs.length) this.value = tabs[0].id;
    this._applyActive();

    if (this.syncHash) this._activateFromHash();
  }

  _tabs() { return this.renderRoot.querySelector('slot[name="tab"]')?.assignedElements({ flatten: true }) ?? []; }
  _panels() { return this.renderRoot.querySelector('slot[name="panel"]')?.assignedElements({ flatten: true }) ?? []; }

  _applyActive() {
    const tabs = this._tabs();
    const active = this.value;
    tabs.forEach(t => {
      const on = t.id === active;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    const panels = this._panels();
    panels.forEach(p => p.hidden = (p.getAttribute('aria-labelledby') !== active));
    this._announce(`Tab ${active} selected`);
  }

  _activate(id) {
    if (!id) return;
    this.value = id;
    this._applyActive();
    this.dispatchEvent(new CustomEvent('change', { detail: { value: id } }));
    if (this.syncHash) history.replaceState(null, '', `#${id}`);
  }

  _activateFromHash() {
    const h = location.hash?.slice(1);
    if (!h) return;
    const tab = this._tabs().find(t => t.id === h);
    if (tab) this._activate(h);
  }

  _onKey(e) {
    const tabs = this._tabs();
    const idx = tabs.findIndex(t => t.id === this.value);
    if (idx < 0) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); this._activate(tabs[(idx+1)%tabs.length].id); tabs[(idx+1)%tabs.length].focus(); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); this._activate(tabs[(idx-1+tabs.length)%tabs.length].id); tabs[(idx-1+tabs.length)%tabs.length].focus(); }
    if (e.key === 'Home')       { e.preventDefault(); this._activate(tabs[0].id); tabs[0].focus(); }
    if (e.key === 'End')        { e.preventDefault(); this._activate(tabs[tabs.length-1].id); tabs[tabs.length-1].focus(); }
  }

  _announce(text) {
    const el = this.renderRoot?.getElementById?.('live');
    if (!el) return;
    el.textContent = '';
    setTimeout(() => { el.textContent = text; }, 10);
  }

  render() {
    return html`
      <div class="list" role="tablist" @keydown=${this._onKey}>
        <slot name="tab"></slot>
      </div>
      <slot name="panel"></slot>
      <div id="live" class="sr" aria-live="polite"></div>
    `;
  }
}

customElements.define('crusher-tabs', CrusherTabs);
