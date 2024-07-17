import Player from "./gameObjects/Player.js";
import CameraFrame, { Segment } from "./CameraFrame.js";
import BaseGeometry from "./gameObjects/BaseGeometry.js";
import { limitNearVerticalDirection } from "./utils.js";
import canyonLevel from "./levels/Canyon.js";
import faceLevel from "./levels/Face.js";
import jumpLevel from "./levels/Jump.js";
import World from "./World.js";
import GroundGeometry from "./gameObjects/GroundGeometry.js";
import ColorLineGeometry from "./gameObjects/ColorLineGeometry.js";
import ColorGeometry from "./gameObjects/ColorGeometry.js";
import { Point } from "./types.js";

const GAME_LEVELS = [faceLevel, canyonLevel];

const SIMILARITY_THRESHOLD_WITH_SAME_ZONES = 0.8;

const SIMILARITY_THRESHOLD_WITH_DIFFERENT_ZONES = 0.9;

let levelIndex = 0;

class Game {
  visibleObjects: BaseGeometry[] = [];
  /**
   * The focus position (i.e. of the cursor)
   */
  focusPoint?: Point;
  /**
   * The origin point for the view cone, based on the player's position and direction.
   */
  viewOrigin?: Point;
  viewDirection?: number;
  world: World = new World();
  player: Player = new Player(0, 0, this.world);
  fov: number = 0.25;
  keysDown: Set<string> = new Set();
  clicked = false;
  cameraFrame: CameraFrame = new CameraFrame();
  goals: CameraFrame[] = [];
  currentGoalIndex = 0;

  constructor() {
    this.loadLevel(0);
  }

  loadLevel(index: number) {
    const level = GAME_LEVELS[index];
    this.goals = level.goals.map((goal) => new CameraFrame(goal));
    this.world = new World();
    level.ground.forEach((g) => {
      const geo = new GroundGeometry([
        ...g.points.map((m) => ({ x: m.x, y: m.y })),
      ]);
      this.world.addGeometry(geo);
    });
    level.lines.forEach((l) => {
      const geo = new ColorLineGeometry(l.from, l.to, l.color);
      this.world.addGeometry(geo);
    });
    level.colors.forEach((c) => {
      const geo = new ColorGeometry(
        [...c.points.map((m) => ({ x: m.x, y: m.y }))],
        c.color,
        c.motion
      );
      this.world.addGeometry(geo);
    });

    this.player = new Player(
      level.playerPosition.x,
      level.playerPosition.y,
      this.world
    );
    this.visibleObjects = [...this.world.geometryObjects];
    this.world.objects.push(this.player);
  }

  tick() {
    this.player.moveLeft = this.keysDown.has("a");
    this.player.moveRight = this.keysDown.has("d");
    this.player.jump = this.keysDown.has("w");

    this.world.update();
    if (this.focusPoint) {
      const centerToFocusPoint = Math.atan2(
        this.focusPoint.y - this.player.y,
        this.focusPoint.x - this.player.x
      );
      const isLeft =
        centerToFocusPoint < -(Math.PI / 2) || centerToFocusPoint > Math.PI / 2;

      if (isLeft) {
        this.viewOrigin = { x: this.player.x - 9, y: this.player.y - 9 };
      } else {
        this.viewOrigin = { x: this.player.x + 9, y: this.player.y - 9 };
      }
      this.viewDirection = Math.atan2(
        this.focusPoint.y - this.viewOrigin!.y,
        this.focusPoint.x - this.viewOrigin!.x
      );
      this.viewDirection = limitNearVerticalDirection(
        this.viewDirection,
        this.fov * 1.25,
        isLeft ? "left" : "right"
      );
    }

    this.calculatePhotoContent();
    if (this.player.isDead) {
      this.restartCurrentLevel();
    }
    if (this.clicked) {
      this.clicked = false;
      const similarity = this.cameraFrame.compare(
        this.goals[this.currentGoalIndex]
      );
      const areZonesEqual = this.cameraFrame.areZonesEqual(
        this.goals[this.currentGoalIndex]
      );
      if (
        (similarity >= SIMILARITY_THRESHOLD_WITH_SAME_ZONES && areZonesEqual) ||
        similarity >= SIMILARITY_THRESHOLD_WITH_DIFFERENT_ZONES
      ) {
        this.currentGoalIndex += 1;
        if (this.currentGoalIndex === this.goals.length) {
          this.goToNextLevel();
        }
      }
    }
  }

  restartCurrentLevel() {
    this.loadLevel(levelIndex);
    this.currentGoalIndex = 0;
  }

  goToNextLevel() {
    levelIndex += 1;
    this.loadLevel(levelIndex);
    this.currentGoalIndex = 0;
  }

  calculatePhotoContent() {
    if (!this.viewDirection) return;
    const cameraFrame = this.world.calculatePhotoContent(
      { x: this.viewOrigin!.x, y: this.viewOrigin!.y },
      this.viewDirection,
      this.fov
    );
    cameraFrame.simplify();
    this.cameraFrame = cameraFrame;
  }
}

export default Game;
