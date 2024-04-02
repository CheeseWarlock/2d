import Block from './Block.js';
import Player from './Player.js';

type Point = {
  x: number,
  y: number
}

class Game {
  blocks: Block[] = [];
  focusPoint: Point = { x: 0, y: 0 };
  viewDirection: number = 0;
  player: Player = new Player(10, 40);
  fov: number = 0.5;
  keysDown: Set<string> = new Set();

  constructor() {
    this.blocks.push(new Block(1, 1, 20, 20));
    this.blocks.push(new Block(20, 20, 40, 40));
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
  }
}

export default Game;