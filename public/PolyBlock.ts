type Point = {
  x: number,
  y: number
}

class PolyBlock {
  points: Point[] = [];

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.points.push(
      { x: x1, y: y1 },
      { x: x2, y: y1 },
      { x: x2, y: y2 },
      { x: x1, y: y2 }
    );
  }
}

export default PolyBlock;