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
    :host { display: inline-flex; }

    /* ===== Base control driven by bridge+dialect variables ===== */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--crusher-spacing-2);

      font-family: var(--crusher-font-family-body);
      font-weight: var(--crusher-font-weight-semibold);
      line-height: 1;
      user-select: none;
      cursor: pointer;

      /* Shape & elevation come from dialect */
      border-radius: var(--ctl-radius, var(--crusher-component-radius, var(--crusher-radius-md)));
      border-width: var(--ctl-border-weight, var(--crusher-component-border-weight));
      border-style: solid;
      border-color: var(--btn-border, transparent);
      box-shadow: var(--ctl-elev, var(--crusher-component-elevation, var(--crusher-shadow-2)));
      backdrop-filter: var(--ctl-backdrop, none);
      -webkit-backdrop-filter: var(--ctl-backdrop, none);

      transition:
        transform var(--crusher-transition-duration-base, var(--crusher-motion-duration-base)) var(--crusher-transition-easing-inout, var(--crusher-motion-easing-inout)),
        opacity   var(--crusher-transition-duration-base, var(--crusher-motion-duration-base)) var(--crusher-transition-easing-inout, var(--crusher-motion-easing-inout)),
        box-shadow var(--crusher-transition-duration-base, var(--crusher-motion-duration-base)) var(--crusher-transition-easing-inout, var(--crusher-motion-easing-inout)),
        background-color var(--crusher-transition-duration-base, var(--crusher-motion-duration-base)),
        color var(--crusher-transition-duration-base, var(--crusher-motion-duration-base)),
        border-color var(--crusher-transition-duration-base, var(--crusher-motion-duration-base)),
        text-shadow var(--crusher-transition-duration-base, var(--crusher-motion-duration-base)),
        letter-spacing var(--crusher-transition-duration-base, var(--crusher-motion-duration-base));
    }
    .btn:focus-visible {
      outline: none;
      box-shadow: var(--btn-focus-ring, 0 0 0 var(--crusher-state-focus-ring-width) color-mix(in srgb, var(--crusher-color-brand-primary), var(--crusher-color-base-white) 80%));
    }
    .btn:hover {
      transform: var(--ctl-hover-lift, var(--crusher-component-control-hover-lift));
      box-shadow: var(--ctl-elev-hover, var(--ctl-elev));
      text-shadow: var(--btn-text-shadow-hover, none);
    }
    .btn:active { transform: translateY(0); }

    /* Sizes */
    .btn--sm { padding: var(--crusher-spacing-2) var(--crusher-spacing-3); font-size: var(--crusher-font-size-sm); }
    .btn--md { padding: var(--crusher-spacing-3) var(--crusher-spacing-6); font-size: var(--crusher-font-size-base); }
    .btn--lg { padding: var(--crusher-spacing-4) var(--crusher-spacing-8); font-size: var(--crusher-font-size-lg); }

    /* Width */
    .btn--full { width: 100%; }

    /* ===== Variants (purely variable-driven) ===== */
    .btn--primary {
      background: var(--btn-primary-bg, var(--state-control-bg-default));
      color:      var(--btn-primary-fg, var(--state-control-fg-default));
      border-color: var(--btn-primary-border, color-mix(in srgb, currentColor 12%, transparent));
      box-shadow: var(--btn-primary-shadow, var(--ctl-elev));
      letter-spacing: var(--btn-primary-letter, normal);
      text-shadow: var(--btn-primary-text-shadow, none);
    }
    .btn--secondary {
      background: var(--btn-secondary-bg, var(--crusher-color-brand-secondary));
      color:      var(--btn-secondary-fg, var(--crusher-color-base-white));
      border-color: var(--btn-secondary-border, color-mix(in srgb, currentColor 12%, transparent));
      box-shadow: var(--btn-secondary-shadow, var(--ctl-elev));
      letter-spacing: var(--btn-secondary-letter, normal);
      text-shadow: var(--btn-secondary-text-shadow, none);
    }
    .btn--destructive {
      background: var(--btn-danger-bg, var(--crusher-color-brand-accent-red));
      color:      var(--btn-danger-fg, var(--crusher-color-base-white));
      border-color: var(--btn-danger-border, color-mix(in srgb, currentColor 12%, transparent));
      box-shadow: var(--btn-danger-shadow, var(--ctl-elev));
      letter-spacing: var(--btn-danger-letter, normal);
      text-shadow: var(--btn-danger-text-shadow, none);
    }
    .btn--outline {
      background: var(--btn-outline-bg, transparent);
      color:      var(--btn-outline-fg, var(--crusher-text-primary));
      border-color: var(--btn-outline-border, var(--crusher-border-primary));
      box-shadow: var(--btn-outline-shadow, none);
      letter-spacing: var(--btn-outline-letter, normal);
      text-shadow: var(--btn-outline-text-shadow, none);
    }
    .btn--ghost {
      background: var(--btn-ghost-bg, color-mix(in srgb, var(--crusher-text-primary) 8%, transparent));
      color:      var(--btn-ghost-fg, var(--crusher-text-primary));
      border-color: var(--btn-ghost-border, transparent);
      box-shadow: var(--btn-ghost-shadow, none);
      letter-spacing: var(--btn-ghost-letter, normal);
      text-shadow: var(--btn-ghost-text-shadow, none);
    }
    .btn--subtle {
      background: var(--btn-subtle-bg, var(--crusher-background-surface));
      color:      var(--btn-subtle-fg, var(--crusher-text-primary));
      border-color: var(--btn-subtle-border, var(--crusher-border-primary));
      box-shadow: var(--btn-subtle-shadow, var(--ctl-elev));
      letter-spacing: var(--btn-subtle-letter, normal);
      text-shadow: var(--btn-subtle-text-shadow, none);
    }

    /* Loading / Disabled */
    .btn[aria-busy="true"],
    .btn:disabled {
      opacity: var(--crusher-opacity-disabled);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    /* Slot icon sizing */
    ::slotted([slot="icon"]) {
      inline-size: 1.2em;
      block-size: 1.2em;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    /* Simple spinner */
    @keyframes spin { to { transform: rotate(360deg) } }
  `;

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
        <slot name="icon" part="icon"></slot>
        <span part="label"><slot></slot></span>
        ${this.loading ? html`
          <span part="spinner" aria-hidden="true" style="display:inline-flex">
            <svg viewBox="0 0 50 50" width="16" height="16" style="animation: spin 1s linear infinite;">
              <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="6" opacity="0.2"/>
              <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="6"
                stroke-linecap="round" stroke-dasharray="31.4 188.4"/>
            </svg>
          </span>
        ` : null}
      </button>
    `;
  }
}
customElements.define('crusher-button', CrusherButton);
