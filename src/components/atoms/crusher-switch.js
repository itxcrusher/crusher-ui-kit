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
          position:relative;width:40px;height:22px;
          background:var(--crusher-border-primary);
          border-radius:var(--crusher-radius-full);
          transition:background var(--crusher-transition-duration-base);
        }
        .slider::before{
          content:"";position:absolute;left:2px;top:2px;
          width:18px;height:18px;background:var(--crusher-color-base-white);
          border-radius:50%;transition:transform var(--crusher-transition-duration-base);
        }
        input:checked + .slider{
          background:var(--crusher-color-brand-primary);
        }
        input:checked + .slider::before{transform:translateX(18px);}
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
