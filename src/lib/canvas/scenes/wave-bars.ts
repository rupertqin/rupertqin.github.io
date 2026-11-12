/**
 * WaveBars — a stack of horizontal bars whose vertical position is modulated by
 * a travelling multi-frequency sine wave. Ported 1:1 from polar.sh
 * `Landing/graphics/WaveBars.tsx`.
 */

import type { Scene, SceneEnv } from "../runtime";

const COLS = 1;
const ROWS = 6;

export function createWaveBarsScene(): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const width = env.width;
      const height = env.height;
      const pad = Math.min(width, height) * 0.08;
      const innerW = width - pad * 2;
      const innerH = height - pad * 2;
      const colW = innerW / COLS;
      const rowH = innerH / ROWS;
      const barH = Math.max(1, rowH * 0.03);
      const colGap = colW * 0.12;
      const maxBarW = colW - colGap;
      const time = env.t;

      ctx.fillStyle = graphic.stroke;
      const maxDisp = rowH * 2;

      for (let c = 0; c < COLS; c += 1) {
        const cx = pad + c * colW + colGap / 2;

        for (let r = 0; r < ROWS; r += 1) {
          const baseY = pad + r * rowH + (rowH - barH) / 2;

          const phase1 = c * 0.9 + r * 0.25 - time * 1.8;
          const phase2 = c * 0.4 - r * 0.15 + time * 0.7;
          const phase3 = (c + r) * 0.3 + time * 1.1;

          const wave =
            Math.sin(phase1) * 0.4 +
            Math.sin(phase2) * 0.35 +
            Math.sin(phase3) * 0.25;

          // Top and bottom rows are fixed; inner rows scale displacement by how
          // far they are from the edges (0 at edges, 1 at center).
          const edgeDist = Math.min(r, ROWS - 1 - r) / ((ROWS - 1) / 2);
          const yOffset = wave * maxDisp * edgeDist;

          ctx.fillRect(cx, baseY + yOffset, maxBarW, barH);
        }
      }
    },
  };
}
