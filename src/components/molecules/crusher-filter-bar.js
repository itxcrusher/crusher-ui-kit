import { LitElement, html, css } from 'lit';

export class CrusherFilterBar extends LitElement {
  static properties = {
    query: { type: String, reflect: true },
    placeholder: { type: String },
    label: { type: String },
    hideSearch: { type: Boolean, attribute: 'hide-search', reflect: true },
  };

  constructor() {
    super();
    this.query = '';
    this.placeholder = 'Search…';
    this.label = 'Filter items';
    this.hideSearch = false;
    this._onInput = this._onInput.bind(this);
    this._clear = this._clear.bind(this);
  }

  static styles = css`
    :host {
      display: block;
      min-inline-size: 0;
    }

    .bar {
      align-items: center;
      background: var(--crusher-filter-bar-bg, color-mix(in srgb, var(--crusher-surface) 94%, transparent));
      border: var(--crusher-component-border-weight) solid var(--crusher-filter-bar-border, color-mix(in srgb, var(--crusher-border) 85%, transparent));
      border-radius: var(--crusher-radius-lg);
      display: grid;
      gap: var(--crusher-filter-bar-gap, var(--crusher-layout-gap-tight, var(--crusher-spacing-4)));
      grid-template-columns: minmax(0, 18rem) minmax(0, 1fr) auto;
      min-inline-size: 0;
      padding: var(--crusher-filter-bar-padding, var(--crusher-spacing-3));
    }

    .search,
    .filters,
    .actions {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: var(--crusher-filter-bar-gap, var(--crusher-layout-gap-tight, var(--crusher-spacing-4)));
      min-inline-size: 0;
    }

    .filters {
      justify-content: flex-start;
    }

    .actions {
      justify-content: flex-end;
    }

    .search-wrap {
      align-items: center;
      background: var(--crusher-filter-search-bg, var(--crusher-surface));
      border: var(--crusher-component-border-weight) solid var(--crusher-filter-search-border, var(--crusher-border));
      border-radius: var(--crusher-radius-md);
      display: flex;
      gap: var(--crusher-spacing-2);
      min-inline-size: 0;
      padding-inline: var(--crusher-spacing-3);
      padding-block: var(--crusher-spacing-2);
      width: 100%;
    }

    .search-wrap:focus-within {
      border-color: transparent;
      box-shadow: 0 0 0 var(--crusher-focus-width) var(--crusher-focus-color-primary);
    }

    .search-icon {
      color: var(--crusher-fg-muted);
      flex: 0 0 auto;
      inline-size: 1rem;
    }

    input {
      appearance: none;
      background: transparent;
      border: 0;
      color: var(--crusher-fg);
      flex: 1 1 auto;
      font: inherit;
      min-inline-size: 0;
      outline: none;
    }

    input::placeholder {
      color: var(--crusher-fg-muted);
      opacity: var(--crusher-opacity-muted);
    }

    .clear {
      appearance: none;
      background: color-mix(in srgb, var(--crusher-fg) 8%, transparent);
      border: 0;
      border-radius: var(--crusher-radius-full);
      color: var(--crusher-fg-muted);
      cursor: pointer;
      flex: 0 0 auto;
      font: inherit;
      inline-size: calc(var(--crusher-spacing-6) + var(--crusher-spacing-1));
      line-height: 1;
      padding: var(--crusher-spacing-1);
    }

    @media (max-width: 860px) {
      .bar {
        grid-template-columns: minmax(0, 1fr);
      }

      .actions {
        justify-content: flex-start;
      }
    }
  `;

  _emit(type) {
    this.dispatchEvent(new CustomEvent(type, {
      detail: { value: this.query },
      bubbles: true,
      composed: true,
    }));
  }

  _onInput(event) {
    this.query = event.target.value;
    this._emit('search');
    this._emit('change');
  }

  _clear() {
    this.query = '';
    this._emit('search');
    this._emit('change');
    this.updateComplete.then(() => this.renderRoot.getElementById('search')?.focus());
  }

  render() {
    return html`
      <div class="bar" part="bar">
        ${this.hideSearch ? null : html`
          <label class="search" part="search">
            <div class="search-wrap">
              <span class="search-icon" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
                  <circle cx="8.5" cy="8.5" r="5.75"></circle>
                  <path d="M12.5 12.5 17 17"></path>
                </svg>
              </span>
              <input
                id="search"
                type="search"
                aria-label=${this.label}
                .value=${this.query}
                placeholder=${this.placeholder}
                @input=${this._onInput}
              />
              ${this.query ? html`<button class="clear" type="button" aria-label="Clear search" @click=${this._clear}>×</button>` : null}
            </div>
          </label>
        `}

        <div class="filters" part="filters">
          <slot name="filters"></slot>
        </div>

        <div class="actions" part="actions">
          <slot name="actions"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('crusher-filter-bar', CrusherFilterBar);
