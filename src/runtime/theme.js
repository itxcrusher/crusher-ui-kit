const KEY = 'crusher_prefs';

function readPrefs() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
function writePrefs(p) { try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {} }

export function setTheme(name) {
  document.documentElement.setAttribute('data-theme', name);
  const prefs = readPrefs(); prefs.theme = name; writePrefs(prefs);
}
export function setMode(mode /* 'light' | 'dark' */) {
  document.documentElement.setAttribute('data-mode', mode);
  const prefs = readPrefs(); prefs.mode = mode; writePrefs(prefs);
}

// Init on import
(function init() {
  const prefs = readPrefs();
  if (prefs.theme) document.documentElement.setAttribute('data-theme', prefs.theme);
  if (prefs.mode)  document.documentElement.setAttribute('data-mode', prefs.mode);
  // fallback to system
  if (!prefs.mode && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    setMode('dark');
  }
})();
