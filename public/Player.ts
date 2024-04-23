import GameObject from "./IGameObject";
import World from "./World";

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
    this.acc += 0.01;
    this.y += this.acc;
  }
}