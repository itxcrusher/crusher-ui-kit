import { LitElement, html, css } from 'lit';

export class CrusherStat extends LitElement {
  static properties = {
    label: { type: String },
    value: { type: String },
    meta: { type: String },
    delta: { type: String },
    tone: { type: String, reflect: true },
  };

  constructor() {
    super();
    this.label = '';
    this.value = '';
    this.meta = '';
    this.delta = '';
    this.tone = 'brand';
  }

  static styles = css`
    :host {
      --_stat-accent: var(--crusher-stat-tone-brand, var(--crusher-color-brand-primary));
      display: block;
    }

    :host([tone="neutral"]) { --_stat-accent: var(--crusher-stat-tone-neutral, var(--crusher-fg-muted)); }
    :host([tone="brand"]) { --_stat-accent: var(--crusher-stat-tone-brand, var(--crusher-color-brand-primary)); }
    :host([tone="info"]) { --_stat-accent: var(--crusher-stat-tone-info, var(--crusher-feedback-info)); }
    :host([tone="success"]) { --_stat-accent: var(--crusher-stat-tone-success, var(--crusher-feedback-success)); }
    :host([tone="warning"]) { --_stat-accent: var(--crusher-stat-tone-warning, var(--crusher-feedback-warning)); }
    :host([tone="danger"]) { --_stat-accent: var(--crusher-stat-tone-danger, var(--crusher-feedback-danger)); }

    .stat {
      background: var(--crusher-stat-bg, var(--crusher-surface));
      border: var(--crusher-component-border-weight) solid var(--crusher-stat-border, var(--crusher-border));
      border-radius: var(--crusher-radius-lg);
      box-shadow: var(--crusher-shadow-1);
      display: grid;
      gap: var(--crusher-layout-gap-tight, var(--crusher-spacing-4));
      min-inline-size: 0;
      overflow: hidden;
      padding-block: var(--crusher-stat-padding-block, var(--crusher-spacing-4));
      padding-inline-end: var(--crusher-stat-padding-inline-end, var(--crusher-spacing-4));
      padding-inline-start: var(--crusher-stat-padding-inline-start, calc(var(--crusher-spacing-4) + var(--crusher-spacing-2)));
      position: relative;
    }

    .stat::before {
      background: linear-gradient(180deg, color-mix(in srgb, var(--_stat-accent) 90%, transparent), color-mix(in srgb, var(--_stat-accent) 35%, transparent));
      content: '';
      inline-size: calc(var(--crusher-spacing-1) + var(--crusher-component-border-weight));
      inset-block: 0;
      inset-inline-start: 0;
      position: absolute;
    }

    .eyebrow {
      align-items: center;
      display: flex;
      gap: var(--crusher-spacing-2);
      justify-content: space-between;
      min-inline-size: 0;
    }

    .label {
      color: var(--crusher-fg-muted);
      font-size: var(--crusher-font-size-xs);
      font-weight: var(--crusher-font-weight-semibold);
      letter-spacing: 0.08em;
      margin: 0;
      text-transform: uppercase;
    }

    .delta {
      background: color-mix(in srgb, var(--_stat-accent) 14%, transparent);
      border-radius: var(--crusher-radius-full);
      color: var(--_stat-accent);
      font-size: var(--crusher-font-size-xs);
      font-weight: var(--crusher-font-weight-semibold);
      padding-inline: var(--crusher-spacing-2);
      padding-block: calc(var(--crusher-spacing-1) / 2);
      white-space: nowrap;
    }

    .value {
      color: var(--crusher-fg);
      font-size: var(--crusher-stat-value-size, var(--crusher-font-size-4xl));
      font-weight: var(--crusher-font-weight-bold);
      line-height: 1;
      margin: 0;
      text-wrap: balance;
    }

    .meta {
      color: var(--crusher-fg-muted);
      font-size: var(--crusher-font-size-sm);
      margin: 0;
    }

    .footer {
      min-inline-size: 0;
    }
  `;

  render() {
    return html`
      <div class="stat" part="stat">
        <div class="eyebrow">
          <p class="label">${this.label}</p>
          ${this.delta ? html`<span class="delta">${this.delta}</span>` : null}
        </div>
        <p class="value">${this.value}</p>
        ${this.meta ? html`<p class="meta">${this.meta}</p>` : null}
        <div class="footer" part="footer">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('crusher-stat', CrusherStat);
