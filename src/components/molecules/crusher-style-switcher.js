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
      box-shadow: var(--crusher-toolbar-shadow, var(--crusher-shadow-2));
    }
    .style-switcher.open { transform: translateX(calc(-1 * var(--crusher-spacing-6))); }
    .s-icon {
      appearance: none;
      position: absolute;
      height: var(--crusher-spacing-10);
      width: var(--crusher-spacing-10);
      text-align: center;
      color: var(--crusher-text-primary);
      right: 100%;
      border: var(--crusher-component-border-weight) solid var(--crusher-border-primary);
      margin-right: var(--crusher-spacing-6); cursor: pointer;
      transition: all var(--crusher-motion-duration-slow) var(--crusher-motion-easing-inout);
      border-radius: var(--crusher-radius-full); background: var(--crusher-background-surface);
      display: inline-flex; align-items: center; justify-content: center;
      padding: 0;
    }
    .style-switcher-toggler { top: 0; }
    .day-night { top: calc(var(--crusher-spacing-12) - var(--crusher-spacing-1)); }
    .s-icon:hover {
      background: color-mix(in srgb, var(--crusher-color-brand-primary) 12%, var(--crusher-background-surface));
    }
    .icon {
      display: block;
      inline-size: 1.05rem;
      block-size: 1.05rem;
    }

    h4 {
      margin: 0 0 var(--crusher-spacing-3);
      color: var(--crusher-text-secondary);
      font-size: var(--crusher-font-size-base);
      font-weight: var(--crusher-font-weight-semibold);
    }
    .colors { display: flex; flex-wrap: wrap; justify-content: space-between; }
    .swatch {
      appearance: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: calc(var(--crusher-spacing-8) - var(--crusher-focus-offset));
      width: calc(var(--crusher-spacing-8) - var(--crusher-focus-offset));
      border-radius: var(--crusher-radius-full);
      cursor: pointer;
      border: var(--crusher-component-border-weight) solid color-mix(in srgb, var(--crusher-border-primary) 85%, transparent);
      box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--crusher-color-base-white) 45%, transparent);
      padding: 0;
    }
    .swatch.active {
      box-shadow:
        0 0 0 2px color-mix(in srgb, var(--crusher-color-brand-primary) 20%, transparent),
        inset 0 0 0 2px color-mix(in srgb, var(--crusher-color-base-white) 70%, transparent);
    }
    .dialect-row { gap: var(--crusher-spacing-2); }
    .dialect-btn {
      padding: calc((var(--crusher-spacing-1) + var(--crusher-spacing-2)) / 2) var(--crusher-spacing-2);
      font-size: var(--crusher-font-size-sm);
      border-radius: var(--crusher-radius-md);
      border: var(--crusher-component-border-weight) solid color-mix(in srgb, var(--crusher-border-primary) 88%, transparent);
      background: color-mix(in srgb, var(--crusher-background-surface) 92%, transparent);
      color: var(--crusher-text-primary);
      cursor: pointer;
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
    activeBrand: { type: String, state: true },
    colors: { type: Object, state: true },
  };

  constructor() {
    super();
    this.isOpen = false;
    this.isDarkMode = document.documentElement.getAttribute('data-mode') === 'dark';
    this.activeTheme = document.documentElement.getAttribute('data-theme') || 'glass';
    this.activeBrand = '';

    this.colors = {
      secondary: '--crusher-color-brand-secondary',
      orange: '--crusher-color-brand-accent-orange',
      pink: '--crusher-color-brand-accent-pink',
      red: '--crusher-color-brand-accent-red',
    };
    this.themePrimaries = {
      glass: '#22c55e',
      minimal: '#111827',
      futuristic: '#22d3ee',
      neobrutal: '#7c3aed',
      neumorph: '#22c55e',
      brutal: '#111111',
      bento: '#16a34a',
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

  _normalizeColor(value) {
    if (!value) return '';
    const color = value.trim().toLowerCase();
    if (/^#[0-9a-f]{3}$/.test(color)) {
      return `#${[...color.slice(1)].map((part) => part + part).join('')}`;
    }
    if (/^#[0-9a-f]{6}$/.test(color)) return color;
    const rgb = color.match(/rgba?\(([^)]+)\)/);
    if (!rgb) return color;
    const parts = rgb[1]
      .split(',')
      .slice(0, 3)
      .map((part) => Math.max(0, Math.min(255, Math.round(Number.parseFloat(part.trim())))));
    if (parts.some((part) => Number.isNaN(part))) return color;
    return `#${parts.map((part) => part.toString(16).padStart(2, '0')).join('')}`;
  }

  _getThemePrimary() {
    return this.themePrimaries[this.activeTheme] || this.themePrimaries.glass;
  }

  _getSwatches() {
    const styles = getComputedStyle(document.documentElement);
    return [
      { id: 'theme', label: 'Theme primary', color: this._getThemePrimary() },
      ...Object.entries(this.colors).map(([id, token]) => ({
        id,
        label: id,
        color: this._normalizeColor(styles.getPropertyValue(token)),
      })),
    ];
  }

  _setActiveColor(color) {
    const resolved = this._normalizeColor(color);
    if (!resolved) return;
    document.documentElement.style.setProperty('--crusher-color-brand-primary', resolved);
    window.dispatchEvent(new CustomEvent(BRAND_EVENT, { detail: { brand: resolved } }));
  }

  _setTheme(name) { setTheme(name); }

  _syncFromDom() {
    this.isDarkMode = document.documentElement.getAttribute('data-mode') === 'dark';
    this.activeTheme = document.documentElement.getAttribute('data-theme') || 'glass';
    this.activeBrand = this._normalizeColor(getComputedStyle(document.documentElement).getPropertyValue('--crusher-color-brand-primary'));
  }

  _iconTemplate(kind) {
    if (kind === 'gear') {
      return html`
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3.25"></circle>
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.4l-1.2 1.2a1 1 0 0 1-1.4 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-1.8a1 1 0 0 1-1-1v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 1-1.4 0l-1.2-1.2a1 1 0 0 1 0-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1 1 0 0 1-1-1v-1.8a1 1 0 0 1 1-1h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 0 1 0-1.4L6 5.2a1 1 0 0 1 1.4 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a1 1 0 0 1 1-1h1.8a1 1 0 0 1 1 1v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.4 0l1.2 1.2a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1h-.2a1 1 0 0 0-.9.6Z"></path>
        </svg>
      `;
    }
    if (kind === 'sun') {
      return html`
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2.5v2.5M12 19v2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2.5 12H5M19 12h2.5M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"></path>
        </svg>
      `;
    }
    return html`
      <svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21 15.5A9 9 0 0 1 8.5 3 9 9 0 1 0 21 15.5Z"></path>
      </svg>
    `;
  }

  render() {
    const classes = { 'style-switcher': true, open: this.isOpen };
    const swatches = this._getSwatches();
    return html`
      <div class=${classMap(classes)}>
        <button type="button" class="style-switcher-toggler s-icon" @click=${this._togglePanel} title="Open styles">
          ${this._iconTemplate('gear')}
        </button>
        <button type="button" class="day-night s-icon" @click=${this._toggleDarkMode} title="Toggle dark mode">
          ${this._iconTemplate(this.isDarkMode ? 'sun' : 'moon')}
        </button>

        <h4>Theme Colors</h4>
        <div class="colors">
          ${swatches.map((swatch) => html`
            <button
              type="button"
              class="swatch ${this.activeBrand === swatch.color ? 'active' : ''}"
              style="background: ${swatch.color}"
              title=${swatch.label}
              aria-label=${swatch.label}
              @click=${() => this._setActiveColor(swatch.color)}
            ></button>
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
