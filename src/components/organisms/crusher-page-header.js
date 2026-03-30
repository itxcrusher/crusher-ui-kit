import { LitElement, html, css } from 'lit';

export class CrusherPageHeader extends LitElement {
  static properties = {
    eyebrow: { type: String },
    title: { type: String },
    subtitle: { type: String },
  };

  constructor() {
    super();
    this.eyebrow = '';
    this.title = '';
    this.subtitle = '';
  }

  static styles = css`
    :host {
      display: block;
      min-inline-size: 0;
    }

    .header {
      display: grid;
      gap: var(--crusher-page-header-gap, var(--crusher-layout-gap-tight, var(--crusher-spacing-4)));
      min-inline-size: 0;
    }

    .top {
      align-items: start;
      display: flex;
      flex-wrap: wrap;
      gap: var(--crusher-page-header-gap, var(--crusher-layout-gap-tight, var(--crusher-spacing-4)));
      justify-content: space-between;
      min-inline-size: 0;
    }

    .copy {
      display: grid;
      gap: var(--crusher-spacing-2);
      min-inline-size: 0;
    }

    .eyebrow {
      color: var(--crusher-page-header-eyebrow, var(--crusher-color-brand-primary));
      font-size: var(--crusher-font-size-xs);
      font-weight: var(--crusher-font-weight-semibold);
      letter-spacing: 0.08em;
      margin: 0;
      text-transform: uppercase;
    }

    .title {
      color: var(--crusher-fg);
      font-size: var(--crusher-page-header-title-size, clamp(var(--crusher-font-size-3xl), 4vw, var(--crusher-font-size-5xl)));
      font-weight: var(--crusher-font-weight-bold);
      line-height: 1.05;
      margin: 0;
      text-wrap: balance;
    }

    .subtitle {
      color: var(--crusher-fg-muted);
      font-size: var(--crusher-font-size-base);
      margin: 0;
      max-inline-size: var(--crusher-page-header-subtitle-width, 52rem);
    }

    .actions {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: var(--crusher-page-header-actions-gap, var(--crusher-spacing-2));
      justify-content: flex-end;
      min-inline-size: 0;
    }

    .meta {
      align-items: center;
      border-top: var(--crusher-component-border-weight) solid var(--crusher-page-header-divider, color-mix(in srgb, var(--crusher-border) 70%, transparent));
      color: var(--crusher-fg-muted);
      display: flex;
      flex-wrap: wrap;
      gap: var(--crusher-spacing-3);
      min-inline-size: 0;
      padding-top: var(--crusher-spacing-3);
    }

    @media (max-width: 720px) {
      .top {
        flex-direction: column;
      }

      .actions {
        justify-content: flex-start;
      }
    }
  `;

  firstUpdated() {
    this._syncSlotState();
  }

  _slotHasContent(name) {
    const slot = this.renderRoot.querySelector(`slot[name="${name}"]`);
    if (!slot) return false;
    return slot.assignedNodes({ flatten: true }).some((node) => {
      if (node.nodeType === 1) return true;
      return node.nodeType === 3 && node.textContent.trim().length > 0;
    });
  }

  _syncSlotState = () => {
    ['actions', 'meta'].forEach((name) => {
      this.toggleAttribute(`has-${name}`, this._slotHasContent(name));
    });
    this.requestUpdate();
  };

  render() {
    return html`
      <section class="header" part="header">
        <div class="top">
          <div class="copy">
            ${this.eyebrow ? html`<p class="eyebrow">${this.eyebrow}</p>` : null}
            ${this.title ? html`<h1 class="title">${this.title}</h1>` : html`<slot name="title"></slot>`}
            ${this.subtitle ? html`<p class="subtitle">${this.subtitle}</p>` : html`<slot name="subtitle"></slot>`}
          </div>
          <div class="actions" part="actions" ?hidden=${!this.hasAttribute('has-actions')}>
            <slot name="actions" @slotchange=${this._syncSlotState}></slot>
          </div>
        </div>
        <div class="meta" part="meta" ?hidden=${!this.hasAttribute('has-meta')}>
          <slot name="meta" @slotchange=${this._syncSlotState}></slot>
        </div>
      </section>
    `;
  }
}

customElements.define('crusher-page-header', CrusherPageHeader);
