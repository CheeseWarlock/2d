import GameObject from "./IGameObject.js";
import World, { CollisionGroups } from "../World.js";
import { GAME_HEIGHT, GAME_WIDTH } from "../config.js";
import SafetyToggler from "./SafetyToggler.js";

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
  gravityVelocity: number;
  moveLeft: boolean = false;
  moveRight: boolean = false;
  /**
   * Whether the player is currently in a jump.
   */
  jump: boolean = false;
  /**
   * Whether there's a jump queued
   */
  jumpQueued: boolean = false;
  isDead: boolean = false;
  isWalking: boolean = false;
  framesSinceGround: number = COYOTE_TIME_FRAMES;
  framesSinceJumpPressed: number = JUMP_ANTICIPATION;

  constructor(x: number, y: number, world: World) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.gravityVelocity = 0;
    this.jump = false;
  }

  acceptJumpPress() {
    this.jumpQueued = true;
    this.framesSinceJumpPressed = 0;
  }

  handleToggleCollisionCheck() {
    const togglesCollision = this.world.collisionTest(
      this.x - HALF_BOUNDING_BOX_WIDTH,
      this.y - HALF_BOUNDING_BOX_HEIGHT,
      this.x + HALF_BOUNDING_BOX_WIDTH,
      this.y + HALF_BOUNDING_BOX_HEIGHT,
      0,
      CollisionGroups.toggle
    );
    if (togglesCollision.collisionFound) {
      if (!this.world.game.colorObjectsSafe) {
        const timerObject = this.world.objects.filter(
          (o) => o instanceof SafetyToggler
        )[0]!;
        this.world.game.events.publish("playerTouchedToggle", {
          x: timerObject.position.x - 10,
          y: timerObject.position.y - 10,
        });
        this.world.game.deactivateColors();
      }
    }
  }

  handleDeathChecks() {
    if (this.y >= GAME_HEIGHT) {
      this.isDead = true;
      return;
    }
    if (this.world.game.colorObjectsSafe) return;
    const currentPositionCollisionTest = this.world.collisionTest(
      this.x - HALF_BOUNDING_BOX_WIDTH,
      this.y - HALF_BOUNDING_BOX_HEIGHT,
      this.x + HALF_BOUNDING_BOX_WIDTH,
      this.y + HALF_BOUNDING_BOX_HEIGHT,
      0,
      CollisionGroups.color
    );
    this.isDead = currentPositionCollisionTest.collisionFound;
  }

  handleJumpCheck() {
    const colorsSafe = this.world.game.colorObjectsSafe
      ? CollisionGroups.solid
      : CollisionGroups.ground;
    this.framesSinceJumpPressed += 1;
    const collisionTest = this.world.collisionTest(
      this.x - 9,
      this.y + 16,
      this.x + 9,
      this.y + 24,
      0,
      colorsSafe
    );
    if (collisionTest.collisionFound) {
      this.framesSinceGround = 0;
    } else {
      this.framesSinceGround += 1;
    }

    if (this.jumpQueued || this.framesSinceJumpPressed < JUMP_ANTICIPATION) {
      this.jumpQueued = false;
      if (this.framesSinceGround < COYOTE_TIME_FRAMES) {
        this.framesSinceJumpPressed = JUMP_ANTICIPATION;
        this.gravityVelocity = -7;
        this.jump = true;
        this.world.game.events.publish("playerJumped");
        this.framesSinceGround = COYOTE_TIME_FRAMES;
      }
    }
  }

  handleLateralMovementChecks() {
    // are colors safe?
    const colorsSafe = this.world.game.colorObjectsSafe
      ? CollisionGroups.solid
      : CollisionGroups.ground;
    this.isWalking = false;
    if (this.moveLeft && this.x > HALF_BOUNDING_BOX_WIDTH) {
      if (this.gravityVelocity > 0) {
        // in-air stuff
        const collisionTestLeft = this.world.collisionTest(
          this.x - HALF_BOUNDING_BOX_WIDTH - HSPEED,
          this.y - HALF_BOUNDING_BOX_HEIGHT,
          this.x + HALF_BOUNDING_BOX_WIDTH - HSPEED,
          this.y + HALF_BOUNDING_BOX_HEIGHT,
          0,
          colorsSafe
        );
        if (!collisionTestLeft.collisionFound) {
          this.x -= HSPEED;
          this.isWalking = true;
        }
      } else {
        const collisionTestZeroHeight = this.world.collisionTest(
          this.x - HALF_BOUNDING_BOX_WIDTH - HSPEED,
          this.y - HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
          this.x + HALF_BOUNDING_BOX_WIDTH - HSPEED,
          this.y + HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
          0,
          colorsSafe
        );
        if (!collisionTestZeroHeight.collisionFound) {
          const collisionTestFullHeight = this.world.collisionTest(
            this.x - HALF_BOUNDING_BOX_WIDTH - HSPEED,
            this.y - HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
            this.x + HALF_BOUNDING_BOX_WIDTH - HSPEED,
            this.y + HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
            ANGULAR_STICKINESS * 2,
            colorsSafe
          );
          this.isWalking = true;
          this.x -= HSPEED;
          this.y -= ANGULAR_STICKINESS;
          this.y +=
            collisionTestFullHeight.maxSafe < ANGULAR_STICKINESS * 2 &&
            this.gravityVelocity === 0
              ? collisionTestFullHeight.maxSafe
              : ANGULAR_STICKINESS;
        } else {
          const collisionTestHalfHeight = this.world.collisionTest(
            this.x - HALF_BOUNDING_BOX_WIDTH - HSPEED,
            this.y - HALF_BOUNDING_BOX_HEIGHT,
            this.x + HALF_BOUNDING_BOX_WIDTH - HSPEED,
            this.y + HALF_BOUNDING_BOX_HEIGHT,
            ANGULAR_STICKINESS,
            colorsSafe
          );
          if (collisionTestHalfHeight.maxSafe > 0) {
            this.isWalking = true;
            this.x -= HSPEED;
            this.y +=
              collisionTestHalfHeight.maxSafe < ANGULAR_STICKINESS &&
              this.gravityVelocity === 0
                ? collisionTestHalfHeight.maxSafe
                : ANGULAR_STICKINESS;
          }
        }
      }
    } else if (
      this.moveRight &&
      this.x < GAME_WIDTH - HALF_BOUNDING_BOX_WIDTH
    ) {
      if (this.gravityVelocity > 0) {
        const collisionTestRight = this.world.collisionTest(
          this.x - HALF_BOUNDING_BOX_WIDTH + HSPEED,
          this.y - HALF_BOUNDING_BOX_HEIGHT,
          this.x + HALF_BOUNDING_BOX_WIDTH + HSPEED,
          this.y + HALF_BOUNDING_BOX_HEIGHT,
          0,
          colorsSafe
        );
        if (!collisionTestRight.collisionFound) {
          this.isWalking = true;
          this.x += HSPEED;
        }
      } else {
        const collisionTestZeroHeight = this.world.collisionTest(
          this.x - HALF_BOUNDING_BOX_WIDTH + HSPEED,
          this.y - HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
          this.x + HALF_BOUNDING_BOX_WIDTH + HSPEED,
          this.y + HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
          0,
          colorsSafe
        );
        if (!collisionTestZeroHeight.collisionFound) {
          const collisionTestFullHeight = this.world.collisionTest(
            this.x - HALF_BOUNDING_BOX_WIDTH + HSPEED,
            this.y - HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
            this.x + HALF_BOUNDING_BOX_WIDTH + HSPEED,
            this.y + HALF_BOUNDING_BOX_HEIGHT - ANGULAR_STICKINESS,
            ANGULAR_STICKINESS * 2,
            colorsSafe
          );
          this.isWalking = true;
          this.x += HSPEED;

          if (!this.jump) {
            this.y -= ANGULAR_STICKINESS;
            this.y +=
              collisionTestFullHeight.maxSafe < ANGULAR_STICKINESS * 2 &&
              this.gravityVelocity === 0
                ? collisionTestFullHeight.maxSafe
                : ANGULAR_STICKINESS;
          }
        } else {
          const collisionTestHalfHeight = this.world.collisionTest(
            this.x - HALF_BOUNDING_BOX_WIDTH + HSPEED,
            this.y - HALF_BOUNDING_BOX_HEIGHT,
            this.x + HALF_BOUNDING_BOX_WIDTH + HSPEED,
            this.y + HALF_BOUNDING_BOX_HEIGHT,
            ANGULAR_STICKINESS,
            colorsSafe
          );
          if (collisionTestHalfHeight.maxSafe > 0) {
            this.isWalking = true;
            this.x += HSPEED;
            if (!this.jump) {
              this.y +=
                collisionTestHalfHeight.maxSafe < ANGULAR_STICKINESS &&
                this.gravityVelocity === 0
                  ? collisionTestHalfHeight.maxSafe
                  : ANGULAR_STICKINESS;
            }
          }
        }
      }
    }
  }

  applyGravity() {
    const colorsSafe = this.world.game.colorObjectsSafe
      ? CollisionGroups.solid
      : CollisionGroups.ground;
    this.gravityVelocity += GRAVITY_ACCELERATION;
    if (this.gravityVelocity > TERMINAL_VELOCITY)
      this.gravityVelocity = TERMINAL_VELOCITY;

    if (this.gravityVelocity < 0) {
      const collisionTest = this.world.collisionTest(
        this.x - HALF_BOUNDING_BOX_WIDTH,
        this.y - HALF_BOUNDING_BOX_HEIGHT + this.gravityVelocity,
        this.x + HALF_BOUNDING_BOX_WIDTH,
        this.y + HALF_BOUNDING_BOX_HEIGHT + this.gravityVelocity,
        0,
        colorsSafe
      );
      if (collisionTest.collisionFound) {
        this.gravityVelocity = 0;
      }
    } else {
      const collisionTest = this.world.collisionTest(
        this.x - HALF_BOUNDING_BOX_WIDTH,
        this.y - HALF_BOUNDING_BOX_HEIGHT,
        this.x + HALF_BOUNDING_BOX_WIDTH,
        this.y + HALF_BOUNDING_BOX_HEIGHT,
        this.gravityVelocity,
        colorsSafe
      );

      if (collisionTest.collisionFound) {
        this.gravityVelocity = 0;
        this.jump = false;
        this.y += collisionTest.maxSafe;
      }
    }

    this.y += this.gravityVelocity;
  }

  tick() {
    this.handleDeathChecks();
    this.handleToggleCollisionCheck();
    this.handleLateralMovementChecks();
    this.handleJumpCheck();
    this.applyGravity();
  }
}
