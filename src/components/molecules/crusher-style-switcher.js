import { setMode, setTheme } from '../../runtime/theme.js';
import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export class CrusherStyleSwitcher extends LitElement {
  static styles = css`
    .style-switcher {
      position: fixed;
      right: 0;
      top: var(--crusher-spacing-12);
      padding: var(--crusher-spacing-4);
      width: 200px;
      border-radius: var(--crusher-radius-md);
      z-index: 101;
      transition: transform 0.3s ease;
      transform: translateX(100%);
      background: var(--crusher-background-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: 1px solid var(--crusher-border-primary);
    }
    .style-switcher.open { transform: translateX(calc(-1 * var(--crusher-spacing-6))); }
    .s-icon {
      position: absolute; height: 40px; width: 40px; text-align: center;
      font-size: var(--crusher-font-size-lg); color: var(--crusher-text-primary);
      right: 100%; border: 1px solid var(--crusher-border-primary);
      margin-right: var(--crusher-spacing-6); cursor: pointer; transition: all 0.3s ease;
      border-radius: var(--crusher-radius-full); background: var(--crusher-background-surface);
      display: inline-flex; align-items: center; justify-content: center;
    }
    .style-switcher-toggler { top: 0; }
    .day-night { top: 55px; }

    h4 {
      margin: 0 0 var(--crusher-spacing-3);
      color: var(--crusher-text-secondary);
      font-size: var(--crusher-font-size-base);
      font-weight: var(--crusher-font-weight-semibold);
    }
    .colors { display: flex; flex-wrap: wrap; justify-content: space-between; }
    .colors span {
      display: inline-block; height: 30px; width: 30px;
      border-radius: var(--crusher-radius-full); cursor: pointer;
    }
  `;

  static properties = {
    isOpen: { type: Boolean, state: true },
    isDarkMode: { type: Boolean, state: true },
    colors: { type: Object, state: true },
  };

  constructor() {
    super();
    this.isOpen = false;

    // Read actual current mode from the DOM (set by runtime/theme.js),
    // fall back to system preference if attribute not present yet.
    const modeAttr = document.documentElement.getAttribute('data-mode');
    this.isDarkMode = modeAttr
      ? modeAttr === 'dark'
      : (window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false);

    this.colors = {
      primary: 'var(--crusher-color-brand-primary)',
      secondary: 'var(--crusher-color-brand-secondary)',
      orange: 'var(--crusher-color-brand-accent-orange)',
      pink: 'var(--crusher-color-brand-accent-pink)',
      red: 'var(--crusher-color-brand-accent-red)',
    };
  }

  _togglePanel() { this.isOpen = !this.isOpen; }

  _toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    setMode(this.isDarkMode ? 'dark' : 'light');
  }

  _setActiveColor(colorVar) {
    document.documentElement.style.setProperty('--crusher-color-brand-primary', colorVar);
    document.body?.style?.setProperty('--crusher-color-brand-primary', colorVar);
  }

  _setTheme(name) { setTheme(name); }

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
          ${Object.entries(this.colors).map(([_, colorVar]) => html`
            <span style="background: ${colorVar}" @click=${() => this._setActiveColor(colorVar)}></span>
          `)}
        </div>

        <h4 style="margin-top: var(--crusher-spacing-4)">Dialects</h4>
        <div class="colors" style="gap: 8px;">
          ${['glass','brutal','neumorph','neobrutal','minimal','futuristic','bento'].map(t => html`
            <button class="btn" style="padding:.375rem .5rem; font-size: var(--crusher-font-size-sm);"
              @click=${() => this._setTheme(t)}>${t}</button>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('crusher-style-switcher', CrusherStyleSwitcher);
