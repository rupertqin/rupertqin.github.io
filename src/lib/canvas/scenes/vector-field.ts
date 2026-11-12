/**
 * VectorField — a grid of arrow segments on a disk, each oriented by a field
 * function. Ported from polar.sh `Landing/graphics/VectorField.tsx`; the hover
 * behaviour is intentionally dropped — this build renders the static field.
 */

import type { Scene, SceneEnv } from "../runtime";

export type FieldFn = (r: number, theta: number) => number;

/** Tangential (vortex) field — the default look without a cursor. */
const vortexField: FieldFn = (_r: number, theta: number) => theta + Math.PI / 2;

const COLS = 4;
const ROWS = 4;

export function createVectorFieldScene(field: FieldFn = vortexField): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const size = Math.min(env.width, env.height);
      const originX = env.width / 2 - size / 2;
      const originY = env.height / 2 - size / 2;

      const padding = size * 0.08;
      const innerSize = size - padding * 2;
      const cellW = innerSize / COLS;
      const cellH = innerSize / ROWS;
      const half = Math.min(cellW, cellH) * 0.2;

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = graphic.stroke;

      for (let ci = 0; ci < COLS; ci += 1) {
        for (let ri = 0; ri < ROWS; ri += 1) {
          const u = ((ci + 0.5) / COLS - 0.5) * 2;
          const v = ((ri + 0.5) / ROWS - 0.5) * 2;

          const r = Math.hypot(u, v);
          if (r > 1) continue;

          const cx = originX + padding + cellW * (ci + 0.5);
          const cy = originY + padding + cellH * (ri + 0.5);

          const theta = Math.atan2(v, u);
          const angle = field(r, theta);

          const ca = Math.cos(angle);
          const sa = Math.sin(angle);
          const dx = ca * half;
          const dy = sa * half;

          // Shaft
          ctx.beginPath();
          ctx.moveTo(cx - dx, cy - dy);
          ctx.lineTo(cx + dx, cy + dy);
          ctx.stroke();

          // V-shaped arrowhead
          const headLen = half;
          const headAngle = Math.PI / 4;
          const tipX = cx + dx;
          const tipY = cy + dy;
          ctx.beginPath();
          ctx.moveTo(
            tipX - Math.cos(angle - headAngle) * headLen,
            tipY - Math.sin(angle - headAngle) * headLen,
          );
          ctx.lineTo(tipX, tipY);
          ctx.lineTo(
            tipX - Math.cos(angle + headAngle) * headLen,
            tipY - Math.sin(angle + headAngle) * headLen,
          );
          ctx.stroke();
        }
      }
    },
  };
}
