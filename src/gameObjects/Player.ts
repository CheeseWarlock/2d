import GameObject from "./IGameObject.js";
import World from "../World.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../config.js";

/**
 * The vertical distance that the player will "stick" to a surface, per tick.
 */
const ANGULAR_STICKINESS = 4;
/**
 * Horizontal speed per tick.
 */
const HSPEED = 4;
/**
 * Number of frames after touching ground that jumping still works.
 */
const COYOTE_TIME_FRAMES = 8;
/**
 * Number of frames ahead of landing on a plaform that jumping still works.
 */
const JUMP_ANTICIPATION = 5;

const HALF_BOUNDING_BOX_WIDTH = 10;
const HALF_BOUNDING_BOX_HEIGHT = 20;

/**
 * Acceleration from gravity per tick.
 */
const GRAVITY_ACCELERATION = 0.2;

/**
 * Maximum vertical speed.
 */
const TERMINAL_VELOCITY = 8;

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
  isWalking: boolean = false;
  framesSinceGround: number = COYOTE_TIME_FRAMES;
  framesSinceJumpPressed: number = JUMP_ANTICIPATION;

  constructor(x: number, y: number, world: World) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.acc = 0;
  }

  acceptJumpPress() {
    this.jump = true;
    this.framesSinceJumpPressed = 0;
  }

  handleDeathChecks() {
    if (this.y >= GAME_HEIGHT) {
      this.isDead = true;
      return;
    }
    const currentPositionCollisionTest = this.world.collisionTest(
      this.x - HALF_BOUNDING_BOX_WIDTH,
      this.y - HALF_BOUNDING_BOX_HEIGHT,
      this.x + HALF_BOUNDING_BOX_WIDTH,
      this.y + HALF_BOUNDING_BOX_HEIGHT,
      0,
      "color"
    );
    this.isDead = currentPositionCollisionTest.collisionFound;
  }

  handleJumpCheck() {
    this.framesSinceJumpPressed += 1;
    const collisionTest = this.world.collisionTest(
      this.x - 9,
      this.y + 16,
      this.x + 9,
      this.y + 24,
      0,
      "ground"
    );
    if (collisionTest.collisionFound) {
      this.framesSinceGround = 0;
    } else {
      this.framesSinceGround += 1;
    }
    if (this.framesSinceJumpPressed < JUMP_ANTICIPATION)
      console.log(this.framesSinceJumpPressed);
    if (this.jump || this.framesSinceJumpPressed < JUMP_ANTICIPATION) {
      this.jump = false;
      if (this.framesSinceGround < COYOTE_TIME_FRAMES) {
        this.framesSinceJumpPressed = JUMP_ANTICIPATION;
        this.acc = -7;
        this.world.game.events.publish("playerJumped");
        this.framesSinceGround = COYOTE_TIME_FRAMES;
      }
    }
  }

  handleLateralMovementChecks() {
    this.isWalking = false;
    if (this.moveLeft && this.x > HALF_BOUNDING_BOX_WIDTH) {
      if (this.acc > 0) {
        // in-air stuff
        const collisionTestLeft = this.world.collisionTest(
          this.x - HALF_BOUNDING_BOX_WIDTH - HSPEED,
          this.y - HALF_BOUNDING_BOX_HEIGHT,
          this.x + HALF_BOUNDING_BOX_WIDTH - HSPEED,
          this.y + HALF_BOUNDING_BOX_HEIGHT,
          0,
          "ground"
        );
        if (!collisionTestLeft.collisionFound) {
          this.x -= HSPEED;
          this.isWalking = true;
        }
      } else {
        const collisionTest = this.world.collisionTest(
          this.x - HALF_BOUNDING_BOX_WIDTH - HSPEED,
          this.y - HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
          this.x + HALF_BOUNDING_BOX_WIDTH - HSPEED,
          this.y + HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
          ANGULAR_STICKINESS * 2,
          "ground"
        );
        const collisionTest2 = this.world.collisionTest(
          this.x - HALF_BOUNDING_BOX_WIDTH - HSPEED,
          this.y - HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
          this.x + HALF_BOUNDING_BOX_WIDTH - HSPEED,
          this.y + HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
          0,
          "ground"
        );
        if (!collisionTest2.collisionFound) {
          this.isWalking = true;
          this.x -= HSPEED;
          this.y -= ANGULAR_STICKINESS;
          this.y +=
            collisionTest.maxSafe < ANGULAR_STICKINESS * 2
              ? collisionTest.maxSafe
              : ANGULAR_STICKINESS;
        }
      }
    } else if (
      this.moveRight &&
      this.x < GAME_WIDTH - HALF_BOUNDING_BOX_WIDTH
    ) {
      if (this.acc > 0) {
        const collisionTestRight = this.world.collisionTest(
          this.x - HALF_BOUNDING_BOX_WIDTH + HSPEED,
          this.y - HALF_BOUNDING_BOX_HEIGHT,
          this.x + HALF_BOUNDING_BOX_WIDTH + HSPEED,
          this.y + HALF_BOUNDING_BOX_HEIGHT,
          0,
          "ground"
        );
        if (!collisionTestRight.collisionFound) {
          this.isWalking = true;
          this.x += HSPEED;
        }
      } else {
        const collisionTest = this.world.collisionTest(
          this.x - HALF_BOUNDING_BOX_WIDTH + HSPEED,
          this.y - HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
          this.x + HALF_BOUNDING_BOX_WIDTH + HSPEED,
          this.y + HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
          ANGULAR_STICKINESS * 2,
          "ground"
        );
        const collisionTest2 = this.world.collisionTest(
          this.x - HALF_BOUNDING_BOX_WIDTH + HSPEED,
          this.y - HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
          this.x + HALF_BOUNDING_BOX_WIDTH + HSPEED,
          this.y + HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
          0,
          "ground"
        );
        if (!collisionTest2.collisionFound) {
          this.isWalking = true;
          this.x += HSPEED;
          this.y -= ANGULAR_STICKINESS;
          this.y +=
            collisionTest.maxSafe < ANGULAR_STICKINESS * 2
              ? collisionTest.maxSafe
              : ANGULAR_STICKINESS;
        }
      }
    }
  }

  applyGravity() {
    this.acc += GRAVITY_ACCELERATION;
    if (this.acc > TERMINAL_VELOCITY) this.acc = TERMINAL_VELOCITY;

    if (this.acc < 0) {
      const collisionTest = this.world.collisionTest(
        this.x - HALF_BOUNDING_BOX_WIDTH,
        this.y - HALF_BOUNDING_BOX_HEIGHT + this.acc,
        this.x + HALF_BOUNDING_BOX_WIDTH,
        this.y + HALF_BOUNDING_BOX_HEIGHT + this.acc,
        0,
        "ground"
      );
      if (collisionTest.collisionFound) {
        this.acc = 0;
      }
    } else {
      const collisionTest = this.world.collisionTest(
        this.x - HALF_BOUNDING_BOX_WIDTH,
        this.y - HALF_BOUNDING_BOX_HEIGHT,
        this.x + HALF_BOUNDING_BOX_WIDTH,
        this.y + HALF_BOUNDING_BOX_HEIGHT,
        this.acc,
        "ground"
      );

      if (collisionTest.collisionFound) {
        this.acc = 0;
        this.y += collisionTest.maxSafe;
      }
    }

    this.y += this.acc;
  }

  tick() {
    this.handleDeathChecks();
    this.handleLateralMovementChecks();
    this.handleJumpCheck();
    this.applyGravity();
  }
}
