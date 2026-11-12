/**
 * RadialSpinner — 10 spokes that alternate between a fill round (tail anchored
 * at the inner radius, tip extends out) and an empty round (tip anchored at the
 * outer radius, tail retracts). Ported 1:1 from polar.sh
 * `Landing/graphics/RadialSpinner.tsx`.
 */

import type { Scene, SceneEnv } from "../runtime";

const SPOKE_COUNT = 10;
const INNER_R_FRAC = 0.1;
const OUTER_R_FRAC = 0.32;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

const SPOKE_INTERVAL = 0.2;
const PATH_DURATION = 0.8;
const ROUND_DURATION = (SPOKE_COUNT - 1) * SPOKE_INTERVAL + PATH_DURATION;
const FULL_CYCLE = ROUND_DURATION * 2;

export function createRadialSpinnerScene(): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const size = Math.min(env.width, env.height);
      const cx = env.width / 2;
      const cy = env.height / 2;
      const innerR = size * INNER_R_FRAC;
      const outerR = size * OUTER_R_FRAC;
      const spokeLen = outerR - innerR;

      // Faint background paths — always visible
      ctx.strokeStyle = graphic.dim;
      ctx.lineWidth = 2;
      for (let i = 0; i < SPOKE_COUNT; i += 1) {
        const angle = (i / SPOKE_COUNT) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * innerR, cy + Math.sin(angle) * innerR);
        ctx.lineTo(cx + Math.cos(angle) * outerR, cy + Math.sin(angle) * outerR);
        ctx.stroke();
      }

      const cycleTime = env.t % FULL_CYCLE;
      const isFillRound = cycleTime < ROUND_DURATION;
      const roundTime = isFillRound ? cycleTime : cycleTime - ROUND_DURATION;

      ctx.strokeStyle = graphic.stroke;
      ctx.lineWidth = 2;

      for (let i = 0; i < SPOKE_COUNT; i += 1) {
        const angle = (i / SPOKE_COUNT) * Math.PI * 2 - Math.PI / 2;
        const spokeStart = i * SPOKE_INTERVAL;
        const localT = (roundTime - spokeStart) / PATH_DURATION;
        const clamped = Math.max(0, Math.min(1, localT));
        const progress = easeOut(clamped);

        let r1: number;
        let r2: number;

        if (isFillRound) {
          if (localT <= 0) continue;
          r1 = innerR;
          r2 = innerR + spokeLen * progress;
        } else {
          if (localT >= 1) continue;
          r1 = innerR + spokeLen * progress;
          r2 = outerR;
        }

        if (r2 - r1 < 0.5) continue;

        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
        ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
        ctx.stroke();
      }
    },
  };
}
