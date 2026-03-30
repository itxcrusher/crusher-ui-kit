import { LitElement, html, css } from 'lit';

export class CrusherCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--crusher-card-bg);
      -webkit-backdrop-filter: var(--crusher-card-backdrop);
      backdrop-filter: var(--crusher-card-backdrop);
      border: var(--crusher-component-border-weight) solid var(--crusher-card-border);
      background-clip: padding-box;
      border-radius: var(--crusher-card-radius, var(--crusher-radius-lg));
      padding: var(--crusher-card-padding, var(--crusher-spacing-6));
      box-shadow: var(--crusher-card-shadow);
      transition: all var(--crusher-motion-duration-base) var(--crusher-motion-easing-inout);
      overflow: hidden;
    }

    .card:hover {
      transform: var(--crusher-card-hover-lift);
      box-shadow: var(--crusher-card-hover-shadow);
    }
  `;

  render() {
    return html`
      <div class="card" part="surface">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('crusher-card', CrusherCard);
