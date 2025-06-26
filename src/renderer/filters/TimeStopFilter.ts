import {
  Filter,
  FilterSystem,
  GlProgram,
  RenderSurface,
  Texture,
} from "pixi.js";
import fragment from "./time-stop-fragment.glsl";
import vertex from "./vertex.glsl";

class TimeStopFilter extends Filter {
  center: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  };
  time: number = 0;
  public uniforms = {
    uTime: 0,
    uCenter: {
      x: 0,
      y: 0,
    },
    uSpeed: 0,
    uWave: {
      x: 0,
      y: 0,
      z: 0,
      w: 0,
    },
  };
  constructor(options: {
    center: { x: number; y: number };
    speed: number;
    amplitude: number;
    wavelength: number;
    brightness: number;
    radius: number;
    antialias?: boolean;
  }) {
    const glProgram = GlProgram.from({
      fragment: fragment,
      vertex: vertex,
    });
    super({
      antialias: options.antialias,
      glProgram,
      resources: {
        timeStopUniforms: {
          uTime: { value: 0, type: "f32" },
          uCenter: { value: options.center, type: "vec2<f32>" },
          uSpeed: { value: options.speed, type: "f32" },
          uWave: { value: new Float32Array(4), type: "vec4<f32>" },
        },
      },
    });
    this.uniforms = this.resources.timeStopUniforms.uniforms;
  }

  public override apply(
    filterManager: FilterSystem,
    input: Texture,
    output: RenderSurface,
    clearMode: boolean
  ): void {
    this.uniforms.uTime = this.time;
    this.uniforms.uCenter = this.center;
    filterManager.applyFilter(this, input, output, clearMode);
  }
}

export default TimeStopFilter;
