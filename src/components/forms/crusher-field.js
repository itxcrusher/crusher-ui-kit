import { LitElement, html, css } from 'lit';

let idSeq = 0;
const genId = (p='field') => `${p}-${++idSeq}`;

export class CrusherField extends LitElement {
  static properties = {
    required: { type: Boolean, reflect: true },
    invalid: { type: Boolean, reflect: true }
  };

  constructor() {
    super();
    this.required = false;
    this.invalid = false;
    this._controlId = '';
  }

  static styles = css`
    :host { display: block; }
    .stack { display: grid; gap: calc((var(--crusher-spacing-1) + var(--crusher-spacing-2)) / 2); }
  `;

  firstUpdated() {
    // identify control
    const control = this._control();
    if (control) {
      this._controlId = control.id || genId('ctrl');
      control.id = this._controlId;
      if (this.required) control.setAttribute('required','');
      this._syncAria();
      control.addEventListener('invalid', () => { this.invalid = true; this._syncAria(); });
      control.addEventListener('input', () => { if (this.invalid) { this.invalid = false; this._syncAria(); } });
    }
    // wire label "for"
    const label = this._label();
    if (label) label.setAttribute('for', this._controlId);
  }

  updated(changed) {
    if (changed.has('required') || changed.has('invalid')) this._syncAria();
  }

  _control() {
    const nodes = this.renderRoot.querySelector('slot')?.assignedElements({ flatten: true }) ?? [];
    // find first native or custom input-ish
    return nodes.find(n => /INPUT|TEXTAREA|SELECT/.test(n.tagName) || n.shadowRoot?.querySelector('input,textarea,select'));
  }
  _label()  { return this.renderRoot.querySelector('slot[name="label"]')?.assignedElements({ flatten: true })[0]; }
  _hint()   { return this.renderRoot.querySelector('slot[name="hint"]')?.assignedElements({ flatten: true })[0]; }
  _error()  { return this.renderRoot.querySelector('slot[name="error"]')?.assignedElements({ flatten: true })[0]; }

  _syncAria() {
    const c = this._control();
    if (!c) return;
    if (this.invalid) c.setAttribute('aria-invalid', 'true'); else c.removeAttribute('aria-invalid');
    if (this.required) c.setAttribute('aria-required','true'); else c.removeAttribute('aria-required');

    const ids = [];
    const hint = this._hint();  if (hint) { hint.id ||= genId('hint');  ids.push(hint.id); }
    const err  = this._error(); if (err)  { err.id  ||= genId('error'); if (this.invalid) ids.push(err.id); }
    if (ids.length) c.setAttribute('aria-describedby', ids.join(' ')); else c.removeAttribute('aria-describedby');
  }

  render() {
    return html`
      <div class="stack">
        <slot name="label"></slot>
        <slot></slot>
        <slot name="hint"></slot>
        <slot name="error"></slot>
      </div>
    `;
  }
}
customElements.define('crusher-field', CrusherField);
