import GameObject from "./IGameObject.js";
import World from "../World.js";

type Point = {
  x: number;
  y: number;
};

class GeometryObject implements GameObject {
  world: World;
  points: Point[] = [];

  constructor(world: World) {
    this.world = world;
  }

  color: string = "black";

  tick() {}

  get lineSegments() {
    if (this.points.length < 2) return [];
    if (this.points.length === 2)
      return [
        {
          from: { x: this.points[0].x, y: this.points[0].y } as Point,
          to: { x: this.points[1].x, y: this.points[1].y } as Point,
        },
      ];

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

export default GeometryObject;
