import PolyBlock from './PolyBlock.js';
import Player from './Player.js';
import CameraFrame, { Segment } from './CameraFrame.js';
import VisibleObject from './VisibleObject.js';
import Line from './Line.js';

type Point = {
  x: number,
  y: number
}

class Game {
  visibleObjects: VisibleObject[] = [];
  focusPoint: Point = { x: 0, y: 0 };
  viewDirection: number = 0;
  player: Player = new Player(10, 40);
  fov: number = 0.25;
  keysDown: Set<string> = new Set();
  cameraFrame: CameraFrame = new CameraFrame();

  constructor() {
    this.visibleObjects.push(new PolyBlock(100, 100, 200, 200, "green"));
    this.visibleObjects.push(new PolyBlock(200, 200, 400, 400, "blue"));
    this.visibleObjects.push(new Line(400, 600, 600, 600, "black"));
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
    this.viewDirection = Math.atan2(this.focusPoint.y - this.player.y, this.focusPoint.x - this.player.x);
    this.calculatePhotoContent();
  }

  calculatePhotoContent() {
    const cameraFrame = new CameraFrame();
    const segmentsToAdd: Segment[] = [];
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

        let viewConeLow = (this.viewDirection - this.fov);
        let viewConeHigh = (this.viewDirection + this.fov);

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

        let doTheThing = false;
        let message = "";

        if ((directionToLineStart > viewConeLow && directionToLineStart < viewConeHigh) && (directionToLineEnd > viewConeLow && directionToLineEnd < viewConeHigh)) {
          message = ('both ends')
          doTheThing = true;
        } else if (directionToLineStart > viewConeLow && directionToLineStart < viewConeHigh) {
          message = ('start')
          doTheThing = true;
        } else if (directionToLineEnd > viewConeLow && directionToLineEnd < viewConeHigh) {
          message = ('end')
          doTheThing = true;
        } else if (intersects(
          seg.from.x, seg.from.y, seg.to.x, seg.to.y,
          this.player.x, this.player.y, this.player.x + Math.cos(this.viewDirection) * 1e6, this.player.y + Math.sin(this.viewDirection) * 1e6
        )) {
          message = ('neither end')
          // get start and end depths
          const pointAtStart = lineSegmentsIntersect(
            seg.from.x, seg.from.y, seg.to.x, seg.to.y,
            this.player.x, this.player.y, this.player.x + Math.cos(viewConeLow) * 1e6, this.player.y + Math.sin(viewConeLow) * 1e6
          ).point;
          const pointAtEnd = lineSegmentsIntersect(
            seg.from.x, seg.from.y, seg.to.x, seg.to.y,
            this.player.x, this.player.y, this.player.x + Math.cos(viewConeHigh) * 1e6, this.player.y + Math.sin(viewConeHigh) * 1e6
          ).point;

          const distanceToStart = distance(this.player.x, this.player.y, pointAtStart[0], pointAtStart[1]);
          const distanceToEnd = distance(this.player.x, this.player.y, pointAtEnd[0], pointAtEnd[1]);
          
          segmentsToAdd.push({
            start: {
              position: 0,
              depth: distanceToStart
            },
            end: {
              position: 1,
              depth: distanceToEnd
            },
            color: block.color
          });
        } else {
          message = ('none')
        }

        // console.log(`VC ${(viewConeLow * 180 / Math.PI).toFixed(0)} to ${(viewConeHigh * 180 / Math.PI).toFixed(0)}... Start ${(directionToLineStart * 180 / Math.PI).toFixed(0)}, end ${(directionToLineEnd * 180 / Math.PI).toFixed(0)}... ${message}`);

        if (doTheThing) {
          const startProportion = (directionToLineStart - viewConeLow) / (viewConeHigh - viewConeLow);
          const endProportion = (directionToLineEnd - viewConeLow) / (viewConeHigh - viewConeLow);

          const distanceToStart = distance(this.player.x, this.player.y, seg.from.x, seg.from.y);
          const distanceToEnd = distance(this.player.x, this.player.y, seg.to.x, seg.to.y);
          segmentsToAdd.push({
            start: {
              position: startProportion,
              depth: distanceToStart
            },
            end: {
              position: endProportion,
              depth: distanceToEnd
            },
            color: block.color
          });
        }
      });
    });
    segmentsToAdd.forEach(seg => cameraFrame.add(seg));
    this.cameraFrame = cameraFrame;
  }
}

function intersects(a: number,b: number,c: number,d: number,p: number,q: number,r: number,s: number) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};

function lineSegmentsIntersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
  var a_dx = x2 - x1;
  var a_dy = y2 - y1;
  var b_dx = x4 - x3;
  var b_dy = y4 - y3;
  var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
  var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
  const doSegmentsIntersect = (s >= 0 && s <= 1 && t >= 0 && t <= 1);
  return {
    direct: doSegmentsIntersect,
    point: [x1 + t * a_dx, y1 + t * a_dy]
  }
}

function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export default Game;