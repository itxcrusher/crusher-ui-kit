# 🚀 Crusher UI Kit

## Design Dialects on Demand — A modern, token-driven UI framework

**Modern, themeable Web Components for product-grade apps — infra consoles, AI tools, dashboards, you name it.**
Tokens-first. Zero lock-in. Accessible. Fast. Framework-free.

---

## 🧩 Install

```bash
npm i crusher-ui-kit
```

### Use

**Bundler apps (Vite/Next/etc):**

```js
import 'crusher-ui-kit';
import 'crusher-ui-kit/styles/tokens.css';
import 'crusher-ui-kit/styles/modes.css';
import 'crusher-ui-kit/styles/semantic.css';
import 'crusher-ui-kit/styles/bridge.css';
import 'crusher-ui-kit/styles/code-theme.css';
import 'crusher-ui-kit/styles/theme-scenes.css';
import 'crusher-ui-kit/styles/dialect-overrides.css';
import 'crusher-ui-kit/themes/glass.css';
```

Theme imports are extension-qualified by contract:
`import 'crusher-ui-kit/themes/<theme>.css'`

**Runtime helpers (browser):**

```js
import {
  setTheme,
  setMode,
  setDensity,
  showToast,
  openPalette
} from 'crusher-ui-kit/runtime';

setTheme('glass');
setMode('dark');
setDensity('comfortable');
showToast({ title: 'Crusher ready' });
openPalette();
```

**Static HTML (no bundler, drop-in):**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/crusher-ui-kit@0.1.0/dist/crusher-ui.min.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/crusher-ui-kit@0.1.0/dist/crusher-ui.standalone.esm.js"></script>
```

---

## 🎨 Theming

Base tokens under `:root`, dark-mode overrides under `html[data-mode="dark"]`.

Dialects:
`html[data-theme="glass" | "minimal" | "futuristic" | "neobrutal" | "neumorph" | "brutal" | "bento"]`

Example:

```html
<script type="module">
  document.documentElement.setAttribute('data-theme', 'glass');
  document.documentElement.setAttribute('data-mode', 'dark');
</script>
```

---

## ♿ Accessibility

* **Modal:** traps focus, restores on close, locks scroll, supports Esc/overlay dismiss, emits `request-close` (cancelable).
* **Tabs:** fully ARIA-compliant (`role="tablist/tab/tabpanel"`) with roving focus + live announcements.
* **Select:** announces selections via `aria-live`, supports async data and keyboard type-ahead.
* **Contrast:** checked automatically via `npm run check:contrast` (WCAG-compliant).

---

## 🧰 Scripts

| Command                           | Purpose                         |
| --------------------------------- | ------------------------------- |
| `npm run dev`                     | Vite dev server                 |
| `npm run build:tokens`            | Generate token + theme CSS      |
| `npm run build:site`             | Build the GitHub Pages site artifact from `index.html` |
| `npm run build`                   | Build distributable (bundler ESM + standalone ESM + CSS) |
| `npm run check:package`           | Verify runtime/package contracts |
| `npm run check:contrast`          | WCAG color contrast validation  |

**Release flow:** Uses Changesets release PRs. Pushes to `main` validate the package and either update the release PR or publish only after a versioned release PR is merged.

**CI publish prerequisite:** configure GitHub secret `NPM_TOKEN` for the owning npm account before expecting automated releases to publish new versions of `crusher-ui-kit`.

---

## 💡 Types

`types/index.d.ts` declares custom elements for IDE IntelliSense (TS / VSCode).

---

## 🧱 Project Structure

```bash
crusher-ui-kit/
├── design/           → base tokens + theme overlays (JSON)
├── src/
│   ├── components/   → Web Components (atoms, molecules, organisms)
│   ├── css/          → generated token/theme CSS
│   ├── scss/         → authored SCSS utilities
│   ├── runtime/      → theme + mode switching
│   └── js/           → entrypoint logic
└── dist/             → compiled output
```

---

## 🌈 Overview

**Crusher UI Kit** is a **framework-agnostic design system** powered by Web Components and Design Tokens.
It allows instant switching between modern aesthetics — **Neumorphism**, **Glassmorphism**, **Brutalism**, **Neo-Brutalism**, **Minimalist**, **Futuristic**, and **Bento** — all with **dark/light support**.

This isn’t just CSS — it’s a *design engine* built for products that evolve.

---

## 🧠 Core Philosophy

* **Token-First Architecture** — one JSON source defines all design primitives.
* **Framework-Agnostic** — use in React, Vue, Angular, or plain HTML.
* **Design Dialects** — switch entire aesthetic systems instantly.
* **Accessible & Performant** — built for real-world apps, not demos.
* **Zero Lock-In** — no runtime dependency hell.

---

## 🧪 Tech Stack

* **Vite** — ultra-fast dev/build
* **Style Dictionary** — token compilation
* **Lit** — Web Components core
* **Sass/SCSS** — utilities and authoring
* **ESLint + Prettier** — code hygiene
* **Changesets** — release management

---

## 🪄 Design Dialects

Each dialect overrides tokens for a distinct personality:

| Dialect        | Style Signature           |
| -------------- | ------------------------- |
| **Glass**      | Soft transparency + blur  |
| **Brutal**     | Bold contrast, hard edges |
| **NeoBrutal**  | Modern brutalism          |
| **Neumorph**   | Subtle lighting, depth    |
| **Minimal**    | Whitespace and clarity    |
| **Futuristic** | Glows, neon, motion       |
| **Bento**      | Modular grid layouts      |

Switch instantly with the root attribute contract:

```js
document.documentElement.setAttribute('data-theme', 'neobrutal');
```

---

## 🌗 Modes

Light and dark modes are tokenized in `modes.css`.
Switch globally:

```js
document.documentElement.setAttribute('data-mode', 'dark');
```

---

## 🧩 Components Overview

| Component                                | Purpose                         |
| ---------------------------------------- | ------------------------------- |
| `<crusher-button>`                       | Tokenized button                |
| `<crusher-card>`                         | Glass/brutal cards              |
| `<crusher-input>` / `<crusher-textarea>` | Accessible forms                |
| `<crusher-modal>`                        | Tokenized modal with trap focus |
| `<crusher-skill-bar>`                    | Animated progress bars          |
| `<crusher-timeline>`                     | Structured timelines            |
| `<crusher-style-switcher>`               | Theme/mode toggler              |

---

## 💬 Credits

Built and maintained by **Hassaan (itxcrusher)**  
🌐 [muhammadhassaanjaved.com](https://muhammadhassaanjaved.com)  
Follow updates → future releases, token presets, and dialect packs.
