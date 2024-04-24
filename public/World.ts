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
      [x1, y1, x1, y2 + distance],
      [x1, y2 + distance, x2, y2 + distance],
      [x2, y2 + distance, x2, y1],
      [x2, y1, x1, y1],
    ];

    let collisionFound = false;
    const collisionLines: { from: { x: number, y: number }, to: { x: number, y: number }}[] = [];

    lines.forEach(line => {
      this.geometryObjects.forEach(obj => {
        obj.lineSegments.forEach(lineSegment => {
          const collisionData = lineSegmentsIntersect(
            line[0], line[1], line[2], line[3],
            lineSegment.from.x, lineSegment.from.y, lineSegment.to.x, lineSegment.to.y
            );
          if (collisionData.direct) {
              collisionFound = true;
              collisionLines.push(lineSegment);
            }
        });
      });
    });
    let maxSafe = distance;
    // Now iterate through and determine collision point
    // for each one...
    // draw the downward lines from the ends
    // and also check the endpoints of the lines to see if they're in the "shadow"
    collisionLines.forEach(line => {
      let handledThis = false;
      if (line.from.x >= x1 && line.from.x <= x2 && line.from.y >= y2 && line.from.y <= y2 + distance) {
        // endpoint in shadow
        maxSafe = Math.min(maxSafe, line.from.y - y2);
        handledThis = true;
      }
      if (line.to.x >= x1 && line.to.x <= x2 && line.to.y >= y2 && line.to.y <= y2 + distance) {
        maxSafe = Math.min(maxSafe, line.to.y - y2);
        handledThis = true;
      }
      let intersection = lineSegmentsIntersect(
        x1, y2, x1, y2 + distance,
        line.from.x, line.from.y, line.to.x, line.to.y
      );
      if (intersection.direct) {
        maxSafe = Math.min(maxSafe, intersection.point[1] - y2);
        handledThis = true;
      }
      intersection = lineSegmentsIntersect(
        x2, y2, x2, y2 + distance,
        line.from.x, line.from.y, line.to.x, line.to.y
      );
      if (intersection.direct) {
        maxSafe = Math.min(maxSafe, intersection.point[1] - y2);
        handledThis = true;
      }
      if (!handledThis) {
        // maxSafe = 0;
      }
    })
    return {
      collisionFound,
      maxSafe
    };
  }

  distanceToCollision(x1: number, y1: number, x2: number, y2: number, direction: number = Math.PI / 2) {
    
  }

  update() {
    this.objects.forEach(obj => obj.tick());
  }
}