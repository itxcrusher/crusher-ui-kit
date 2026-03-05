# 00 North Star

## Scope
Defines what success means for Crusher UI Kit across all supported delivery modes.

Crusher UI Kit is a token-driven UI framework that enables building modern applications with interchangeable visual dialects (themes) while maintaining a stable component API.

The system must support three environments equally:

1. Vite development environment
2. npm package consumption
3. CDN/static HTML usage

None of these modes are considered secondary.

## Design Philosophy

Crusher UI Kit is built on three core principles:

Token First  
All design values originate from tokens. Components never define raw values.

Dialect Driven  
Visual identity is controlled through interchangeable UI dialects (themes) such as glass, brutal, neumorph, minimal, futuristic, and bento.

Runtime Controlled  
Visual state is controlled globally via document attributes instead of component-level configuration.

## Global UI State

The entire system reacts to the following root attributes:

data-theme  
Selects the active UI dialect.

data-mode  
Controls light/dark rendering.

data-density  
Controls compact vs comfortable spacing.

These attributes live on:

document.documentElement

Components must react through CSS variables rather than internal logic.

## Token Contract

Raw values originate only from:

design/tokens/base.json  
design/themes/*.json

Generated outputs include:

src/css/tokens.css  
src/css/modes.css  
src/css/themes/*.css  
src/scss/base/_variables.scss

Components must consume semantic variables only:

--crusher-*

Hardcoded colors, spacing, radii, or shadows are not allowed.

## Release Quality Gate

Before publishing or tagging a release:

npm run build:tokens  
npm run check:contrast  
npm run build

All must succeed.

## Do Not Do

Do not optimize the demo environment while breaking npm or CDN usage.

Do not bypass the token pipeline.

Do not introduce alternative styling systems.

Do not create component-specific theme logic when the behavior can be encoded in tokens.
