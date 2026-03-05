import { LitElement, html, css } from 'lit';

/**
 * CrusherTable
 * - columns: [{ key, label, width?, minWidth?, maxWidth?, align?, sortable?, pin?('start'|'end') }]
 * - rows:    [{ key: any, ...data }]
 * - features: sticky header, sorting, row selection, density, column resizing, pinned columns
 */
export class CrusherTable extends LitElement {
  static properties = {
    columns: { type: Array },
    rows: { type: Array },
    sortKey: { type: String, reflect: true },
    sortDir: { type: String, reflect: true }, // 'asc' | 'desc'
    selectable: { type: Boolean, reflect: true },
    selectedKeys: { type: Array, attribute: false },
    busy: { type: Boolean, reflect: true },
    emptyText: { type: String, attribute: 'empty-text' },
    _widths: { state: true }, // runtime width map { key: px }
  };

  constructor() {
    super();
    this.columns = [];
    this.rows = [];
    this.sortKey = '';
    this.sortDir = 'asc';
    this.selectable = false;
    this.selectedKeys = [];
    this.busy = false;
    this.emptyText = 'No data';
    this._widths = {};
    this._onMove = this._onMove.bind(this);
    this._onUp = this._onUp.bind(this);
    this._drag = null; // { key, startX, startW, min, max }
  }

