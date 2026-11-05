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

### 👉 Preview on Cloudflare Workers

```bash
pnpm run preview:cf-workers
```

### 👉 Deploy to Cloudflare Workers

```bash
pnpm run deploy:workers
```

### 👉 子功能：Typography（`/typography`）

`/typography` 是独立仓库 [rupertqin/Typography](https://github.com/rupertqin/Typography)
（公众号排版风格），部署在 Cloudflare Pages 项目 `typography`（自定义域
`https://typography.gantz.host/`）。子项目只产出一份产物，构建期前缀固定为 `/typography`，
所以子路由（主入口）与子域名（辅入口）共用同一份文件，父站侧只做路径转发。

本仓库**不构建、不拷贝**子应用产物，各通道行为如下：

| 通道 | `/typography` 行为 |
| --- | --- |
| Cloudflare Workers（`gantz.host`，主入口） | `worker/index.js` 反代到 `typography.pages.dev`，同域同路径真子功能 |
| Cloudflare Pages（`qinxiang-site.pages.dev`，备用） | Pages 不执行 Worker，落到 `public/typography/index.html` 跳转页 |
| GitHub Pages | 纯静态，同样落到跳转页 → `https://typography.gantz.host/` |

- 反代只匹配 `/typography` 与 `/typography/*`（`wrangler.jsonc` 的 `assets.run_worker_first`），其余路径仍由 assets 直出
- 上游地址由 `wrangler.jsonc` 的 `vars.SUBAPP_ORIGIN` 控制，本地可用 `--var SUBAPP_ORIGIN:...` 覆盖
- 子应用只有一份产物（构建期 `BASE_PATH=/typography`，文件在 Pages 站点根目录，靠其 `_redirects` 做 200 路径映射），所以反代只需原样转发路径，不用改写 HTML

开发态：子应用不在本仓库，`pnpm dev` 访问 `/typography` 会拿到跳转页（`public/typography/index.html`）。要联调真应用开两个终端：

```bash
# 终端 1：子项目
cd ../typography && BASE_PATH=/typography npm run dev -- --port 4322

# 终端 2：父站
pnpm dev    # /typography 由 astro.config 的 vite proxy 转发到 4322
```

本地联调反代（可选）：

```bash
# 终端 1：模拟上游，把子项目的 dist 当作 Pages 根
cd ../typography && npx serve dist -l 8899

# 终端 2：Worker 本地运行
pnpm build
pnpm exec wrangler dev --var SUBAPP_ORIGIN:http://127.0.0.1:8899
```

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
