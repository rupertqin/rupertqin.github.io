/**
 * Graphics catalogue — the site's library of canvas decorations.
 *
 * Every entry is a 1:1 port of a polar.sh landing graphic (see the header of
 * each file in `./scenes`). Pages pick a single tile as an accent; they are not
 * meant to be shown as a full grid.
 */

import type { SceneName } from "./scenes";

export interface GraphicEntry {
  key: SceneName;
  zh: string;
  en: string;
}

export const GRAPHICS: GraphicEntry[] = [
  { key: "concentric", zh: "同心描边", en: "Concentric" },
  { key: "gauge", zh: "辐射量规", en: "Gauge" },
  { key: "stepped", zh: "步进刻度", en: "Stepped" },
  { key: "orbit", zh: "轨道球体", en: "Orbit" },
  { key: "compass", zh: "罗盘", en: "Compass" },
  { key: "creditArc", zh: "符号阵列", en: "Glyphs" },
  { key: "cycleArrow", zh: "循环箭头", en: "Cycle" },
  { key: "dumbbell", zh: "哑铃", en: "Dumbbell" },
  { key: "linkedRings", zh: "环链", en: "Linked" },
  { key: "margin", zh: "中轴脉冲", en: "Margin" },
  { key: "radialSpinner", zh: "径向旋转", en: "Spinner" },
  { key: "textRings", zh: "文字环", en: "Rings" },
  { key: "vector", zh: "向量场", en: "Vector" },
  { key: "venn", zh: "维恩簇", en: "Venn" },
  { key: "slices", zh: "体积切片", en: "Volume" },
  { key: "wave", zh: "波形条", en: "Wave" },
];

export const getGraphic = (key: SceneName): GraphicEntry =>
  GRAPHICS.find((entry) => entry.key === key) ?? GRAPHICS[0];
