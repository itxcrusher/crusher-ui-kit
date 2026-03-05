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

    /* === Themed variants (using ::part for external theme overrides) === */
    :host-context(html[data-theme="glass"]) .card {
      background: color-mix(in srgb, var(--crusher-background-surface), transparent 0%);
      border: 1px solid var(--crusher-border-primary);
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      box-shadow: var(--crusher-shadow-2);
    }
    :host-context(html[data-theme="futuristic"]) .card {
      background: linear-gradient(180deg, color-mix(in srgb, var(--crusher-background-surface), transparent 20%), transparent 40%),
                  rgba(10, 14, 25, 0.35);
      border: 1px solid color-mix(in srgb, var(--crusher-color-brand-secondary) 40%, var(--crusher-border-primary));
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--crusher-color-brand-primary) 30%, transparent), var(--crusher-shadow-2);
    }
    :host-context(html[data-theme="minimal"]) .card {
      background: var(--crusher-background-surface);
      border: 1px solid var(--crusher-border-primary);
      box-shadow: var(--crusher-shadow-1);
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
      <div class="card" part="surface">
        <slot></slot> 
      </div>
    `;
  }
}

// Register the component with a custom tag name
customElements.define('crusher-card', CrusherCard);
