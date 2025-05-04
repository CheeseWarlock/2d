import { Filter, GlProgram } from "pixi.js";
import fragment from "./timestopfragment.glsl";
import vertex from "./vertex.glsl";

class TimeStopFilter extends Filter {
  constructor() {
    const glProgram = GlProgram.from({
      fragment: fragment,
      vertex: vertex,
    });
    super({ glProgram });
  }
}

export default TimeStopFilter;
