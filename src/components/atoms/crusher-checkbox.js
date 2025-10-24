class CrusherCheckbox extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode:'open'}).innerHTML = `
      <style>
        :host { display:inline-flex; align-items:center; cursor:pointer; gap:0.4rem; }
        input {
          appearance:none;
          width:1rem; height:1rem;
          border:2px solid var(--crusher-border-primary);
          border-radius:var(--crusher-radius-sm);
          transition:background var(--crusher-transition-duration-base) var(--crusher-transition-easing-inout);
        }
        input:checked {
          background:var(--crusher-color-brand-primary);
          box-shadow:0 0 0 var(--crusher-focus-width) var(--crusher-focus-color-primary);
        }
      </style>
      <input type="checkbox"/><slot></slot>
    `;
  }
}
customElements.define('crusher-checkbox', CrusherCheckbox);
