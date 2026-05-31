# Security

**This repo is context, not a vault.** Do not commit secrets, API keys, tokens, or PII here.
- Keep credentials in a real secret manager / your shell env, not in capsules or memory.
- The `.gitignore` ignores common secret files by default — do not weaken it.
- If you must reference a secret's existence, point to where it lives; never paste its value.
