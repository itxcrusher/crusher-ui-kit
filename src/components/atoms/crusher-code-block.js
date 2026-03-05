import { LitElement, html, css } from 'lit';

export class CrusherCodeBlock extends LitElement {
  static properties = {
    language: { type: String, reflect: true },
    code: { type: String },        // optional; else read slotted text
    wrap: { type: Boolean, reflect: true } // soft-wrap toggle
  };
  constructor() {
    super();
    this.language = '';
    this.code = '';
    this.wrap = false;
    this._copiedAt = 0;
  }

  static styles = css`
    :host { display: block; position: relative; }

    .surface {
      margin: 0;
      padding: var(--crusher-spacing-4);
      overflow: auto;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
      font-size: var(--crusher-font-size-sm);
      line-height: 1.6;
      color: var(--code-fg, var(--crusher-text-primary));
      background: var(--code-bg, color-mix(in srgb, var(--crusher-text-primary) 6%, transparent));
      border: var(--crusher-component-border-weight) solid var(--code-border, var(--crusher-border-primary));
      border-radius: var(--crusher-radius-lg);
      box-shadow: var(--crusher-shadow-1);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      white-space: pre;
    }
    :host([wrap]) .surface { white-space: pre-wrap; word-break: break-word; }

    code { background: transparent; }

    /* Toolbar */
    .toolbar {
      position: absolute;
      top: var(--crusher-spacing-2);
      right: var(--crusher-spacing-2);
      display: flex;
      gap: calc((var(--crusher-spacing-1) + var(--crusher-spacing-2)) / 2);
    }
    .btn {
      background: var(--crusher-background-surface);
      border: var(--crusher-component-border-weight) solid var(--crusher-border-primary);
      color: var(--crusher-text-primary);
      padding: var(--crusher-spacing-1) var(--crusher-spacing-2); border-radius: var(--crusher-radius-md);
      cursor: pointer; font-size: var(--crusher-font-size-sm);
    }

    /* Language pill */
    .badge {
      position: absolute;
      top: var(--crusher-spacing-2);
      left: var(--crusher-spacing-3);
      font-size: var(--crusher-font-size-xs);
      padding: var(--crusher-focus-offset) var(--crusher-spacing-2);
      border-radius: var(--crusher-radius-full);
      color: var(--code-pill-fg, var(--crusher-text-secondary));
      background: var(--code-pill-bg, color-mix(in srgb, var(--crusher-text-primary) 8%, transparent));
      border: var(--crusher-component-border-weight) solid var(--code-border, var(--crusher-border-primary));
    }

    /* Token theming (Prism/Shiki style). Users can override via CSS variables. */
    .surface .token.comment,
    .surface .token.prolog,
    .surface .token.doctype { color: var(--code-token-comment, var(--crusher-text-secondary)); }
    .surface .token.punctuation { color: var(--code-token-punc, var(--crusher-text-secondary)); }
    .surface .token.keyword { color: var(--code-token-kw, var(--crusher-color-brand-secondary)); }
    .surface .token.operator { color: var(--code-token-op, var(--crusher-color-brand-accent-red)); }
    .surface .token.number { color: var(--code-token-num, var(--crusher-color-brand-secondary)); }
    .surface .token.string { color: var(--code-token-str, var(--crusher-color-brand-primary)); }
    .surface .token.function { color: var(--code-token-fn, var(--crusher-color-brand-secondary)); }
    .surface .token.boolean { color: var(--code-token-bool, var(--crusher-color-brand-accent-orange)); }
    .surface .token.class-name { color: var(--code-token-class, var(--crusher-color-brand-secondary)); }
  `;

  _getText() {
    if (this.code) return this.code;
    const slot = this.shadowRoot.querySelector('slot');
    return (slot?.assignedNodes({flatten:true}).map(n => n.textContent).join('') || '').trim();
  }

  async _copy() {
    try {
      await navigator.clipboard.writeText(this._getText());
      this._copiedAt = Date.now(); this.requestUpdate();
      setTimeout(() => { this._copiedAt = 0; this.requestUpdate(); }, 1200);
    } catch (e) { console.warn('Copy failed', e); }
  }

  render() {
    const copied = Date.now() - this._copiedAt < 1200;
    return html`
      ${this.language ? html`<span class="badge">${this.language}</span>` : null}
      <div class="toolbar">
        <button class="btn" @click=${() => this._copy()} aria-label="Copy code">
          ${copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre class="surface" part="surface">
        <code><slot>${this.code}</slot></code>
      </pre>
    `;
  }
}

customElements.define('crusher-code-block', CrusherCodeBlock);
