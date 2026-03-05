const EVT = 'crusher:palette';

function emitPalette(detail = {}) {
  window.dispatchEvent(new CustomEvent(EVT, { detail, bubbles: true }));
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
