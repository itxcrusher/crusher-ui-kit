import { LitElement, html, css } from 'lit';

export class CrusherAppShell extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: var(--crusher-fg);
    }

    .shell {
      display: grid;
      gap: var(--crusher-shell-gap, var(--crusher-layout-gap, var(--crusher-spacing-6)));
      max-width: var(--crusher-shell-max-width, 80rem);
      margin-inline: auto;
      min-height: var(--crusher-shell-min-height, 100vh);
      padding-inline: var(--crusher-shell-padding-inline, clamp(var(--crusher-spacing-4), 3vw, var(--crusher-spacing-8)));
      padding-block: var(--crusher-shell-padding-block, var(--crusher-spacing-6));
      box-sizing: border-box;
    }

    .body {
      display: grid;
      gap: inherit;
      grid-template-columns: minmax(0, 1fr);
      align-items: start;
      min-inline-size: 0;
    }

    .header,
    .nav,
    .main,
    .aside,
    .footer {
      min-inline-size: 0;
    }

    .main {
      display: block;
    }

    :host([has-nav]) .body {
      grid-template-columns: minmax(0, var(--crusher-shell-nav-width, 18rem)) minmax(0, 1fr);
    }

    :host([has-aside]) .body {
      grid-template-columns: minmax(0, 1fr) minmax(0, var(--crusher-shell-aside-width, 20rem));
    }

    :host([has-nav][has-aside]) .body {
      grid-template-columns:
        minmax(0, var(--crusher-shell-nav-width, 18rem))
        minmax(0, 1fr)
        minmax(0, var(--crusher-shell-aside-width, 20rem));
    }

    @media (max-width: 960px) {
      :host([has-nav]) .body,
      :host([has-aside]) .body,
      :host([has-nav][has-aside]) .body {
        grid-template-columns: minmax(0, 1fr);
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
    ['header', 'nav', 'aside', 'footer'].forEach((name) => {
      this.toggleAttribute(`has-${name}`, this._slotHasContent(name));
    });
    this.requestUpdate();
  };

  render() {
    return html`
      <div class="shell" part="shell">
        <div class="header" part="header" ?hidden=${!this.hasAttribute('has-header')}>
          <slot name="header" @slotchange=${this._syncSlotState}></slot>
        </div>

        <div class="body" part="body">
          <aside class="nav" part="nav" ?hidden=${!this.hasAttribute('has-nav')}>
            <slot name="nav" @slotchange=${this._syncSlotState}></slot>
          </aside>

          <main class="main" part="main">
            <slot></slot>
          </main>

          <aside class="aside" part="aside" ?hidden=${!this.hasAttribute('has-aside')}>
            <slot name="aside" @slotchange=${this._syncSlotState}></slot>
          </aside>
        </div>

        <div class="footer" part="footer" ?hidden=${!this.hasAttribute('has-footer')}>
          <slot name="footer" @slotchange=${this._syncSlotState}></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('crusher-app-shell', CrusherAppShell);
