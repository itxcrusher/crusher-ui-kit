import { LitElement, html, css } from 'lit';
export class CrusherHint extends LitElement {
  static styles = css`
    :host { display:block; color: var(--crusher-fg-muted); font-size: var(--crusher-font-size-sm); }
  `;
  render() { return html`<div role="note"><slot></slot></div>`; }
}
customElements.define('crusher-hint', CrusherHint);
