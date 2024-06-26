import GeometryObject from "./BaseGeometry.js";
import World from "../World.js";

type Point = {
  x: number;
  y: number;
};

class GroundGeometry extends GeometryObject {
  constructor(points: Point[]) {
    super();
    this.points = points;
  }

  tick() {}
}

export default GroundGeometry;
