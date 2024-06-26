import GameObject from "./IGameObject.js";
import World from "../World.js";

export default class Player implements GameObject {
  x: number;
  y: number;
  world: World;
  acc: number;
  moveLeft: boolean = false;
  moveRight: boolean = false;
  jump: boolean = false;
  isOnGround: boolean = false;
  isDead: boolean = false;

  constructor(x: number, y: number, world: World) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.acc = 0;
  }

  tick() {
    const currentPositionCollisionTest = this.world.collisionTest(
      this.x - 10,
      this.y - 20,
      this.x + 10,
      this.y + 20,
      0
    );
    this.isDead = currentPositionCollisionTest.collisionType === "color";

    const ANGLETHING = 4;
    const HSPEED = 4;
    if (this.jump) {
      // check collision at feet
      const collisionTest = this.world.collisionTest(
        this.x - 10,
        this.y + 16,
        this.x + 10,
        this.y + 24,
        0
      );
      if (collisionTest.collisionFound) {
        this.acc = -8;
      }
    }
    if (this.moveLeft) {
      const collisionTest = this.world.collisionTest(
        this.x - 14,
        this.y - 24,
        this.x + 6,
        this.y + 16,
        ANGLETHING * 2
      );
      const collisionTest2 = this.world.collisionTest(
        this.x - 14,
        this.y - 24,
        this.x + 6,
        this.y + 16,
        0
      );
      if (collisionTest2.collisionFound) {
        // hit a wall
        const x = 123;
      } else {
        // console.log(collisionTest.maxSafe);
        this.x -= HSPEED;
        if (this.acc >= 0) {
          this.y -= ANGLETHING;
          this.y +=
            collisionTest.maxSafe < ANGLETHING * 2
              ? collisionTest.maxSafe
              : ANGLETHING;
        }
      }
    } else if (this.moveRight) {
      const collisionTest = this.world.collisionTest(
        this.x - 6,
        this.y - 24,
        this.x + 14,
        this.y + 16,
        ANGLETHING * 2
      );
      const collisionTest2 = this.world.collisionTest(
        this.x - 6,
        this.y - 24,
        this.x + 14,
        this.y + 16,
        0
      );
      if (collisionTest2.collisionFound) {
        const x = 123;
      } else {
        this.x += HSPEED;
        if (this.acc >= 0) {
          this.y -= ANGLETHING;
          this.y +=
            collisionTest.maxSafe < ANGLETHING * 2
              ? collisionTest.maxSafe
              : ANGLETHING;
        }
      }
    }
    this.acc += 0.2;
    if (this.acc > 8) this.acc = 8;
    // collision test
    if (this.acc < 0) {
      // up
      const collisionTest = this.world.collisionTest(
        this.x - 10,
        this.y - 20 + this.acc,
        this.x + 10,
        this.y + 20 + this.acc,
        0
      );
      if (collisionTest.collisionFound) {
        this.acc = 0;
      }
    } else {
      const collisionTest = this.world.collisionTest(
        this.x - 10,
        this.y - 20,
        this.x + 10,
        this.y + 20,
        this.acc
      );

      if (collisionTest.collisionFound) {
        this.acc = 0;
        this.y += collisionTest.maxSafe;
      }
    }

    this.y += this.acc;
  }
}
