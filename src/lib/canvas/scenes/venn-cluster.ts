/**
 * VennCluster — three internally-tangent circles; the medium circle rotates
 * between a centred small circle and a big circle tangent on the far side.
 * Ported 1:1 from polar.sh `Landing/graphics/VennCluster.tsx`.
 */

import type { Scene, SceneEnv } from "../runtime";

const ANG_SPEED = 0.25;

export function createVennClusterScene(): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const size = Math.min(env.width, env.height);
      const cx = env.width / 2;
      const cy = env.height / 2;

      const rSmall = size * 0.08;
      const rMedium = size * 0.2;
      const rBig = 2 * rMedium - rSmall;

      ctx.strokeStyle = graphic.stroke;
      ctx.lineWidth = 1.5;

      const angle = env.t * ANG_SPEED;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);

      const mx = cx + dx * (rMedium - rSmall);
      const my = cy + dy * (rMedium - rSmall);

      const bx = mx - dx * (rBig - rMedium);
      const by = my - dy * (rBig - rMedium);

      ctx.beginPath();
      ctx.arc(bx, by, rBig, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(mx, my, rMedium, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, rSmall, 0, Math.PI * 2);
      ctx.stroke();
    },
  };
}
