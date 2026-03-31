# 13 Ecosystem Vision

## Scope
Define the personal ecosystem that Crusher UI Kit is intended to support so naming, domains, downstream integrations, and future framework work stay aligned.

## Identity Model

Hassaan is the public personal identity.

Crusher is the codename, creative alias, and internal brand layer.

This distinction matters:

- `hassaan-*` repositories should map to the public personal presence
- `crusher-*` repositories can remain valid for framework, experiments, internal systems, creative work, or branded product surfaces

Do not force everything under the `Crusher` name if the public-facing truth is better served by Hassaan.

## Site Roles

### Personal Website

Canonical role:

- primary public hub for Muhammad Hassaan Javed
- broad, living profile across engineering, infrastructure, design, writing, marketing, and related work
- not a role-specific CV

This site should act as the canonical source of truth for:

- identity
- current work
- capabilities
- links
- tools
- products
- selected writing/public signals

### Portfolio

Canonical role:

- curated showcase
- more experimental and creative
- can include older design/dev experiments if they are intentionally framed

This site should not try to duplicate the entire personal website.
It should emphasize:

- selected work
- presentation quality
- experimentation
- visual identity

### Tools / Products / Apps

Canonical role:

- independent but connected surfaces
- linked from the personal website
- allowed to grow into their own domains when justified

These should not be buried as random subpages forever if they become real products.

## Recommended Domain Strategy

Primary recommendation:

- `muhammadhassaanjaved.com` = canonical personal website
- `portfolio.muhammadhassaanjaved.com` = curated portfolio if you want one connected ecosystem
- `tools.muhammadhassaanjaved.com` = tools hub while the tools are still part of the personal ecosystem

Optional brand-led alternatives:

- `crusher.muhammadhassaanjaved.com`
- a separate `crusher-*` domain for experimental/creative work

Recommendation:

- keep the full-name domain as the canonical trust anchor
- use `Crusher` as a sub-brand, not the primary public identity, unless a specific surface is intentionally persona-led

This is the cleaner long-term structure for trust, discoverability, and professional clarity.

## Architecture Recommendation

The ecosystem should not be modeled as one giant website with everything mixed together.

Use three layers:

1. Canonical profile/data layer
2. Presentation layer
3. Product/tool layer

### Canonical Profile/Data Layer

This should become the structured source of truth for:

- bio data
- experience
- skills
- links
- publications
- projects
- products
- availability/status

Long term, the AI update workflow should write into this layer, not directly into page templates.

### Presentation Layer

This includes:

- personal website
- portfolio
- future landing pages

These should render curated views of the same underlying truth, not each maintain separate drifting copies.

### Product / Tool Layer

This includes:

- utilities
- experiments
- SaaS/apps
- internal workspace surfaces

These may start as subdomains and later split into their own domains if they become independent products.

## AI Updater Direction

The idea is strong, but it needs constraints.

Recommended long-term pattern:

- ingestion from trusted sources
- structured diffing into canonical profile data
- human review before publish

Do not let an autonomous agent directly rewrite the public site from scraped internet data without review.

That will create factual drift, branding inconsistency, and reputation risk.

The right model is:

- AI gathers
- AI proposes
- human approves
- site publishes from structured data

## Naming Guidance

Current naming is mostly acceptable:

- `crusher-ui-kit` is a good framework name
- `hassaan-portfolio` is misnamed if it is actually the personal website
- `crusher-portfolio` is acceptable if it remains the creative/experimental portfolio

Recommended truth-aligned mapping:

- `hassaan-portfolio` -> treat as personal website, and consider renaming later
- `crusher-portfolio` -> treat as the curated/creative portfolio

If you rename later, prefer truth over inertia.

## Near-Term Execution Order

1. Finish Crusher UI Kit repo contracts and public site
2. Integrate into the personal website first
3. Integrate into the portfolio second
4. Add tools/product ecosystem structure after the first two are stable
5. Design the canonical profile data model before attempting the AI updater

## Do Not Do

- Do not collapse personal website, portfolio, tools, and products into one undifferentiated site
- Do not make the portfolio the canonical source of truth for all personal data
- Do not let AI write public profile data without a review layer
- Do not choose domains based only on branding preference if they reduce trust or clarity
