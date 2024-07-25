import Player from "./gameObjects/Player.js";
import CameraFrame, { Segment } from "./CameraFrame.js";
import BaseGeometry from "./gameObjects/BaseGeometry.js";
import { limitNearVerticalDirection } from "./utils.js";
import World from "./World.js";
import GroundGeometry from "./gameObjects/GroundGeometry.js";
import ColorLineGeometry from "./gameObjects/ColorLineGeometry.js";
import ColorGeometry from "./gameObjects/ColorGeometry.js";
import { Point, RendererAnimationEvents } from "./types.js";

import { GAME_LEVELS, LevelManager } from "./levels/levelIndex.js";
import { EventDispatcher } from "./EventDispatcher.js";
import { BUTTONS, Controls } from "./Controls.js";
import ILevelFormat from "./levels/ILevelFormat.js";

const SIMILARITY_THRESHOLD_WITH_SAME_ZONES = 0.85;

const SIMILARITY_THRESHOLD_WITH_DIFFERENT_ZONES = 0.9;

class Game {
  events: EventDispatcher<{
    goalAchieved: void;
    photoTaken: void;
    photoFailed: void;
    playerJumped: void;
    playerDied: void;
    levelCompleted: void;
    levelRestarted: void;
  }> = new EventDispatcher();

  /**
   * The current level JSON if it was loaded from the editor.
   */
  currentLevelData?: string;

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
  world: World = new World(this);
  player: Player = new Player(0, 0, this.world);
  fov: number = 0.25;
  controls = new Controls();
  cameraFrame: CameraFrame = new CameraFrame();
  goals: CameraFrame[] = [];
  currentGoalIndex = 0;
  takePhoto = false;
  levelManager: LevelManager = new LevelManager(this);
  gameIsActive: boolean = true;
  animationEvents?: EventDispatcher<RendererAnimationEvents>;

  constructor() {
    this.loadLevelByIndex(0);
    this.controls.on(BUTTONS.CLICK, () => {
      if (this.gameIsActive) {
        this.takePhoto = true;
      } else {
        this.restartCurrentLevel();
        this.gameIsActive = true;
      }
    });
    this.controls.on(BUTTONS.UP, () => {
      this.player.acceptJumpPress();
    });
  }

  setupAnimationCallbacks(
    animationEvents: EventDispatcher<RendererAnimationEvents>
  ) {
    this.animationEvents = animationEvents;
    animationEvents.on("levelCompleteAnimationMidTransition", () => {
      this.goToNextLevel();
      this.gameIsActive = true;
    });
  }

  loadLevelByIndex(index: number) {
    this.levelManager.currentLevelIndex = index;

    const data = this.levelManager.loadLevel(GAME_LEVELS[index]);

    this.player = data.player;
    this.goals = data.goals;
    this.world = data.world;
    this.visibleObjects = [...this.world.geometryObjects];
  }

  loadLevelFromData(data: {
    world: World;
    goals: CameraFrame[];
    player: Player;
  }) {
    this.player = data.player;
    this.goals = data.goals;
    this.world = data.world;
    this.visibleObjects = [...this.world.geometryObjects];
  }

  tick() {
    if (!this.gameIsActive) {
      return;
    }
    this.player.moveLeft =
      this.controls.buttonsDown.has(BUTTONS.LEFT) &&
      !this.controls.buttonsDown.has(BUTTONS.RIGHT);
    this.player.moveRight =
      this.controls.buttonsDown.has(BUTTONS.RIGHT) &&
      !this.controls.buttonsDown.has(BUTTONS.LEFT);
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
    if (this.player.isDead && this.gameIsActive) {
      this.events.publish("playerDied");
      this.gameIsActive = false;
    }
    if (this.takePhoto) {
      this.takePhoto = false;
      const similarity = this.cameraFrame.compare(
        this.goals[this.currentGoalIndex]
      );
      const areZonesEqual = this.cameraFrame.areZonesEqual(
        this.goals[this.currentGoalIndex]
      );
      console.log(similarity, areZonesEqual);
      if (
        (similarity >= SIMILARITY_THRESHOLD_WITH_SAME_ZONES && areZonesEqual) ||
        similarity >= SIMILARITY_THRESHOLD_WITH_DIFFERENT_ZONES
      ) {
        this.events.publish("photoTaken");
        this.currentGoalIndex += 1;
        if (this.currentGoalIndex === this.goals.length) {
          this.events.publish("levelCompleted");
          if (this.animationEvents) {
            this.gameIsActive = false;
          } else {
            this.goToNextLevel();
          }
        } else {
          this.events.publish("goalAchieved");
        }
      } else {
        this.events.publish("photoFailed");
      }
    }
  }

  restartCurrentLevel() {
    if (this.currentLevelData) {
      const parsedData = this.levelManager.import(this.currentLevelData);
      this.loadLevelFromData(parsedData);
    } else {
      this.loadLevelByIndex(this.levelManager.currentLevelIndex);
    }

    this.currentGoalIndex = 0;
  }

  goToNextLevel() {
    this.levelManager.currentLevelIndex += 1;
    this.loadLevelByIndex(this.levelManager.currentLevelIndex);
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
