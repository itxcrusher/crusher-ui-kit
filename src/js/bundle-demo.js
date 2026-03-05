// ---- Pure-static demo entry (no SCSS, only CSS + components) ----

// Tokens + layers (CSS only)
import '../css/tokens.css';
import '../css/modes.css';
import '../css/semantic.css';
import '../css/bridge.css';
import '../css/code-theme.css';
import '../css/dialect-overrides.css';

// Pick ONE dialect you want visible on the demo page
import '../css/themes/glass.css';

// === COMPONENT REGISTRATION (side-effect imports) ===
// Atoms
import '../components/atoms/crusher-button.js';
import '../components/atoms/crusher-input.js';
import '../components/atoms/crusher-textarea.js';
import '../components/atoms/crusher-checkbox.js';
import '../components/atoms/crusher-switch.js';
import '../components/atoms/crusher-chip.js';
import '../components/atoms/crusher-code-block.js';
import '../components/atoms/crusher-tooltip.js';
import '../components/atoms/crusher-badge.js';

// Molecules
import '../components/molecules/crusher-card.js';
import '../components/molecules/crusher-modal.js';
import '../components/molecules/crusher-skill-bar.js';
import '../components/molecules/crusher-style-switcher.js';
import '../components/molecules/crusher-toast-center.js';
import '../components/molecules/crusher-dropdown.js';
import '../components/molecules/crusher-tabs.js';
import '../components/molecules/crusher-command-palette.js';
import '../components/molecules/crusher-select.js';
import '../components/molecules/crusher-menubar.js';

// Forms
import '../components/forms/crusher-field.js';
import '../components/forms/crusher-label.js';
import '../components/forms/crusher-hint.js';
import '../components/forms/crusher-error.js';

// Organisms
import '../components/organisms/crusher-section-title.js';
import '../components/organisms/crusher-timeline-item.js';
import '../components/organisms/crusher-timeline.js';
import '../components/organisms/crusher-table.js';

// Runtime helpers used by the demo page
import '../runtime/theme.js';
import '../runtime/toast.js';
import '../runtime/command-palette.js';

console.log('Crusher UI (demo bundle) ready');
