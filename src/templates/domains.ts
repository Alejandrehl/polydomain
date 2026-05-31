const capsule = (title: string, blurb: string) => `# Domain — ${title}

> **Entry point:** what to read first for this domain (e.g. this file + recent items below).

## Where it lives
${blurb}

## Rules
- Domain-specific rules go here.

## Permissions
- Default: write-with-confirmation. Adjust per your needs.

## Recent state
- (the agent appends/links recent work here)
`;

export const CAPSULES: Record<string, string> = {
  work: capsule("Work", "Your day-job context: repos, tickets, standards."),
  "side-project": capsule(
    "Side project",
    "A personal project you build outside work.",
  ),
  personal: capsule("Personal", "Personal admin, notes, planning."),
  home: capsule("Home", "Household, devices, recurring chores."),
};

export function genericCapsule(title: string): string {
  return capsule(title, "Describe what this domain covers.");
}

export const REGISTRY = `# Domain registry — {{name}}

Single source of which domains exist and where each lives. Extend = one row + one capsule.

| Domain | Lives in | Capsule |
|---|---|---|
| Work | this repo / your work repos | \`domains/work.md\` |
| Side project | this repo / project repos | \`domains/side-project.md\` |
| Personal | this repo | \`domains/personal.md\` |
| Home | this repo | \`domains/home.md\` |
`;
