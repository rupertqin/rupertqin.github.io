import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import compressor from "astro-compressor";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import sharp from "sharp";
import config from "./src/config/config.json";
import languagesJSON from "./src/config/language.json";

const { default_language } = config.settings;

const supportedLang = [...languagesJSON.map((lang) => lang.languageCode)];
const disabledLanguages = config.settings.disable_languages;

// Filter out disabled languages from supportedLang
const filteredSupportedLang = supportedLang.filter(
  (lang) => !disabledLanguages.includes(lang),
);

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "ignore",
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        // 子功能 Typography 的开发态：另有独立 dev server，不由本仓库构建。
        // 启动方式：在 typography 仓库执行 `BASE_PATH=/typography npm run dev -- --port 4322`
        "/typography": {
          target: "http://127.0.0.1:4322",
          changeOrigin: true,
          ws: true,
        },
      },
    },
  },
  i18n: { locales: filteredSupportedLang, defaultLocale: default_language },
  image: { service: sharp() },

  integrations: [
    react(),
    sitemap(),
    // compressor({
    //   gzip: { level: 6 },
    //   brotli: true,
    //   zstd: false,
    //   fileExtensions: [
    //     ".html",
    //     ".css",
    //     ".svg",
    //     ".txt",
    //     ".xml",
    //     ".js",
    //     ".cjs",
    //     ".mjs",
    //     ".json",
    //   ],
    // }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Accordion",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
      ],
    }),
    mdx(),
  ],

  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: { theme: "one-dark-pro", wrap: true },
  },
});
