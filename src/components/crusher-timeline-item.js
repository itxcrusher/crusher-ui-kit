import { LitElement, html, css } from 'lit';

export class CrusherTimelineItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      padding-left: var(--crusher-spacing-8);
      padding-bottom: var(--crusher-spacing-10);
    }

    /* The vertical connecting line */
    :host::before {
      content: '';
      width: 2px;
      position: absolute;
      height: 100%;
      left: 7px; /* Position in the center of the dot */
      top: 0;
      background-color: var(--crusher-color-brand-primary);
    }

    .circle-dot {
      position: absolute;
      left: 0;
      top: 0.25rem; /* Align with the first line of text */
      height: 16px;
      width: 16px;
      border-radius: var(--crusher-radius-full);
      background-color: var(--crusher-color-brand-primary);
      border: 2px solid var(--crusher-background-surface); /* Helps dot stand out */
    }
  `;

  render() {
    return html`
      <div class="circle-dot"></div>
      <slot name="date"></slot>
      <slot></slot>
    `;
  }
}

customElements.define('crusher-timeline-item', CrusherTimelineItem);
