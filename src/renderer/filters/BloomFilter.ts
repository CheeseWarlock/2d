import fragmentShader from "./bloom-fragment.glsl";
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
export class BloomFilter extends Filter {
  public uniforms: {
    white: number;
  };

  public white: number = 1;

  constructor(options: { antialias?: boolean }) {
    const glProgram = GlProgram.from({
      vertex: basicVertexShader,
      fragment: fragmentShader,
      name: "custom-bloom-filter",
    });

    super({
      glProgram,
      antialias: options.antialias,
      resources: {
        glowUniforms: {
          uTime: { value: 1, type: "f32" },
          white: { value: 0.5, type: "f32" },
        },
      },
    });
    this.uniforms = this.resources.glowUniforms.uniforms;
  }

  public override apply(
    filterManager: FilterSystem,
    input: Texture,
    output: RenderSurface,
    clearMode: boolean
  ): void {
    this.uniforms.white = this.white;
    filterManager.applyFilter(this, input, output, clearMode);
  }
}
