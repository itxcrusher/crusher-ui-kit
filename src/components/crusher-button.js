import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export class CrusherButton extends LitElement {
  // Define component styles inside the component itself
  static styles = css`
    :host {
      display: inline-flex;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      font-family: var(--crusher-font-family-body);
      font-size: var(--crusher-font-size-base);
      font-weight: var(--crusher-font-weight-semibold);
      padding: var(--crusher-spacing-3) var(--crusher-spacing-6);
      border-radius: var(--crusher-radius-md);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      background: var(--crusher-color-brand-primary);
      color: var(--crusher-color-base-white);
    }

    .btn:hover {
      opacity: 0.9;
      transform: translateY(-2px);
    }
    
    .btn--secondary {
      background: var(--crusher-color-brand-secondary);
    }
  `;

  // Define component properties
  static properties = {
    variant: { type: String }, // e.g., 'primary' or 'secondary'
  };

  constructor() {
    super();
    this.variant = 'primary';
  }

  // Define the component's HTML template
  render() {
    const classes = { 
      'btn': true,
      'btn--secondary': this.variant === 'secondary',
    };
    return html`
      <button class=${classMap(classes)}>
        <slot></slot> 
      </button>
    `;
  }
}

// Register the component with a custom tag name
customElements.define('crusher-button', CrusherButton);
