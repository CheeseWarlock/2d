import GeometryObject from "./GeometryObject.js";
import World from "../World.js";

type Point = {
  x: number;
  y: number;
};

class PolyBlock extends GeometryObject {
  points: Point[] = [];
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
    this.points.push(
      { x: x1, y: y1 },
      { x: x2, y: y1 },
      { x: x2, y: y2 },
      { x: x1, y: y2 }
    );
    this.color = color;
  }

  get lineSegments() {
    const segments: { from: Point; to: Point }[] = [];
    for (let i = 0; i != this.points.length; i++) {
      segments.push({
        from: this.points[i],
        to: this.points[(i + 1) % this.points.length],
      });
    }

    return segments;
  }
}

export default PolyBlock;
