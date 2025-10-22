# 🚀 Crusher UI Kit

## Design Dialects on Demand — A modern, token-driven UI framework

---

## 🌈 Overview

**Crusher UI Kit** is a framework-agnostic design system built on **Web Components** and **Design Tokens**.
It enables instant switching between multiple modern aesthetics — **Neumorphism**, **Glassmorphism**, **Brutalism**, **Neo-Brutalism**, **Minimalist**, **Futuristic**, and **Bento** — with full **dark/light** support.

This isn’t just a CSS library. It’s a **brand engine** — composable, scalable, and themeable for apps, SaaS platforms, AI tools, dashboards, or mobile hybrids.

---

## 🧠 Core Philosophy

* **Token-First Architecture** — every color, shadow, radius, and animation originates from a single JSON source.
* **Framework-Agnostic Components** — clean Web Components usable in React, Vue, Angular, or native HTML.
* **Design Dialects** — visually distinct design systems built from the same token base.
* **Zero Lock-In** — no dependencies, no runtime frameworks.
* **Accessible & Performant** — keyboard-friendly, WCAG-checked, SSR-safe.

---

## 🧩 Structure

```bash
crusher-ui-kit/
├── design/           → base tokens + theme overlays (JSON)
├── src/
│   ├── components/   → Web Components (crusher-button, crusher-card, etc.)
│   ├── css/          → generated tokens + themes
│   ├── scss/         → authored styles and utilities
│   ├── runtime/      → theme switching logic
│   └── stories/      → Storybook demos
└── dist/             → final distributable (minified JS + CSS)
```

---

## ⚙️ Getting Started

### 1. Install (coming soon)

```bash
npm install @crusher/core
```

### 2. Import via CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@crusher/core@latest/dist/crusher-ui.min.css">
<script type="module" src="https://cdn.jsdelivr.net/npm/@crusher/core@latest/dist/crusher-ui.min.js"></script>
```

### 3. Set a theme

```html
<html data-theme="glass" data-mode="light">
```

### 4. Toggle at runtime

```js
import { setTheme, setMode } from '@crusher/core/runtime';
setTheme('brutal');
setMode('dark');
```

---

## 🧱 Components

| Component                                | Purpose                           |
| ---------------------------------------- | --------------------------------- |
| `<crusher-button>`                       | Branded interactive buttons       |
| `<crusher-card>`                         | Glass or brutalist content blocks |
| `<crusher-input>` / `<crusher-textarea>` | Accessible form controls          |
| `<crusher-modal>`                        | Lightweight, tokenized modals     |
| `<crusher-skill-bar>`                    | Animated progress bars            |
| `<crusher-timeline>`                     | Data visualization timeline       |
| `<crusher-style-switcher>`               | Theme + mode toggle panel         |

---

## 🪄 Design Dialects

Each dialect is a layer of token overrides:

* **Glass** – translucent surfaces, soft blur
* **Brutal** – chunky borders, high contrast
* **Neo-Brutal** – modernized brutalism
* **Neumorph** – subtle depth, tactile lighting
* **Minimal** – restrained palette, whitespace focus
* **Futuristic** – glow, neon accents, motion cues
* **Bento** – modular grids, adaptive layouts

Switch instantly using:

```js
setTheme('neobrutal');
```

---

## 🌗 Dark / Light Modes

Dark mode tokens are automatically generated via `modes.css`.
You can toggle globally with `data-mode="dark"` or programmatically with `setMode('dark')`.

---

## 🧰 Development

### Local dev

```bash
npm run dev
```

### Build tokens

```bash
npm run build:tokens
```

### Build package

```bash
npm run build
```

### Storybook

```bash
npm run storybook
```

---

## 🧪 Tech Stack

* **Vite** – blazing-fast dev + bundling
* **Style Dictionary** – multi-platform token generation
* **Web Components (Lit)** – interoperable core
* **Sass/SCSS** – design utilities and layouts
* **Storybook** – component documentation
* **Rollup** (planned) – for npm/CDN release builds

---

## 💬 Credits

Created and maintained by **Hassaan (itxcrusher)**
For updates, follow: [muhammadhassaanjaved.com](https://muhammadhassaanjaved.com)
