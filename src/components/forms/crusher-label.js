import { LitElement, html, css } from 'lit';

export class CrusherLabel extends LitElement {
  static properties = {
    for: { type: String, reflect: true }
  };
  static styles = css`
    :host { display: inline-block; }
    label {
      display:block; font-weight: var(--crusher-font-weight-medium);
      font-size: var(--crusher-font-size-sm);
      color: var(--crusher-fg-muted);
    }
    :host([required]) label::after { content: ' *'; color: var(--code-token-op, var(--crusher-color-brand-accent-red)); }
  `;
  render() { return html`<label for=${this.for || ''} part="label"><slot></slot></label>`; }
}
customElements.define('crusher-label', CrusherLabel);
