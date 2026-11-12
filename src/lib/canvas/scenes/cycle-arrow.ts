/**
 * CycleArrow — a meander/serpentine rail with a snake-like highlight travelling
 * along it, ending in a fixed V arrowhead. Ported 1:1 from polar.sh
 * `Landing/graphics/CycleArrow.tsx`.
 */

import type { Scene, SceneEnv } from "../runtime";

const COLS = 7;
const CYCLE_MS = 10000;
const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

interface Geometry {
  size: number;
  path: Path2D;
  leftFlank: Path2D;
  rightFlank: Path2D;
  meanderLen: number;
  headLen: number;
  totalLen: number;
}

const build = (size: number): Geometry => {
  const cy = size / 2;
  const colGap = size * 0.12;
  const halfH = size * 0.16;
  const r = colGap / 2;

  const totalW = (COLS - 1) * colGap;
  const startX = (size - totalW) / 2;

  const path = new Path2D();
  for (let i = 0; i < COLS; i += 1) {
    const x = startX + i * colGap;
    const goingUp = i % 2 === 0;
    const isLast = i === COLS - 1;
    if (i === 0) {
      path.moveTo(x, goingUp ? cy + halfH : cy - halfH);
    }
    const endY = goingUp ? cy - halfH : cy + halfH;
    const extension = isLast ? (goingUp ? -r : r) : 0;
    path.lineTo(x, endY + extension);
    if (!isLast) {
      const arcCx = x + colGap / 2;
      path.arc(arcCx, endY, r, Math.PI, 0, !goingUp);
    }
  }

  const arcLen = Math.PI * r;
  const meanderLen = COLS * 2 * halfH + r + (COLS - 1) * arcLen;
  const headLen = colGap * 0.8;
  const headAngle = Math.PI / 4;

  const lastGoingUp = (COLS - 1) % 2 === 0;
  const rx = startX + (COLS - 1) * colGap;
  const ry = lastGoingUp ? cy - halfH - r : cy + halfH + r;
  const flankYDir = lastGoingUp ? 1 : -1;

  const leftFlank = new Path2D();
  leftFlank.moveTo(rx, ry);
  leftFlank.lineTo(
    rx - Math.sin(headAngle) * headLen,
    ry + flankYDir * Math.cos(headAngle) * headLen,
  );

  const rightFlank = new Path2D();
  rightFlank.moveTo(rx, ry);
  rightFlank.lineTo(
    rx + Math.sin(headAngle) * headLen,
    ry + flankYDir * Math.cos(headAngle) * headLen,
  );

  return {
    size,
    path,
    leftFlank,
    rightFlank,
    meanderLen,
    headLen,
    totalLen: meanderLen + headLen,
  };
};

export function createCycleArrowScene(): Scene {
  let geo: Geometry | null = null;

  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const size = Math.min(env.width, env.height);
      if (!geo || Math.abs(geo.size - size) > 0.5) geo = build(size);

      const { path, leftFlank, rightFlank, meanderLen, headLen, totalLen } = geo;
      const t = ((env.t * 1000) / CYCLE_MS) % 1;

      let dashStart: number;
      let dashEnd: number;
      if (t < 0.5) {
        dashStart = 0;
        dashEnd = ease(t / 0.5) * totalLen;
      } else {
        dashStart = ease((t - 0.5) / 0.5) * totalLen;
        dashEnd = totalLen;
      }

      ctx.save();
      ctx.translate(env.width / 2 - size / 2, env.height / 2 - size / 2);

      // Faint full rail underneath
      ctx.strokeStyle = graphic.dim;
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
      ctx.stroke(path);
      ctx.stroke(leftFlank);
      ctx.stroke(rightFlank);

      // Bright trail clipped to what is already painted
      ctx.globalCompositeOperation = "source-atop";
      ctx.strokeStyle = graphic.stroke;
      ctx.lineWidth = 2.5;

      const meanderStart = Math.min(dashStart, meanderLen);
      const meanderEnd = Math.min(dashEnd, meanderLen);
      const meanderVisible = meanderEnd - meanderStart;
      if (meanderVisible > 0.5) {
        ctx.setLineDash([meanderVisible, meanderLen + 1]);
        ctx.lineDashOffset = -meanderStart;
        ctx.stroke(path);
      }

      const flankStart = Math.max(0, dashStart - meanderLen);
      const flankEnd = Math.max(0, dashEnd - meanderLen);
      const flankVisible = flankEnd - flankStart;
      if (flankVisible > 0.5) {
        ctx.setLineDash([flankVisible, headLen + 1]);
        ctx.lineDashOffset = -flankStart;
        ctx.stroke(leftFlank);
        ctx.stroke(rightFlank);
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;
      ctx.restore();
    },
  };
}
