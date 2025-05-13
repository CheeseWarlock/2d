import CameraFrame from "../CameraFrame";
import { DEBUG_MODE } from "../config";
import { VIVID_COLORS_RGB } from "../levels/COLOR_SCHEME";
import COLORBLIND_MODE_VERTEX_SHADER from "./filters/camera-frame-vertex.glsl";
import COLORBLIND_MODE_FRAGMENT_SHADER from "./filters/camera-frame-fragment.glsl";
import COLOR_REPLACER from "./filters/color-replacer.glsl";

const CAMERA_FRAME_WIDTH = 60;
const CAMERA_FRAME_HEIGHT = 900;

const PLAIN_VERTEX_SHADER = `
  attribute vec4 a_position;

  void main() {
    gl_Position = a_position;
  }`;

const PLAIN_FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec4 uColor;

  void main() {
    gl_FragColor = uColor;
  }`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  gl.deleteShader(shader);
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  gl.deleteProgram(program);
}

function makeZone(gl: WebGLRenderingContext, from: number, to: number) {
  const start = 1 - 2 * from;
  const end = 1 - 2 * to;

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, start, -1, end, 1, start, -1, end, 1, start, 1, end]),
    gl.STATIC_DRAW
  );
}

/**
 * Special renderer for a camera frame (the view or the goal).
 * Uses WebGL.
 */
class FilterCameraFrameRenderer {
  element: HTMLElement;
  gl?: WebGLRenderingContext;
  program?: WebGLProgram;
  colorblindMode: boolean;

  constructor(
    targetElement: HTMLElement,
    title: string,
    colorblindMode: boolean
  ) {
    this.element = targetElement;
    this.colorblindMode = colorblindMode;
    const header = document.createElement("span");
    header.className = "header-text";
    header.innerText = title;
    targetElement.appendChild(header);

    const photoCanvas = document.createElement("canvas");
    photoCanvas.width = CAMERA_FRAME_WIDTH;
    photoCanvas.height = CAMERA_FRAME_HEIGHT;
    targetElement.appendChild(photoCanvas);

    const gl = photoCanvas.getContext("webgl2");
    if (!gl) {
      if (DEBUG_MODE) console.log("GL init failed");
      return;
    }

    this.gl = gl;

    let replaced = COLORBLIND_MODE_FRAGMENT_SHADER;
    replaced = replaced.replace(
      "__CAMERA_FRAME_WIDTH__",
      `${CAMERA_FRAME_WIDTH}`
    );
    replaced = replaced.replace(
      "__CAMERA_FRAME_HEIGHT__",
      `${CAMERA_FRAME_HEIGHT}`
    );
    replaced = replaced.replace("__COLOR_REPLACER__", COLOR_REPLACER);
    VIVID_COLORS_RGB.forEach((c, i) => {
      replaced = replaced.replace(
        `__COLOR${i + 1}__`,
        `${c.r}, ${c.g}, ${c.b}`
      );
    });

    const vertexShader = createShader(
      gl,
      gl.VERTEX_SHADER,
      colorblindMode ? COLORBLIND_MODE_VERTEX_SHADER : PLAIN_VERTEX_SHADER
    );
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      colorblindMode ? replaced : PLAIN_FRAGMENT_SHADER
    );

    if (!vertexShader) {
      if (DEBUG_MODE) console.log("Vertex shader failed");
      return;
    }
    if (!fragmentShader) {
      if (DEBUG_MODE) console.log("Fragment shader failed");
      return;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      if (DEBUG_MODE) console.log("Program failed");
      return;
    }

    this.program = program;
    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const positionAttributeLocation = gl.getAttribLocation(
      program,
      "a_position"
    );
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
  }

  /**
   * Shake (move horizontally) the container.
   */
  shake() {
    this.element.classList.remove("view-container-shake");
    this.element.offsetHeight;
    this.element.classList.add("view-container-shake");
  }

  /**
   * Bounce (move vertically) the container.
   */
  bounce() {
    this.element.classList.remove("camera-container-bounce");
    this.element.offsetHeight;
    this.element.classList.add("camera-container-bounce");
  }

  drawCamera(frame?: CameraFrame) {
    const gl = this.gl;
    const program = this.program;

    if (!gl || !program) return;

    const colorUniformLocation = gl.getUniformLocation(program, "uColor");

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform4f(
      colorUniformLocation,
      Math.random(),
      Math.random(),
      Math.random(),
      1
    );

    frame?.segments.forEach((segment) => {
      if (segment.color === "empty") {
        const rgb = 68 / 256;
        gl.uniform4f(colorUniformLocation, rgb, rgb, rgb, 1);
      } else {
        const r = parseInt(segment.color.slice(1, 3), 16) / 255;
        const g = parseInt(segment.color.slice(3, 5), 16) / 255;
        const b = parseInt(segment.color.slice(5, 7), 16) / 255;

        gl.uniform4f(colorUniformLocation, r, g, b, 1);
      }

      makeZone(gl, segment.start, segment.end);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    });

    gl.uniform4f(colorUniformLocation, 1, 1, 1, this.colorblindMode ? 1 : 0.4);
    makeZone(gl, 0.4975, 0.5025);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}

export default FilterCameraFrameRenderer;
