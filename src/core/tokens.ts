export function render(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_m, key: string) => {
    if (!(key in vars)) throw new Error(`Unknown template token: {{${key}}}`);
    return vars[key] as string;
  });
}
