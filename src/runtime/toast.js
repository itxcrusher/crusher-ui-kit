// Public API: window.crusherToast({ title, message, variant, duration, action })
//  - variant: 'info' | 'success' | 'warning' | 'error'
//  - duration: ms (default 4000)
//  - action: { label, onClick } (optional)

const EVT = 'crusher:toast';
const HAS_BROWSER_RUNTIME = typeof window !== 'undefined' && typeof document !== 'undefined';

function requireBrowserRuntime() {
  if (!HAS_BROWSER_RUNTIME) {
    throw new Error('crusher-ui-kit/runtime requires a browser environment (window/document).');
  }
}

export function showToast(opts = {}) {
  requireBrowserRuntime();
  const detail = {
    id: crypto.randomUUID?.() || String(Date.now() + Math.random()),
    title: opts.title ?? '',
    message: opts.message ?? '',
    variant: opts.variant ?? 'info',
    duration: typeof opts.duration === 'number' ? opts.duration : 4000,
    action: opts.action && typeof opts.action.label === 'string' ? opts.action : null
  };
  const ev = new CustomEvent(EVT, { detail, bubbles: true, cancelable: true });
  window.dispatchEvent(ev);
  return detail.id;
}

// attach to window for convenience
if (HAS_BROWSER_RUNTIME && !window.crusherToast) window.crusherToast = showToast;
