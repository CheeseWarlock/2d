import { Motion, Point } from "../types";
import applyDefaults from "../utils/applyDefaults";
import BaseGeometry from "./BaseGeometry";

const DEFAULT_MOTION: Motion = {
  offset: {
    x: 0,
    y: 10,
  },
  duration: 3000,
  delay: 0,
  rotations: 0,
};

class ColorGeometry extends BaseGeometry {
  color: string = "#000000";
  transform: Point = {
    x: 0,
    y: 0,
  };
  motion: Motion;
  _time: number;
  rotation: number = 0;
  position = { x: 0, y: 0 };

  constructor(
    points: Point[],
    color: string,
    motion?: Partial<Motion>,
    rotation?: number,
    position?: Point
  ) {
    super();
    this.points = points;
    this.color = color;
    this.motion = applyDefaults(DEFAULT_MOTION, motion);
    if (rotation) this.rotation = rotation;
    if (position) this.position = position;
    this._time = -this.motion.delay / 1000;
  }

  tick() {
    this._time += 1 / 60; // number of seconds
    const t = (this._time / this.motion.duration) * 1000 * Math.PI * 2;
    const d = (-Math.cos(t) + 1) / 2;
    this.transform.x = d * this.motion.offset.x;
    this.transform.y = d * this.motion.offset.y;
  }

  get lineSegments() {
    const segments: { from: Point; to: Point }[] = [];
    for (let i = 0; i != this.transformedPoints.length; i++) {
      segments.push({
        from: this.transformedPoints[i],
        to: this.transformedPoints[(i + 1) % this.transformedPoints.length],
      });
    }

    return segments;
  }

  get currentRotation(): number {
    const t = (this._time / this.motion.duration) * 1000 * Math.PI * 2;
    const currentRotation = (this.motion?.rotations || 0) * t;
    const rot = this.rotation + currentRotation;
    return rot;
  }

  get transformedPoints() {
    const points: Point[] = [];
    const t = (this._time / this.motion.duration) * 1000 * Math.PI * 2;
    const currentRotation = (this.motion?.rotations || 0) * t;
    const rot = this.rotation + currentRotation;
    for (let i = 0; i != this.points.length; i++) {
      const nPos = {
        x: this.transform.x + this.position.x,
        y: this.transform.y + this.position.y,
      };
      const tPos = {
        x: this.points[i].x * Math.cos(rot) - this.points[i].y * Math.sin(rot),
        y: this.points[i].y * Math.cos(rot) + this.points[i].x * Math.sin(rot),
      };
      points.push({
        x: nPos.x + tPos.x,
        y: nPos.y + tPos.y,
      });
    }
    return points;
  }
}

export default ColorGeometry;
