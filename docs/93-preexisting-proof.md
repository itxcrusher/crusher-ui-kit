# 93 Preexisting Proof

Date captured: **2026-03-04 23:36:38 -05:00**  
Timezone: **Eastern Standard Time** (`(UTC-05:00) Eastern Time (US & Canada)`)

## Method

- Working tree source: `git status --short`
- History source (modified files): `git log -n 3 --oneline -- <file>`
- Line provenance source (modified files): `git blame -n -L 1,40 -- <file>`
- Timestamp source: filesystem `CreationTime` + `LastWriteTime`

Important caveat:
- `git blame` marks uncommitted lines as `Not Committed Yet` with the **current blame time**, not the real edit time.  
  So edit-time confidence relies primarily on filesystem timestamps + commit history.

## File Timestamp Table

### Modified tracked files (`M`)

| Path | CreationTime | LastWriteTime | Latest tracked commit (`git log -n 1`) | `blame` first-40 contains `Not Committed Yet` |
|---|---:|---:|---|---|
| `index.html` | 2025-10-21 17:26:24 | 2025-10-28 11:24:58 | `09b734c chore(core): complete environment cleanup & finalize stable setup` | No |
| `package.json` | 2025-10-21 17:17:29 | 2026-03-04 23:18:07 | `706792f add changeset` | Yes |
| `src/components/atoms/crusher-button.js` | 2025-10-21 19:31:57 | 2025-10-28 10:49:25 | `09b734c chore(core): complete environment cleanup & finalize stable setup` | Yes |
| `src/components/molecules/crusher-card.js` | 2025-10-22 07:35:46 | 2025-10-26 07:44:01 | `09b734c chore(core): complete environment cleanup & finalize stable setup` | Yes |
| `src/css/bridge.css` | 2025-10-24 11:03:17 | 2025-10-28 11:40:25 | `4ceef5b add changeset & prepare for pages` | Yes |
| `src/js/bundle-demo.js` | 2025-10-25 01:20:09 | 2025-10-28 11:38:48 | `4ceef5b add changeset & prepare for pages` | Yes |
| `src/js/main.js` | 2025-10-21 17:23:36 | 2025-10-28 10:50:58 | `09b734c chore(core): complete environment cleanup & finalize stable setup` | Yes |
| `src/runtime/theme.js` | 2025-10-22 17:35:32 | 2025-10-28 11:37:51 | `39c5eab functional foundation` | Yes |
| `src/scss/base/_typography.scss` | 2025-10-21 17:22:01 | 2026-03-04 23:27:40 | `39c5eab functional foundation` | Yes |

### Untracked files (`git ls-files --others --exclude-standard`)

| Path | CreationTime | LastWriteTime |
|---|---:|---:|
| `AGENTS.md` | 2026-03-04 22:27:27 | 2026-03-04 23:20:14 |
| `dist/crusher-ui.esm.js` | 2026-03-04 23:27:58 | 2026-03-04 23:27:58 |
| `dist/crusher-ui.esm.js.map` | 2026-03-04 23:27:58 | 2026-03-04 23:27:58 |
| `dist/crusher-ui.min.css` | 2026-03-04 23:27:58 | 2026-03-04 23:27:58 |
| `dist/crusher-ui.min.js` | 2026-03-04 23:27:58 | 2026-03-04 23:27:58 |
| `dist/crusher-ui.min.js.map` | 2026-03-04 23:27:58 | 2026-03-04 23:27:58 |
| `docs/00-north-star.md` | 2026-03-04 22:27:38 | 2026-03-04 22:27:38 |
| `docs/01-architecture.md` | 2026-03-04 22:27:48 | 2026-03-04 22:27:48 |
| `docs/02-css-contract.md` | 2026-03-04 22:27:59 | 2026-03-04 23:20:25 |
| `docs/03-tokens-and-themes.md` | 2026-03-04 22:28:10 | 2026-03-04 22:28:10 |
| `docs/04-component-standards.md` | 2026-03-04 22:28:21 | 2026-03-04 22:28:21 |
| `docs/05-roadmap-checklist.md` | 2026-03-04 22:28:32 | 2026-03-04 22:28:32 |
| `docs/94-change-classification.md` | 2026-03-04 23:33:03 | 2026-03-04 23:33:03 |
| `docs/95-fonts-policy-report.md` | 2026-03-04 23:28:28 | 2026-03-04 23:28:28 |
| `docs/96-exports-parity-report.md` | 2026-03-04 23:18:55 | 2026-03-04 23:18:55 |
| `docs/97-sideeffects-fix-report.md` | 2026-03-04 23:16:32 | 2026-03-04 23:16:32 |
| `docs/98-dist-integrity-report.md` | 2026-03-04 23:04:46 | 2026-03-04 23:04:46 |
| `docs/99-repo-audit.md` | 2026-03-04 22:48:41 | 2026-03-04 22:48:41 |
| `docs/decisions/0001-css-layering-and-loading.md` | 2026-03-04 22:28:47 | 2026-03-04 23:20:35 |
| `src/css/dialect-overrides.css` | 2025-10-26 10:48:32 | 2025-10-28 10:50:06 |
| `src/css/theme-scenes.css` | 2025-10-26 07:46:05 | 2025-10-28 11:39:09 |

## High Confidence Pre-existing

These are older than today by months (2025 timestamps), so they almost certainly existed before today’s Codex session:

- `index.html`
- `src/components/atoms/crusher-button.js`
- `src/components/molecules/crusher-card.js`
- `src/css/bridge.css`
- `src/js/bundle-demo.js`
- `src/js/main.js`
- `src/runtime/theme.js`
- `src/css/dialect-overrides.css` (untracked source file but old creation/write dates)
- `src/css/theme-scenes.css` (untracked source file but old creation/write dates)

## Likely Created/Edited Today

These have 2026-03-04 creation or last-write times and align with today’s actions:

- `package.json` (last write today)
- `src/scss/base/_typography.scss` (last write today)
- `AGENTS.md`
- `docs/` files (`00..05`, `94..99`, decision doc)
- `dist/*` files (all created today during builds)

## Ambiguous

- `package.json` and `src/scss/base/_typography.scss`: definitely edited today, but timestamp alone cannot prove whether edits happened before or during this specific session window.
- Files with old `LastWriteTime` but `Not Committed Yet` in `blame` (e.g., `src/js/main.js`, `src/runtime/theme.js`): `blame` timestamps are not reliable for edit-time dating; they only prove divergence from HEAD.
- `dist/` path: directory may have older origin in repo history, but current untracked files inside it were generated today.
