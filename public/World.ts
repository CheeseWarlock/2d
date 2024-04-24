import GeometryObject from "./GeometryObject.js";
import GameObject from "./IGameObject.js";
import Player from "./Player.js";
import { lineSegmentsIntersect } from "./utils.js";

export default class World {
  objects: GameObject[] = [];

  constructor() {

  }

  get geometryObjects(): GeometryObject[] {
    return this.objects.filter(obj => obj instanceof GeometryObject) as GeometryObject[];
  }

  get players(): Player[] {
    return this.objects.filter(obj => obj instanceof Player) as Player[]; 
  }

  collisionTest(x1: number, y1: number, x2: number, y2: number, distance: number = 0) {
    const lines = [
      [x1, y1, x1, y2],
      [x1, y2, x2, y2],
      [x2, y2, x2, y1],
      [x2, y1, x1, y1],
    ];

    let collisionFound = false;
    const collisionLines = [];

    lines.forEach(line => {
      this.geometryObjects.forEach(obj => {
        obj.lineSegments.forEach(lineSegment => {
          if (lineSegmentsIntersect(
            line[0], line[1], line[2], line[3],
            lineSegment.from.x, lineSegment.from.y, lineSegment.to.x, lineSegment.to.y
            ).direct) {
              collisionFound = true;
              collisionLines.push(lineSegment);
            }
        });
      });
    });
    // Now iterate through and determine collision point
    return collisionFound;
  }

  update() {
    this.objects.forEach(obj => obj.tick());
  }
}