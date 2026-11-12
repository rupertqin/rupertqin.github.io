/**
 * VolumetricSlices — WebGL. Each horizontal slice through an animated
 * 4-metaball volume (clipped by a rounded box) is drawn as a quad in isometric
 * projection; the fragment shader emits antialiased contours and writes depth
 * for the solid so nearer slices occlude deeper ones. Ported 1:1 from polar.sh
 * `Landing/graphics/VolumetricSlices.tsx`.
 */

import type { Scene, SceneGLEnv } from "../runtime";

const BALLS = [
  { r: 0.38, a: [0.62, 0.55, 0.68], f: [0.3, 0.45, 0.38], p: [0.0, 1.1, 2.2] },
  { r: 0.35, a: [0.7, 0.6, 0.55], f: [0.45, 0.28, 0.5], p: [1.7, 0.4, 3.0] },
  { r: 0.36, a: [0.55, 0.7, 0.5], f: [0.38, 0.52, 0.31], p: [3.2, 2.7, 0.5] },
  { r: 0.33, a: [0.65, 0.5, 0.65], f: [0.55, 0.34, 0.44], p: [2.1, 3.8, 1.3] },
];

const VS = /* glsl */ `
attribute vec2 a_quad;

uniform float u_sliceZ;
uniform vec2  u_halfXY;
uniform vec4  u_viewTrig;
uniform float u_viewScale;
uniform float u_depthScale;

varying vec2 v_world;

void main() {
  vec2 xy = a_quad * u_halfXY * 2.0;
  v_world = xy;

  float cY = u_viewTrig.x, sY = u_viewTrig.y;
  float cP = u_viewTrig.z, sP = u_viewTrig.w;

  float x1 = xy.x * cY + xy.y * sY;
  float y1 = -xy.x * sY + xy.y * cY;
  float y2 = y1 * cP - u_sliceZ * sP;

  float sliceDepth = -u_sliceZ * u_depthScale;

  gl_Position = vec4(x1 * u_viewScale, y2 * u_viewScale, sliceDepth, 1.0);
}
`;

const FS = /* glsl */ `
#extension GL_OES_standard_derivatives : enable
precision highp float;

uniform float u_time;
uniform float u_sliceZ;
uniform vec3  u_lineColor;
uniform float u_lineAlpha;

uniform float u_ballR[4];
uniform vec3  u_ballA[4];
uniform vec3  u_ballF[4];
uniform vec3  u_ballP[4];

varying vec2 v_world;

float boxSdf(vec3 p, vec3 h, float r) {
  vec3 d = abs(p) - h + vec3(r);
  return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0) - r;
}

float metaSum(vec3 p) {
  float sum = 0.0;
  for (int i = 0; i < 4; i++) {
    vec3 c = sin(u_time * u_ballF[i] + u_ballP[i]) * u_ballA[i];
    vec3 d = p - c;
    sum += u_ballR[i] * u_ballR[i] / (dot(d, d) + 1e-4);
  }
  return sum;
}

void main() {
  vec3 p = vec3(v_world, u_sliceZ);

  float metaSdf = 1.0 - metaSum(p);
  float boxS    = boxSdf(p, vec3(0.55, 0.55, 0.95), 0.06);

  if (max(metaSdf, boxS) > 0.0) discard;

  vec2 gm = vec2(dFdx(metaSdf), dFdy(metaSdf));
  float metaPx = abs(metaSdf) / max(length(gm), 1e-4);
  float metaLine = 1.0 - smoothstep(1.6, 2.8, metaPx);

  vec2 gb = vec2(dFdx(boxS), dFdy(boxS));
  float boxPx = abs(boxS) / max(length(gb), 1e-4);
  float boxLine = 1.0 - smoothstep(1.6, 2.8, boxPx);

  float line = max(metaLine, boxLine);

  if (line > 0.02) {
    gl_FragColor = vec4(u_lineColor, u_lineAlpha * line);
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
}
`;

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("shader alloc failed");
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "shader compile error");
  }
  return shader;
};

const linkProgram = (gl: WebGLRenderingContext) => {
  const program = gl.createProgram();
  if (!program) throw new Error("program alloc failed");
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VS));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "program link error");
  }
  gl.useProgram(program);
  return program;
};

