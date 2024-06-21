import GeometryObject from "./GeometryObject.js";
import World from "../World.js";

type Point = {
  x: number;
  y: number;
};

class GrayscaleObject extends GeometryObject {
  constructor(points: Point[], world: World) {
    super(world);
    this.points = points;
  }

  tick() {}
}

export default GrayscaleObject;
