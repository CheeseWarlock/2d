import CameraFrame from "./CameraFrame.js";
import GeometryObject from "./GeometryObject.js";
import GameObject from "./IGameObject.js";
import Player from "./Player.js";
import { distance, intersects, lineSegmentsIntersect } from "./utils.js";
import { Quadtree, Line, Rectangle } from "@timohausmann/quadtree-ts/src/index.esm.js";

type Point = { x: number, y: number};

export default class World {
  objects: GameObject[] = [];
  quadtree = new Quadtree<Line<GeometryObject>>({ width: 1000, height: 1000 });

  constructor() {
    console.log("Outer from ESM", Quadtree);
  }

  addGeometry(geometry: GeometryObject) {
    this.objects.push(geometry);
    geometry.lineSegments.forEach(seg => this.quadtree.insert(new Line({
      x1: seg.from.x,
      y1: seg.from.y,
      x2: seg.to.x,
      y2: seg.to.y,
      data: geometry
    })));
  }

  get geometryObjects(): GeometryObject[] {
    return this.objects.filter(obj => obj instanceof GeometryObject) as GeometryObject[];
  }

  get players(): Player[] {
    return this.objects.filter(obj => obj instanceof Player) as Player[]; 
  }

  calculatePhotoContent(origin: { x: number, y: number }, viewDirection: number, fov: number) {
    const cameraFrame = new CameraFrame();
    cameraFrame.segments = [];
    const segmentsToConsider: { x1: number, x2: number, y1: number, y2: number, color: string }[] = [];
    const breakpoints: number[] = [];

    const viewConeLow = (viewDirection - fov);
    const viewConeHigh = (viewDirection + fov);

    // Find all the relevant lines from the quadtree
    const lineSegments = this.quadtree.retrieve(new Rectangle({ x: 0, y: 0, width: 1000, height: 1000 }));

    lineSegments.forEach(seg => {
      // is the line within fov?
      // it is iff:
      // one end or the other is in fov
      // OR
      // the line passes through fov
      let directionToLineStart = Math.atan2(seg.y1 - origin.y, seg.x1 - origin.x);
      let directionToLineEnd = Math.atan2(seg.y2 - origin.y, seg.x2 - origin.x);

      // if (Math.abs(directionToLineEnd - directionToLineStart) > Math.PI) {
      //   directionToLineStart += Math.PI * 2;
      // }

      while (directionToLineStart > viewDirection + Math.PI) {
        directionToLineStart -= Math.PI * 2;
      }
      while (directionToLineStart < viewDirection - Math.PI) {
        directionToLineStart += Math.PI * 2;
      }
      while (directionToLineEnd > viewDirection + Math.PI) {
        directionToLineEnd -= Math.PI * 2;
      }
      while (directionToLineEnd < viewDirection - Math.PI) {
        directionToLineEnd += Math.PI * 2;
      }

      if ((directionToLineStart > viewConeLow && directionToLineStart < viewConeHigh) && (directionToLineEnd > viewConeLow && directionToLineEnd < viewConeHigh)) {
        segmentsToConsider.push({ ...seg, color: seg.data!.color });
        breakpoints.push(directionToLineStart);
        breakpoints.push(directionToLineEnd);
      } else if (directionToLineStart > viewConeLow && directionToLineStart < viewConeHigh) {
        segmentsToConsider.push({ ...seg, color: seg.data!.color });
        breakpoints.push(directionToLineStart);
      } else if (directionToLineEnd > viewConeLow && directionToLineEnd < viewConeHigh) {
        segmentsToConsider.push({ ...seg, color: seg.data!.color });
        breakpoints.push(directionToLineEnd);
      } else if (intersects(
        seg.x1, seg.y1, seg.x2, seg.y2,
        origin.x, origin.y, origin.x + Math.cos(viewDirection) * 1e6, origin.y + Math.sin(viewDirection) * 1e6
      )) {
        segmentsToConsider.push({ ...seg, color: seg.data!.color });
      }
    });
    breakpoints.push(viewConeHigh);
    breakpoints.sort((a,b)=>a-b);
    breakpoints.forEach((to, idx) => {
      const from = (idx === 0 ? viewConeLow : breakpoints[idx - 1]);
      const midpoint = (to + from) / 2;
      let closest = Infinity;
      let color = "white";
      segmentsToConsider.forEach(seg => {
        const intersection = lineSegmentsIntersect(
          origin.x, origin.y, origin.x + Math.cos(midpoint) * 1e6, origin.y + Math.sin(midpoint) * 1e6,
          seg.x1, seg.y1, seg.x2, seg.y2,
        );
        if (intersection.direct) {
          const thisDistance = distance(intersection.point[0], intersection.point[1], origin.x, origin.y);
          if (thisDistance < closest) {
            closest = thisDistance;
            color = seg.color;
          }
        }
      });
      const startProportion = (from - viewConeLow) / (viewConeHigh - viewConeLow);
      const endProportion = (to - viewConeLow) / (viewConeHigh - viewConeLow);
      cameraFrame.segments.push({
        start: startProportion,
        end: endProportion,
        color
      })
    });
    // if it's outside -.5, .5, flip
    if (viewDirection < -(Math.PI / 2) || viewDirection > Math.PI / 2) {
      cameraFrame.flip();
    }
    return cameraFrame;
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