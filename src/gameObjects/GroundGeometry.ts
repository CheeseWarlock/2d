import { Point } from "../types.js";
import BaseGeometry from "./BaseGeometry.js";

class GroundGeometry extends BaseGeometry {
  constructor(points: Point[], color?: string) {
    super();
    this.points = points;
    if (color) this.color = color;
  }

  tick() {}
}

export default GroundGeometry;
