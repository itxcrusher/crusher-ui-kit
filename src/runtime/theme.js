// src/runtime/theme.js
const KEY = 'crusher_prefs';
const EVT = 'crusher:themechange';

function readPrefs() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
function writePrefs(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} }

function emitThemeChange(detail = {}) {
  window.dispatchEvent(new CustomEvent(EVT, { detail, bubbles: true }));
}

export function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'glass';
}
export function getMode() {
  return document.documentElement.getAttribute('data-mode') || 'light';
}
export function setTheme(name) {
  const prev = getTheme();
  document.documentElement.setAttribute('data-theme', name);
  const prefs = readPrefs(); prefs.theme = name; writePrefs(prefs);
  emitThemeChange({ prevTheme: prev, theme: name, mode: getMode() });
}
export function setMode(mode /* 'light' | 'dark' */) {
  const prev = getMode();
  document.documentElement.setAttribute('data-mode', mode);
  const prefs = readPrefs(); prefs.mode = mode; writePrefs(prefs);
  emitThemeChange({ prevMode: prev, mode, theme: getTheme() });
}
export function toggleMode() {
  setMode(getMode() === 'dark' ? 'light' : 'dark');
}
export function setDensity(density /* 'compact' | 'cozy' | 'comfortable' */) {
  document.documentElement.setAttribute('data-density', density);
  const prefs = readPrefs(); prefs.density = density; writePrefs(prefs);
  emitThemeChange({ density, theme: getTheme(), mode: getMode() });
}

// Init on import
(function init() {
  const prefs = readPrefs();
  if (prefs.theme) document.documentElement.setAttribute('data-theme', prefs.theme);
  if (prefs.mode)  document.documentElement.setAttribute('data-mode', prefs.mode);
  if (prefs.density) document.documentElement.setAttribute('data-density', prefs.density);

  // fallback to system dark if no explicit pref
  if (!prefs.mode && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-mode', 'dark');
  }

  emitThemeChange({ theme: getTheme(), mode: getMode(), density: document.documentElement.getAttribute('data-density') || 'comfortable' });
})();
