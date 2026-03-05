class CrusherCheckbox extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode:'open'}).innerHTML = `
      <style>
        :host { display:inline-flex; align-items:center; cursor:pointer; gap:calc((var(--crusher-spacing-1) + var(--crusher-spacing-2)) / 2); }
        input {
          appearance:none;
          width:var(--crusher-spacing-4); height:var(--crusher-spacing-4);
          border:var(--crusher-focus-width) solid var(--crusher-border-primary);
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
