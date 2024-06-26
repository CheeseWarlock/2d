import CameraFrame from "./CameraFrame.js";
import GeometryObject from "./gameObjects/GeometryObject.js";
import GameObject from "./gameObjects/IGameObject.js";
import Player from "./gameObjects/Player.js";
import PolyBlock from "./gameObjects/PolyBlock.js";
import { distance, intersects, lineSegmentsIntersect } from "./utils.js";
import {
  Quadtree,
  Line,
  Rectangle,
} from "@timohausmann/quadtree-ts/src/index.esm.js";

const rangesOverlap = (
  a: { start: number; finish: number },
  b: { start: number; finish: number }
) => (b.start < a.start ? b.finish > a.start : b.start < a.finish);

export default class World {
  size = { width: 1000, height: 1000 };
  objects: GameObject[] = [];
  quadtree = new Quadtree<Rectangle<GeometryObject>>({
    width: 1000,
    height: 1000,
  });

  addGeometry(geometry: GeometryObject) {
    this.objects.push(geometry);
    geometry.lineSegments.forEach((seg) =>
      this.quadtree.insert(
        new Rectangle({
          data: geometry,
          x: seg.from.x,
          y: seg.from.y,
          width: seg.to.x - seg.from.x,
          height: seg.to.y - seg.to.y,
        })
      )
    );
  }

  get geometryObjects(): GeometryObject[] {
    return this.objects.filter(
      (obj) => obj instanceof GeometryObject
    ) as GeometryObject[];
  }

  get players(): Player[] {
    return this.objects.filter((obj) => obj instanceof Player) as Player[];
  }

  calculatePhotoContent(
    origin: { x: number; y: number },
    viewDirection: number,
    fov: number
  ) {
    const cameraFrame = new CameraFrame();
    cameraFrame.segments = [];
    const segmentsToConsider: {
      x1: number;
      x2: number;
      y1: number;
      y2: number;
      color: string;
    }[] = [];
    const breakpoints: number[] = [];

    const viewConeLow = viewDirection - fov;
    const viewConeHigh = viewDirection + fov;
    // console.log(viewConeLow / Math.PI, viewDirection / Math.PI, viewConeHigh / Math.PI);

    // Find all the relevant lines from the quadtree
    // For now, get the quadrants that are within the view cone
    let ul = false,
      ur = false,
      ll = false,
      lr = false;
    if (viewConeLow < -(Math.PI / 2) || viewConeHigh > Math.PI) {
      ul = true;
    }
    if (
      rangesOverlap(
        { start: viewConeLow, finish: viewConeHigh },
        { start: -Math.PI / 2, finish: 0 }
      )
    ) {
      ur = true;
    }
    if (
      rangesOverlap(
        { start: viewConeLow, finish: viewConeHigh },
        { start: 0, finish: Math.PI / 2 }
      )
    ) {
      lr = true;
    }
    if (viewConeHigh > Math.PI / 2 || viewConeLow < -Math.PI) {
      ll = true;
    }
    const x1 = ul || ll ? 0 : origin.x;
    const y1 = ul || ur ? 0 : origin.y;
    const w =
      (ul && ur) || (ll && lr) ? 1000 : ul || ll ? origin.x : 1000 - origin.x;
    const h =
      (ul && ll) || (ur && lr) ? 1000 : ul || ur ? origin.y : 1000 - origin.y;
    const rectangles = this.quadtree.retrieve(
      new Rectangle({ x: x1, y: y1, width: w, height: h })
    );

    const lineSegments = rectangles
      .map((rect) =>
        rect.data!.lineSegments.map((seg) => ({
          seg: seg,
          color: rect.data!.color,
        }))
      )
      .flat();

    lineSegments.forEach((seg) => {
      const x1 = seg.seg.from.x;
      const x2 = seg.seg.to.x;
      const y1 = seg.seg.from.y;
      const y2 = seg.seg.to.y;
      // is the line within fov?
      // it is iff:
      // one end or the other is in fov
      // OR
      // the line passes through fov
      let directionToLineStart = Math.atan2(y1 - origin.y, x1 - origin.x);
      let directionToLineEnd = Math.atan2(y2 - origin.y, x2 - origin.x);

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

      let shouldConsiderSegment = false;

      if (
        directionToLineStart > viewConeLow &&
        directionToLineStart < viewConeHigh &&
        directionToLineEnd > viewConeLow &&
        directionToLineEnd < viewConeHigh
      ) {
        shouldConsiderSegment = true;
        breakpoints.push(directionToLineStart);
        breakpoints.push(directionToLineEnd);
      } else if (
        directionToLineStart > viewConeLow &&
        directionToLineStart < viewConeHigh
      ) {
        shouldConsiderSegment = true;
        breakpoints.push(directionToLineStart);
      } else if (
        directionToLineEnd > viewConeLow &&
        directionToLineEnd < viewConeHigh
      ) {
        shouldConsiderSegment = true;
        breakpoints.push(directionToLineEnd);
      } else if (
        intersects(
          x1,
          y1,
          x2,
          y2,
          origin.x,
          origin.y,
          origin.x + Math.cos(viewDirection) * 1e6,
          origin.y + Math.sin(viewDirection) * 1e6
        )
      ) {
        shouldConsiderSegment = true;
      }
      if (shouldConsiderSegment) {
        segmentsToConsider.push({ x1, y1, x2, y2, color: seg.color });
      }
    });
    breakpoints.push(viewConeHigh);
    breakpoints.sort((a, b) => a - b);
    breakpoints.forEach((to, idx) => {
      const from = idx === 0 ? viewConeLow : breakpoints[idx - 1];
      const midpoint = (to + from) / 2;
      let closest = Infinity;
      let color = "empty";
      segmentsToConsider.forEach((seg) => {
        const intersection = lineSegmentsIntersect(
          origin.x,
          origin.y,
          origin.x + Math.cos(midpoint) * 1e6,
          origin.y + Math.sin(midpoint) * 1e6,
          seg.x1,
          seg.y1,
          seg.x2,
          seg.y2
        );
        if (intersection.direct) {
          const thisDistance = distance(
            intersection.point[0],
            intersection.point[1],
            origin.x,
            origin.y
          );
          if (thisDistance < closest) {
            closest = thisDistance;
            color = seg.color;
          }
        }
      });
      const startProportion =
        (from - viewConeLow) / (viewConeHigh - viewConeLow);
      const endProportion = (to - viewConeLow) / (viewConeHigh - viewConeLow);
      cameraFrame.segments.push({
        start: startProportion,
        end: endProportion,
        color,
      });
    });
    // if it's outside -.5, .5, flip
    if (viewDirection < -(Math.PI / 2) || viewDirection > Math.PI / 2) {
      cameraFrame.flip();
    }
    return cameraFrame;
  }

