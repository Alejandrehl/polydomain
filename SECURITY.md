# Security Policy

## Reporting a vulnerability

Please report security issues **privately** via GitHub's **Security Advisories** ("Report a vulnerability") on this repository. Do not open a public issue for a security report. We aim to acknowledge reports promptly.

## Security stance

- **No telemetry, no network calls.** The CLI bundles its templates and never contacts a server — no analytics, no usage tracking, no external requests.
- **Generated repos are context, not a vault.** Scaffolded command centers ship a secure-by-default `.gitignore` (ignores `.env`, `*.key`, `*.pem`, `*.p12`, etc.) and a `SECURITY.md` reminding you not to commit secrets, API keys, or PII.
- **CI secret scanning.** Every pull request is scanned with [gitleaks](https://github.com/gitleaks/gitleaks).
