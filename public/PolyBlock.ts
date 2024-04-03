type Point = {
  x: number,
  y: number
}

class PolyBlock {
  points: Point[] = [];

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.points.push(
      { x: x1, y: y1 },
      { x: x2 - 50, y: y1 },
      { x: x2 + 50, y: y2 },
      { x: x1, y: y2 }
    );
  }

  get lineSegments() {
    const segments: { from: Point, to: Point }[] = [];
    for (let i=0; i!=this.points.length;i++) {
      segments.push({
        from: this.points[i],
        to: this.points[(i + 1) % this.points.length]
      });
    }

    return [segments[1]];
  }
}

export default PolyBlock;