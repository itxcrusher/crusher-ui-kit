class CrusherSwitch extends HTMLElement {
  connectedCallback() {
    this.attachShadow({mode:'open'}).innerHTML = `
      <style>
        :host{display:inline-block;}
        label{
          display:flex;align-items:center;cursor:pointer;
        }
        input{display:none;}
        .slider{
          position:relative;
          width:var(--crusher-spacing-10);
          height:calc(var(--crusher-spacing-6) - var(--crusher-focus-offset));
          background:var(--crusher-border-primary);
          border-radius:var(--crusher-radius-full);
          transition:background var(--crusher-transition-duration-base);
        }
        .slider::before{
          content:"";position:absolute;left:var(--crusher-focus-offset);top:var(--crusher-focus-offset);
          width:calc(var(--crusher-spacing-4) + var(--crusher-focus-offset));
          height:calc(var(--crusher-spacing-4) + var(--crusher-focus-offset));
          background:var(--crusher-color-base-white);
          border-radius:var(--crusher-radius-full);
          transition:transform var(--crusher-transition-duration-base);
        }
        input:checked + .slider{
          background:var(--crusher-color-brand-primary);
        }
        input:checked + .slider::before{transform:translateX(calc(var(--crusher-spacing-4) + var(--crusher-focus-offset)));}
      </style>
      <label>
        <input type="checkbox">
        <span class="slider"></span>
        <slot></slot>
      </label>
    `;
  }
}
customElements.define('crusher-switch', CrusherSwitch);
