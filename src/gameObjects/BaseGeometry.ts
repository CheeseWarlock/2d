import { Point } from "../types.js";
import GameObject from "./IGameObject.js";

/**
 * An object with some kind of physical properties in the scene.
 */
class BaseGeometry implements GameObject {
  private _points: Point[] = [];
  public get points(): Point[] {
    return this._points;
  }
  public set points(value: Point[]) {
    this._points = value;
  }

  constructor() {}

  color: string = "black";

  tick() {}

  visible: boolean = true;

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

export default BaseGeometry;
