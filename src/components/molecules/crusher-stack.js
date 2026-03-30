import { LitElement, html, css } from 'lit';

export class CrusherStack extends LitElement {
  static properties = {
    gap: { type: String },
    align: { type: String },
    justify: { type: String },
  };

  static styles = css`
    :host {
      display: block;
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: var(--_stack-gap, var(--crusher-stack-gap, var(--crusher-layout-gap-tight, var(--crusher-spacing-4))));
      align-items: var(--_stack-align, stretch);
      justify-content: var(--_stack-justify, flex-start);
      min-inline-size: 0;
    }
  `;

  get _style() {
    const styles = [];
    if (this.gap) styles.push(`--_stack-gap:${this.gap}`);
    if (this.align) styles.push(`--_stack-align:${this.align}`);
    if (this.justify) styles.push(`--_stack-justify:${this.justify}`);
    return styles.join(';');
  }

  render() {
    return html`
      <div class="stack" part="stack" style=${this._style}>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('crusher-stack', CrusherStack);
