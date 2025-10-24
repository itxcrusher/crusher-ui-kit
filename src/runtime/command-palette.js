const EVT = 'crusher:palette';
export function openPalette(payload = {}) {
  window.dispatchEvent(new CustomEvent(EVT, { detail: { open: true, ...payload } }));
}
export function closePalette() {
  window.dispatchEvent(new CustomEvent(EVT, { detail: { open: false } }));
}
if (!window.crusherPalette) window.crusherPalette = { open: openPalette, close: closePalette };

// default hotkey: mod+k
const onKey = (e) => {
  const isMac = navigator.platform.toLowerCase().includes('mac');
  const mod = isMac ? e.metaKey : e.ctrlKey;
  if (mod && e.key.toLowerCase() === 'k') {
    e.preventDefault(); openPalette();
  }
};
document.addEventListener('keydown', onKey, { capture: true });
