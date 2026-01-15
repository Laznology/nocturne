import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import pagefind from "astro-pagefind";
import icon from "astro-icon";

import astroExpressiveCode from "astro-expressive-code";
import remarkGithubAdmonitionsToDirectives from "remark-github-admonitions-to-directives";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [
      remarkGithubAdmonitionsToDirectives,
      remarkDirective,
      remarkDirectiveRehype,
    ],
  },
  image: {
    remotePatterns: [
      {
        protocol: "https",
      },
    ],
  },
  site: "https://nocturne.laznology.dev",
  devToolbar: {
    enabled: false,
  },
  integrations: [
    astroExpressiveCode({
      // https://expressive-code.com/guides/themes/
      themes: ["andromeeda"],
    }),
    mdx(),
    sitemap(),
    icon(),
    pagefind({
      site: "https://nocturne.laznology.dev",
      indexing: {
        glob: "**/blog/**",
        excludeSelectors: [
          "nav",
          "footer",
          "header",
          ".sidebar",
          ".navigation",
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    clientPrerender: true,
  },
  build: {
    format: "directory",
    inlineStylesheets: "auto",
  },
});
