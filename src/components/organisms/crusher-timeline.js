import { LitElement, html, css } from 'lit';

export class CrusherTimeline extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .timeline {
      /* This is our Glassmorphism Card Style */
      background: var(--crusher-background-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: var(--crusher-component-border-weight) solid var(--crusher-border-primary);
      border-radius: var(--crusher-radius-lg);
      padding: var(--crusher-spacing-8);
    }

    /* This is a special selector that styles components passed into the slot.
       Here, we're finding the LAST timeline item and hiding its connecting line. */
    ::slotted(crusher-timeline-item:last-of-type) {
      padding-bottom: 0;
    }
    ::slotted(crusher-timeline-item:last-of-type)::before {
      display: none;
    }
  `;

  render() {
    return html`
      <div class="timeline">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('crusher-timeline', CrusherTimeline);
