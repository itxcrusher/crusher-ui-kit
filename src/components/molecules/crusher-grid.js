import { LitElement, html, css } from 'lit';

export class CrusherGrid extends LitElement {
  static properties = {
    min: { type: String },
    gap: { type: String },
    columns: { type: String },
    align: { type: String },
  };

  static styles = css`
    :host {
      display: block;
    }

    .grid {
      display: grid;
      gap: var(--_grid-gap, var(--crusher-grid-gap, var(--crusher-layout-gap, var(--crusher-spacing-6))));
      align-items: var(--_grid-align, stretch);
      grid-template-columns: var(--_grid-columns);
      min-inline-size: 0;
    }
  `;

  get _gridTemplateColumns() {
    if (this.columns) {
      return `repeat(${this.columns}, minmax(0, 1fr))`;
    }
    return `repeat(auto-fit, minmax(min(100%, ${this.min || 'var(--crusher-grid-min-column, 18rem)'}), 1fr))`;
  }

  get _style() {
    const styles = [`--_grid-columns:${this._gridTemplateColumns}`];
    if (this.gap) styles.push(`--_grid-gap:${this.gap}`);
    if (this.align) styles.push(`--_grid-align:${this.align}`);
    return styles.join(';');
  }

  render() {
    return html`
      <div class="grid" part="grid" style=${this._style}>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('crusher-grid', CrusherGrid);
