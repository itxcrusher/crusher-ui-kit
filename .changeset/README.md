# 🚀 Crusher UI Kit – Release Workflow (Changesets)

This document explains how the **automated release pipeline** works for the **Crusher UI Kit** project using **Changesets** and **GitHub Actions**.

---

## 🧭 Overview

Crusher UI Kit uses [Changesets](https://github.com/changesets/changesets) to manage versioning, changelogs, and npm publishing.

Whenever you make changes to the library:

* You **add a Changeset note** describing the change type (`patch`, `minor`, or `major`).
* When you **push to `main`**, GitHub Actions:

  1. Runs the build
  2. Applies the version bump from the Changeset
  3. Publishes the package to **npm**

No manual tagging or PRs — just push and it’s live. ⚡

---

## 🧩 Folder Structure

```
.changeset/
├── config.json   → Changesets configuration (baseBranch: main)
└── *.md          → Pending version notes (auto-deleted after publish)
```

---

## 🧰 Commands

### 🆕 Add a Changeset

When you’ve made a change that should trigger a release:

```bash
npx changeset
```

Follow the prompt:

* Select the package (`crusher-ui-kit`)
* Choose version bump type:

  * `patch` → bug fix / small improvement
  * `minor` → new feature (non-breaking)
  * `major` → breaking change
* Write a short summary (1–2 sentences)

This creates a file like:

```
.changeset/cool-green-lizard.md
```

---

### 🧱 Commit and Push

```bash
git add .
git commit -m "feat: added crusher-tooltip enhancements"
git push
```

When your changes hit the `main` branch:

* GitHub workflow automatically:

  * Runs `npx changeset version`
  * Builds the tokens + library
  * Publishes to npm with provenance

---

### 🔧 Manual Commands (Local)

If you ever want to do a release manually:

```bash
# 1. Apply versions based on pending changesets
npx changeset version

# 2. Build and publish manually
npm run build:tokens
npm run build
npm publish --provenance --access public
```

---

## 🔒 GitHub Setup

Make sure your repository has the secret:

```
NPM_TOKEN = <your-npm-publish-token>
```

This allows the GitHub Action to authenticate with npm and publish automatically.

---

## ⚙️ Workflow Summary

* **Trigger:** Push to `main`
* **Action file:** `.github/workflows/release.yml`
* **Steps:**

  1. Checkout repo
  2. Install dependencies
  3. Build tokens + library
  4. Run `changeset version`
  5. Publish to npm

---

## 📦 npm Publishing Rules

* Package name: **crusher-ui-kit**
* Registry: `https://registry.npmjs.org/`
* Access: **public**
* Version bumps and changelogs auto-generated
* You can override with `"publishConfig": { "access": "restricted" }` if private

---

## 🧠 Notes

* Each Changeset file represents one pending release.
* Once published, Changesets automatically delete used `.md` files.
* If you forget to add a Changeset, your push won’t create a new version — you’ll just update code without releasing.

---

## 🪄 Example Flow

```bash
# 1. Add new feature
git add src/components/atoms/crusher-chip.js

# 2. Create a changeset
npx changeset
# Select: patch
# Message: "added shadow hover state for crusher-chip"

# 3. Commit and push
git add .
git commit -m "feat: improved crusher-chip hover state"
git push
```

→ CI will build and publish a new **patch** version automatically.

---

## 🧾 Example Changelog Entry

After publish, your changelog will look like:

```markdown
## 0.1.1

### Patch Changes
- 🧩 Improved crusher-chip hover shadows and token consistency
```

---

## 🧭 Summary

✅ Automatic versioning
✅ Automatic changelog
✅ Automatic npm publish
✅ Zero manual tagging
✅ Runs safely only on push to `main`

---

**Maintained by:** [Muhammad Hassaan Javed (itxcrusher)](https://linktr.ee/itxcrusher)  
**Registry:** [npmjs.com/package/crusher-ui-kit](https://www.npmjs.com/package/crusher-ui-kit)  
