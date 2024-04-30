import GeometryObject from "./GeometryObject.js";
import World from "./World.js";

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
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    color: string,
    world: World
  ) {
    super(world);
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
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
