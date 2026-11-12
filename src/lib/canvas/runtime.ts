/**
 * Canvas runtime for the landing graphics.
 *
 * One RAF loop drives every mounted graphic. It owns DPR-aware sizing, resize,
 * in-view pausing, reduced-motion and teardown across Astro view transitions, so
 * each graphic is only a `draw()` ported from the polar.sh source.
 */

import { clamp, readGraphic, resetGraphic, type GraphicTokens } from "./palette";
import { SCENES } from "./scenes";

export interface BaseEnv {
  width: number;
  height: number;
  dpr: number;
  /** Seconds since the runtime started. */
  t: number;
  /** Seconds since the previous frame (clamped). */
  dt: number;
  graphic: GraphicTokens;
  reduced: boolean;
}

/** Canvas2D scenes. */
export interface SceneEnv extends BaseEnv {
  ctx: CanvasRenderingContext2D;
}

/** WebGL scenes. */
export interface SceneGLEnv extends BaseEnv {
  gl: WebGLRenderingContext;
}

export interface Scene2D {
  kind?: "2d";
  draw(env: SceneEnv): void;
  resize?(width: number, height: number, dpr: number): void;
  destroy?(): void;
}

export interface SceneGL {
  kind: "webgl";
  init?(canvas: HTMLCanvasElement): void;
  draw(env: SceneGLEnv): void;
  resize?(width: number, height: number, dpr: number): void;
  destroy?(): void;
}

export type Scene = Scene2D | SceneGL;
export type SceneFactory = () => Scene;

interface Instance {
  node: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  gl: WebGLRenderingContext | null;
  scene: Scene;
  width: number;
  height: number;
  dpr: number;
  visible: boolean;
}

const instances: Instance[] = [];

let rafId = 0;
let lastTime = 0;
let elapsed = 0;
let frameCount = 0;
let degraded = false;
let slowStreak = 0;
let fastStreak = 0;

let graphic: GraphicTokens | null = null;
let observer: IntersectionObserver | null = null;
let resizeObserver: ResizeObserver | null = null;
let motionQuery: MediaQueryList | null = null;

const base: BaseEnv = {
  width: 0,
  height: 0,
  dpr: 1,
  t: 0,
  dt: 0,
  graphic: { stroke: "", dim: "", font: "" },
  reduced: false,
};

/* -------------------------------------------------------------------------- */
/* public API                                                                 */
/* -------------------------------------------------------------------------- */

export function initCanvasScenes(root: ParentNode = document): void {
  const nodes = root.querySelectorAll<HTMLElement>("[data-canvas]");
  if (!nodes.length) return;

  graphic = graphic ?? readGraphic();
  setupObservers();
  setupMotionQuery();

  nodes.forEach((node) => {
    if (node.dataset.canvasMounted === "1") return;
    const name = node.dataset.canvas ?? "";
    const factory = (SCENES as Record<string, SceneFactory | undefined>)[name];
    if (!factory) return;

    const canvas = node.querySelector<HTMLCanvasElement>("canvas");
    if (!canvas) return;

    const scene = factory();
    const isGL = scene.kind === "webgl";

    let ctx: CanvasRenderingContext2D | null = null;
    let gl: WebGLRenderingContext | null = null;

    if (isGL) {
      gl = canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: false,
        depth: true,
        antialias: true,
      }) as WebGLRenderingContext | null;
      if (!gl) return;
      try {
        (scene as SceneGL).init?.(canvas);
      } catch {
        return;
      }
    } else {
      ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;
    }

    const instance: Instance = {
      node,
      canvas,
      ctx,
      gl,
      scene,
      width: 0,
      height: 0,
      dpr: 1,
      visible: true,
    };

    node.dataset.canvasMounted = "1";
    instances.push(instance);
    observer?.observe(node);
    resizeObserver?.observe(node);

    if (measure(instance) && prefersReduced()) {
      paint(instance, 0);
    }
  });

  if (instances.length) started();
}

export function destroyCanvasScenes(): void {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
  lastTime = 0;
  elapsed = 0;
  frameCount = 0;
  degraded = false;
  slowStreak = 0;
  fastStreak = 0;

  observer?.disconnect();
  observer = null;
  resizeObserver?.disconnect();
  resizeObserver = null;

  if (motionQuery) {
    motionQuery.removeEventListener("change", onMotionChange);
    motionQuery = null;
  }

  for (const instance of instances) {
    instance.scene.destroy?.();
    if (instance.ctx) {
      instance.ctx.setTransform(1, 0, 0, 1, 0, 0);
      instance.ctx.clearRect(0, 0, instance.canvas.width, instance.canvas.height);
    }
    instance.canvas.width = 0;
    instance.canvas.height = 0;
    delete instance.node.dataset.canvasMounted;
  }

  instances.length = 0;
  resetGraphic();
  graphic = null;
}

