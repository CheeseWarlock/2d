import GeometryObject from "./GeometryObject.js";
import World from "../World.js";

type Point = {
  x: number;
  y: number;
};

class Line extends GeometryObject {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  color: string = "black";

  constructor(
    from: { x: number; y: number },
    to: { x: number; y: number },
    color: string,
    world: World
  ) {
    super(world);
    this.x1 = from.x;
    this.x2 = to.x;
    this.y1 = from.y;
    this.y2 = to.y;
    this.color = color;
  }

  get lineSegments() {
    const segments: { from: Point; to: Point }[] = [];
    return [
      { from: { x: this.x1, y: this.y1 }, to: { x: this.x2, y: this.y2 } },
    ];
  }
}

export default Line;
