import fragmentShader from "./colorblind-fragment.glsl";
import basicVertexShader from "./vertex.glsl";

import {
  Filter,
  FilterSystem,
  GlProgram,
  RenderSurface,
  Texture,
} from "pixi.js";

/**
 * A filter which adds a glow effect to all non-greyscale colors.
 * To animate it, update the time property.
 */
export class ColorblindFilter extends Filter {
  public uniforms: {
    uTime: number;
    screenFade: number;
    black: number;
    focusX: number;
    focusY: number;
    focusDistance: number;
    grayscaleRadius: number;
  };

  public time: number;
  public screenFade: number = 0;
  public black: number = 0;
  public focusX: number = 0;
  public focusY: number = 0;
  public focusDistance: number = 0;
  public grayscaleRadius: number = 0;

  constructor() {
    const colorNameTest = "#de60f2";
    const r = parseInt(colorNameTest.slice(1, 3), 16).toFixed(1);
    const g = parseInt(colorNameTest.slice(3, 5), 16).toFixed(1);
    const b = parseInt(colorNameTest.slice(5, 7), 16).toFixed(1);

    const replaced = fragmentShader.replace("__COLOR1__", `${r}, ${g}, ${b}`);
    const glProgram = GlProgram.from({
      vertex: basicVertexShader,
      fragment: replaced,
      name: "glow-filter",
    });

    super({
      glProgram,
      resources: {
        glowUniforms: {
          uTime: { value: 0, type: "f32" },
          screenFade: { value: 0, type: "f32" },
          black: { value: 0, type: "f32" },
          focusX: { value: 0, type: "f32" },
          focusY: { value: 0, type: "f32" },
          focusDistance: { value: 0, type: "f32" },
          grayscaleRadius: { value: 0, type: "f32" },
        },
      },
    });
    this.time = 0;
    this.uniforms = this.resources.glowUniforms.uniforms;
  }

  public override apply(
    filterManager: FilterSystem,
    input: Texture,
    output: RenderSurface,
    clearMode: boolean
  ): void {
    this.uniforms.uTime = this.time;
    this.uniforms.screenFade = this.screenFade;
    this.uniforms.black = this.black;
    this.uniforms.focusX = this.focusX;
    this.uniforms.focusY = this.focusY;
    this.uniforms.focusDistance = this.focusDistance;
    this.uniforms.grayscaleRadius = this.grayscaleRadius;
    filterManager.applyFilter(this, input, output, clearMode);
  }
}
