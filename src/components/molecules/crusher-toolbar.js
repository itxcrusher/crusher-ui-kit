import { LitElement, html, css } from 'lit';

export class CrusherToolbar extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-inline-size: 0;
    }

    .toolbar {
      align-items: center;
      background: var(--crusher-toolbar-bg, color-mix(in srgb, var(--crusher-surface) 92%, transparent));
      border: var(--crusher-component-border-weight) solid var(--crusher-toolbar-border, color-mix(in srgb, var(--crusher-border) 80%, transparent));
      border-radius: var(--crusher-radius-lg);
      box-shadow: var(--crusher-toolbar-shadow, var(--crusher-shadow-1));
      display: flex;
      flex-wrap: wrap;
      gap: var(--crusher-toolbar-gap, var(--crusher-layout-gap-tight, var(--crusher-spacing-4)));
      justify-content: space-between;
      min-inline-size: 0;
      padding: var(--crusher-toolbar-padding, var(--crusher-spacing-3));
    }

    .leading,
    .center,
    .actions {
      align-items: center;
      display: flex;
      flex-wrap: wrap;
      gap: var(--crusher-toolbar-gap, var(--crusher-layout-gap-tight, var(--crusher-spacing-4)));
      min-inline-size: 0;
    }

    .leading {
      justify-content: flex-start;
    }

    .center {
      color: var(--crusher-fg-muted);
      flex: 1 1 auto;
      justify-content: center;
    }

    .actions {
      justify-content: flex-end;
    }

    @media (max-width: 720px) {
      .toolbar {
        align-items: stretch;
        flex-direction: column;
      }

      .leading,
      .center,
      .actions {
        justify-content: flex-start;
        width: 100%;
      }
    }
  `;

  render() {
    return html`
      <div class="toolbar" part="toolbar">
        <div class="leading" part="leading"><slot name="leading"></slot></div>
        <div class="center" part="center"><slot name="center"></slot></div>
        <div class="actions" part="actions"><slot name="actions"></slot></div>
      </div>
    `;
  }
}

customElements.define('crusher-toolbar', CrusherToolbar);
