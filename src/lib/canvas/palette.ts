/**
 * Canvas colour tokens.
 *
 * The graphic components read the same two custom properties the polar.sh
 * originals use (`--color-graphic-stroke`, `--color-graphic-dim`), so the
 * drawings follow the site palette instead of hard-coding a second one.
 */

export interface GraphicTokens {
  stroke: string;
  dim: string;
  font: string;
}

const FALLBACK: GraphicTokens = {
  stroke: "rgb(190, 190, 190)",
  dim: "rgb(233, 233, 231)",
  font: "sans-serif",
};

let cache: GraphicTokens | null = null;

export function readGraphic(): GraphicTokens {
  if (cache) return cache;

  const styles =
    typeof document === "undefined"
      ? null
      : getComputedStyle(document.documentElement);

  const read = (name: string, fallback: string): string => {
    const value = styles?.getPropertyValue(name).trim();
    return value ? value : fallback;
  };

  cache = {
    stroke: read("--color-graphic-stroke", FALLBACK.stroke),
    dim: read("--color-graphic-dim", FALLBACK.dim),
    font: read("--ui-font-sans", FALLBACK.font),
  };

  return cache;
}

export function resetGraphic(): void {
  cache = null;
}

/** Clamp a number into `[min, max]`. */
export function clamp(value: number, min: number, max: number): number {
  return value < min ? min : value > max ? max : value;
}
