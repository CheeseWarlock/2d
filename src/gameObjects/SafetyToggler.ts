import { Point } from "../types";
import BaseGeometry from "./BaseGeometry";
import GameObject from "./IGameObject";

export default class SafetyToggler extends BaseGeometry {
  points: Point[] = [
    {
      x: 490,
      y: 590,
    },
    {
      x: 510,
      y: 590,
    },
    {
      x: 510,
      y: 610,
    },
    {
      x: 490,
      y: 610,
    },
  ];

  tick() {
    // maybe make it move a bit?
  }

  get position() {
    return {
      x: 500,
      y: 600,
    };
  }

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
