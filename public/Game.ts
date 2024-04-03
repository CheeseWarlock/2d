import PolyBlock from './PolyBlock.js';
import Player from './Player.js';
import CameraFrame from './CameraFrame.js';

type Point = {
  x: number,
  y: number
}

class Game {
  blocks: PolyBlock[] = [];
  focusPoint: Point = { x: 0, y: 0 };
  viewDirection: number = 0;
  player: Player = new Player(10, 40);
  fov: number = 0.25;
  keysDown: Set<string> = new Set();
  cameraFrame: CameraFrame = new CameraFrame();

  constructor() {
    // this.blocks.push(new PolyBlock(100, 100, 200, 200));
    this.blocks.push(new PolyBlock(200, 200, 400, 400));
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
    cameraFrame.segments = [];
    this.blocks.forEach(block => {
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

        while (directionToLineStart > viewConeLow + Math.PI * 2) {
          directionToLineStart -= Math.PI * 2;
        }
        while (directionToLineStart < viewConeLow) {
          directionToLineStart += Math.PI * 2;
        }
        while (directionToLineEnd > viewConeLow + Math.PI * 2) {
          directionToLineEnd -= Math.PI * 2;
        }
        while (directionToLineEnd < viewConeLow) {
          directionToLineEnd += Math.PI * 2;
        }

        // Broken when diff of angles to start and end > 180 deg

        

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
          message = ('collision')
          cameraFrame.add({
            start: {
              position: 0,
              depth: 0
            },
            end: {
              position: 1,
              depth: 0
            },
            color: "green"
          });
        } else {
          message = ('none')
        }

        console.log(`VC ${(viewConeLow * 180 / Math.PI).toFixed(0)} to ${(viewConeHigh * 180 / Math.PI).toFixed(0)}... Start ${(directionToLineStart * 180 / Math.PI).toFixed(0)}, end ${(directionToLineEnd * 180 / Math.PI).toFixed(0)}... ${message}`);

        if (doTheThing) {
          const startProportion = (directionToLineStart - viewConeLow) / (viewConeHigh - viewConeLow);
          const endProportion = (directionToLineEnd - viewConeLow) / (viewConeHigh - viewConeLow);
          cameraFrame.add({
            start: {
              position: startProportion,
              depth: 0
            },
            end: {
              position: endProportion,
              depth: 0
            },
            color: "green"
          });
        }
      });
    });
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

export default Game;