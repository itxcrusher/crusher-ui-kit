import { setMode, setTheme } from '../../runtime/theme.js';
import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

const THEME_EVENT = 'crusher:themechange';
const BRAND_EVENT = 'crusher:brandchange';

export class CrusherStyleSwitcher extends LitElement {
  static styles = css`
    .style-switcher {
      position: fixed;
      right: 0;
      top: var(--crusher-spacing-12);
      padding: var(--crusher-spacing-4);
      width: calc(var(--crusher-spacing-10) * 5);
      border-radius: var(--crusher-radius-md);
      z-index: calc(var(--crusher-z-dropdown) + 1);
      transition: transform var(--crusher-motion-duration-slow) var(--crusher-motion-easing-inout);
      transform: translateX(100%);
      background: var(--crusher-background-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: var(--crusher-component-border-weight) solid var(--crusher-border-primary);
    }
    .style-switcher.open { transform: translateX(calc(-1 * var(--crusher-spacing-6))); }
    .s-icon {
      position: absolute; height: var(--crusher-spacing-10); width: var(--crusher-spacing-10); text-align: center;
      font-size: var(--crusher-font-size-lg); color: var(--crusher-text-primary);
      right: 100%; border: var(--crusher-component-border-weight) solid var(--crusher-border-primary);
      margin-right: var(--crusher-spacing-6); cursor: pointer;
      transition: all var(--crusher-motion-duration-slow) var(--crusher-motion-easing-inout);
      border-radius: var(--crusher-radius-full); background: var(--crusher-background-surface);
      display: inline-flex; align-items: center; justify-content: center;
    }
    .style-switcher-toggler { top: 0; }
    .day-night { top: calc(var(--crusher-spacing-12) - var(--crusher-spacing-1)); }

    h4 {
      margin: 0 0 var(--crusher-spacing-3);
      color: var(--crusher-text-secondary);
      font-size: var(--crusher-font-size-base);
      font-weight: var(--crusher-font-weight-semibold);
    }
    .colors { display: flex; flex-wrap: wrap; justify-content: space-between; }
    .colors span {
      display: inline-block;
      height: calc(var(--crusher-spacing-8) - var(--crusher-focus-offset));
      width: calc(var(--crusher-spacing-8) - var(--crusher-focus-offset));
      border-radius: var(--crusher-radius-full); cursor: pointer;
    }
    .dialect-row { gap: var(--crusher-spacing-2); }
    .dialect-btn {
      padding: calc((var(--crusher-spacing-1) + var(--crusher-spacing-2)) / 2) var(--crusher-spacing-2);
      font-size: var(--crusher-font-size-sm);
    }
    .dialect-btn.active {
      background: color-mix(in srgb, var(--crusher-color-brand-primary) 16%, transparent);
      border-color: color-mix(in srgb, var(--crusher-color-brand-primary) 44%, var(--crusher-border-primary));
      color: var(--crusher-text-primary);
      box-shadow: 0 0 0 var(--crusher-component-border-weight) color-mix(in srgb, var(--crusher-color-brand-primary) 20%, transparent);
    }
  `;

  static properties = {
    isOpen: { type: Boolean, state: true },
    isDarkMode: { type: Boolean, state: true },
    activeTheme: { type: String, state: true },
    colors: { type: Object, state: true },
  };

  constructor() {
    super();
    this.isOpen = false;
    this.isDarkMode = document.documentElement.getAttribute('data-mode') === 'dark';
    this.activeTheme = document.documentElement.getAttribute('data-theme') || 'glass';

    this.colors = {
      primary: '--crusher-color-brand-primary',
      secondary: '--crusher-color-brand-secondary',
      orange: '--crusher-color-brand-accent-orange',
      pink: '--crusher-color-brand-accent-pink',
      red: '--crusher-color-brand-accent-red',
    };

    this._syncFromDom = this._syncFromDom.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(THEME_EVENT, this._syncFromDom);
    this._syncFromDom();
  }

  disconnectedCallback() {
    window.removeEventListener(THEME_EVENT, this._syncFromDom);
    super.disconnectedCallback();
  }

  _togglePanel() { this.isOpen = !this.isOpen; }

  _toggleDarkMode() {
    setMode(this.isDarkMode ? 'light' : 'dark');
  }

  _setActiveColor(token) {
    const resolved = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    if (!resolved) return;
    document.documentElement.style.setProperty('--crusher-color-brand-primary', resolved);
    window.dispatchEvent(new CustomEvent(BRAND_EVENT, { detail: { brand: resolved } }));
  }

  _setTheme(name) { setTheme(name); }

  _syncFromDom() {
    this.isDarkMode = document.documentElement.getAttribute('data-mode') === 'dark';
    this.activeTheme = document.documentElement.getAttribute('data-theme') || 'glass';
  }

  render() {
    const classes = { 'style-switcher': true, open: this.isOpen };
    return html`
      <div class=${classMap(classes)}>
        <div class="style-switcher-toggler s-icon" @click=${this._togglePanel} title="Open styles">
          <i class="fas fa-cog fa-spin" aria-hidden="true"></i>
        </div>
        <div class="day-night s-icon" @click=${this._toggleDarkMode} title="Toggle dark mode">
          <i class=${this.isDarkMode ? 'fas fa-sun' : 'fas fa-moon'} aria-hidden="true"></i>
        </div>

        <h4>Theme Colors</h4>
        <div class="colors">
          ${Object.entries(this.colors).map(([_, token]) => html`
            <span style="background: var(${token})" @click=${() => this._setActiveColor(token)}></span>
          `)}
        </div>

        <h4 style="margin-top: var(--crusher-spacing-4)">Dialects</h4>
        <div class="colors dialect-row">
          ${['glass','brutal','neumorph','neobrutal','minimal','futuristic','bento'].map(t => html`
            <button class="btn dialect-btn ${this.activeTheme === t ? 'active' : ''}"
              @click=${() => this._setTheme(t)}>${t}</button>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('crusher-style-switcher', CrusherStyleSwitcher);
