class CrusherChip extends HTMLElement {
  static get observedAttributes() {
    return ['color'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _accentFor(color) {
    switch (color) {
      case 'secondary':
      case 'info':
        return 'var(--crusher-color-brand-secondary)';
      case 'warning':
        return 'var(--crusher-color-brand-accent-orange)';
      case 'danger':
      case 'error':
        return 'var(--crusher-color-brand-accent-red)';
      case 'neutral':
        return 'var(--crusher-text-secondary)';
      case 'success':
      case 'brand':
      default:
        return 'var(--crusher-color-brand-primary)';
    }
  }

  _render() {
    const color = this.getAttribute('color') || 'brand';
    const accent = this._accentFor(color);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
        }

        .chip {
          --_chip-accent: ${accent};
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-block-size: calc(var(--crusher-spacing-4) + var(--crusher-spacing-3));
          padding-block: var(--crusher-spacing-2);
          padding-inline: calc(var(--crusher-spacing-3) + 2px);
          border-radius: var(--crusher-radius-full);
          border: var(--crusher-component-border-weight) solid color-mix(in srgb, var(--_chip-accent) 22%, var(--crusher-border-primary));
          background:
            linear-gradient(180deg, color-mix(in srgb, var(--crusher-color-base-white) 22%, transparent), transparent),
            color-mix(in srgb, var(--_chip-accent) 14%, var(--crusher-background-surface));
          color: color-mix(in srgb, var(--crusher-text-primary) 84%, var(--_chip-accent) 16%);
          font-size: var(--crusher-font-size-xs);
          font-weight: var(--crusher-font-weight-semibold);
          letter-spacing: 0.01em;
          line-height: 1;
          white-space: nowrap;
          box-shadow:
            inset 0 1px 0 color-mix(in srgb, var(--crusher-color-base-white) 30%, transparent),
            0 8px 18px color-mix(in srgb, var(--_chip-accent) 8%, transparent);
          transition:
            background-color var(--crusher-transition-duration-fast),
            border-color var(--crusher-transition-duration-fast),
            color var(--crusher-transition-duration-fast),
            transform var(--crusher-transition-duration-fast),
            box-shadow var(--crusher-transition-duration-fast);
        }

        :host(:hover) .chip {
          background: color-mix(in srgb, var(--_chip-accent) 18%, var(--crusher-background-surface));
          transform: translateY(calc(var(--crusher-component-border-weight) * -1));
          box-shadow:
            inset 0 1px 0 color-mix(in srgb, var(--crusher-color-base-white) 36%, transparent),
            0 12px 22px color-mix(in srgb, var(--_chip-accent) 12%, transparent);
        }
      </style>
      <span class="chip"><slot></slot></span>
    `;
  }
}

customElements.define('crusher-chip', CrusherChip);
