import Player from "./gameObjects/Player.js";
import CameraFrame, { Segment } from "./CameraFrame.js";
import GeometryObject from "./gameObjects/BaseGeometry.js";
import { limitNearVerticalDirection } from "./utils.js";
import canyonLevel from "./levels/Canyon.js";
import faceLevel from "./levels/Face.js";
import World from "./World.js";
import GroundGeometry from "./gameObjects/GroundGeometry.js";
import ColorLineGeometry from "./gameObjects/ColorLineGeometry.js";
import ColorGeometry from "./gameObjects/ColorGeometry.js";

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
    this.goals = level.goals;
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
        c.color
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
      this.viewDirection = Math.atan2(
        this.focusPoint.y - this.player.y,
        this.focusPoint.x - this.player.x
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
      if (similarity >= SIMILARITY_THRESHOLD) {
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
