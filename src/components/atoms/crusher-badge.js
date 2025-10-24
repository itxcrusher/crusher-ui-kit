import { LitElement, html, css } from 'lit';

const TONES = ['neutral','brand','success','warning','error'];
const SIZES = ['sm','md'];

export class CrusherBadge extends LitElement {
  static properties = {
    tone: { type: String, reflect: true },
    size: { type: String, reflect: true },
    pill: { type: Boolean, reflect: true }
  };
  constructor() {
    super();
    this.tone = 'neutral';
    this.size = 'md';
    this.pill = false;
  }

  static styles = css`
    :host { display: inline-block; }
    .badge {
      display: inline-flex; align-items: center; gap: .35em;
      font-family: var(--crusher-font-family-body);
      font-weight: var(--crusher-font-weight-medium);
      border: 1px solid var(--crusher-border-primary);
      background: var(--crusher-background-surface);
      color: var(--crusher-text-primary);
      border-radius: var(--crusher-radius-md);
      line-height: 1;
      white-space: nowrap;
    }
    .sm { padding: .25rem .5rem; font-size: var(--crusher-font-size-sm); }
    .md { padding: .35rem .65rem; font-size: var(--crusher-font-size-base); }
    .pill { border-radius: var(--crusher-radius-full); }

    /* tones via border + subtle bg wash */
    .t-neutral { }
    .t-brand   { border-color: color-mix(in srgb, var(--crusher-color-brand-primary), transparent 70%);
                 background:  color-mix(in srgb, var(--crusher-color-brand-primary), transparent 90%); }
    .t-success { border-color: color-mix(in srgb, var(--crusher-color-brand-primary), transparent 60%);
                 background:  color-mix(in srgb, var(--crusher-color-brand-primary), transparent 88%); }
    .t-warning { border-color: color-mix(in srgb, var(--crusher-color-brand-accent-orange), transparent 60%);
                 background:  color-mix(in srgb, var(--crusher-color-brand-accent-orange), transparent 88%); }
    .t-error   { border-color: color-mix(in srgb, var(--crusher-color-brand-accent-red), transparent 60%);
                 background:  color-mix(in srgb, var(--crusher-color-brand-accent-red), transparent 88%); }
  `;

  render() {
    const tone = TONES.includes(this.tone) ? this.tone : 'neutral';
    const size = SIZES.includes(this.size) ? this.size : 'md';
    const cls = ['badge', size, `t-${tone}`, this.pill ? 'pill' : ''].join(' ');
    return html`<span class=${cls} part="root"><slot></slot></span>`;
  }
}

customElements.define('crusher-badge', CrusherBadge);
