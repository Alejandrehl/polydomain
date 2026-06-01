import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://alejandrehl.github.io",
  base: "/polydomain/",
  integrations: [
    starlight({
      title: "polydomain",
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/Alejandrehl/polydomain" }],
      sidebar: [
        { label: "Guides", items: [
          { label: "Getting started", link: "/guides/getting-started/" },
          { label: "Memory", link: "/guides/memory/" },
          { label: "Notes store (Obsidian)", link: "/guides/notes-store/" },
          { label: "Adopt an existing repo", link: "/guides/adopt/" },
          { label: "Actions (macOS)", link: "/guides/actions/" },
        ] },
        { label: "The pattern", items: [
          { label: "Overview", link: "/pattern/overview/" },
          { label: "The 7 principles", link: "/pattern/principles/" },
          { label: "Anatomy of a command center", link: "/pattern/anatomy/" },
        ] },
        { label: "Reference", items: [{ label: "CLI", link: "/reference/cli/" }] },
      ],
    }),
  ],
});
