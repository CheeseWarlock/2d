import Player from './Player.js';
import CameraFrame, { Segment } from './CameraFrame.js';
import GeometryObject from './GeometryObject.js';
import { intersects, lineSegmentsIntersect, distance, limitNearVerticalDirection } from './utils.js';
import levelContent from './levels/Level1.js';
import World from './World.js';

type Point = {
  x: number,
  y: number
}

class Game {
  visibleObjects: GeometryObject[] = [];
  focusPoint: Point = { x: 0, y: 0 };
  viewDirection: number = 0;
  player: Player;
  fov: number = 0.25;
  keysDown: Set<string> = new Set();
  clicked = false;
  cameraFrame: CameraFrame = new CameraFrame();
  world: World;
  goals: CameraFrame[];
  currentGoalIndex = 0;

  constructor() {
    this.goals = levelContent.goals;
    this.world = levelContent.world;
    this.player = levelContent.world.players[0];
    this.visibleObjects.push(...levelContent.world.geometryObjects);
  }

  tick() {
    this.player.moveLeft = this.keysDown.has('a');
    this.player.moveRight = this.keysDown.has('d');
    this.player.jump = this.keysDown.has('w');
    
    this.world.update();
    this.viewDirection = Math.atan2(this.focusPoint.y - this.player.y, this.focusPoint.x - this.player.x);
    this.calculatePhotoContent();
    if (this.clicked) {
      this.clicked = false;
      const similarity = this.cameraFrame.compare(this.goals[this.currentGoalIndex]);
      if (similarity > 0.9) {
        this.currentGoalIndex += 1;
      }
    }
  }

  calculatePhotoContent() {
    this.viewDirection = limitNearVerticalDirection(this.viewDirection, this.fov);
    const cameraFrame = this.world.calculatePhotoContent({ x: this.player.x, y: this.player.y }, this.viewDirection, this.fov);
    cameraFrame.simplify();
    this.cameraFrame = cameraFrame;
    console.log();
  }
}

export default Game;