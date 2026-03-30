import { LitElement, html, css } from 'lit';

export class CrusherSectionTitle extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: var(--crusher-spacing-10);
      position: relative;
      z-index: 1;
    }
    .title {
      font-size: var(--crusher-font-size-4xl);
      font-weight: var(--crusher-font-weight-bold);
      color: var(--crusher-text-primary);
      position: relative;
      padding-bottom: calc(var(--crusher-spacing-4) + var(--crusher-spacing-2));
      margin: 0;
      isolation: isolate;
    }
    .title::before {
      content: '';
      position: absolute;
      height: calc(var(--crusher-focus-width) * 2);
      width: calc(var(--crusher-spacing-12) + (var(--crusher-spacing-1) / 2));
      background-color: var(--crusher-color-brand-primary);
      left: 0;
      bottom: var(--crusher-spacing-2);
      border-radius: var(--crusher-radius-full);
    }
    .title::after {
      content: '';
      position: absolute;
      height: calc(var(--crusher-focus-width) * 2);
      width: calc(var(--crusher-spacing-6) + (var(--crusher-focus-width) / 2));
      background-color: var(--crusher-color-brand-primary);
      left: 0;
      bottom: 0;
      border-radius: var(--crusher-radius-full);
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
