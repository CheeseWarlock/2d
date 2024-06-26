import GeometryObject from "./BaseGeometry.js";

type Point = {
  x: number;
  y: number;
};

class ColorGeometry extends GeometryObject {
  points: Point[] = [];
  color: string = "black";

  constructor(points: Point[], color: string) {
    super();
    this.points = points;
    this.color = color;
  }

  tick() {
    this.points.forEach((p) => {
      p.y += 1;
    });
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

export default ColorGeometry;
