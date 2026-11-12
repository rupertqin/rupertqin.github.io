/**
 * LinkedRings — one large circle with two smaller circles slowly orbiting it.
 * Ported 1:1 from polar.sh `Landing/graphics/LinkedRings.tsx`.
 */

import type { Scene, SceneEnv } from "../runtime";

export function createLinkedRingsScene(): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const size = Math.min(env.width, env.height);
      const cx = env.width / 2;
      const cy = env.height / 2;

      const bigR = size * 0.2;
      const smallR = size * 0.08;
      const orbitR = bigR + smallR;

      ctx.strokeStyle = graphic.stroke;
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(cx, cy, bigR, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 2; i += 1) {
        const angle = env.t * 0.2 + i * Math.PI;
        ctx.beginPath();
        ctx.arc(
          cx + Math.cos(angle) * orbitR,
          cy + Math.sin(angle) * orbitR,
          smallR,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }
    },
  };
}
