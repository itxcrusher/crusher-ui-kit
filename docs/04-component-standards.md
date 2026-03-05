# 04 Component Standards

## Scope
Defines current component API and authoring conventions in `src/components`.

## Contract
- Registered tags are the public API. Current sets:
  - Atoms: badge, button, checkbox, chip, code-block, input, switch, textarea, tooltip
  - Molecules: card, command-palette, dropdown, menubar, modal, select, skill-bar, style-switcher, tabs, toast-center
  - Organisms: section-title, table, timeline-item, timeline
  - Forms: field, label, hint, error
- Authoring style:
  - Prefer `LitElement` with `static properties` and local `static styles`
  - Register once per file via `customElements.define(...)`
  - Use shared variables (`--crusher-*`, `--ctl-*`, `--btn-*`) for visual decisions
  - Emit clear events with detail payloads (examples already used: `change`, `action`, `open`, `close`, `request-close`, `sort`, `select`, `resize`, `run`)
- Runtime integration:
  - Theme/mode/density handled by `src/runtime/theme.js`
  - Toast and command palette globals come from `src/runtime/toast.js` and `src/runtime/command-palette.js`
- Type contract:
  - Keep `types/index.d.ts` in sync with registered tags

## Do Not Do
- Do not rename tag names or event names without compatibility handling.
- Do not hardcode theme colors in components when token variables are available.
- Do not add new globals on `window` without documenting them in runtime docs and this standards file.
