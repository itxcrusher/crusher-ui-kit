import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export class CrusherModal extends LitElement {
  static styles = css`
    .wrapper {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .wrapper.open {
      opacity: 1;
      pointer-events: auto;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
    }

    .modal {
      /* Applying our Glassmorphism Card Style */
      background: var(--crusher-background-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: 1px solid var(--crusher-border-primary);
      border-radius: var(--crusher-radius-lg);
      box-shadow: var(--crusher-shadow-2);
      
      position: relative;
      z-index: 1;
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      transform: scale(0.95);
      transition: transform 0.3s ease;
    }

    .wrapper.open .modal {
      transform: scale(1);
    }

    .header {
      padding: var(--crusher-spacing-4) var(--crusher-spacing-6);
      border-bottom: 1px solid var(--crusher-border-primary);
    }

    .body {
      padding: var(--crusher-spacing-6);
      overflow-y: auto;
      flex-grow: 1;
    }

    .footer {
      padding: var(--crusher-spacing-4) var(--crusher-spacing-6);
      border-top: 1px solid var(--crusher-border-primary);
      display: flex;
      justify-content: flex-end;
      gap: var(--crusher-spacing-3);
    }
  `;

  static properties = {
    open: { type: Boolean, reflect: true },
  };

  constructor() {
    super();
    this.open = false;
  }

  // A method to dispatch a custom 'close' event
  _handleClose() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  render() {
    const classes = { 'wrapper': true, 'open': this.open };
    return html`
      <div class=${classMap(classes)}>
        <div class="overlay" @click=${this._handleClose}></div>
        <div class="modal" role="dialog" aria-modal="true">
          <div class="header">
            <slot name="header"><h2>Modal Title</h2></slot>
          </div>
          <div class="body">
            <slot></slot>
          </div>
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('crusher-modal', CrusherModal);
