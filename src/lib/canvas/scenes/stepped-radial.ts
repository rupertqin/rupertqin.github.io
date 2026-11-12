/**
 * SteppedRadial — 14 radial ticks with angular spacing warped so the ring is
 * dense at the bottom and opens into a wide gap at the top. The ticks step
 * through that distribution one pitch at a time. Ported 1:1 from polar.sh
 * `Landing/graphics/SteppedRadial.tsx`.
 */

import type { Scene, SceneEnv } from "../runtime";

const SPOKE_COUNT = 14;
const INNER_R_FRAC = 0.1;
const OUTER_R_FRAC = 0.32;

// Widest gap is (1 + GAP_SPREAD)× the tightest gap (opposite side)
const GAP_SPREAD = 8;
// Where the widest gap sits, in canvas angle (y is down): -π/2 is up
const GAP_ANGLE = -Math.PI / 2;
const WARP_SAMPLES = 720;

const STEP_DURATION = 2;
// Fraction of each step that is constant-speed drift.
const DRIFT = 0.45;

const bezier = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ease = (x: number): number => (1 - DRIFT) * bezier(x) + DRIFT * x;

const buildWarpTable = (): Float64Array => {
  const cumulative = new Float64Array(WARP_SAMPLES + 1);
  for (let k = 1; k <= WARP_SAMPLES; k += 1) {
    const midAngle = ((k - 0.5) / WARP_SAMPLES) * Math.PI * 2;
    const gap = 1 + (GAP_SPREAD * (1 + Math.cos(midAngle - GAP_ANGLE))) / 2;
    cumulative[k] = cumulative[k - 1] + 1 / gap;
  }
  const scale = (Math.PI * 2) / cumulative[WARP_SAMPLES];
  for (let k = 0; k <= WARP_SAMPLES; k += 1) cumulative[k] *= scale;
  return cumulative;
};

const warpAngle = (cumulative: Float64Array, u: number) => {
  let lo = 0;
  let hi = WARP_SAMPLES;
  while (lo + 1 < hi) {
    const mid = (lo + hi) >> 1;
    if (cumulative[mid] <= u) lo = mid;
    else hi = mid;
  }
  const span = cumulative[hi] - cumulative[lo];
  const frac = span > 0 ? (u - cumulative[lo]) / span : 0;
  return ((lo + frac) / WARP_SAMPLES) * Math.PI * 2;
};

const cumulative = buildWarpTable();
const pitch = (Math.PI * 2) / SPOKE_COUNT;

const gapFrac =
  (((GAP_ANGLE % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2);
const uGap = cumulative[Math.round(gapFrac * WARP_SAMPLES)];

export function createSteppedRadialScene(): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const size = Math.min(env.width, env.height);
      const cx = env.width / 2;
      const cy = env.height / 2;
      const innerR = size * INNER_R_FRAC;
      const outerR = size * OUTER_R_FRAC;

      const time = env.t;
      const step = Math.floor(time / STEP_DURATION);
      const moveT = time / STEP_DURATION - step;
      const offset = (step + ease(moveT)) * pitch;

      ctx.strokeStyle = graphic.stroke;
      ctx.lineWidth = 2;

      for (let i = 0; i < SPOKE_COUNT; i += 1) {
        const u =
          (((i * pitch + offset + uGap) % (Math.PI * 2)) + Math.PI * 2) %
          (Math.PI * 2);
        const angle = warpAngle(cumulative, u);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(cx + cos * innerR, cy + sin * innerR);
        ctx.lineTo(cx + cos * outerR, cy + sin * outerR);
        ctx.stroke();
      }
    },
  };
}
