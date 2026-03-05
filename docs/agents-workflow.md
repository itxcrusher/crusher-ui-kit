Crusher UI Kit – Codex Workflow Policy

Purpose
Allow Codex to reason with temporary docs during work while keeping the repository clean automatically.

Temporary Work Docs
Codex may create temporary investigation or planning docs using the prefix:

docs/90-*.md

Examples:
docs/90-investigation.md
docs/91-build-debug.md
docs/92-plan.md

Rules for Temporary Docs

Temporary docs are allowed during active investigation or planning.
Once the related task or feature is completed, Codex must automatically delete those temporary docs before the final commit.
Temporary docs must never accumulate across multiple tasks.

Commit Policy

When Codex changes source code or configuration:

Create a commit automatically.

When Codex completes a task, fix, or feature:

Push to origin.

While a task is still in progress:

Commit but do not push.

Repository Cleanliness

Never commit build artifacts such as:

dist/

dist must remain gitignored.

Documentation Policy

Permanent documentation must remain in:

docs/00–05
docs/decisions/

Temporary reasoning documents must always use the 90-series prefix and must be deleted automatically when the task is complete.
