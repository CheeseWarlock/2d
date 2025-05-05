import CameraFrame from "./CameraFrame.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./config.js";
import Game from "./Game.js";
import BaseGeometry from "./gameObjects/BaseGeometry.js";
import ColorGeometry from "./gameObjects/ColorGeometry.js";
import ColorLineGeometry from "./gameObjects/ColorLineGeometry.js";
import GroundGeometry from "./gameObjects/GroundGeometry.js";
import GameObject from "./gameObjects/IGameObject.js";
import SafetyToggler from "./gameObjects/SafetyToggler.js";
import { Point } from "./types.js";
import { distance, intersects, lineSegmentsIntersect } from "./utils.js";
import { Quadtree, Rectangle } from "@timohausmann/quadtree-ts";

const rangesOverlap = (
  a: { start: number; finish: number },
  b: { start: number; finish: number }
) => (b.start < a.start ? b.finish > a.start : b.start < a.finish);

export enum CollisionGroups {
  /** ground objects only */
  ground,
  /** color objects only */
  color,
  /** anything solid- ground and color */
  solid,
  /** toggle objects */
  toggle,
  /** anything at all */
  any,
}

export default class World {
  size = { width: GAME_WIDTH, height: GAME_HEIGHT };
  objects: GameObject[] = [];
  quadtree = new Quadtree<Rectangle<BaseGeometry>>({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  });
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  addGeometry(geometry: BaseGeometry) {
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

  get geometryObjects(): BaseGeometry[] {
    return this.objects.filter(
      (obj) => obj instanceof BaseGeometry
    ) as BaseGeometry[];
  }

  calculatePhotoContent(
    origin: { x: number; y: number },
    viewDirection: number,
    fov: number
  ) {
    const MAX_SIZE = GAME_HEIGHT + GAME_WIDTH;
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

    const viewConeLowLine: [number, number, number, number] = [
      origin.x,
      origin.y,
      origin.x + Math.cos(viewConeLow) * MAX_SIZE,
      origin.y + Math.sin(viewConeLow) * MAX_SIZE,
    ];
    const viewConeHighLine: [number, number, number, number] = [
      origin.x,
      origin.y,
      origin.x + Math.cos(viewConeHigh) * MAX_SIZE,
      origin.y + Math.sin(viewConeHigh) * MAX_SIZE,
    ];

    const outerLines: [number, number, number, number][] = [
      [0, 0, GAME_WIDTH, 0],
      [0, 0, 0, GAME_HEIGHT],
      [GAME_WIDTH, 0, GAME_WIDTH, GAME_HEIGHT],
      [0, GAME_HEIGHT, GAME_WIDTH, GAME_HEIGHT],
    ];

    let lowIntersection = [origin.x, origin.y];
    let highIntersection = [origin.x, origin.y];

    outerLines.forEach((line) => {
      const low = lineSegmentsIntersect(...line, ...viewConeLowLine);
      if (low.direct) {
        lowIntersection = low.point;
      }
      const high = lineSegmentsIntersect(...line, ...viewConeHighLine);
      if (high.direct) {
        highIntersection = high.point;
      }
    });

    const minX = Math.min(origin.x, highIntersection[0], lowIntersection[0]);
    const maxX = Math.max(origin.x, highIntersection[0], lowIntersection[0]);
    const minY = Math.min(origin.y, highIntersection[1], lowIntersection[1]);
    const maxY = Math.max(origin.y, highIntersection[1], lowIntersection[1]);

    const retrievalRectangle = new Rectangle({
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    });

    const rectangles = this.quadtree.retrieve(retrievalRectangle);

    const lineSegments = rectangles
      .filter((rect) => rect.data!.visible)
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
        lineSegmentsIntersect(
          x1,
          y1,
          x2,
          y2,
          origin.x,
          origin.y,
          origin.x + Math.cos(viewDirection) * MAX_SIZE,
          origin.y + Math.sin(viewDirection) * MAX_SIZE
        ).direct
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
          origin.x + Math.cos(midpoint) * MAX_SIZE,
          origin.y + Math.sin(midpoint) * MAX_SIZE,
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
    distance: number = 0,
    type: CollisionGroups
  ): {
    collisionFound: boolean;
    maxSafe: number;
  } {
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
          obj: rect.data!,
        }))
      )
      .flat();

    lines.forEach((line) => {
      const testedSegments = new Set<{
        seg: {
          from: Point;
          to: Point;
        };
        obj: BaseGeometry;
      }>();
      lineSegments.forEach((seg) => {
        if (!testedSegments.has(seg)) {
          testedSegments.add(seg);
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
          if (
            collisionData.direct &&
            (collisionData.isAtEdge || seg.obj instanceof SafetyToggler)
          ) {
            if (
              (seg.obj instanceof SafetyToggler &&
                type === CollisionGroups.toggle) ||
              (seg.obj instanceof GroundGeometry &&
                (type === CollisionGroups.ground ||
                  type === CollisionGroups.solid)) ||
              ((seg.obj instanceof ColorGeometry ||
                seg.obj instanceof ColorLineGeometry) &&
                (type === CollisionGroups.color ||
                  type === CollisionGroups.solid))
            ) {
              collisionFound = true;
              collisionLines.push({
                from: { x: seg.seg.from.x, y: seg.seg.from.y },
                to: { x: seg.seg.to.x, y: seg.seg.to.y },
              });
            }
          }
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
        maxSafe = 0;
      }
    });
    return {
      collisionFound,
      maxSafe,
    };
  }

  update(motionsPaused: boolean = false) {
    if (motionsPaused) {
      this.game.player.tick();
      return;
    }
    this.objects.forEach((obj) => obj.tick());
    this.quadtree.clear();
    this.objects.forEach((obj) => {
      if (obj instanceof BaseGeometry) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        obj.lineSegments.forEach((seg) => {
          minX = Math.min(minX, seg.from.x, seg.to.x);
          minY = Math.min(minY, seg.from.y, seg.to.y);
          maxX = Math.max(maxX, seg.from.x, seg.to.x);
          maxY = Math.max(maxY, seg.from.y, seg.to.y);
        });
        this.quadtree.insert(
          new Rectangle({
            data: obj,
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY,
          })
        );
      }
    });
  }
}
