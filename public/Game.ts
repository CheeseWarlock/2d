import PolyBlock from './PolyBlock.js';
import Player from './Player.js';

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

  constructor() {
    this.blocks.push(new PolyBlock(100, 100, 200, 200));
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
    let aa = 0;
    this.blocks.forEach(block => {
      // turn block into lines
      for (let i = 0; i != block.points.length; i++) {
        // is the line within fov?
        // it is iff:
        // one end or the other is in fov
        // OR
        // the line passes through fov
        const j = (i + 1) % block.points.length;



        const directionToPoint = Math.atan2(block.points[i].y - this.player.y, block.points[i].x - this.player.x);
        const directionToPoint2 = Math.atan2(block.points[j].y - this.player.y, block.points[j].x - this.player.x);
        if (directionToPoint > this.viewDirection - this.fov && directionToPoint < this.viewDirection + this.fov) {
          aa += 1;
        } else if (directionToPoint2 > this.viewDirection - this.fov && directionToPoint2 < this.viewDirection + this.fov) {
          aa += 1;
        } else if (intersects(
          block.points[i].x, block.points[i].y, block.points[j].x, block.points[j].y,
          this.player.x, this.player.y, this.player.x + Math.cos(this.viewDirection) * 1e6, this.player.y + Math.sin(this.viewDirection) * 1e6
        )) {
          aa += 100;
        }
      }
    });
    console.log(aa);
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