/* -------------------------------------------------------------------------- */
/* observers                                                                  */
/* -------------------------------------------------------------------------- */

function setupObservers(): void {
  if (!observer && typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const instance = instances.find((item) => item.node === entry.target);
          if (!instance) continue;
          const wasVisible = instance.visible;
          instance.visible = entry.isIntersecting;
          if (!wasVisible && instance.visible) {
            if (prefersReduced()) paint(instance, 0);
            started();
          }
        }
      },
      { rootMargin: "120px 0px", threshold: 0 },
    );
  }

  if (!resizeObserver && typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const instance = instances.find((item) => item.node === entry.target);
        if (!instance) continue;
        const sized = measure(instance);
        if (sized && prefersReduced()) paint(instance, 0);
      }
    });
  }
}

function setupMotionQuery(): void {
  if (motionQuery || typeof window === "undefined" || !window.matchMedia) return;
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionQuery.addEventListener("change", onMotionChange);
}

function onMotionChange(): void {
  if (prefersReduced()) {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    lastTime = 0;
    for (const instance of instances) paint(instance, 0);
  } else {
    started();
  }
}

/* -------------------------------------------------------------------------- */
/* loop                                                                       */
/* -------------------------------------------------------------------------- */

function started(): void {
  if (rafId || prefersReduced()) return;
  if (!instances.length) return;
  lastTime = 0;
  rafId = requestAnimationFrame(frame);
}

function frame(now: number): void {
  rafId = requestAnimationFrame(frame);

  const since = lastTime ? (now - lastTime) / 1000 : 0;
  if (!lastTime) {
    lastTime = now;
    return;
  }
  if (document.hidden) {
    lastTime = now;
    return;
  }

  frameCount += 1;
  if (degraded && frameCount % 2 === 1) return;

  lastTime = now;
  const dt = clamp(since, 0.001, 0.05);
  elapsed += dt;

  const budgetStart = performance.now();
  for (const instance of instances) {
    if (!instance.visible || instance.width < 2 || instance.height < 2) continue;
    paint(instance, dt);
  }
  const cost = performance.now() - budgetStart;

  // Drop to ~30 fps when the page is clearly busy; recover when it settles.
  if (cost > 10) {
    slowStreak += 1;
    fastStreak = 0;
  } else if (cost < 5) {
    fastStreak += 1;
    slowStreak = 0;
  }
  if (!degraded && slowStreak > 30) degraded = true;
  else if (degraded && fastStreak > 240) degraded = false;
}

function paint(instance: Instance, dt: number): void {
  base.width = instance.width;
  base.height = instance.height;
  base.dpr = instance.dpr;
  base.t = elapsed;
  base.dt = dt;
  base.graphic = graphic ?? readGraphic();
  base.reduced = prefersReduced();

  if (instance.ctx) {
    const env: SceneEnv = { ...base, ctx: instance.ctx };
    instance.ctx.clearRect(0, 0, instance.width, instance.height);
    (instance.scene as Scene2D).draw(env);
  } else if (instance.gl) {
    const env: SceneGLEnv = { ...base, gl: instance.gl };
    (instance.scene as SceneGL).draw(env);
  }
}

/* -------------------------------------------------------------------------- */
/* helpers                                                                    */
/* -------------------------------------------------------------------------- */

function measure(instance: Instance): boolean {
  const rect = instance.canvas.getBoundingClientRect();
  const width = Math.round(rect.width);
  const height = Math.round(rect.height);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (width < 2 || height < 2) return false;

  if (
    instance.width === width &&
    instance.height === height &&
    Math.abs(instance.dpr - dpr) < 0.01
  ) {
    return true;
  }

  instance.width = width;
  instance.height = height;
  instance.dpr = dpr;
  instance.canvas.width = Math.round(width * dpr);
  instance.canvas.height = Math.round(height * dpr);

  if (instance.ctx) {
    instance.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  } else if (instance.gl) {
    instance.gl.viewport(0, 0, instance.canvas.width, instance.canvas.height);
  }

  instance.scene.resize?.(width, height, dpr);
  return true;
}

function prefersReduced(): boolean {
  return motionQuery?.matches ?? false;
}
