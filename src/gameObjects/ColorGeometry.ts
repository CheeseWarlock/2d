import BaseGeometry from "./BaseGeometry.js";

type Point = {
  x: number;
  y: number;
};

class ColorGeometry extends BaseGeometry {
  points: Point[] = [];
  color: string = "black";
  transform: Point = {
    x: 0,
    y: 0,
  };
  _time: number = 0;

  constructor(points: Point[], color: string) {
    super();
    this.points = points;
    this.color = color;
  }

  tick() {
    this._time += 0.035;
    this.transform.y = Math.sin(this._time) * 12;
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
