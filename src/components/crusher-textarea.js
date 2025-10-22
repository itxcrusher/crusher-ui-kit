import { LitElement, html, css } from 'lit';

export class CrusherTextarea extends LitElement {
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
    .textarea {
      width: 100%;
      padding: var(--crusher-spacing-3) var(--crusher-spacing-4);
      font-size: var(--crusher-font-size-base);
      font-family: var(--crusher-font-family-body);
      color: var(--crusher-text-primary);
      background: var(--crusher-background-surface);
      border: 1px solid var(--crusher-border-primary);
      border-radius: var(--crusher-radius-md);
      transition: all 0.2s ease;
      box-sizing: border-box;
      resize: vertical; /* Allow vertical resizing */
    }
    .textarea:focus {
      outline: 2px solid var(--crusher-color-brand-primary);
      outline-offset: 2px;
      border-color: transparent;
    }
    .textarea::placeholder {
      color: var(--crusher-text-secondary);
      opacity: 0.7;
    }
  `;

  static properties = {
    label: { type: String },
    placeholder: { type: String },
    value: { type: String },
    rows: { type: Number },
  };

  constructor() {
    super();
    this.label = 'Default Label';
    this.placeholder = '';
    this.value = '';
    this.rows = 4; // A sensible default height
  }

  render() {
    return html`
      <div class="form-item">
        <label class="label" for="textarea">${this.label}</label>
        <textarea
          class="textarea"
          id="textarea"
          .placeholder=${this.placeholder}
          .value=${this.value}
          .rows=${this.rows}
        ></textarea>
      </div>
    `;
  }
}

customElements.define('crusher-textarea', CrusherTextarea);