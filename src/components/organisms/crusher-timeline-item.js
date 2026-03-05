import { LitElement, html, css } from 'lit';

export class CrusherTimelineItem extends LitElement {
  static styles = css`
    :host {
      /* marker column width is fixed; content is flexible */
      --tl-col: calc(var(--crusher-spacing-6) + var(--crusher-spacing-1)); /* width of the marker column */
      --tl-dot: var(--crusher-spacing-3);                                   /* dot size */
      --tl-line-w: var(--crusher-focus-width);                              /* vertical line width */
      --tl-gap: var(--crusher-spacing-3);

      display: grid;
      grid-template-columns: var(--tl-col) 1fr;
      column-gap: var(--tl-gap);
      position: relative;
      padding-bottom: var(--crusher-spacing-8);
    }

    /* The vertical line (in the marker column, behind the dot) */
    .marker {
      grid-column: 1 / 2;
      position: relative;
      min-height: var(--tl-dot); /* ensure space for the dot even if one-liners */
    }
    .marker::before {
      content: "";
      position: absolute;
      left: calc((var(--tl-col) - var(--tl-line-w)) / 2); /* center in marker col */
      top: calc(var(--tl-dot) + var(--crusher-focus-offset)); /* start under the dot */
      bottom: 0;
      width: var(--tl-line-w);
      background: var(--crusher-color-brand-primary);
      opacity: 0.9;
    }

    /* The dot */
    .dot {
      position: absolute;
      left: calc((var(--tl-col) - var(--tl-dot)) / 2);
      top: var(--crusher-focus-offset);
      width: var(--tl-dot);
      height: var(--tl-dot);
      border-radius: var(--crusher-radius-full);
      background: var(--crusher-color-brand-primary);
      border: var(--crusher-focus-width) solid var(--crusher-background-surface);
      z-index: 1; /* dot above the line */
    }

    /* Content column */
    .content {
      grid-column: 2 / 3;
      min-width: 0; /* prevent overflow in tight grids */
    }

    /* Slot styles */
    ::slotted([slot="date"]) {
      display: inline-block;
      margin-bottom: var(--crusher-spacing-2);
      color: var(--crusher-text-secondary);
      font-size: var(--crusher-font-size-sm);
    }

    /* Optional density presets */
    :host([compact]) {
      --tl-col: var(--crusher-spacing-6);
      --tl-dot: calc(var(--crusher-spacing-2) + var(--crusher-focus-offset));
      padding-bottom: var(--crusher-spacing-6);
    }
    :host([flush]) {
      --tl-col: calc(var(--crusher-spacing-4) + var(--crusher-spacing-1));
      --tl-dot: calc(var(--crusher-spacing-2) + var(--crusher-focus-offset));
    }
  `;

  render() {
    return html`
      <div class="marker"><div class="dot"></div></div>
      <div class="content">
        <slot name="date"></slot>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('crusher-timeline-item', CrusherTimelineItem);
