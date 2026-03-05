import { LitElement, html, css } from 'lit';

const VAR_COLORS = {
  info:     'var(--crusher-color-brand-secondary)',
  success:  'var(--crusher-color-brand-primary)',
  warning:  'var(--crusher-color-brand-accent-orange)',
  error:    'var(--crusher-color-brand-accent-red)'
};

export class CrusherToastCenter extends LitElement {
  static properties = {
    toasts: { state: true }
  };

  constructor() {
    super();
    this.toasts = [];
    this._onEv = this._onEv.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('crusher:toast', this._onEv);
  }
  disconnectedCallback() {
    window.removeEventListener('crusher:toast', this._onEv);
    super.disconnectedCallback();
  }

  // ensure we render on the page without user adding tag
  firstUpdated() {
    // If not already attached to DOM root, append to body as portal.
    if (!this.isConnected) document.body.appendChild(this);
  }

  _onEv(e) {
    const t = e.detail;
    // push
    this.toasts = [{ ...t, createdAt: Date.now() }, ...this.toasts].slice(0, 6);
    // auto-remove
    if (t.duration > 0) {
      setTimeout(() => this._dismiss(t.id), t.duration);
    }
  }

  _dismiss(id) {
    this.toasts = this.toasts.filter(x => x.id !== id);
  }

  static styles = css`
    :host {
      position: fixed;
      right: clamp(var(--crusher-spacing-2), 4vw, var(--crusher-spacing-6));
      bottom: clamp(var(--crusher-spacing-2), 4vw, var(--crusher-spacing-6));
      z-index: var(--crusher-z-toast, 1100);
      display: grid;
      gap: var(--crusher-spacing-3);
      pointer-events: none; /* allow clicks to pass through gaps */
    }
    .toast {
      pointer-events: auto;
      min-width: calc(var(--crusher-spacing-10) * 7);
      max-width: min(92vw, calc(var(--crusher-spacing-10) * 10.5));
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: start;
      gap: var(--crusher-spacing-3);
      padding: var(--crusher-spacing-4);
      border-radius: var(--crusher-radius-lg);
      background: var(--crusher-background-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: var(--crusher-component-border-weight) solid var(--crusher-border-primary);
      box-shadow: var(--crusher-shadow-2);
      transform: translateY(var(--crusher-spacing-2));
      opacity: 0;
      animation: toast-in var(--crusher-motion-duration-fast, 120ms) ease-out forwards;
    }
    @keyframes toast-in { to { transform: translateY(0); opacity: 1; } }

    .dot {
      inline-size: calc(var(--crusher-spacing-2) + var(--crusher-focus-offset));
      block-size: calc(var(--crusher-spacing-2) + var(--crusher-focus-offset));
      border-radius: var(--crusher-radius-full);
      margin-top: var(--crusher-spacing-1);
    }
    .title {
      font-weight: var(--crusher-font-weight-semibold);
      color: var(--crusher-text-primary);
      margin-bottom: var(--crusher-focus-offset);
      line-height: 1.2;
    }
    .msg { color: var(--crusher-text-secondary); font-size: var(--crusher-font-size-sm); }
    .row { display: flex; align-items: center; gap: var(--crusher-spacing-2); }
    .spacer { flex: 1; }
    .btn {
      background: transparent;
      border: var(--crusher-component-border-weight) solid var(--crusher-border-primary);
      color: var(--crusher-text-primary);
      border-radius: var(--crusher-radius-md);
      padding: var(--crusher-spacing-1) var(--crusher-spacing-2);
      cursor: pointer;
      transition: background var(--crusher-motion-duration-base, 200ms);
    }
    .btn:hover { background: color-mix(in srgb, var(--crusher-text-primary) 8%, transparent); }
    .close { border: none; padding: var(--crusher-spacing-1); border-radius: var(--crusher-radius-full); }
    .action-row-top { margin-top: var(--crusher-spacing-2); }
  `;

  render() {
    return html`${this.toasts.map(t => {
      const color = VAR_COLORS[t.variant] || VAR_COLORS.info;
      return html`
        <div class="toast" role="status" aria-live="polite">
          <span class="dot" style="background:${color}" aria-hidden="true"></span>
          <div>
            ${t.title ? html`<div class="title">${t.title}</div>` : null}
            ${t.message ? html`<div class="msg">${t.message}</div>` : null}
            ${t.action ? html`
              <div class="row action-row-top">
                <span class="spacer"></span>
                <button class="btn" @click=${() => { t.action?.onClick?.(); this._dismiss(t.id); }}>
                  ${t.action.label}
                </button>
              </div>
            ` : null}
          </div>
          <button class="btn close" aria-label="Close" title="Close"
            @click=${() => this._dismiss(t.id)}>✕</button>
        </div>
      `;
    })}`;
  }
}

// auto-mount one instance if none exists
const TAG = 'crusher-toast-center';
if (!customElements.get(TAG)) {
  customElements.define(TAG, CrusherToastCenter);
  // ensure singleton presence
  const ensure = () => {
    if (!document.querySelector(TAG)) {
      const el = document.createElement(TAG);
      document.body.appendChild(el);
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensure);
  } else {
    ensure();
  }
}

