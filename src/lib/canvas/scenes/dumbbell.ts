/**
 * Dumbbell — two circles joined by a line, breathing apart and together.
 * Ported 1:1 from polar.sh `Landing/graphics/Dumbbell.tsx`.
 */

import type { Scene, SceneEnv } from "../runtime";

export function createDumbbellScene(): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const size = Math.min(env.width, env.height);
      const cx = env.width / 2;
      const cy = env.height / 2;
      const r = size * 0.18;

      ctx.strokeStyle = graphic.stroke;
      ctx.lineWidth = 2;

      const gap = size * (0.25 + Math.sin(env.t * 0.6) * 0.06);

      ctx.beginPath();
      ctx.arc(cx - gap, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx + gap, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - gap + r, cy);
      ctx.lineTo(cx + gap - r, cy);
      ctx.stroke();
    },
  };
}
