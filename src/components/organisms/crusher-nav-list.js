import { LitElement, html, css } from 'lit';

export class CrusherNavList extends LitElement {
  static properties = {
    label: { type: String },
    value: { type: String, reflect: true },
    items: { type: Array },
  };

  constructor() {
    super();
    this.label = 'Navigation';
    this.value = '';
    this.items = [];
  }

  static styles = css`
    :host {
      display: block;
    }

    nav {
      display: grid;
      gap: var(--crusher-layout-gap-tight, var(--crusher-spacing-4));
      min-inline-size: 0;
    }

    .section {
      display: grid;
      gap: var(--crusher-spacing-2);
      background: var(--crusher-nav-panel-bg, color-mix(in srgb, var(--crusher-surface) 94%, transparent));
      border: var(--crusher-component-border-weight) solid var(--crusher-nav-panel-border, color-mix(in srgb, var(--crusher-border) 78%, transparent));
      border-radius: var(--crusher-radius-lg);
      box-shadow: var(--crusher-nav-panel-shadow, none);
      padding: var(--crusher-spacing-3);
    }

    .section-label {
      color: var(--crusher-nav-section-fg, var(--crusher-fg-muted));
      font-size: var(--crusher-font-size-xs);
      font-weight: var(--crusher-font-weight-semibold);
      letter-spacing: 0.08em;
      margin: 0;
      text-transform: uppercase;
    }

    ul {
      display: grid;
      gap: var(--crusher-spacing-1);
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      min-inline-size: 0;
    }

    .item {
      align-items: center;
      appearance: none;
      background: var(--crusher-nav-item-bg, transparent);
      border: var(--crusher-component-border-weight) solid var(--crusher-nav-item-border, transparent);
      border-radius: var(--crusher-radius-lg);
      color: var(--crusher-nav-item-fg, var(--crusher-fg));
      cursor: pointer;
      display: grid;
      gap: var(--crusher-spacing-1) var(--crusher-spacing-3);
      grid-template-columns: auto minmax(0, 1fr) auto;
      inline-size: 100%;
      min-inline-size: 0;
      padding: var(--crusher-spacing-3);
      text-align: start;
      text-decoration: none;
      box-shadow: var(--crusher-nav-item-shadow, none);
      transition:
        background var(--crusher-motion-duration-base) var(--crusher-motion-easing-inout),
        border-color var(--crusher-motion-duration-base) var(--crusher-motion-easing-inout),
        box-shadow var(--crusher-motion-duration-fast) var(--crusher-motion-easing-inout),
        transform var(--crusher-motion-duration-fast) var(--crusher-motion-easing-inout);
    }

    .item:hover {
      background: var(--crusher-nav-item-bg-hover, color-mix(in srgb, var(--crusher-fg) 6%, transparent));
      box-shadow: var(--crusher-nav-item-shadow-hover, none);
      transform: translateX(var(--crusher-component-border-weight));
    }

    .item[aria-current="page"] {
      background: var(--crusher-nav-item-bg-active, color-mix(in srgb, var(--crusher-color-brand-primary) 14%, transparent));
      border-color: var(--crusher-nav-item-border-active, color-mix(in srgb, var(--crusher-color-brand-primary) 38%, var(--crusher-border)));
      color: var(--crusher-nav-item-fg-active, var(--crusher-fg));
      box-shadow:
        inset calc(var(--crusher-component-border-weight) * 2) 0 0 var(--crusher-color-brand-primary),
        var(--crusher-nav-item-shadow-active, none);
    }

    .item[disabled],
    .item[aria-disabled="true"] {
      cursor: not-allowed;
      opacity: var(--crusher-opacity-muted);
    }

    .icon {
      color: var(--crusher-nav-item-icon, var(--crusher-fg-muted));
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: var(--crusher-nav-item-icon-box, calc(var(--crusher-spacing-4) + var(--crusher-spacing-2)));
      block-size: var(--crusher-nav-item-icon-box, calc(var(--crusher-spacing-4) + var(--crusher-spacing-2)));
      border-radius: var(--crusher-radius-md);
      background: var(--crusher-nav-item-icon-bg, color-mix(in srgb, var(--crusher-fg) 6%, transparent));
      font-size: var(--crusher-font-size-sm);
      font-weight: var(--crusher-font-weight-semibold);
      line-height: 1;
    }

    .icon.placeholder::before {
      content: '';
      inline-size: calc(var(--crusher-spacing-1) + 2px);
      block-size: calc(var(--crusher-spacing-1) + 2px);
      border-radius: var(--crusher-radius-full);
      background: currentColor;
      opacity: 0.6;
    }

    .copy {
      display: grid;
      gap: calc(var(--crusher-spacing-1) / 2);
      min-inline-size: 0;
    }

    .title {
      font-size: var(--crusher-font-size-sm);
      font-weight: var(--crusher-font-weight-semibold);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .hint {
      color: var(--crusher-nav-item-hint, var(--crusher-fg-muted));
      font-size: var(--crusher-font-size-xs);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .badge {
      align-self: center;
      background: var(--crusher-nav-badge-bg, color-mix(in srgb, var(--crusher-fg) 8%, transparent));
      border: var(--crusher-component-border-weight) solid color-mix(in srgb, var(--crusher-nav-badge-fg, var(--crusher-fg-muted)) 14%, transparent);
      border-radius: var(--crusher-radius-full);
      color: var(--crusher-nav-badge-fg, var(--crusher-fg-muted));
      font-size: var(--crusher-font-size-xs);
      font-weight: var(--crusher-font-weight-semibold);
      padding-inline: var(--crusher-spacing-2);
      padding-block: calc(var(--crusher-spacing-1) / 2);
      white-space: nowrap;
    }
  `;

