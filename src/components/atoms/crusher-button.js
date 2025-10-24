import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

const VARIANTS = ['primary','secondary','ghost','outline','subtle','destructive'];
const SIZES = ['sm','md','lg'];

export class CrusherButton extends LitElement {
  static properties = {
    variant:   { type: String, reflect: true },
    size:      { type: String, reflect: true },
    disabled:  { type: Boolean, reflect: true },
    loading:   { type: Boolean, reflect: true },
    fullWidth: { type: Boolean, attribute: 'full-width', reflect: true }
  };

  constructor() {
    super();
    this.variant = 'primary';
    this.size = 'md';
    this.disabled = false;
    this.loading = false;
    this.fullWidth = false;
  }

  static styles = css`
    :host {
      display: inline-flex;
      --btn-radius: var(--crusher-component-radius, var(--crusher-radius-md));
      --btn-elev:  var(--crusher-component-elevation, var(--crusher-shadow-2));
      --btn-hov-lift: var(--crusher-component-control-hoverLift, translateY(-2px));
      --btn-focus: 0 0 0 3px color-mix(in srgb, var(--crusher-color-brand-primary), #fff 80%);
    }

    /* Base control */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--crusher-spacing-2);
      border-radius: var(--btn-radius);
      border: 1px solid transparent;
      box-shadow: var(--btn-elev);
      font-family: var(--crusher-font-family-body);
      font-weight: var(--crusher-font-weight-semibold);
      line-height: 1;
      cursor: pointer;
      transition:
        transform var(--crusher-transition-duration-base, .2s) var(--crusher-transition-easing-inout, ease),
        opacity   var(--crusher-transition-duration-base, .2s) var(--crusher-transition-easing-inout, ease),
        box-shadow var(--crusher-transition-duration-base, .2s) var(--crusher-transition-easing-inout, ease),
        background-color var(--crusher-transition-duration-base, .2s);
      user-select: none;
    }
    .btn:focus-visible { outline: none; box-shadow: var(--btn-focus); }
    .btn:hover { transform: var(--btn-hov-lift); }
    .btn:active { transform: translateY(0); }

    /* Sizes */
    .btn--sm { padding: var(--crusher-spacing-2) var(--crusher-spacing-3); font-size: var(--crusher-font-size-sm); }
    .btn--md { padding: var(--crusher-spacing-3) var(--crusher-spacing-6); font-size: var(--crusher-font-size-base); }
    .btn--lg { padding: var(--crusher-spacing-4) var(--crusher-spacing-8); font-size: var(--crusher-font-size-lg); }

    /* Width */
    .btn--full { width: 100%; }

    /* Variants – built on semantic layer */
    .btn--primary {
      background: var(--state-control-bg-default, var(--crusher-color-brand-primary));
      color: var(--state-control-fg-default, var(--crusher-color-base-white));
      border-color: color-mix(in srgb, currentColor 12%, transparent);
    }
    .btn--secondary {
      background: var(--crusher-color-brand-secondary);
      color: var(--crusher-color-base-white);
      border-color: color-mix(in srgb, currentColor 12%, transparent);
    }
    .btn--destructive {
      background: var(--crusher-color-brand-accent-red);
      color: var(--crusher-color-base-white);
      border-color: color-mix(in srgb, currentColor 12%, transparent);
    }
    .btn--outline {
      background: transparent;
      color: var(--crusher-text-primary);
      border-color: var(--crusher-border-primary);
      box-shadow: none;
    }
    .btn--ghost {
      background: color-mix(in srgb, var(--crusher-text-primary) 8%, transparent);
      color: var(--crusher-text-primary);
      border-color: transparent;
      box-shadow: none;
    }
    .btn--subtle {
      background: var(--crusher-background-surface);
      color: var(--crusher-text-primary);
      border-color: var(--crusher-border-primary);
    }

    /* Loading / Disabled */
    .btn[aria-busy="true"],
    .btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    /* Icon slot sizing */
    ::slotted([slot="icon"]) {
      inline-size: 1.2em;
      block-size: 1.2em;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Expose parts for deep theming */
    .btn { 
      /* parts are forwarded via <slot part="…">, but also expose the control itself */
      /* no-op selector to make intent clear */ 
    }
  `;

  /** prevent clicks while disabled/loading */
  _onClick(e) {
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  }

  render() {
    const v = VARIANTS.includes(this.variant) ? this.variant : 'primary';
    const s = SIZES.includes(this.size) ? this.size : 'md';

    const classes = {
      btn: true,
      [`btn--${v}`]: true,
      [`btn--${s}`]: true,
      'btn--full': this.fullWidth,
    };

    return html`
      <button
        class=${classMap(classes)}
        part="control"
        ?disabled=${this.disabled}
        aria-busy=${this.loading ? 'true' : 'false'}
        @click=${this._onClick}
      >
        <!-- optional leading icon -->
        <slot name="icon" part="icon"></slot>

        <!-- label -->
        <span part="label">
          <slot></slot>
        </span>

        <!-- loading spinner -->
        ${this.loading ? html`
          <span part="spinner" aria-hidden="true" style="display:inline-flex">
            <!-- tiny CSS spinner -->
            <svg viewBox="0 0 50 50" width="16" height="16" style="animation: spin 1s linear infinite;">
              <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="6" opacity="0.2"/>
              <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="6"
                stroke-linecap="round" stroke-dasharray="31.4 188.4"/>
            </svg>
          </span>
        ` : null}
      </button>
      <style>
        @keyframes spin { to { transform: rotate(360deg) } }
      </style>
    `;
  }
}

customElements.define('crusher-button', CrusherButton);
