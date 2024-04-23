import Player from './Player.js';
import CameraFrame, { Segment } from './CameraFrame.js';
import GeometryObject from './GeometryObject.js';
import { intersects, lineSegmentsIntersect, distance, limitNearVerticalDirection } from './utils.js';
import levelContent from './levels/Level1.js';
import World from './World.js';

type Point = {
  x: number,
  y: number
}

class Game {
  visibleObjects: GeometryObject[] = [];
  focusPoint: Point = { x: 0, y: 0 };
  viewDirection: number = 0;
  player: Player;
  fov: number = 0.25;
  keysDown: Set<string> = new Set();
  cameraFrame: CameraFrame = new CameraFrame();
  world: World;

  constructor() {
    this.world = levelContent.world;
    this.player = levelContent.world.players[0];
    this.visibleObjects.push(...levelContent.world.geometryObjects);
  }

  tick() {
    if (this.keysDown.has('w')) {
      this.player.y -= 4;
    }
    if (this.keysDown.has('s')) {
      this.player.y += 4;
    }
    if (this.keysDown.has('a')) {
      this.player.x -= 4;
    }
    if (this.keysDown.has('d')) {
      this.player.x += 4;
    }
    this.world.update();
    this.viewDirection = Math.atan2(this.focusPoint.y - this.player.y, this.focusPoint.x - this.player.x);
    this.calculatePhotoContent();
  }

  calculatePhotoContent() {
    const cameraFrame = new CameraFrame();
    cameraFrame.segments = [];
    this.cameraFrame = cameraFrame;
    const segmentsToConsider: { from: Point, to: Point, color: string }[] = [];
    const breakpoints: number[] = [];
    // If too close to vertical, snap to nearest good point
    // -.5 and .5 are the breaks
    // 
    this.viewDirection = limitNearVerticalDirection(this.viewDirection, this.fov);
    const viewConeLow = (this.viewDirection - this.fov);
    const viewConeHigh = (this.viewDirection + this.fov);
    this.visibleObjects.forEach(block => {
      // turn block into lines
      block.lineSegments.forEach(seg => {
        // is the line within fov?
        // it is iff:
        // one end or the other is in fov
        // OR
        // the line passes through fov


        let directionToLineStart = Math.atan2(seg.from.y - this.player.y, seg.from.x - this.player.x);
        let directionToLineEnd = Math.atan2(seg.to.y - this.player.y, seg.to.x - this.player.x);

        

        // if (Math.abs(directionToLineEnd - directionToLineStart) > Math.PI) {
        //   directionToLineStart += Math.PI * 2;
        // }

        while (directionToLineStart > this.viewDirection + Math.PI) {
          directionToLineStart -= Math.PI * 2;
        }
        while (directionToLineStart < this.viewDirection - Math.PI) {
          directionToLineStart += Math.PI * 2;
        }
        while (directionToLineEnd > this.viewDirection + Math.PI) {
          directionToLineEnd -= Math.PI * 2;
        }
        while (directionToLineEnd < this.viewDirection - Math.PI) {
          directionToLineEnd += Math.PI * 2;
        }

        if ((directionToLineStart > viewConeLow && directionToLineStart < viewConeHigh) && (directionToLineEnd > viewConeLow && directionToLineEnd < viewConeHigh)) {
          segmentsToConsider.push({ ...seg, color: block.color });
          breakpoints.push(directionToLineStart);
          breakpoints.push(directionToLineEnd);
        } else if (directionToLineStart > viewConeLow && directionToLineStart < viewConeHigh) {
          segmentsToConsider.push({ ...seg, color: block.color });
          breakpoints.push(directionToLineStart);
        } else if (directionToLineEnd > viewConeLow && directionToLineEnd < viewConeHigh) {
          segmentsToConsider.push({ ...seg, color: block.color });
          breakpoints.push(directionToLineEnd);
        } else if (intersects(
          seg.from.x, seg.from.y, seg.to.x, seg.to.y,
          this.player.x, this.player.y, this.player.x + Math.cos(this.viewDirection) * 1e6, this.player.y + Math.sin(this.viewDirection) * 1e6
        )) {
          segmentsToConsider.push({ ...seg, color: block.color });
        }
      });
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
          this.player.x, this.player.y, this.player.x + Math.cos(midpoint) * 1e6, this.player.y + Math.sin(midpoint) * 1e6,
          seg.from.x, seg.from.y, seg.to.x, seg.to.y
        );
        if (intersection.direct) {
          const thisDistance = distance(intersection.point[0], intersection.point[1], this.player.x, this.player.y);
          if (thisDistance < closest) {
            closest = thisDistance;
            color = seg.color;
          }
        }
      });
      const startProportion = (from - viewConeLow) / (viewConeHigh - viewConeLow);
      const endProportion = (to - viewConeLow) / (viewConeHigh - viewConeLow);
      this.cameraFrame.segments.push({
        start: startProportion,
        end: endProportion,
        color
      })
    });
    // if it's outside -.5, .5, flip
    if (this.viewDirection < -(Math.PI / 2) || this.viewDirection > Math.PI / 2) {
      cameraFrame.flip();
    }
    this.cameraFrame = cameraFrame;
  }
}

export default Game;