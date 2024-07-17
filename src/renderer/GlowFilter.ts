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

export class ShockwaveFilter extends Filter {
  public uniforms: {
    uTime: number;
    uCenter: PointData;
    uSpeed: number;
    uWave: Float32Array;
  };

  public time: number;

  constructor() {
    const glProgram = GlProgram.from({
      vertex: basicVertexShader,
      fragment: fragmentShader,
      name: "glow-filter",
    });

    super({
      glProgram,
      resources: {
        shockwaveUniforms: {
          uTime: { value: 0, type: "f32" },
        },
      },
    });
    this.time = 0;
    this.uniforms = this.resources.shockwaveUniforms.uniforms;
  }

  public override apply(
    filterManager: FilterSystem,
    input: Texture,
    output: RenderSurface,
    clearMode: boolean
  ): void {
    this.uniforms.uTime = this.time;
    filterManager.applyFilter(this, input, output, clearMode);
  }
}
