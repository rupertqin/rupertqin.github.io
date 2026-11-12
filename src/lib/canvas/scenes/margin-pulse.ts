/**
 * MarginPulse — a vertical stack of bars emanating from a centre axis; each
 * bar's signed length is driven by a slow multi-frequency wave. Ported 1:1 from
 * polar.sh `Landing/graphics/MarginPulse.tsx`.
 */

import type { Scene, SceneEnv } from "../runtime";

const ROWS = 14;

export function createMarginPulseScene(): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const width = env.width;
      const height = env.height;
      const padX = width * 0.12;
      const padY = height * 0.12;
      const innerH = height - padY * 2;
      const cx = width / 2;
      const rowH = innerH / ROWS;
      const barH = rowH * 0.06;
      const maxLen = width / 2 - padX;
      const time = env.t;

      const SUCCESS = graphic.stroke;
      const DANGER = graphic.dim;

      const drawBar = (x: number, y: number, w: number, h: number) => {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.fill();
      };

      for (let r = 0; r < ROWS; r += 1) {
        const baseY = padY + r * rowH + (rowH - barH) / 2;

        const phase1 = r * 0.55 - time * 1.1;
        const phase2 = r * 0.27 + time * 0.6;
        const wave = Math.sin(phase1) * 0.6 + Math.sin(phase2) * 0.4;

        // Positive bias: mostly profit, occasional dip into the red
        const signed = wave * 0.72;
        const len = signed * maxLen;

        ctx.fillStyle = signed >= 0 ? SUCCESS : DANGER;
        if (signed >= 0) {
          drawBar(cx, baseY, len, barH);
        } else {
          drawBar(cx + len, baseY, -len, barH);
        }
      }
    },
  };
}
