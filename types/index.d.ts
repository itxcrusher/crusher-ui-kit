// Minimal tag typings for TS consumers (global Custom Elements map).
declare global {
  interface HTMLElementTagNameMap {
    // atoms
    'crusher-badge': HTMLElement;
    'crusher-button': HTMLElement;
    'crusher-checkbox': HTMLElement;
    'crusher-chip': HTMLElement;
    'crusher-code-block': HTMLElement;
    'crusher-input': HTMLElement;
    'crusher-switch': HTMLElement;
    'crusher-textarea': HTMLElement;
    'crusher-tooltip': HTMLElement;
    // molecules
    'crusher-card': HTMLElement;
    'crusher-command-palette': HTMLElement;
    'crusher-dropdown': HTMLElement;
    'crusher-modal': HTMLElement;
    'crusher-select': HTMLElement;
    'crusher-skill-bar': HTMLElement;
    'crusher-style-switcher': HTMLElement;
    'crusher-tabs': HTMLElement;
    'crusher-toast-center': HTMLElement;
    // organisms
    'crusher-section-title': HTMLElement;
    'crusher-timeline-item': HTMLElement;
    'crusher-timeline': HTMLElement;
    // forms
    'crusher-field': HTMLElement;
    'crusher-label': HTMLElement;
    'crusher-hint': HTMLElement;
    'crusher-error': HTMLElement;
  }
}
export {};
