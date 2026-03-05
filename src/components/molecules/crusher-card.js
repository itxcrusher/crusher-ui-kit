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
      border: var(--crusher-component-border-weight) solid color-mix(in srgb, var(--crusher-border-primary), var(--crusher-color-base-white) 20%);
      background-clip: padding-box; /* prevents border color from bleeding */
      border-radius: var(--crusher-radius-lg);
      padding: var(--crusher-spacing-6);
      box-shadow: var(--crusher-shadow-2);
      transition: all var(--crusher-motion-duration-base) var(--crusher-motion-easing-inout);
      overflow: hidden; /* Ensure content respects border-radius */
    }

    /* === Themed variants (using ::part for external theme overrides) === */
    :host-context(html[data-theme="glass"]) .card {
      background: color-mix(in srgb, var(--crusher-background-surface), transparent 0%);
      border: var(--crusher-component-border-weight) solid var(--crusher-border-primary);
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      box-shadow: var(--crusher-shadow-2);
    }
    :host-context(html[data-theme="futuristic"]) .card {
      background: linear-gradient(180deg, color-mix(in srgb, var(--crusher-background-surface), transparent 20%), transparent 40%),
                  color-mix(in srgb, var(--crusher-color-dark-background-canvas) 35%, transparent);
      border: var(--crusher-component-border-weight) solid color-mix(in srgb, var(--crusher-color-brand-secondary) 40%, var(--crusher-border-primary));
      box-shadow: 0 0 0 var(--crusher-component-border-weight) color-mix(in srgb, var(--crusher-color-brand-primary) 30%, transparent), var(--crusher-shadow-2);
    }
    :host-context(html[data-theme="minimal"]) .card {
      background: var(--crusher-background-surface);
      border: var(--crusher-component-border-weight) solid var(--crusher-border-primary);
      box-shadow: var(--crusher-shadow-1);
    }

    /* Optional hover effect */
    .card:hover {
      transform: translateY(calc(var(--crusher-spacing-1) * -1));
      box-shadow: var(--crusher-shadow-2);
    }
  `;

  // No specific properties needed for a basic card, it just holds content.

  // Define the component's HTML template
  render() {
    return html`
      <div class="card" part="surface">
        <slot></slot> 
      </div>
    `;
  }
}

// Register the component with a custom tag name
customElements.define('crusher-card', CrusherCard);
