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
        <div class="colors dialect-row">
          ${['glass','brutal','neumorph','neobrutal','minimal','futuristic','bento'].map(t => html`
            <button class="btn dialect-btn"
              @click=${() => this._setTheme(t)}>${t}</button>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('crusher-style-switcher', CrusherStyleSwitcher);
