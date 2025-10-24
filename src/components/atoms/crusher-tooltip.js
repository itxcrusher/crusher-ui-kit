import { LitElement, html, css } from 'lit';

const PLACEMENTS = ['top','right','bottom','left'];

export class CrusherTooltip extends LitElement {
  static properties = {
    text: { type: String },
    placement: { type: String } // preferred: top | right | bottom | left
  };
  constructor() {
    super();
    this.text = '';
    this.placement = 'top';
    this._open = false;
    this._id = `tooltip-${Math.random().toString(36).slice(2)}`;
    this._onEnter = () => this._openTip();
    this._onLeave = () => this._closeTip();
    this._recalc = () => this._position();
  }

  static styles = css`
    :host { position: relative; display: inline-block; }
    .bubble {
      position: fixed; /* fixed for viewport-stable placement */
      max-width: 320px;
      padding: .35rem .5rem;
      font-size: var(--crusher-font-size-sm);
      color: var(--crusher-text-primary);
      background: var(--crusher-background-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      border: 1px solid var(--crusher-border-primary);
      border-radius: var(--crusher-radius-md);
      box-shadow: var(--crusher-shadow-1);
      white-space: nowrap;
      opacity: 0; transform: translateY(4px) scale(.98);
      transition: opacity 120ms ease, transform 120ms ease;
      pointer-events: none; z-index: 10;
    }
    :host([data-open]) .bubble { opacity: 1; transform: translateY(0) scale(1); }

    .hidden { display: none; }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('mouseenter', this._onEnter);
    this.addEventListener('mouseleave', this._onLeave);
    this.addEventListener('focusin', this._onEnter);
    this.addEventListener('focusout', this._onLeave);
    window.addEventListener('scroll', this._recalc, true);
    window.addEventListener('resize', this._recalc);
    this.setAttribute('role', 'group');
  }
  disconnectedCallback() {
    this.removeEventListener('mouseenter', this._onEnter);
    this.removeEventListener('mouseleave', this._onLeave);
    this.removeEventListener('focusin', this._onEnter);
    this.removeEventListener('focusout', this._onLeave);
    window.removeEventListener('scroll', this._recalc, true);
    window.removeEventListener('resize', this._recalc);
    super.disconnectedCallback();
  }

  _openTip() {
    this._open = true;
    this.setAttribute('data-open', '');
    this.updateComplete.then(() => this._position());
  }
  _closeTip() {
    this._open = false;
    this.removeAttribute('data-open');
  }

  _position() {
    // compute preferred placement, then fall back if out of bounds
    const bubble = this.renderRoot?.querySelector('.bubble');
    const trigger = this.getBoundingClientRect();
    if (!bubble || !trigger || !this._open) return;

    const prefer = PLACEMENTS.includes(this.placement) ? this.placement : 'top';
    const candidates = [prefer, ...PLACEMENTS.filter(p => p !== prefer)];
    const pad = 8;

    // measure bubble at an offscreen spot
    bubble.style.left = '-9999px';
    bubble.style.top = '-9999px';
    bubble.classList.remove('hidden');

    const place = (pos) => {
      const b = bubble.getBoundingClientRect();
      let left = 0, top = 0, ok = true;

      if (pos === 'top') {
        left = trigger.left + (trigger.width - b.width) / 2;
        top = trigger.top - b.height - pad;
      } else if (pos === 'bottom') {
        left = trigger.left + (trigger.width - b.width) / 2;
        top = trigger.bottom + pad;
      } else if (pos === 'left') {
        left = trigger.left - b.width - pad;
        top = trigger.top + (trigger.height - b.height) / 2;
      } else if (pos === 'right') {
        left = trigger.right + pad;
        top = trigger.top + (trigger.height - b.height) / 2;
      }

      // viewport clamp test
      const vw = window.innerWidth, vh = window.innerHeight;
      if (left < 4 || left + b.width > vw - 4 || top < 4 || top + b.height > vh - 4) ok = false;

      return { left: Math.max(4, Math.min(left, vw - b.width - 4)),
               top: Math.max(4, Math.min(top, vh - b.height - 4)), ok };
    };

    let final = place(candidates[0]);
    if (!final.ok) {
      for (let i = 1; i < candidates.length; i++) {
        const attempt = place(candidates[i]);
        if (attempt.ok) { final = attempt; break; }
      }
    }

    bubble.style.left = `${final.left}px`;
    bubble.style.top = `${final.top}px`;
  }

  render() {
    return html`
      <span part="trigger" aria-describedby=${this._id}><slot></slot></span>
      <span id=${this._id} class="bubble ${this._open ? '' : 'hidden'}" part="bubble" role="tooltip">
        ${this.text}
      </span>
    `;
  }
}

customElements.define('crusher-tooltip', CrusherTooltip);