  get _sections() {
    const sections = [];
    let current = null;
    for (const item of this.items || []) {
      const sectionName = item.section || '';
      if (!current || current.name !== sectionName) {
        current = { name: sectionName, items: [] };
        sections.push(current);
      }
      current.items.push(item);
    }
    return sections;
  }

  _isActive(item) {
    return (item.value && item.value === this.value) || (item.href && item.href === this.value);
  }

  _select(item, event) {
    if (item.disabled) {
      event?.preventDefault();
      return;
    }
    const nextValue = item.value || item.href || '';
    if (nextValue) this.value = nextValue;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: nextValue, item },
      bubbles: true,
      composed: true,
    }));
  }

  _renderAction(item) {
    const content = html`
      ${item.icon ? html`<span class="icon" aria-hidden="true">${item.icon}</span>` : html`<span class="icon placeholder" aria-hidden="true"></span>`}
      <span class="copy">
        <span class="title">${item.label || item.value || item.href || ''}</span>
        ${item.hint ? html`<span class="hint">${item.hint}</span>` : null}
      </span>
      ${item.badge ? html`<span class="badge">${item.badge}</span>` : null}
    `;

    if (item.href) {
      return html`
        <a
          class="item"
          href=${item.href}
          aria-current=${this._isActive(item) ? 'page' : 'false'}
          aria-disabled=${item.disabled ? 'true' : 'false'}
          @click=${(event) => this._select(item, event)}
        >${content}</a>
      `;
    }

    return html`
      <button
        class="item"
        type="button"
        aria-current=${this._isActive(item) ? 'page' : 'false'}
        ?disabled=${Boolean(item.disabled)}
        @click=${(event) => this._select(item, event)}
      >${content}</button>
    `;
  }

  render() {
    return html`
      <nav aria-label=${this.label}>
        ${this._sections.map((section) => html`
          <div class="section">
            ${section.name ? html`<p class="section-label">${section.name}</p>` : null}
            <ul>
              ${section.items.map((item) => html`<li>${this._renderAction(item)}</li>`)}
            </ul>
          </div>
        `)}
      </nav>
    `;
  }
}

customElements.define('crusher-nav-list', CrusherNavList);
