# Releasing polydomain

Versioning and publishing are managed with [Changesets](https://github.com/changesets/changesets). The release workflow (`.github/workflows/release.yml`) publishes to npm **with provenance**, authenticated by the `NPM_TOKEN` repository secret.

**Status:** `polydomain@0.1.0` is published — https://www.npmjs.com/package/polydomain.

## How publishing works

1. A changeset (`.changeset/*.md`) describes a version bump.
2. On push to `main`, the release workflow opens/updates a **"Version Packages"** PR that consumes the changesets and bumps `package.json` + the changelog.
3. When that Version PR is merged, the next push runs `changeset publish`, which publishes the new version to npm.

## Cutting a new release

1. Add a changeset for your changes: `pnpm changeset` (pick patch/minor/major), commit it in your PR.
2. After it lands on `main`, the **"Version Packages"** PR appears (or updates).
3. **⚠️ Re-trigger CI on the Version PR.** Changesets opens that PR with the default `GITHUB_TOKEN`, and **GitHub does not run workflows on PRs created by that token** — so its required checks never start and the PR shows as blocked. Unblock it by re-triggering CI: close and reopen the PR (`gh pr close <n> && gh pr reopen <n>`), or push an empty commit to its branch. (Permanent fix: give `changesets/action` a fine-grained PAT instead of the default token.)
4. When its checks are green, **merge the Version PR**.
5. The next push to `main` runs the publish step. **Read the `release` run log** and confirm it published (`success packages published successfully: polydomain@x.y.z`), not errored.
6. Verify: `npm view polydomain version` and `npx polydomain@<version> init` from a clean directory.

## Auth

- The repo secret **`NPM_TOKEN`** (npm Automation token) authenticates the publish. It also enables npm provenance via `NPM_CONFIG_PROVENANCE` + `id-token: write`.
- The current token **expires 29-08-2026** — rotate before then: generate a new Automation token on npmjs.com, `gh secret set NPM_TOKEN`, and update the credential notes (vault + kainext-hq).

## Safety note

A push to `main` that consumes a version bump **will publish** to npm. That is the one irreversible action in the project — it only happens when you deliberately merge the Version PR.
