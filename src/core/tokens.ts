export function render(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_m, key: string) => {
    const value = vars[key];
    if (value === undefined)
      throw new Error(`Unknown template token: {{${key}}}`);
    return value;
  });
}
