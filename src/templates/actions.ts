export const ACTIONS_MACOS = `# Actions — macOS ({{name}})

> Generated with \`--actions macos\`. This is your agent's manual for *doing things on macOS*: reminders, calendar events, and email. polydomain has no runtime — the agent runs these via \`osascript\` / Mail.app. **macOS-first:** these recipes are macOS-only; the rest of your command center is cross-platform.

## Safety tiers (read first)
- **Tier 1 — local & reversible (reminders, calendar):** do these **directly, no confirmation needed** — they're undoable in the Reminders/Calendar apps.
- **Tier 2 — outward & irreversible (email):** **draft only — do NOT send.** Create a visible draft, show it, and let the user send it from Mail. A sent email can't be unsent, so the draft-then-human-send default is deliberate. (Auto-sending after approval is **opt-in** — see the email recipe.)

## Prerequisite: macOS Automation permission
The first time the agent controls Reminders/Calendar/Mail, macOS shows an **Automation consent** prompt. If denied — or in a **headless/SSH session that can't show it** — \`osascript\` fails with **error -1743 (not authorized)**. Fix: **System Settings → Privacy & Security → Automation →** enable the agent's host app (commonly **Terminal, iTerm, VS Code, or the Claude app**) for Reminders/Calendar/Mail. In a headless session these actions can't run — say so, don't pretend they worked.

## Recipe — reminder (Tier 1)
Creates the list if missing, then the reminder. Replace \`<list>\`, \`<title>\`, \`<notes>\`:

    osascript -e 'tell application "Reminders"
      if not (exists list "<list>") then make new list with properties {name:"<list>"}
      make new reminder at end of list "<list>" with properties {name:"<title>", body:"<notes>"}
    end tell'

With a due date — build the date **by components** (locale-safe; never parse a date string):

    osascript -e 'tell application "Reminders"
      set d to current date
      set year of d to 2026
      set month of d to 6
      set day of d to 15
      set hours of d to 9
      set minutes of d to 0
      set seconds of d to 0
      make new reminder at end of list "<list>" with properties {name:"<title>", remind me date:d}
    end tell'

## Recipe — calendar event (Tier 1)
Build start/end **by components** (AppleScript dates are locale-sensitive — do NOT parse a string):

    osascript -e 'tell application "Calendar"
      set startD to current date
      set year of startD to 2026
      set month of startD to 6
      set day of startD to 15
      set hours of startD to 14
      set minutes of startD to 0
      set seconds of startD to 0
      set endD to startD + (1 * hours)
      tell calendar "<calendar>"
        make new event with properties {summary:"<title>", start date:startD, end date:endD}
      end tell
    end tell'

## Recipe — email (Tier 2: draft only, do NOT send)
Creates a **visible draft** in Mail for the user to review and send. It does not send:

    osascript -e 'tell application "Mail"
      set msg to make new outgoing message with properties {subject:"<subject>", content:"<body>", visible:true}
      tell msg to make new to recipient with properties {address:"<recipient>"}
      activate
    end tell'

The draft opens in Mail; the user reviews and clicks Send. Uses whatever accounts are configured in **Mail.app** (a Gmail-via-web-only user must add Gmail to Mail.app, or use a Gmail MCP).

**Opt-in — agent sends after approval:** only if the user explicitly enabled this, add \`send msg\` inside the tell block. The default is draft-only.

## Conventions
- Name lists/calendars meaningfully; keep one list per recurring context.
- For email, always show the recipient and the draft content before any send.

## Not included yet
- **WhatsApp** — there is no official API for personal WhatsApp; it needs a bridge (e.g. a whatsapp-web.js MCP) or Twilio Business. Not part of this capsule yet.
- **Other platforms** — actions are **macOS-first** today; Linux/Windows flavors may come later.
`;
