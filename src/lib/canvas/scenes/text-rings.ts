/**
 * TextRings — concentric rings of text on circular paths; letter-spacing
 * animates from collapsed to fully distributed, staggered inner → outer.
 * Ported 1:1 from polar.sh `Landing/graphics/TextRings.tsx`.
 */

import type { Scene, SceneEnv } from "../runtime";

const WORD = "QINXIANG";

// Cubic ease-in-out
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const RING_COUNT = 14;
const MIN_R_FRAC = 0.06;
const RING_STEP_FRAC = 0.028;
// Minimum pixel gap between adjacent rings' text.
const MIN_GAP_PX = 2;
// Seconds to advance the clock at mount so instances start at different points.
const TIME_OFFSET = 10;

export function createTextRingsScene(): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const size = Math.min(env.width, env.height);
      const cx = env.width / 2;
      const cy = env.height / 2;
      const time = env.t + TIME_OFFSET;

      const ringStep = size * RING_STEP_FRAC;
      const fontSize = Math.max(
        4,
        Math.min(size * 0.018, ringStep - MIN_GAP_PX),
      );

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = graphic.stroke;

      for (let i = 0; i < RING_COUNT; i += 1) {
        const radius = size * (MIN_R_FRAC + i * RING_STEP_FRAC);
        const charCount = WORD.length;
        const direction = i % 2 === 0 ? 1 : -1;
        const stagger = i * 0.12;

        // Oscillating progress: never fully collapses — stays readable
        const MIN_SPREAD = 0.4;
        const phase = time * 0.4 - stagger;
        const raw = (Math.sin(phase) + 1) / 2;
        const progress = MIN_SPREAD + ease(raw) * (1 - MIN_SPREAD);

        ctx.font = `${fontSize}px ${graphic.font}`;

        // Slow base rotation
        const drift = time * 0.06 * direction;

        // Arc span for the word at current progress
        const arcSpan =
          (charCount / (charCount + 1)) * Math.PI * progress;

        // TOP ARC: characters upright, reading L→R = CW across top
        const topCenter = -Math.PI / 2 + drift;
        for (let j = 0; j < charCount; j += 1) {
          const t = j / (charCount - 1) - 0.5;
          const angle = topCenter + t * arcSpan;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle + Math.PI / 2);
          ctx.fillText(WORD[j], 0, 0);
          ctx.restore();
        }

        // BOTTOM ARC: characters inverted, reading L→R = CCW across bottom
        const botCenter = Math.PI / 2 + drift;
        for (let j = 0; j < charCount; j += 1) {
          const t = j / (charCount - 1) - 0.5;
          const angle = botCenter - t * arcSpan;
          const x = cx + Math.cos(angle) * radius;
          const y = cy + Math.sin(angle) * radius;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle - Math.PI / 2);
          ctx.fillText(WORD[j], 0, 0);
          ctx.restore();
        }
      }
    },
  };
}
