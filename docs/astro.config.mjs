import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://alejandrehl.github.io",
  base: "/polydomain/",
  integrations: [
    starlight({
      title: "<TOOL_NAME>",
      social: [{ icon: "github", label: "GitHub", href: "https://github.com/Alejandrehl/polydomain" }],
      sidebar: [
        { label: "Guides", items: [{ label: "Getting started", link: "/guides/getting-started/" }] },
        { label: "The pattern", items: [
          { label: "Overview", link: "/pattern/overview/" },
          { label: "The 7 principles", link: "/pattern/principles/" },
        ] },
        { label: "Reference", items: [{ label: "CLI", link: "/reference/cli/" }] },
      ],
    }),
  ],
});
