/**
 * OrbitingSpheres — a large circle plus nested circles sharing a common tangent
 * point at its centre, swinging toward an orbiting satellite dot. Ported 1:1
 * from polar.sh `Landing/graphics/OrbitingSpheres.tsx`.
 */

import type { Scene, SceneEnv } from "../runtime";

// How much each nested circle shrinks relative to its parent
const SHRINK = 0.62;
// Recursion depth for the nested circles
const DEPTH = 3;
// Framerate-independent angular speed (rad/sec)
const ANG_SPEED = 0.25;

export function createOrbitingSpheresScene(): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const size = Math.min(env.width, env.height);
      const cx = env.width / 2;
      const cy = env.height / 2;
      const R = size * 0.32;

      const orbitR = R + size * 0.08;
      const satR = size * 0.015;

      const angle = env.t * ANG_SPEED;
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = graphic.stroke;

      // Big sphere
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // Nested inner circles
      let r = R * 0.5;
      for (let i = 0; i < DEPTH; i += 1) {
        ctx.beginPath();
        ctx.arc(cx + dx * r, cy + dy * r, r, 0, Math.PI * 2);
        ctx.stroke();
        r *= SHRINK;
      }

      // Satellite dot orbiting outside the big sphere
      ctx.beginPath();
      ctx.arc(cx + dx * orbitR, cy + dy * orbitR, satR, 0, Math.PI * 2);
      ctx.fillStyle = graphic.stroke;
      ctx.fill();
    },
  };
}
