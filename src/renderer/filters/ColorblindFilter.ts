import { VIVID_COLORS_RGB } from "../../levels/COLOR_SCHEME";
import FRAGMENT_SHADER from "./colorblind-fragment.glsl";
import BASIC_VERTEX_SHADER from "./vertex.glsl";
import COLOR_REPLACER from "./color-replacer.glsl";

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
    let replaced = FRAGMENT_SHADER;
    replaced = replaced.replace("__COLOR_REPLACER__", COLOR_REPLACER);
    VIVID_COLORS_RGB.forEach((c, i) => {
      replaced = replaced.replace(
        `__COLOR${i + 1}__`,
        `${c.r}, ${c.g}, ${c.b}`
      );
    });
    const glProgram = GlProgram.from({
      vertex: BASIC_VERTEX_SHADER,
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
