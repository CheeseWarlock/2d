import { Point } from "../types";
import BaseGeometry from "./BaseGeometry";
import GameObject from "./IGameObject";

const HITBOX_SIZE = 10;
export default class SafetyToggler extends BaseGeometry {
  visible = false;
  position: Point;

  constructor(pos: Point) {
    super();
    this.position = pos;
  }

  tick() {
    // maybe make it move a bit?
  }

  get points() {
    return [
      {
        x: this.position.x - HITBOX_SIZE,
        y: this.position.y - HITBOX_SIZE,
      },
      {
        x: this.position.x + HITBOX_SIZE,
        y: this.position.y - HITBOX_SIZE,
      },
      {
        x: this.position.x + HITBOX_SIZE,
        y: this.position.y + HITBOX_SIZE,
      },
      {
        x: this.position.x - HITBOX_SIZE,
        y: this.position.y + HITBOX_SIZE,
      },
    ];
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
