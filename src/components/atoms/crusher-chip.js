class CrusherChip extends HTMLElement {
  connectedCallback() {
    const color = this.getAttribute('color') || 'brand';
    this.attachShadow({mode:'open'}).innerHTML = `
      <style>
        :host{display:inline-flex;align-items:center;
          background:var(--crusher-color-${color}-primary);
          color:var(--crusher-color-base-white);
          border-radius:var(--crusher-radius-full);
          padding:var(--crusher-spacing-1) var(--crusher-spacing-3);
          font-size:var(--crusher-font-size-sm);
          transition:opacity var(--crusher-transition-duration-fast);
        }
        :host(:hover){opacity:var(--crusher-opacity-muted);}
      </style>
      <slot></slot>
    `;
  }
}
customElements.define('crusher-chip', CrusherChip);
