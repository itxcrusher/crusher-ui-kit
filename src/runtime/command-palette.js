const EVT = 'crusher:palette';
const HAS_BROWSER_RUNTIME = typeof window !== 'undefined' && typeof document !== 'undefined';

function requireBrowserRuntime() {
  if (!HAS_BROWSER_RUNTIME) {
    throw new Error('crusher-ui-kit/runtime requires a browser environment (window/document).');
  }
  return window;
}

function emitPalette(detail = {}) {
  requireBrowserRuntime().dispatchEvent(new CustomEvent(EVT, { detail, bubbles: true }));
}

export function openPalette(payload = {}) {
  emitPalette({ action: 'open', open: true, ...payload });
}
export function closePalette(payload = {}) {
  emitPalette({ action: 'close', open: false, ...payload });
}
export function togglePalette(payload = {}) {
  emitPalette({ action: 'toggle', toggle: true, ...payload });
}

if (HAS_BROWSER_RUNTIME) {
  if (!window.crusherPalette) {
    window.crusherPalette = {
      open: openPalette,
      close: closePalette,
      toggle: togglePalette
    };
  }

  // default hotkey: mod+k
  const onKey = (e) => {
    const isMac = navigator.platform.toLowerCase().includes('mac');
    const mod = isMac ? e.metaKey : e.ctrlKey;
    if (mod && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      togglePalette();
    }
  };
  document.addEventListener('keydown', onKey, { capture: true });
}
