import fragmentShader from "./fragment.glsl";
import basicVertexShader from "./vertex.glsl";

import {
  Filter,
  FilterSystem,
  GlProgram,
  PointData,
  RenderSurface,
  Texture,
} from "pixi.js";

/**
 * A filter which adds a glow effect to all non-greyscale colors.
 * To animate it, update the time property.
 */
export class GlowFilter extends Filter {
  public uniforms: {
    uTime: number;
    white: number;
    black: number;
    focusX: number;
    focusY: number;
    focusDistance: number;
  };

  public time: number;
  public white: number = 0.5;
  public black: number = 0;
  public focusX: number = 0;
  public focusY: number = 0;
  public focusDistance: number = 0;

  constructor() {
    const glProgram = GlProgram.from({
      vertex: basicVertexShader,
      fragment: fragmentShader,
      name: "glow-filter",
    });

    super({
      glProgram,
      resources: {
        glowUniforms: {
          uTime: { value: 0, type: "f32" },
          white: { value: 0.5, type: "f32" },
          black: { value: 0, type: "f32" },
          focusX: { value: 0, type: "f32" },
          focusY: { value: 0, type: "f32" },
          focusDistance: { value: 0, type: "f32" },
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
    this.uniforms.white = this.white;
    this.uniforms.black = this.black;
    this.uniforms.focusX = this.focusX;
    this.uniforms.focusY = this.focusY;
    this.uniforms.focusDistance = this.focusDistance;
    filterManager.applyFilter(this, input, output, clearMode);
  }
}
