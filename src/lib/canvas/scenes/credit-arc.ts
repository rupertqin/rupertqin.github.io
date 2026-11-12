/**
 * CreditArc — a static 2×2 grid of geometric glyphs: plus, cross, circle and a
 * six-spoke asterisk. Ported 1:1 from polar.sh `Landing/graphics/CreditArc.tsx`
 * (the original is static as well).
 */

import type { Scene, SceneEnv } from "../runtime";

export function createCreditArcScene(): Scene {
  return {
    draw(env: SceneEnv) {
      const { ctx, graphic } = env;
      const size = Math.min(env.width, env.height);
      const cx = env.width / 2;
      const cy = env.height / 2;

      ctx.strokeStyle = graphic.stroke;
      ctx.lineWidth = 2;

      const cellSize = size * 0.3;
      const gap = size * 0.1;
      const arm = cellSize * 0.4;

      const cells = [
        { x: cx - gap / 2 - cellSize / 2, y: cy - gap / 2 - cellSize / 2 },
        { x: cx + gap / 2 + cellSize / 2, y: cy - gap / 2 - cellSize / 2 },
        { x: cx - gap / 2 - cellSize / 2, y: cy + gap / 2 + cellSize / 2 },
        { x: cx + gap / 2 + cellSize / 2, y: cy + gap / 2 + cellSize / 2 },
      ];

      // Plus
      const p = cells[0];
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - arm);
      ctx.lineTo(p.x, p.y + arm);
      ctx.moveTo(p.x - arm, p.y);
      ctx.lineTo(p.x + arm, p.y);
      ctx.stroke();

      // Cross (X)
      const x = cells[1];
      const d = arm * 0.8;
      ctx.beginPath();
      ctx.moveTo(x.x - d, x.y - d);
      ctx.lineTo(x.x + d, x.y + d);
      ctx.moveTo(x.x + d, x.y - d);
      ctx.lineTo(x.x - d, x.y + d);
      ctx.stroke();

      // Circle
      const o = cells[2];
      ctx.beginPath();
      ctx.arc(o.x, o.y, arm * 0.85, 0, Math.PI * 2);
      ctx.stroke();

      // Asterisk (6 spokes)
      const a = cells[3];
      for (let i = 0; i < 6; i += 1) {
        const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(a.x + Math.cos(angle) * arm, a.y + Math.sin(angle) * arm);
        ctx.stroke();
      }
    },
  };
}
