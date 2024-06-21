import Player from "./gameObjects/Player.js";
import CameraFrame, { Segment } from "./CameraFrame.js";
import GeometryObject from "./gameObjects/GeometryObject.js";
import { limitNearVerticalDirection } from "./utils.js";
import canyonLevel from "./levels/Canyon.js";
import faceLevel from "./levels/Face.js";
import World from "./World.js";

type Point = {
  x: number;
  y: number;
};

const GAME_LEVELS = [faceLevel, canyonLevel];

const SIMILARITY_THRESHOLD = 0.9;

let levelIndex = 0;

class Game {
  visibleObjects: GeometryObject[] = [];
  focusPoint?: Point;
  viewDirection?: number;
  player: Player;
  fov: number = 0.25;
  keysDown: Set<string> = new Set();
  clicked = false;
  cameraFrame: CameraFrame = new CameraFrame();
  world: World;
  goals: CameraFrame[];
  currentGoalIndex = 0;

  constructor() {
    const levelContent = GAME_LEVELS[0];
    this.goals = levelContent.goals;
    this.world = levelContent.world;
    this.player = levelContent.world.players[0];
    this.visibleObjects.push(...levelContent.world.geometryObjects);
  }

  tick() {
    this.player.moveLeft = this.keysDown.has("a");
    this.player.moveRight = this.keysDown.has("d");
    this.player.jump = this.keysDown.has("w");

    this.world.update();
    if (this.focusPoint) {
      this.viewDirection = Math.atan2(
        this.focusPoint.y - this.player.y,
        this.focusPoint.x - this.player.x
      );
    }

    this.calculatePhotoContent();
    if (this.clicked) {
      this.clicked = false;
      const similarity = this.cameraFrame.compare(
        this.goals[this.currentGoalIndex]
      );
      if (similarity >= SIMILARITY_THRESHOLD) {
        this.currentGoalIndex += 1;
        if (this.currentGoalIndex === this.goals.length) {
          this.goToNextLevel();
        }
      }
    }
  }

  restartCurrentLevel() {
    const currentLevel = GAME_LEVELS[levelIndex];
    this.goals = currentLevel.goals;
    this.world = currentLevel.world;
    this.player = currentLevel.world.players[0];
    this.visibleObjects = [];
    this.visibleObjects.push(...currentLevel.world.geometryObjects);
    // this.currentGoalIndex = 0; maybe?
  }

  goToNextLevel() {
    levelIndex += 1;
    const nextLevel = GAME_LEVELS[levelIndex];
    this.goals = nextLevel.goals;
    this.world = nextLevel.world;
    this.player = nextLevel.world.players[0];
    this.visibleObjects = [];
    this.visibleObjects.push(...nextLevel.world.geometryObjects);
    this.currentGoalIndex = 0;
  }

  calculatePhotoContent() {
    if (!this.viewDirection) return;
    this.viewDirection = limitNearVerticalDirection(
      this.viewDirection,
      this.fov * 1.25
    );
    const cameraFrame = this.world.calculatePhotoContent(
      { x: this.player.x, y: this.player.y },
      this.viewDirection,
      this.fov
    );
    cameraFrame.simplify();
    this.cameraFrame = cameraFrame;
    console.log();
  }
}

export default Game;
