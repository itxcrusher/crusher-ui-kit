import { LitElement, html, css } from 'lit';
export class CrusherError extends LitElement {
  static styles = css`
    :host { display:block; color: var(--code-token-op, #ef4444); font-size: var(--crusher-font-size-sm); }
  `;
  render() { return html`<div role="alert" aria-live="polite"><slot></slot></div>`; }
}
customElements.define('crusher-error', CrusherError);
