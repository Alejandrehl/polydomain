# Releasing polydomain

Versioning is managed with [Changesets](https://github.com/changesets/changesets). The release workflow (`.github/workflows/release.yml`) is wired to publish to npm **with provenance**, but it **cannot publish until npm authentication is configured** — by design, so a release is always a deliberate, explicit act.

## How publishing works

1. A changeset (`.changeset/*.md`) describes a version bump.
2. On push to `main`, the release workflow opens a **"Version Packages"** PR that consumes the changesets and bumps `package.json`.
3. When that Version PR is merged, the next push runs `changeset publish`, which publishes the new version to npm — **only if npm auth is configured**.

## Cutting the first release (`0.1.0`) — maintainer checklist

> Each step is a deliberate decision. Until an auth method is set up, the publish step fails to authenticate and nothing is published.

- [ ] **Pick an npm auth method (one of):**
  - **Trusted publishing (recommended, no long-lived token):** on npmjs.com, add a trusted publisher for the `polydomain` package pointing at the `Alejandrehl/polydomain` repo and the `release.yml` workflow. Note: trusted publishing requires the package name to already exist on npm, so the very first publish may need a one-time manual `npm publish` (or reserve the name first).
  - **`NPM_TOKEN` secret:** create an npm **automation** token and add it as the repository secret `NPM_TOKEN`.
- [ ] **Merge the `publish-wiring` PR** (adds the publish step + the `0.1.0` changeset) — only when you intend to release.
- [ ] **Merge the auto-created "Version Packages" PR** (bumps `0.0.0` → `0.1.0`, writes the changelog).
- [ ] The next push to `main` runs the publish step. **Read the `release` workflow run log** and confirm it actually published (`Publishing "polydomain" at "0.1.0"` + success), not errored.
- [ ] From a clean directory, run `npx polydomain@0.1.0 init` and confirm the published package scaffolds correctly end to end.

## Safety note

`id-token: write` + `NPM_CONFIG_PROVENANCE` means that once a **trusted publisher is configured on npm** (or `NPM_TOKEN` is added), a push to `main` with a consumed version bump **will publish**. Configure auth only when you are ready for that. This is the one irreversible action in the project.