  static styles = css`
    :host { display:block; }
    .wrap {
      border: var(--crusher-component-border-weight) solid var(--crusher-border);
      border-radius: var(--crusher-radius-lg);
      background: var(--crusher-surface);
      -webkit-backdrop-filter: blur(var(--crusher-effect-blur-md));
      backdrop-filter: blur(var(--crusher-effect-blur-md));
      box-shadow: var(--crusher-shadow-1);
      overflow: auto; /* scroll container for sticky pins */
      position: relative;
    }
    table { width: 100%; border-collapse: separate; border-spacing: 0; position: relative; }

    thead th {
      position: sticky; top: 0; z-index: 3; /* above body cells & pin shadows */
      background: var(--crusher-table-header-bg);
      color: var(--crusher-fg);
      text-align: start;
      font-weight: var(--crusher-font-weight-semibold);
      padding: 0 var(--crusher-pad-inline);
      height: var(--crusher-density-row);
      border-bottom: var(--crusher-component-border-weight) solid var(--crusher-border);
      backdrop-filter: saturate(110%);
      -webkit-backdrop-filter: saturate(110%);
      white-space: nowrap;
      position: sticky;
    }

    tbody td {
      padding: 0 var(--crusher-pad-inline);
      height: var(--crusher-density-row);
      border-bottom: var(--crusher-component-border-weight) solid color-mix(in srgb, var(--crusher-border) 60%, transparent);
      color: var(--crusher-fg);
      vertical-align: middle;
      background: var(--crusher-surface);
    }
    tbody tr:hover { background: var(--crusher-table-hover-bg); }
    tbody tr[selected] { background: var(--crusher-table-selected-bg); }

    .end { text-align: end; }
    .center { text-align: center; }

    .sort { display: inline-flex; gap: var(--crusher-spacing-1); align-items: center; cursor: pointer; user-select: none; }
    .sort svg {
      width: var(--crusher-font-size-xs);
      height: var(--crusher-font-size-xs);
      opacity: var(--crusher-opacity-muted);
    }

    .busy, .empty {
      display:flex; align-items:center; justify-content:center;
      color: var(--crusher-fg-muted); height: calc(var(--crusher-spacing-10) * 4);
    }
    .spinner {
      width: var(--crusher-font-size-sm);
      height: var(--crusher-font-size-sm);
      border-radius: var(--crusher-radius-full);
      border: var(--crusher-focus-width) solid color-mix(in srgb,var(--crusher-fg) 25%, transparent);
      border-top-color: var(--crusher-fg);
      animation: spin .9s linear infinite;
      margin-inline-end: var(--crusher-spacing-2);
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Checkbox column */
    .chk {
      width: var(--crusher-spacing-10);
      text-align: center;
      position: sticky;
      left: 0;
      z-index: 4;
      background: var(--crusher-table-header-bg);
    }
    .chk-body { position: sticky; left: 0; background: var(--crusher-surface); z-index: 2; }

    /* Column resizing */
    .th-wrap { position: relative; display: inline-flex; align-items:center; gap:var(--crusher-spacing-1); }
    .resizer {
      position: absolute;
      top: 0;
      inset-inline-end: calc(var(--crusher-spacing-1) * -1);
      width: var(--crusher-spacing-2);
      height: 100%;
      cursor: col-resize; touch-action: none; opacity: 0;
    }
    th:hover .resizer { opacity: 1; }
    .guide {
      position: absolute; top: 0; bottom: 0; width: 0;
      border-inline-end: var(--crusher-component-border-weight) dashed color-mix(in srgb, var(--crusher-fg) 50%, transparent);
      pointer-events: none; z-index: 999;
    }

    /* Pinned columns */
    .pin-start {
      position: sticky;
      left: var(--_pinLeft, 0);
      z-index: 2;
      box-shadow: var(--crusher-component-border-weight) 0 0 0 color-mix(in srgb, var(--crusher-border) 70%, transparent);
    }
    .pin-end   {
      position: sticky;
      right: var(--_pinRight, 0);
      z-index: 2;
      box-shadow: calc(var(--crusher-component-border-weight) * -1) 0 0 0 color-mix(in srgb, var(--crusher-border) 70%, transparent);
    }
    thead .pin-start, thead .pin-end { z-index: 5; } /* headers above cells */
  `;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('pointermove', this._onMove);
    document.addEventListener('pointerup', this._onUp);
  }
  disconnectedCallback() {
    document.removeEventListener('pointermove', this._onMove);
    document.removeEventListener('pointerup', this._onUp);
    super.disconnectedCallback();
  }

  _sortedRows() {
    const rows = [...this.rows];
    const col = this.columns.find(c => c.key === this.sortKey);
    if (!col || !col.sortable) return rows;
    const dir = this.sortDir === 'desc' ? -1 : 1;
    rows.sort((a,b) => {
      const va = a[col.key]; const vb = b[col.key];
      if (va == null && vb == null) return 0;
      if (va == null) return -1*dir;
      if (vb == null) return  1*dir;
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });
    return rows;
  }

  _toggleSort(key) {
    if (this.sortKey !== key) { this.sortKey = key; this.sortDir = 'asc'; }
    else { this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc'; }
    this.dispatchEvent(new CustomEvent('sort', { detail: { key, dir: this.sortDir } }));
  }

  _isSelected(k) { return this.selectedKeys.includes(k); }
  _toggleRow(k) {
    if (!this.selectable) return;
    const set = new Set(this.selectedKeys);
    set.has(k) ? set.delete(k) : set.add(k);
    this.selectedKeys = Array.from(set);
    this.dispatchEvent(new CustomEvent('select', { detail: { keys: this.selectedKeys } }));
    this.requestUpdate();
  }
  _toggleAll(e) {
    if (!this.selectable) return;
    const rows = this._sortedRows();
    this.selectedKeys = e.target.checked ? rows.map(r => r.key) : [];
    this.dispatchEvent(new CustomEvent('select', { detail: { keys: this.selectedKeys } }));
  }

  /** pin math: compute sticky offsets for start and end pins */
  _pinOffsets() {
    const start = [];
    const end = [];
    if (this.selectable) start.push(40); // checkbox column
    const cols = this._colsResolved();
    let acc = start.reduce((a,b)=>a+b,0);
    cols.forEach(c => {
      if (c.pin === 'start') { c._pinLeft = acc; acc += this._colWidth(c); }
    });
    let accR = 0;
    [...cols].reverse().forEach(c => {
      if (c.pin === 'end') { c._pinRight = accR; accR += this._colWidth(c); }
    });
    return cols;
  }

  _colWidth(c) {
    const w = this._widths[c.key] ?? c.width;
    const num = typeof w === 'number' ? w : (typeof w === 'string' && w.endsWith('%') ? null : parseInt(w, 10));
    return Number.isFinite(num) ? Math.max(c.minWidth || 80, Math.min(c.maxWidth || 600, num)) : undefined;
  }

  _colsResolved() {
    return (this.columns || []).map(c => ({ ...c })); // shallow clone for pin offsets
  }

  _onDown(e, col) {
    e.preventDefault();
    const th = e.currentTarget.closest('th');
    const rect = th.getBoundingClientRect();
    const startW = rect.width;
    const min = (col.minWidth || 80);
    const max = (col.maxWidth || 600);
    this._drag = { key: col.key, startX: e.clientX, startW, min, max };
    // show guide
    const guide = this.renderRoot.querySelector('.guide');
    if (guide) {
      const hostRect = this.renderRoot.querySelector('.wrap').getBoundingClientRect();
      guide.style.display = 'block';
      guide.style.transform = `translateX(${rect.right - hostRect.left}px)`;
    }
  }
  _onMove(e) {
    if (!this._drag) return;
    e.preventDefault();
    const dx = e.clientX - this._drag.startX;
    let w = this._drag.startW + dx;
    w = Math.max(this._drag.min, Math.min(this._drag.max, w));
    this._widths = { ...this._widths, [this._drag.key]: Math.round(w) };
    // move guide
    const guide = this.renderRoot.querySelector('.guide');
    if (guide) {
      const th = this.renderRoot.querySelector(`th[data-key="${this._drag.key}"]`);
      if (th) {
        const rect = th.getBoundingClientRect();
        const hostRect = this.renderRoot.querySelector('.wrap').getBoundingClientRect();
        guide.style.transform = `translateX(${rect.right - hostRect.left}px)`;
      }
    }
  }
  _onUp() {
    if (!this._drag) return;
    this._drag = null;
    const guide = this.renderRoot.querySelector('.guide');
    if (guide) guide.style.display = 'none';
    this.dispatchEvent(new CustomEvent('resize', { detail: { widths: this._widths }}));
  }

  render() {
    if (this.busy) return html`<div class="wrap"><div class="busy"><span class="spinner"></span> Loading…</div></div>`;
    if (!this.rows?.length) return html`<div class="wrap"><div class="empty">${this.emptyText}</div></div>`;

    const cols = this._pinOffsets();
    const rows = this._sortedRows();
    const allChecked = this.selectable && rows.length && rows.every(r => this._isSelected(r.key));

    // column class/width helpers
    const cellCls = (c) => (c.align === 'end' ? 'end' : c.align === 'center' ? 'center' : '');
    const thStyle = (c) => {
      const w = this._colWidth(c);
      const style = [];
      if (w) style.push(`inline-size:${w}px`);
      if (c.pin === 'start') style.push(`--_pinLeft:${c._pinLeft || 0}px`);
      if (c.pin === 'end') style.push(`--_pinRight:${c._pinRight || 0}px`);
      return style.join(';');
    };

    return html`
      <div class="wrap" role="region" aria-label="Data table">
        <div class="guide" style="display:none"></div>
        <table>
          <thead>
            <tr>
              ${this.selectable ? html`
                <th class="chk"><input type="checkbox" .checked=${allChecked} @change=${(e) => this._toggleAll(e)} /></th>
              ` : null}
              ${cols.map(c => html`
                <th
                  data-key=${c.key}
                  class="${cellCls(c)} ${c.pin === 'start' ? 'pin-start' : c.pin === 'end' ? 'pin-end' : ''}"
                  style=${thStyle(c)}
                >
                  <span class="th-wrap">
                    ${c.sortable ? html`
                      <span class="sort" @click=${() => this._toggleSort(c.key)} aria-sort=${this.sortKey===c.key ? this.sortDir : 'none'}>
                        ${c.label}
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          ${this.sortKey === c.key ? (this.sortDir === 'asc'
                            ? html`<path fill="currentColor" d="M7 14l5-5 5 5z"/>`
                            : html`<path fill="currentColor" d="M7 10l5 5 5-5z"/>`)
                            : html`<path fill="currentColor" d="M7 10l5 5 5-5z" opacity=".4"/>`}
                        </svg>
                      </span>
                    ` : c.label}
                    <span class="resizer" @pointerdown=${(e) => this._onDown(e, c)}></span>
                  </span>
                </th>
              `)}
            </tr>
          </thead>
          <tbody>
            ${rows.map(r => html`
              <tr ?selected=${this._isSelected(r.key)} @click=${() => this._toggleRow(r.key)}>
                ${this.selectable ? html`<td class="chk-body"><input type="checkbox" .checked=${this._isSelected(r.key)} @click=${(e) => e.stopPropagation()} @change=${() => this._toggleRow(r.key)} /></td>` : null}
                ${cols.map(c => html`
                  <td
                    class="${cellCls(c)} ${c.pin === 'start' ? 'pin-start' : c.pin === 'end' ? 'pin-end' : ''}"
                    style=${thStyle(c)}
                    >
                    ${r[c.key] ?? ''}
                  </td>
                `)}
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}
customElements.define('crusher-table', CrusherTable);
