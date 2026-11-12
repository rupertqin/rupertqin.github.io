import type { CSSProperties } from "react";
import { MbtiService } from "@/lib/mbti";
import type { MbtiType } from "@/lib/mbti";

interface BaguaProps {
  type: MbtiType;
}

const DISC_RADIUS = 100;

/** 认知功能配色（与 MbtiService.getColorByFunction 的 Tailwind 色阶一一对应） */
const FUNCTION_COLORS: Record<string, string> = {
  "blue-600": "#2563eb",
  "blue-400": "#60a5fa",
  "green-600": "#16a34a",
  "green-400": "#4ade80",
  "yellow-600": "#ca8a04",
  "yellow-400": "#facc15",
  "purple-600": "#9333ea",
  "purple-400": "#c084fc",
};

/** 阴阳鱼半边的路径：大圆弧 + 两个小半圆，旋转 180° 后与自身互补成整圆 */
const yinYangPath = (r: number) => `
  M 0 ${-r}
  A ${r} ${r} 0 1 1 0 ${r}
  A ${r / 2} ${r / 2} 0 0 0 0 0
  A ${r / 2} ${r / 2} 0 0 1 0 ${-r}
  Z
`;

const colorOf = (func: string) => {
  const token = MbtiService.getColorByFunction(func, true)
    .replace("bg-", "")
    .split(" ")[0];
  return FUNCTION_COLORS[token] ?? "#6b7280";
};

export const Bagua = ({ type }: BaguaProps) => {
  const functions = type?.functions ?? [];
  const viewBox = `${-DISC_RADIUS * 1.06} ${-DISC_RADIUS * 1.06} ${
    DISC_RADIUS * 2.12
  } ${DISC_RADIUS * 2.12}`;

  return (
    <div
      className="bagua"
      role="img"
      aria-label={`${type?.type ?? ""} 认知功能八卦图`}
    >
      {/* 整圈（阴阳鱼 + 八个功能）顺时针自转，中心类型字母保持不动 */}
      <div className="bagua__ring">
        <svg className="bagua__disc" viewBox={viewBox} aria-hidden="true">
          {/* 白色底圆 + 黑色半边 + 描边，避免两个互补路径拼接处的细缝 */}
          <circle r={DISC_RADIUS} fill="#ffffff" />
          <path
            d={yinYangPath(DISC_RADIUS)}
            fill="#111111"
            transform="rotate(180)"
          />
          <circle cy={-DISC_RADIUS / 2} r={DISC_RADIUS / 8} fill="#111111" />
          <circle cy={DISC_RADIUS / 2} r={DISC_RADIUS / 8} fill="#ffffff" />
          <circle
            r={DISC_RADIUS}
            fill="none"
            stroke="var(--ui-ink, #37352f)"
            strokeWidth={1.5}
          />
        </svg>

        {functions.map((func, index) => {
          const angle = (index - 2) * 45;
          return (
            <div
              key={`${func}-${index}`}
              className="bagua__slot"
              style={{ "--bagua-angle": `${angle}deg` } as CSSProperties}
            >
              <span className="bagua__label" style={{ color: colorOf(func) }}>
                {func}
              </span>
            </div>
          );
        })}
      </div>

      <span className="bagua__type">{type?.type}</span>
    </div>
  );
};
