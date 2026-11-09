<h1 align=center>Astro + Tailwind CSS + TypeScript Starter and Boilerplate</h1>

<p align=center>Astroplate is a free starter template built with Astro, TailwindCSS & TypeScript, providing everything you need to jumpstart your Astro project and save valuable time.</p>

<p align=center>Made with ♥ by <a href="https://zeon.studio/">Zeon Studio</a></p>

<p align=center> If you find this project useful, please give it a ⭐ to show your support. </p>

<h2 align="center"> <a target="_blank" href="https://astroplate.netlify.app/" rel="nofollow">👀 Demo</a> | <a target="_blank" href="https://astroplate-multilang.netlify.app/" rel="nofollow">👀 Demo Multilang</a> | <a  target="_blank" href="https://pagespeed.web.dev/analysis/https-astroplate-netlify-app/yzx3foum3w?form_factor=desktop">Page Speed (100%)🚀</a>
</h2>

<p align=center>
  <a href="https://github.com/withastro/astro/releases/tag/astro%406.1.9">
    <img src="https://img.shields.io/static/v1?label=ASTRO&message=6.1.9&color=000&logo=astro"  alt="Astro Version 6.1.9"/>
  </a>

  <a href="https://github.com/zeon-studio/astroplate/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/zeon-studio/astroplate" alt="license"></a>

  <img src="https://img.shields.io/github/languages/code-size/zeon-studio/astroplate" alt="code size">

  <a href="https://github.com/zeon-studio/astroplate/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/zeon-studio/astroplate" alt="contributors"></a>
</p>

## 📌 Key Features

- 👥 Multi-Authors
- 🌐 Multilingual
- 🎯 Similar Posts Suggestion
- 🔍 Search Functionality
- 🌑 Dark Mode
- 🏷️ Tags & Categories
- 🔗 Netlify setting pre-configured
- 📞 Support contact form
- 📱 Fully responsive
- 📝 Write and update content in Markdown / MDX
- 🤖 LLM-ready docs generation (`llms.txt`, `llms-full.txt`, and per-page `.md`)
- 💬 Disqus Comment
- 🔳 Syntax Highlighting

### 📄 15+ Pre-designed Pages

- 🏠 Homepage
- 👤 About
- 📞 Contact
- 👥 Authors
- 👤 Author Single
- 📝 Blog
- 📝 Blog Single
- 🚫 Custom 404
- 💡 Elements
- 📄 Privacy Policy
- 🏷️ Tags
- 🏷️ Tag Single
- 🗂️ Categories
- 🗂️ Category Single
- 🔍 Search

## 🔗 Integrations

- astro/react
- astro/sitemap
- astro/tailwind
- Cloudflare Workers (optional deployment)

## 🚀 Getting Started

### 📦 Dependencies

- astro v6.1.9
- node v22.12.0+ (see `.nvmrc`)
- pnpm v10+
- tailwind v4+

### 👉 Install Dependencies

```bash
pnpm install
```

### 👉 Development Command

```bash
pnpm run dev
```

### 👉 Build Command

```bash
pnpm run build
```

### 👉 Generate LLM Files

After build, this project can generate LLM-friendly files from your `dist` HTML:

- `llms.txt` (index of pages)
- `llms-full.txt` (full combined content)
- optional per-page Markdown files

Use one of these ways:

```bash
# included in build
pnpm run build

# or run manually after build
pnpm run generate-llms
```

Configuration is in `src/config/config.json` under `llms`:

- `generate_llms_txt`: create `llms.txt`
- `generate_llms_full_txt`: create `llms-full.txt`
- `generate_individual_md`: create individual `.md` files
- `include`: include only selected routes/globs (empty = all files). Examples: `/about`, `/blog/**` (all files in blog folder)
- `exclude`: exclude routes/globs on top of defaults. Example: `/blog/index.html`

### 👉 子站入口（`/typography`）

`/typography` 由独立仓库 [rupertqin/typography](https://github.com/rupertqin/typography)（公众号排版风格）独立部署，本仓库不构建、不拷贝它的产物，也不在本地做 proxy 联调；本站只提供一个构建期的跳转页（`src/pages/typography/index.astro`），目标地址来自 `TYPOGRAPHY_URL`。

### 👉 发布

推 `main` 触发 GitHub Actions（`.github/workflows/deploy.yml`）：一次构建，同一份 `dist` 发布到 GitHub Pages、Cloudflare Workers Static Assets、Cloudflare Pages 三处。

- Secrets：`CLOUDFLARE_API_TOKEN`（Workers Scripts:Edit、Pages:Edit、Account Settings:Read）、`CLOUDFLARE_ACCOUNT_ID`
- Variables：`TYPOGRAPHY_URL` —— `/typography` 的跳转目标，构建期注入，不写死在源码里。填 `https://<域名>/`；只填域名会自动补 `https://`，留空则回退首页
- GitHub Pages 需仓库 Settings → Pages → Source 设为 **GitHub Actions**

### 👉 Build and Run With Docker

```bash
docker build -t astroplate .
# or
# docker --build-arg INSTALLER=pnpm build -t astroplate .
# or
# docker --build-arg INSTALLER=npm build -t astroplate .

docker run -p 3000:80 astroplate
# or
# docker run --rm -p 3000:80 astroplate
```

To access the shell within the container:

```bash
docker run -it --rm astroplate ash
```

<!-- reporting issue -->

## 🐞 Reporting Issues

We use GitHub Issues as the official bug tracker for this Template. Please Search [existing issues](https://github.com/zeon-studio/astroplate/issues). It’s possible someone has already reported the same problem.
If your problem or idea has not been addressed yet, feel free to [open a new issue](https://github.com/zeon-studio/astroplate/issues).

<!-- licence -->

## 📝 License

Copyright (c) 2023 - Present, Designed & Developed by [Zeon Studio](https://zeon.studio/)

**Code License:** Released under the [MIT](https://github.comzeon-studio/astroplate/blob/main/LICENSE) license.

**Image license:** The images are only for demonstration purposes. They have their license, we don't have permission to share those images.

## 💻 Need Custom Development Services?

If you need a custom theme, theme customization, or complete website development services from scratch you can [Hire Us](https://zeon.studio/).
