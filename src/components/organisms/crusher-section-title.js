import { LitElement, html, css } from 'lit';

export class CrusherSectionTitle extends LitElement {
  static styles = css`
    :host {
      display: block; /* The component itself takes up block space */
      margin-bottom: var(--crusher-spacing-12);
    }
    .title {
      font-size: var(--crusher-font-size-4xl);
      font-weight: var(--crusher-font-weight-bold);
      color: var(--crusher-text-primary);
      position: relative;
      padding-bottom: var(--crusher-spacing-4);
      margin: 0; /* Remove default h2 margin */
    }
    /* The main (longer) underline */
    .title::before {
      content: '';
      position: absolute;
      height: calc(var(--crusher-focus-width) * 2);
      width: calc(var(--crusher-spacing-12) + (var(--crusher-spacing-1) / 2));
      background-color: var(--crusher-color-brand-primary);
      left: 0;
      bottom: 0;
    }
    /* The secondary (shorter) underline */
    .title::after {
      content: '';
      position: absolute;
      height: calc(var(--crusher-focus-width) * 2);
      width: calc(var(--crusher-spacing-6) + (var(--crusher-focus-width) / 2));
      background-color: var(--crusher-color-brand-primary);
      left: 0;
      bottom: calc(var(--crusher-spacing-2) * -1); /* Position it below the first line */
    }
  `;

  render() {
    return html`
      <h2 class="title">
        <slot></slot>
      </h2>
    `;
  }
}

customElements.define('crusher-section-title', CrusherSectionTitle);
