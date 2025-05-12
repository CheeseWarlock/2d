import { Point } from "../types";
import BaseGeometry from "./BaseGeometry";

class GroundGeometry extends BaseGeometry {
  constructor(points: Point[], color?: string) {
    super();
    this.points = points;
    if (color) this.color = color;
  }

  tick() {}
}

export default GroundGeometry;
