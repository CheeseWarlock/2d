import { Point } from "../types.js";
import BaseGeometry from "./BaseGeometry.js";

class GroundGeometry extends BaseGeometry {
  constructor(points: Point[]) {
    super();
    this.points = points;
  }

  tick() {}
}

export default GroundGeometry;