const parseColor = (value: string): [number, number, number] => {
  const hex = value.trim().match(/^#?([0-9a-f]{6})$/i);
  if (hex) {
    const int = parseInt(hex[1], 16);
    return [
      ((int >> 16) & 255) / 255,
      ((int >> 8) & 255) / 255,
      (int & 255) / 255,
    ];
  }
  const rgb = value.match(/(\d+)[^\d]+(\d+)[^\d]+(\d+)/);
  if (rgb) {
    return [
      Number(rgb[1]) / 255,
      Number(rgb[2]) / 255,
      Number(rgb[3]) / 255,
    ];
  }
  return [0.72, 0.71, 0.69];
};

export function createVolumetricSlicesScene(): Scene {
  let gl: WebGLRenderingContext | null = null;
  let program: WebGLProgram | null = null;
  let quad: WebGLBuffer | null = null;
  let time = 0;
  let colorSource = "";
  let color: [number, number, number] = [0.72, 0.71, 0.69];

  const uniform: Record<string, WebGLUniformLocation | null> = {};

  return {
    kind: "webgl",

    init(canvas: HTMLCanvasElement) {
      const context = canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: false,
        depth: true,
        antialias: true,
      });
      if (!context) return;
      gl = context;

      gl.getExtension("OES_standard_derivatives");

      try {
        program = linkProgram(gl);
      } catch {
        program = null;
        return;
      }

      const attr = gl.getAttribLocation(program, "a_quad");
      for (const name of [
        "u_sliceZ",
        "u_halfXY",
        "u_viewTrig",
        "u_viewScale",
        "u_depthScale",
        "u_time",
        "u_lineColor",
        "u_lineAlpha",
        "u_ballR[0]",
        "u_ballA[0]",
        "u_ballF[0]",
        "u_ballP[0]",
      ]) {
        uniform[name] = gl.getUniformLocation(program, name);
      }

      quad = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5]),
        gl.STATIC_DRAW,
      );
      gl.enableVertexAttribArray(attr);
      gl.vertexAttribPointer(attr, 2, gl.FLOAT, false, 0, 0);

      const seed = Math.random() * 1000;
      const rArr = new Float32Array(BALLS.map((ball) => ball.r));
      const aArr = new Float32Array(BALLS.flatMap((ball) => ball.a));
      const fArr = new Float32Array(BALLS.flatMap((ball) => ball.f));
      const pArr = new Float32Array(
        BALLS.flatMap((ball) => ball.p.map((v) => v + seed)),
      );

      gl.uniform1fv(uniform["u_ballR[0]"], rArr);
      gl.uniform3fv(uniform["u_ballA[0]"], aArr);
      gl.uniform3fv(uniform["u_ballF[0]"], fArr);
      gl.uniform3fv(uniform["u_ballP[0]"], pArr);

      const yaw = Math.PI / 4;
      const pitch = -Math.atan(Math.SQRT1_2);
      gl.uniform4f(
        uniform.u_viewTrig,
        Math.cos(yaw),
        Math.sin(yaw),
        Math.cos(pitch),
        Math.sin(pitch),
      );
      gl.uniform1f(uniform.u_viewScale, 0.8);
      gl.uniform1f(uniform.u_depthScale, 0.5);
      gl.uniform2f(uniform.u_halfXY, 0.62, 0.62);

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
    },

    resize(width: number, height: number, dpr: number) {
      gl?.viewport(0, 0, Math.round(width * dpr), Math.round(height * dpr));
    },

    draw(env: SceneGLEnv) {
      if (!gl || !program) return;
      time += env.dt * 1.2;

      if (colorSource !== env.graphic.stroke) {
        colorSource = env.graphic.stroke;
        color = parseColor(colorSource);
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      gl.uniform1f(uniform.u_time, time);
      gl.uniform3f(uniform.u_lineColor, color[0], color[1], color[2]);
      gl.uniform1f(uniform.u_lineAlpha, 1.0);

      const sliceCount = 16;
      const zMin = -1.05;
      const zMax = 1.05;

      // Front-to-back so the depth test culls deeper slices' contours.
      for (let s = sliceCount - 1; s >= 0; s -= 1) {
        const t = s / (sliceCount - 1);
        gl.uniform1f(uniform.u_sliceZ, zMin + t * (zMax - zMin));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    },

    destroy() {
      if (!gl) return;
      if (quad) gl.deleteBuffer(quad);
      if (program) gl.deleteProgram(program);
      gl = null;
      program = null;
      quad = null;
    },
  };
}
