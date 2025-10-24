// Public API: window.crusherToast({ title, message, variant, duration, action })
//  - variant: 'info' | 'success' | 'warning' | 'error'
//  - duration: ms (default 4000)
//  - action: { label, onClick } (optional)

const EVT = 'crusher:toast';

export function showToast(opts = {}) {
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
if (!window.crusherToast) window.crusherToast = showToast;
