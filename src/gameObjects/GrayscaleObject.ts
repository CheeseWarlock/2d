import GeometryObject from "./GeometryObject.js";
import World from "../World.js";

type Point = {
  x: number;
  y: number;
};

class GrayscaleObject extends GeometryObject {
  constructor(points: Point[]) {
    super();
    this.points = points;
  }

  tick() {}
}

export default GrayscaleObject;
