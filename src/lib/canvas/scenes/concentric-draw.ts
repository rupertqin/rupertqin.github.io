/**
 * ConcentricDraw — concentric circles whose strokes draw in sequentially from
 * inner to outer; faint background rings stay visible. Ported 1:1 from
 * polar.sh `Landing/graphics/ConcentricDraw.tsx`.
 */

import type { Scene, SceneEnv } from "../runtime";

const RING_COUNT = 4;
const MIN_R_FRAC = 0.08;
const RING_STEP_FRAC = 0.08;

const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

const RING_INTERVAL = 0.25;
const DRAW_DURATION = 2.8;
const TAIL_DELAY = 0.3;
const FULL_CYCLE =
  (RING_COUNT - 1) * RING_INTERVAL + DRAW_DURATION + TAIL_DELAY;

export function createConcentricDrawScene(): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const size = Math.min(env.width, env.height);
      const cx = env.width / 2;
      const cy = env.height / 2;
      const cycleTime = env.t % FULL_CYCLE;

      for (let i = 0; i < RING_COUNT; i += 1) {
        const r = size * (MIN_R_FRAC + i * RING_STEP_FRAC);

        // Faint background ring
        ctx.strokeStyle = graphic.dim;
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        // Animated stroke — leading tip + trailing start
        const ringStart = i * RING_INTERVAL;

        const tipT = (cycleTime - ringStart) / DRAW_DURATION;
        const tipProgress = ease(clamp01(tipT));

        const tailT = (cycleTime - ringStart - TAIL_DELAY) / DRAW_DURATION;
        const tailProgress = ease(clamp01(tailT));

        if (tipProgress <= 0) continue;

        const startAngle = -Math.PI / 2 + Math.PI * 2 * tailProgress;
        const endAngle = -Math.PI / 2 + Math.PI * 2 * tipProgress;

        if (endAngle - startAngle < 0.01) continue;

        ctx.strokeStyle = graphic.stroke;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.stroke();
      }
    },
  };
}
