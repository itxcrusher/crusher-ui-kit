import { LitElement, html, css } from 'lit';

export class CrusherInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .form-item {
      margin-bottom: var(--crusher-spacing-4);
    }
    .label {
      display: block;
      font-weight: var(--crusher-font-weight-medium);
      font-size: var(--crusher-font-size-sm);
      color: var(--crusher-text-secondary);
      margin-bottom: var(--crusher-spacing-2);
    }
    .input {
      width: 100%;
      height: auto;
      padding: var(--crusher-spacing-3) var(--crusher-spacing-4);
      font-size: var(--crusher-font-size-base);
      font-family: var(--crusher-font-family-body);
      color: var(--crusher-text-primary); /* Changed for better visibility */
      background: var(--crusher-background-surface);
      border: 1px solid var(--crusher-border-primary);
      border-radius: var(--crusher-radius-md);
      transition: all 0.2s ease;
      box-sizing: border-box; /* Ensures padding doesn't affect width */
    }
    .input:focus {
      outline: 2px solid var(--crusher-color-brand-primary);
      outline-offset: 2px;
      border-color: transparent;
    }
    .input::placeholder {
      color: var(--crusher-text-secondary);
      opacity: 0.7;
    }
  `;

  static properties = {
    label: { type: String },
    type: { type: String },
    placeholder: { type: String },
    value: { type: String },
  };

  constructor() {
    super();
    this.label = 'Default Label';
    this.type = 'text';
    this.placeholder = '';
    this.value = '';
  }

  render() {
    return html`
      <div class="form-item">
        <label class="label" for="input">${this.label}</label>
        <input
          class="input"
          id="input"
          .type=${this.type}
          .placeholder=${this.placeholder}
          .value=${this.value}
        />
      </div>
    `;
  }
}

customElements.define('crusher-input', CrusherInput);
