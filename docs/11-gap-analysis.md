# 11 Gap Analysis

## Scope
Identify the remaining gaps between the current repo and the long-term goal: a reusable personal UI framework for future web products.

## Current Gaps
1. Theme logic still leaks into component internals.
Evidence:
- `src/components/molecules/crusher-card.js` still uses `:host-context(html[data-theme="..."])`
Impact:
- components are not yet fully dialect-agnostic

2. Consumer validation is still repo-local.
Evidence:
- current CI validates build and package resolution
- there is no committed smoke test against a real downstream app
Impact:
- reuse friction will still surface late when the framework is adopted in actual projects

3. Framework primitives are still thin compared with the stated ambition.
Evidence:
- the repo has a solid component core
- it does not yet provide a broader app-shell/layout/navigation/data surface expected from a personal framework
Impact:
- downstream projects still need too much project-specific scaffolding

4. Dependency hygiene has not been addressed yet.
Evidence:
- `npm ci` currently reports vulnerabilities in the installed dependency graph
Impact:
- not an immediate blocker for framework design, but it should be tracked and reduced

## Interpretation
The repo is past the "is this a real system?" stage.
It is now in the "turn a strong UI kit into a reusable framework" stage.

That means the next work is less about adding random components and more about:
- finalizing public contracts
- removing coupling
- validating reuse in real consumer apps
- adding framework-level primitives intentionally

## Do Not Do
- Do not assume more components alone will make this a framework.
- Do not expand into new domains before the runtime/export/reuse contracts are settled.
- Do not leave consumer integration as a late-stage afterthought.
