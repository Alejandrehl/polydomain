---
title: The 7 principles
description: The Capsule architecture as a numbered manifesto.
---

The **Capsule architecture** is a way of operating one AI coding agent across many domains. These seven principles define it. The scaffolder generates a repo that embodies them, but the pattern is tool-agnostic — you can follow it by hand.

1. **One agent, many domains.** One surface routes the agent across all your contexts instead of re-explaining context per project.
2. **Thin router, rich capsules.** The entrypoint stays minimal (startup, transversal rules, routing, hierarchy); detail lives in composable capsules.
3. **On-demand context.** Load only the active domain's capsule and its recent state; don't front-load everything (focus and token efficiency).
4. **Safety gate by default.** Plan → review → approve → execute. The agent never executes a plan alone. *(Security default, non-negotiable.)*
5. **Confidentiality isolation.** Data never leaks across domains (work ↔ personal ↔ client). *(Security default.)*
6. **Persistent, indexed memory.** Facts are recorded as durable, typed memory with a lightweight index loaded each session; the agent learns across sessions.
7. **Asymmetric governance + explicit hierarchy.** Constitutional files change via ritual (propose → approve → changelog); operational files change directly. An explicit context hierarchy resolves conflicts (current instruction > domain capsule > router > memory).

Principles 4 and 5 are security defaults and ship active in every generated command center. The rest are structure.
