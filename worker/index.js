/**
 * 父站 Worker：静态资源直出 + 子功能反向代理。
 *
 * 静态资源走 env.ASSETS（wrangler.jsonc 的 assets.binding），行为与纯静态模式一致；
 * 仅 `/typography` 前缀交给子项目（rupertqin/Typography）的 Cloudflare Pages 项目。
 *
 * 反代目标里的路径前缀与请求一致（子项目会额外产出一份 BASE_PATH=/typography 的
 * 构建放在 dist/typography），因此这里只需要原样转发，不必改写 HTML/CSS/JS。
 *
 * 上游地址可用 vars.SUBAPP_ORIGIN 覆盖（本地用 `wrangler dev --var SUBAPP_ORIGIN:http://127.0.0.1:8899`）。
 */
const PREFIX = '/typography';
const DEFAULT_ORIGIN = 'https://typography.pages.dev';

const isSubAppPath = (pathname) => pathname === PREFIX || pathname.startsWith(`${PREFIX}/`);

const plain = (status, message) =>
  new Response(message, {
    status,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!isSubAppPath(url.pathname)) {
      return env.ASSETS.fetch(request);
    }

    const origin = env.SUBAPP_ORIGIN || DEFAULT_ORIGIN;

    let target;
    try {
      target = new URL(url.pathname + url.search, origin);
    } catch {
      return plain(500, `SUBAPP_ORIGIN 配置非法：${origin}`);
    }

    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.set('x-forwarded-host', url.host);
    headers.set('x-forwarded-proto', url.protocol.replace(':', ''));

    const hasBody = request.method !== 'GET' && request.method !== 'HEAD';

    let upstream;
    try {
      upstream = await fetch(target.toString(), {
        method: request.method,
        headers,
        body: hasBody ? request.body : undefined,
        redirect: 'follow',
      });
    } catch (error) {
      return plain(502, `子应用暂时不可用：${error?.message ?? error}`);
    }

    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.set('x-subapp-origin', new URL(origin).host);

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: responseHeaders,
    });
  },
};
