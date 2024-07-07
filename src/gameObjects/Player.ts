import GameObject from "./IGameObject.js";
import World from "../World.js";

const ANGLETHING = 4;
const HSPEED = 4;

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

  checkDeath() {
    const currentPositionCollisionTest = this.world.collisionTest(
      this.x - 10,
      this.y - 20,
      this.x + 10,
      this.y + 20,
      0,
      "color"
    );
    this.isDead = currentPositionCollisionTest.collisionFound;
  }

  checkJump() {
    if (this.jump) {
      this.jump = false;
      // check collision at feet
      const collisionTest = this.world.collisionTest(
        this.x - 4,
        this.y + 16,
        this.x + 4,
        this.y + 24,
        0,
        "ground"
      );
      console.log(collisionTest);
      if (collisionTest.collisionFound) {
        this.acc = -8;
      }
    }
  }

  checkMoveLateral() {
    if (this.moveLeft) {
      if (this.acc > 0) {
        // in-air stuff
        const collisionTestLeft = this.world.collisionTest(
          this.x - 14,
          this.y - 20,
          this.x + 6,
          this.y + 20,
          0,
          "ground"
        );
        if (!collisionTestLeft.collisionFound) {
          this.x -= HSPEED;
        }
      } else {
        const collisionTest = this.world.collisionTest(
          this.x - 14,
          this.y - 24,
          this.x + 6,
          this.y + 16,
          ANGLETHING * 2,
          "ground"
        );
        const collisionTest2 = this.world.collisionTest(
          this.x - 14,
          this.y - 24,
          this.x + 6,
          this.y + 16,
          0,
          "ground"
        );
        if (!collisionTest2.collisionFound) {
          this.x -= HSPEED;
          this.y -= ANGLETHING;
          this.y +=
            collisionTest.maxSafe < ANGLETHING * 2
              ? collisionTest.maxSafe
              : ANGLETHING;
        }
      }
    } else if (this.moveRight) {
      if (this.acc > 0) {
        const collisionTestRight = this.world.collisionTest(
          this.x - 6,
          this.y - 20,
          this.x + 14,
          this.y + 20,
          0,
          "ground"
        );
        if (!collisionTestRight.collisionFound) {
          this.x += HSPEED;
        }
      } else {
        const collisionTest = this.world.collisionTest(
          this.x - 6,
          this.y - 24,
          this.x + 14,
          this.y + 16,
          ANGLETHING * 2,
          "ground"
        );
        const collisionTest2 = this.world.collisionTest(
          this.x - 6,
          this.y - 24,
          this.x + 14,
          this.y + 16,
          0,
          "ground"
        );
        if (!collisionTest2.collisionFound) {
          this.x += HSPEED;
          this.y -= ANGLETHING;
          this.y +=
            collisionTest.maxSafe < ANGLETHING * 2
              ? collisionTest.maxSafe
              : ANGLETHING;
        }
      }
    }
  }

  tick() {
    this.checkDeath();
    this.checkMoveLateral();
    this.checkJump();

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
        0,
        "ground"
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
        this.acc,
        "ground"
      );

      if (collisionTest.collisionFound) {
        this.acc = 0;
        this.y += collisionTest.maxSafe;
      } else {
        console.log("  no ground found");
      }
    }

    this.y += this.acc;
  }
}