  collisionTest(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    distance: number = 0
  ) {
    const lines = [
      [x1, y1, x1, y2 + distance],
      [x1, y2 + distance, x2, y2 + distance],
      [x2, y2 + distance, x2, y1],
      [x2, y1, x1, y1],
    ];

    let collisionFound = false;
    const collisionLines: {
      from: { x: number; y: number };
      to: { x: number; y: number };
    }[] = [];

    const rectangles = this.quadtree.retrieve(
      new Rectangle({ x: -1, y: -1, width: 1002, height: 1002 })
    );

    const lineSegments = rectangles
      .map((rect) =>
        rect.data!.lineSegments.map((seg) => ({
          seg: seg,
          color: rect.data!.color,
        }))
      )
      .flat();

    lines.forEach((line) => {
      lineSegments.forEach((seg) => {
        const collisionData = lineSegmentsIntersect(
          line[0],
          line[1],
          line[2],
          line[3],
          seg.seg.from.x,
          seg.seg.from.y,
          seg.seg.to.x,
          seg.seg.to.y
        );
        if (collisionData.direct && collisionData.edgy) {
          collisionFound = true;
          collisionLines.push({
            from: { x: seg.seg.from.x, y: seg.seg.from.y },
            to: { x: seg.seg.to.x, y: seg.seg.to.y },
          });
        }
      });
    });
    let maxSafe = distance;
    // Now iterate through and determine collision point
    // for each one...
    // draw the downward lines from the ends
    // and also check the endpoints of the lines to see if they're in the "shadow"
    collisionLines.forEach((line) => {
      let handledThis = false;
      if (
        line.from.x >= x1 &&
        line.from.x <= x2 &&
        line.from.y >= y2 &&
        line.from.y <= y2 + distance
      ) {
        // endpoint in shadow
        maxSafe = Math.min(maxSafe, line.from.y - y2);
        handledThis = true;
      }
      if (
        line.to.x >= x1 &&
        line.to.x <= x2 &&
        line.to.y >= y2 &&
        line.to.y <= y2 + distance
      ) {
        maxSafe = Math.min(maxSafe, line.to.y - y2);
        handledThis = true;
      }
      let intersection = lineSegmentsIntersect(
        x1,
        y2,
        x1,
        y2 + distance,
        line.from.x,
        line.from.y,
        line.to.x,
        line.to.y
      );
      if (intersection.direct) {
        maxSafe = Math.min(maxSafe, intersection.point[1] - y2);
        handledThis = true;
      }
      intersection = lineSegmentsIntersect(
        x2,
        y2,
        x2,
        y2 + distance,
        line.from.x,
        line.from.y,
        line.to.x,
        line.to.y
      );
      if (intersection.direct) {
        maxSafe = Math.min(maxSafe, intersection.point[1] - y2);
        handledThis = true;
      }
      if (!handledThis) {
        // maxSafe = 0;
      }
    });
    return {
      collisionFound,
      maxSafe,
    };
  }

  /*
  How far can a line move in a direction before colliding?
   */
  distanceToCollision(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    direction: number = Math.PI / 2
  ) {
    // get all candidate line segments
    const segments = this.quadtree.retrieve(
      new Rectangle<void>({
        x: 0,
        y: 0,
        width: 1000,
        height: 1000,
      })
    );
  }

  update() {
    this.objects.forEach((obj) => obj.tick());
  }
}
