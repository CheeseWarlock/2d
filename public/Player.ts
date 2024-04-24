import GameObject from "./IGameObject.js";
import World from "./World.js";

export default class Player implements GameObject {
  x: number;
  y: number;
  world: World;
  acc: number;

  constructor(x: number, y: number, world: World) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.acc = 0;
  }

  tick() {
    this.acc += 0.025;
    // collision test
    if (this.world.collisionTest(this.x - 10, this.y - 20, this.x + 10, this.y + 20)) {
      this.acc = 0;
    }
    this.y += this.acc;
  }
}