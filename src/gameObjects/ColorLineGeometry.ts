import BaseGeometry from "./BaseGeometry";

type Point = {
  x: number;
  y: number;
};

class ColorLineGeometry extends BaseGeometry {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  color: string = "#000000";

  constructor(
    from: { x: number; y: number },
    to: { x: number; y: number },
    color: string
  ) {
    super();
    this.x1 = from.x;
    this.x2 = to.x;
    this.y1 = from.y;
    this.y2 = to.y;
    this.color = color;
  }

  get lineSegments() {
    const segments: { from: Point; to: Point }[] = [];
    return [
      { from: { x: this.x1, y: this.y1 }, to: { x: this.x2, y: this.y2 } },
    ];
  }
}

export default ColorLineGeometry;
