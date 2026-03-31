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

### Site

Canonical role:

- primary public hub for Muhammad Hassaan Javed
- broad, living profile across engineering, infrastructure, design, writing, marketing, and related work
- not a role-specific CV

This site should act as the canonical source of truth for:

- identity
- current work
- capabilities
- links
- selected projects
- tool and product directory links
- selected writing/public signals

The site should collect and show information about the person, not every artifact at full depth.

### Portfolio

Canonical role:

- curated showcase of work
- presentation-first surface
- allowed to include older experiments if they are intentionally framed and still defensible

This site should not try to duplicate the entire personal website.
It should emphasize:

- selected work
- case studies
- presentation quality
- experimentation
- visual identity

### Tools

Canonical role:

- discovery surface for products, tools, projects, and SaaS
- aggregation and routing layer, not necessarily the runtime host for each thing
- bridge between the personal ecosystem and independently hosted products

This site should list, group, and link projects clearly.
If a tool or product becomes substantial, it should be free to live in its own repo, domain, and hosting setup.

### Crusher

Canonical role:

- creative workspace
- experimental lab
- codename/alias-led surface
- valid place for experiments, concept work, visual R&D, or internal/public playgrounds

Crusher should remain flexible.
It does not need to be the canonical trust anchor for professional identity.

## Recommended Domain Strategy

Primary recommendation:

- `muhammadhassaanjaved.com` = canonical personal site
- `portfolio.muhammadhassaanjaved.com` = curated work/portfolio surface
- `tools.muhammadhassaanjaved.com` = tools and products hub while those products are still part of the personal ecosystem

Optional brand-led alternatives:

- `crusher.muhammadhassaanjaved.com`
- a separate `crusher-*` domain for experimental/creative work

Recommendation:

- keep the full-name domain as the canonical trust anchor
- use `Crusher` as a sub-brand, not the primary public identity, unless a specific surface is intentionally persona-led

This is the cleaner long-term structure for trust, discoverability, and professional clarity.

## Hosting Strategy

Current default:

- use GitHub Pages for the framework site and personal ecosystem surfaces while they remain static-first
- attach custom domains/subdomains at the DNS and GitHub Pages layer
- move a repo to separate hosting only when the product or operational model actually requires it

Current domain posture:

- `ui.muhammadhassaanjaved.com` = Crusher UI Kit public site
- `muhammadhassaanjaved.com` = canonical personal site
- `portfolio.muhammadhassaanjaved.com` = curated portfolio
- future `tools.*` and `crusher.*` subdomains can be added later when those repos are real and stable enough to justify public hosting

Move away from GitHub Pages only when there is a clear reason, such as:

- SSR or authenticated application behavior
- backend APIs tightly coupled to the site
- editorial workflows that GitHub Pages is the wrong tool for
- deployment/runtime requirements that static hosting cannot satisfy

## Current Repo Mapping

Current truth in the local workspace:

- `crusher-ui-kit` = shared framework/system repo
- `hassaan-site` = canonical personal site repo
- `crusher-portfolio` = curated/creative portfolio repo
- `tools` = planned separate hub repo/site, not yet established in this workspace

If repository names drift from their actual role again, prefer renaming to truth over preserving confusing history.

## Stack Strategy

Do not force the same stack across every surface just for symmetry.

Correct rule:

- use the best-fit stack for each site or product
- keep the design system, runtime contracts, and canonical data model aligned
- allow implementation to vary when the use case justifies it

Examples:

- a static site can remain static if that is the best operational choice
- a content-heavy or AI-assisted site may later justify a CMS, headless setup, or application framework
- a product or tool can use a completely different stack if that stack is the right engineering choice

The shared system is the product language, tokens, components, runtime conventions, and data contracts, not a requirement that every repo uses the same framework or build tool.

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

Current naming is acceptable after the latest clarification:

- `crusher-ui-kit` is a good framework name
- `hassaan-site` is a truthful name for the canonical personal site
- `crusher-portfolio` is acceptable if it remains the curated/creative portfolio
- `tools` should be named by truth when that repo is created
- `crusher` remains a valid label for experimental/creative workspace surfaces

Recommended truth-aligned mapping:

- `hassaan-site` -> canonical personal site
- `crusher-portfolio` -> curated/creative portfolio
- `tools` -> tools/products/projects hub
- `crusher` -> experiments/workspace/lab surface

If you rename later, prefer truth over inertia.

## Near-Term Execution Order

1. Finish Crusher UI Kit repo contracts, public site, and release flow
2. Integrate into `hassaan-site` first
3. Integrate into `crusher-portfolio` second
4. Stand up the tools hub after the first two establish the ecosystem contract
5. Design the canonical profile/content data model before attempting the AI updater

## Do Not Do

- Do not collapse personal website, portfolio, tools, and products into one undifferentiated site
- Do not make the portfolio the canonical source of truth for all personal data
- Do not let AI write public profile data without a review layer
- Do not choose domains based only on branding preference if they reduce trust or clarity
- Do not standardize on one stack across all repos when a different stack is clearly the better fit
