/**
 * Compass — two bands of radial spokes around a muted centre crosshair,
 * rotating in opposite directions. Ported 1:1 from polar.sh
 * `Landing/graphics/Compass.tsx`.
 */

import type { Scene, SceneEnv } from "../runtime";

const BAND_COUNT = 2;
const RAY_COUNT = 10;
const ANG_SPEED = 0.15;

export function createCompassScene(): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const size = Math.min(env.width, env.height);
      const cx = env.width / 2;
      const cy = env.height / 2;

      const outerR = size * 0.32;
      const startR = size * 0.2;
      const bandWidth = (outerR - startR) / BAND_COUNT;
      const lineWidth = size * 0.005;

      ctx.lineWidth = lineWidth;

      // Muted crosshair in the centre
      const cross = size * 0.05;
      ctx.strokeStyle = graphic.stroke;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.moveTo(cx - cross, cy);
      ctx.lineTo(cx + cross, cy);
      ctx.moveTo(cx, cy - cross);
      ctx.lineTo(cx, cy + cross);
      ctx.stroke();
      ctx.globalAlpha = 1;

      const step = (Math.PI * 2) / RAY_COUNT;

      for (let i = 0; i < BAND_COUNT; i += 1) {
        const innerR = startR + i * bandWidth;
        const outerBandR = startR + (i + 1) * bandWidth;
        const direction = i % 2 === 0 ? 1 : -1;
        const bandAngle = env.t * ANG_SPEED * direction;

        for (let j = 0; j < RAY_COUNT; j += 1) {
          const a = bandAngle + j * step;
          const cos = Math.cos(a);
          const sin = Math.sin(a);

          ctx.beginPath();
          ctx.moveTo(cx + cos * innerR, cy + sin * innerR);
          ctx.lineTo(cx + cos * outerBandR, cy + sin * outerBandR);
          ctx.stroke();
        }
      }
    },
  };
}
