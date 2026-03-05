import { LitElement, html, css } from 'lit';

export class CrusherModal extends LitElement {
  static properties = {
    open: { type: Boolean, reflect: true },
    closeOnOverlay: { type: Boolean, attribute: 'close-on-overlay' },
    closeOnEsc: { type: Boolean, attribute: 'close-on-esc' }
  };

  constructor() {
    super();
    this.open = false;
    this.closeOnOverlay = true;
    this.closeOnEsc = true;
    this._onKey = (e) => this._handleKey(e);
    this._previousActive = null;
    this._scrollLocked = false;
  }

  static styles = css`
    .wrapper {
      position: fixed; inset: 0;
      z-index: var(--crusher-z-modal); display: flex; align-items: center; justify-content: center;
      opacity: 0; pointer-events: none;
      transition: opacity var(--crusher-motion-duration-base) var(--crusher-motion-easing-inout);
    }
    :host([open]) .wrapper { opacity: 1; pointer-events: auto; }

    .overlay { position: absolute; inset: 0; background: color-mix(in srgb, var(--crusher-color-dark-background-canvas) 50%, transparent); }

    .modal {
      position: relative; z-index: 1; width: min(92vw, calc(var(--crusher-spacing-10) * 18)); max-height: 90vh;
      display: flex; flex-direction: column; transform: translateY(var(--crusher-spacing-2));
      background: var(--crusher-background-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: var(--crusher-component-border-weight) solid var(--crusher-border-primary);
      border-radius: var(--crusher-radius-lg);
      box-shadow: var(--crusher-shadow-2);
      transition: transform var(--crusher-motion-duration-base) var(--crusher-motion-easing-inout);
    }
    :host([open]) .modal { transform: translateY(0); }

    .header, .footer { padding: var(--crusher-spacing-4) var(--crusher-spacing-6); }
    .header { border-bottom: var(--crusher-component-border-weight) solid var(--crusher-border-primary); }
    .body   { padding: var(--crusher-spacing-6); overflow: auto; flex: 1; }
    .footer { border-top: var(--crusher-component-border-weight) solid var(--crusher-border-primary); display:flex; gap: var(--crusher-spacing-3); justify-content: flex-end; }
  `;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this._onKey);
  }
  disconnectedCallback() {
    document.removeEventListener('keydown', this._onKey);
    this._unlockScroll();
    super.disconnectedCallback();
  }

  // Public API
  show() { if (!this.open) { this.open = true; } }
  hide() { if (this.open) { this._requestClose('api'); } }

  updated(changed) {
    if (changed.has('open')) {
      if (this.open) {
        this._previousActive = document.activeElement;
        this._lockScroll();
        this.updateComplete.then(() => this._focusFirst());
        this.dispatchEvent(new CustomEvent('open'));
      } else {
        this._unlockScroll();
        this._restoreFocus();
        this.dispatchEvent(new CustomEvent('close'));
      }
    }
  }

  _handleKey(e) {
    if (!this.open) return;
    if (this.closeOnEsc && e.key === 'Escape') {
      e.stopPropagation();
      this._requestClose('esc');
    }
    if (e.key === 'Tab') this._trapTab(e);
  }

  _trapTab(e) {
    const nodes = this._focusables();
    if (!nodes.length) return;
    const idx = nodes.indexOf(document.activeElement);
    let next = idx;

    if (e.shiftKey) next = idx <= 0 ? nodes.length - 1 : idx - 1;
    else            next = idx === nodes.length - 1 ? 0 : idx + 1;

    if (idx === -1) { nodes[0].focus(); e.preventDefault(); return; }
    nodes[next].focus();
    e.preventDefault();
  }

  _focusables() {
    const root = this.renderRoot.querySelector('.modal');
    if (!root) return [];
    return Array.from(root.querySelectorAll(
      'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1);
  }

  _focusFirst() {
    const f = this._focusables();
    (f[0] || this.renderRoot.querySelector('.modal')).focus({ preventScroll: true });
  }

  _restoreFocus() {
    try { this._previousActive?.focus({ preventScroll: true }); } catch {}
    this._previousActive = null;
  }

  _lockScroll() {
    if (this._scrollLocked) return;
    this._scrollLocked = true;
    this._originalOverflow = document.documentElement.style.overflow || '';
    document.documentElement.style.overflow = 'hidden';
  }
  _unlockScroll() {
    if (!this._scrollLocked) return;
    this._scrollLocked = false;
    document.documentElement.style.overflow = this._originalOverflow ?? '';
  }

  _requestClose(reason) {
    const evt = new CustomEvent('request-close', { cancelable: true, detail: { reason } });
    if (!this.dispatchEvent(evt)) return; // cancelled by consumer
    this.open = false;
  }

  _onOverlayClick() {
    if (this.closeOnOverlay) this._requestClose('overlay');
  }

  render() {
    return html`
      <div class="wrapper" role="dialog" aria-modal="true" aria-live="polite">
        <div class="overlay" @click=${() => this._onOverlayClick()}></div>
        <div class="modal" tabindex="-1">
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
