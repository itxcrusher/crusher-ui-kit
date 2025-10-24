import { LitElement, html, css } from 'lit';

export class CrusherInput extends LitElement {
  static styles = css`
    :host { display: block; }
    .form-item { margin-bottom: var(--crusher-spacing-4); }
    .label {
      display: block; font-weight: var(--crusher-font-weight-medium);
      font-size: var(--crusher-font-size-sm); color: var(--crusher-fg-muted);
      margin-bottom: var(--crusher-spacing-2);
    }
    .input {
      width: 100%; padding: var(--crusher-spacing-3) var(--crusher-spacing-4);
      font-size: var(--crusher-font-size-base); font-family: var(--crusher-font-family-body);
      color: var(--crusher-fg); background: var(--crusher-surface);
      border: 1px solid var(--crusher-border); border-radius: var(--crusher-radius-md);
      transition: all 0.2s ease; box-sizing: border-box;
    }
    .input:focus {
      outline: 2px solid var(--crusher-color-brand-primary); outline-offset: 2px; border-color: transparent;
    }
    .input::placeholder { color: var(--crusher-fg-muted); opacity: .8; }
    .input[aria-invalid="true"] { border-color: color-mix(in srgb, var(--code-token-op, #ef4444) 70%, transparent); }
  `;

  static properties = {
    label: { type: String },
    type: { type: String },
    placeholder: { type: String },
    value: { type: String },
    name: { type: String },
    required: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    invalid: { type: Boolean, reflect: true }
  };

  constructor() {
    super();
    this.label = 'Input';
    this.type = 'text';
    this.placeholder = '';
    this.value = '';
    this.name = '';
    this.required = false;
    this.disabled = false;
    this.invalid = false;
  }

  focus() { this.renderRoot?.getElementById('input')?.focus(); }

  render() {
    return html`
      <div class="form-item">
        ${this.label ? html`<label class="label" for="input">${this.label}${this.required ? ' *' : ''}</label>` : null}
        <input
          class="input"
          id="input"
          .type=${this.type}
          .placeholder=${this.placeholder}
          .value=${this.value}
          name=${this.name || ''}
          ?required=${this.required}
          ?disabled=${this.disabled}
          aria-invalid=${this.invalid ? 'true' : 'false'}
          @input=${(e) => { this.value = e.target.value; this.dispatchEvent(new Event('input',{bubbles:true})); }}
          @change=${(e) => this.dispatchEvent(new Event('change',{bubbles:true}))}
          />
      </div>
    `;
  }
}
customElements.define('crusher-input', CrusherInput);
