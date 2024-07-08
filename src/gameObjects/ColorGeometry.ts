import { Motion, Point } from "../types.js";
import BaseGeometry from "./BaseGeometry.js";

class ColorGeometry extends BaseGeometry {
  points: Point[] = [];
  color: string = "black";
  transform: Point = {
    x: 0,
    y: 0,
  };
  motion: Motion = {
    offset: {
      x: 0,
      y: 10,
    },
    duration: 3000,
    delay: 0,
  };
  _time: number;

  constructor(points: Point[], color: string, motion?: Motion) {
    super();
    this.points = points;
    this.color = color;
    if (motion) this.motion = motion;
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

  get transformedPoints() {
    const points: Point[] = [];
    for (let i = 0; i != this.points.length; i++) {
      points.push({
        x: this.points[i].x + this.transform.x,
        y: this.points[i].y + this.transform.y,
      });
    }
    return points;
  }
}

export default ColorGeometry;
