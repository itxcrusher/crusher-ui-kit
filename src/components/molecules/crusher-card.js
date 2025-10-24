import { LitElement, html, css } from 'lit';

export class CrusherCard extends LitElement {
  // Define component styles using CSS variables derived from tokens
  static styles = css`
    :host {
      display: block; /* Ensure the card takes up block space */
    }

    .card {
      /* --- Glassmorphism Effect --- */
      background: var(--crusher-background-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md)); /* Safari support */
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      
      /* Punchier border on bright canvases */
      border: 1px solid color-mix(in srgb, var(--crusher-border-primary), var(--crusher-color-base-white) 20%);
      background-clip: padding-box; /* prevents border color from bleeding */
      border-radius: var(--crusher-radius-lg);
      padding: var(--crusher-spacing-6);
      box-shadow: var(--crusher-shadow-2);
      transition: all 0.2s ease-in-out;
      overflow: hidden; /* Ensure content respects border-radius */
    }

    /* Optional hover effect */
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 20px -6px rgb(0 0 0 / 0.18);
    }
  `;

  // No specific properties needed for a basic card, it just holds content.

  // Define the component's HTML template
  render() {
    return html`
      <div class="card">
        <slot></slot> 
      </div>
    `;
  }
}

// Register the component with a custom tag name
customElements.define('crusher-card', CrusherCard);
