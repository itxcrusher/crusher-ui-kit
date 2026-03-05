# 05 Roadmap Checklist

## Scope
Operational checklist for safe iteration and releases.

This document tracks the evolution of Crusher UI Kit from a component library into a complete UI framework.

---

## Phase 1 – Token and Theme Stability

Ensure the token pipeline remains stable.

Tasks

Run npm run build:tokens successfully.

Ensure themes generate correctly:

src/css/themes/*.css

Verify semantic tokens map correctly to base tokens.

Validate color contrast using:

npm run check:contrast

---

## Phase 2 – Component Token Compliance

All components must rely exclusively on tokens.

Tasks

Remove hardcoded values from components.

Ensure components use:

--crusher-* variables

Confirm theme switching affects all components.

---

## Phase 3 – Library API Stability

Verify the UI kit behaves correctly when consumed as a library.

Tasks

Confirm dist build works.

Validate package.json exports.

Verify CSS import paths remain correct.

Confirm custom elements register automatically when the library loads.

---

## Phase 4 – Runtime UX System

Stabilize global UX systems.

Tasks

Ensure theme switching works across themes.

Ensure mode switching works.

Ensure density switching works.

Verify runtime events dispatch correctly.

---

## Phase 5 – Documentation and DX

Improve developer experience.

Tasks

Ensure README examples match package exports.

Ensure types/index.d.ts covers all custom elements.

Provide example usage for:

Vite projects  
Vanilla JS usage  
CDN usage

---

## Phase 6 – Framework Expansion

Expand Crusher UI Kit into a full UI framework.

Potential additions

layout primitives  
data visualization components  
AI interface components  
blockchain dashboard primitives  
command systems  
developer tooling panels

---

## Release Safety

Before publishing:

npm run build:tokens  
npm run check:contrast  
npm run build

Confirm dist assets exist.

Confirm exports paths remain valid.

---

## Do Not Do

Do not publish if any build or contrast step fails.

Do not reference files that do not exist.

Do not allow README examples to diverge from actual package behavior.
