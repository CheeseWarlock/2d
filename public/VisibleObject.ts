type Point = {
  x: number,
  y: number
}

class VisibleObject {
  color: string = "black";
  get lineSegments(): { from: Point, to: Point }[] {
    return [];
  }
}

export default VisibleObject;