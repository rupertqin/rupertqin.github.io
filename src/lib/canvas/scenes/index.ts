import type { SceneFactory } from "../runtime";
import { createCompassScene } from "./compass";
import { createConcentricDrawScene } from "./concentric-draw";
import { createCreditArcScene } from "./credit-arc";
import { createCycleArrowScene } from "./cycle-arrow";
import { createDumbbellScene } from "./dumbbell";
import { createGaugeSweepScene } from "./gauge-sweep";
import { createLinkedRingsScene } from "./linked-rings";
import { createMarginPulseScene } from "./margin-pulse";
import { createOrbitingSpheresScene } from "./orbiting-spheres";
import { createRadialSpinnerScene } from "./radial-spinner";
import { createSteppedRadialScene } from "./stepped-radial";
import { createTextRingsScene } from "./text-rings";
import { createVectorFieldScene } from "./vector-field";
import { createVennClusterScene } from "./venn-cluster";
import { createVolumetricSlicesScene } from "./volumetric-slices";
import { createWaveBarsScene } from "./wave-bars";

/** Registry consumed by `data-canvas="..."` — all 16 polar.sh graphics. */
export const SCENES = {
  concentric: createConcentricDrawScene,
  gauge: createGaugeSweepScene,
  stepped: createSteppedRadialScene,
  orbit: createOrbitingSpheresScene,
  compass: createCompassScene,
  creditArc: createCreditArcScene,
  cycleArrow: createCycleArrowScene,
  dumbbell: createDumbbellScene,
  linkedRings: createLinkedRingsScene,
  margin: createMarginPulseScene,
  radialSpinner: createRadialSpinnerScene,
  textRings: createTextRingsScene,
  vector: createVectorFieldScene,
  venn: createVennClusterScene,
  slices: createVolumetricSlicesScene,
  wave: createWaveBarsScene,
} satisfies Record<string, SceneFactory>;

export type SceneName = keyof typeof SCENES;
