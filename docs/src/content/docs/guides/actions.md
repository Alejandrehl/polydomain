---
title: Actions (macOS)
description: Let your agent do reminders, calendar events, and email on macOS — safely.
---

The optional actions layer gives your agent verified recipes to *do things* on macOS. It is **macOS-first**: the recipes use `osascript`/Mail.app. (The rest of polydomain is cross-platform.)

```bash
npx polydomain init my-center --actions macos   # at init
npx polydomain add actions macos                 # add to an existing center
```

## Safety tiers

- **Tier 1 — reminders & calendar** (local, reversible): the agent does these directly, no confirmation.
- **Tier 2 — email** (outward, irreversible): the agent prepares a **draft and stops**; you review and send from Mail. Auto-send after approval is opt-in. A sent email can't be unsent — drafts are the safe default.

## Prerequisite: macOS Automation permission

The first time the agent controls Reminders/Calendar/Mail, macOS asks for **Automation** permission. Grant it under **System Settings → Privacy & Security → Automation** for your agent's host app (Terminal, iTerm, VS Code, or the Claude app). Headless/SSH sessions can't perform these actions (no prompt) — the agent will say so rather than fail silently.

## What it can do

Reminders (create in a list), calendar events (with locale-safe dates), and email drafts — all via tested `osascript`/Mail.app recipes in `actions/macos.md`. **WhatsApp** is not included yet (no official personal API; needs a bridge). Other platforms may come later.
