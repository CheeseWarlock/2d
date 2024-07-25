import { Application, Graphics, Container, FillGradient, Color } from "pixi.js";
import Game from "../Game";
import GameObject from "../gameObjects/IGameObject";
import ColorGeometry from "../gameObjects/ColorGeometry";
import GroundGeometry from "../gameObjects/GroundGeometry";
import CameraFrameRenderer from "./CameraFrameRenderer";
import BaseGeometry from "../gameObjects/BaseGeometry";
import { GlowFilter } from "./GlowFilter";
import { BUTTONS } from "../Controls";
import { DebugLevelManager } from "../DebugLevelManager";
import { EventDispatcher } from "../EventDispatcher";
import { RendererAnimationEvents, Sprites } from "../types";
import { GAME_WIDTH, GAME_HEIGHT, DEBUG_MODE } from "../config";

const glowFilter = new GlowFilter();

/**
 * Duration to pause after a successful photo.
 */
const HANG_TIME = 250;

class PixiRenderer {
  game: Game;
  objectsToDraw: Map<GameObject, Container> = new Map();
  mousePosition?: { x: number; y: number };
  viewRenderer: CameraFrameRenderer;
  goalRenderer: CameraFrameRenderer;
  app: Application;
  timeSinceLastPhoto: number = 100;
  timeSinceJump: number = 100;
  animationEvents: EventDispatcher<RendererAnimationEvents> =
    new EventDispatcher();
  isFadingToWhite = false;
  isFadingFromWhite = false;
  whiteMultiplier = 0;
  blackMultiplier = 0;
  blackFocusDistance = 0;
  canvas: HTMLCanvasElement;
  sprites: Sprites;

  constructor(options: {
    app: Application;
    sprites: Sprites;
    canvas: HTMLCanvasElement;
  }) {
    this.canvas = options.canvas;
    this.app = options.app;
    this.sprites = options.sprites;

    this.game = new Game();
    this.game.setupAnimationCallbacks(this.animationEvents);
    if (DEBUG_MODE) {
      new DebugLevelManager(this);
    }

    const backgroundGradient = new FillGradient(0, 0, 0, 1000);
    backgroundGradient.addColorStop(0, "#222");
    backgroundGradient.addColorStop(1, "#444");

    const background = new Graphics()
      .rect(0, 0, 1000, 1000)
      .fill(backgroundGradient);

    this.app.stage.addChild(background);

    this.createStars();

    const viewContainer = document.getElementById("view-camera-container")!;
    const goalContainer = document.getElementById("goal-camera-container")!;
    this.viewRenderer = new CameraFrameRenderer(viewContainer);
    this.goalRenderer = new CameraFrameRenderer(goalContainer);

    this.app.stage.filters = [glowFilter];

    document.onmousemove = (ev) => {
      const canvasX = this.canvas.getBoundingClientRect().left;
      const canvasY = this.canvas.getBoundingClientRect().top;
      if (!this.mousePosition) {
        this.mousePosition = { x: 0, y: 0 };
      }
      this.mousePosition.x = ev.clientX - canvasX;
      this.mousePosition.y = ev.clientY - canvasY;
    };

    document.onmousedown = () => {
      this.game.controls.press(BUTTONS.CLICK);
    };

    document.onmouseup = () => {
      this.game.controls.unpress(BUTTONS.CLICK);
    };

    document.body.onkeydown = (ev) => {
      if (ev.key === "w" || ev.key === "ArrowUp") {
        this.game.controls.press(BUTTONS.UP);
      } else if (ev.key === "a" || ev.key === "ArrowLeft") {
        this.game.controls.press(BUTTONS.LEFT);
      } else if (ev.key === "d" || ev.key === "ArrowRight") {
        this.game.controls.press(BUTTONS.RIGHT);
      }
    };

    document.body.onkeyup = (ev) => {
      if (ev.key === "w" || ev.key === "ArrowUp") {
        this.game.controls.unpress(BUTTONS.UP);
      } else if (ev.key === "a" || ev.key === "ArrowLeft") {
        this.game.controls.unpress(BUTTONS.LEFT);
      } else if (ev.key === "d" || ev.key === "ArrowRight") {
        this.game.controls.unpress(BUTTONS.RIGHT);
      }
    };
    this.app.stage.addChild(this.sprites.playerWalkSprite);
    this.app.stage.addChild(this.sprites.viewCone);
    this.sprites.viewCone.x = 10;
    this.sprites.viewCone.y = 300;
    this.sprites.viewCone.alpha = 0.5;
    this.sprites.viewCone.zIndex = 1;
    this.game.events.on("goalAchieved", () => {
      goalContainer.classList.remove("camera-container-bounce");
      goalContainer.offsetHeight;
      goalContainer.classList.add("camera-container-bounce");
      this.game.gameIsActive = false;
      setTimeout(() => {
        this.game.gameIsActive = true;
      }, HANG_TIME);
    });
    this.game.events.on("photoFailed", () => {
      viewContainer.classList.remove("view-container-shake");
      viewContainer.offsetHeight;
      viewContainer.classList.add("view-container-shake");
    });
    this.game.events.on("photoTaken", () => {
      this.timeSinceLastPhoto = 0;
    });
    this.game.events.on("levelCompleted", () => {
      goalContainer.classList.remove("camera-container-bounce");
      goalContainer.offsetHeight;
      goalContainer.classList.add("camera-container-bounce");
      // start fading out the screen
      this.isFadingToWhite = true;
    });
    this.game.events.on("playerDied", () => {
      glowFilter.focusDistance = 1400;
    });
    this.game.events.on("playerJumped", () => {
      this.timeSinceJump = 0;
    });

    this.app.ticker.add(() => {
      this.update();
    });
  }

  update() {
    // Color fades
    if (this.isFadingToWhite) {
      this.whiteMultiplier += 0.02;
      if (this.whiteMultiplier >= 1) {
        this.isFadingFromWhite = true;
        this.isFadingToWhite = false;
        this.animationEvents.publish("levelCompleteAnimationMidTransition");
      }
    } else if (this.isFadingFromWhite) {
      this.whiteMultiplier -= 0.02;
      if (this.whiteMultiplier <= 0) {
        this.isFadingFromWhite = false;
        this.whiteMultiplier = 0;
        this.animationEvents.publish("levelCompleteAnimationFinished");
      }
    }
    this.timeSinceLastPhoto += 1;
    this.timeSinceJump += 1;
    if (this.game.gameIsActive) {
      glowFilter.time += 0.02;
    }

    this.sprites.viewCone.alpha = Math.max(
      0.5,
      0.9 - this.timeSinceLastPhoto / 50
    );

    // set the white fade to the max of fade for any reason
    glowFilter.white = Math.min(
      1,
      Math.max(0, 0.8 - this.timeSinceLastPhoto / 30, this.whiteMultiplier)
    );
    this.game.focusPoint = this.mousePosition;
    this.game.tick();

    if (this.game.player.isDead) {
      glowFilter.black += 0.02;
      if (glowFilter.black > 0.2) {
        glowFilter.black = 0.2;
      }
      glowFilter.focusDistance -= 50;
      if (glowFilter.focusDistance < 100) {
        glowFilter.focusDistance = 100;
      }
      glowFilter.focusX = this.game.player.x;
      glowFilter.focusY = this.game.player.y;
      this.sprites.viewCone.visible = false;
      this.app?.stage.removeChild(this.sprites.playerWalkSprite);
      this.app?.stage.addChild(this.sprites.playerDeadSprite);
      this.sprites.playerDeadSprite.scale.x =
        (this.game.viewDirection || 0) < -(Math.PI / 2) ||
        (this.game.viewDirection || 0) > Math.PI / 2
          ? -1
          : 1;
      this.sprites.playerDeadSprite.x = this.game.player.x;
      this.sprites.playerDeadSprite.y = this.game.player.y;
    } else {
      glowFilter.black = 0;
      this.app?.stage.removeChild(this.sprites.playerDeadSprite);
      this.app?.stage.addChild(this.sprites.playerWalkSprite);
      if (this.timeSinceJump < 20) {
        this.sprites.playerWalkSprite.currentFrame = 1;
      }

      this.sprites.playerWalkSprite.scale.x =
        (this.game.viewDirection || 0) < -(Math.PI / 2) ||
        (this.game.viewDirection || 0) > Math.PI / 2
          ? -1
          : 1;
      if (this.game.player.isWalking) {
        if (!this.sprites.playerWalkSprite.playing) {
          this.sprites.playerWalkSprite.currentFrame = 1;
        }
        this.sprites.playerWalkSprite.play();
      } else {
        if (this.timeSinceJump > 20) {
          this.sprites.playerWalkSprite.currentFrame = 0;
        }

        this.sprites.playerWalkSprite.stop();
      }
      if (!this.game.gameIsActive) {
        this.sprites.playerWalkSprite.stop();
      }
      this.viewRenderer.drawCamera(this.game.cameraFrame);
      this.goalRenderer.drawCamera(
        this.game.goals[this.game.currentGoalIndex] ||
          this.game.goals[this.game.currentGoalIndex - 1]
      );
      this.sprites.playerWalkSprite.x = this.game.player.x;
      this.sprites.playerWalkSprite.y = this.game.player.y;

      if (this.game.viewOrigin) {
        this.sprites.viewCone.visible = true;
        this.sprites.viewCone.x = this.game.viewOrigin.x || 0;
        this.sprites.viewCone.y = this.game.viewOrigin.y || 0;
        this.sprites.viewCone.rotation = this.game.viewDirection || 0;
      } else {
        this.sprites.viewCone.visible = false;
      }
    }

    // Clean up
    Array.from(this.objectsToDraw.keys()).forEach((obj) => {
      if (obj instanceof BaseGeometry) {
        if (this.game.visibleObjects.indexOf(obj) === -1) {
          this.objectsToDraw.get(obj)?.destroy();
          this.objectsToDraw.delete(obj);
        }
      }
    });
    this.game.visibleObjects.forEach((obj) => {
      if (!this.objectsToDraw.has(obj)) {
        let newGraphics;
        if (obj instanceof ColorGeometry) {
          const uhg = obj.lineSegments
            .map((seg) => {
              return [seg.from.x, seg.from.y];
            })
            .flat();
          newGraphics = new Graphics()
            .poly(
              obj.points
                .map((seg) => {
                  return [seg.x, seg.y];
                })
                .flat()
            )
            .fill(obj.color);
          newGraphics.x = obj.position.x + obj.transform.x;
          newGraphics.y = obj.position.y + obj.transform.y;
          newGraphics.rotation = obj.rotation;
        } else if (obj instanceof GroundGeometry) {
          newGraphics = new Graphics()
            .poly(
              obj.lineSegments.map((seg) => [seg.from.x, seg.from.y]).flat()
            )
            .fill(obj.color);
        } else {
          newGraphics = new Graphics().circle(0, 0, 50).fill("black");
        }

        this.objectsToDraw.set(obj, newGraphics);
        this.app.stage.addChild(newGraphics);
      } else {
        const existingGraphics = this.objectsToDraw.get(obj)!;
        if (obj instanceof ColorGeometry) {
          existingGraphics.x = obj.position.x + obj.transform.x;
          existingGraphics.y = obj.position.y + obj.transform.y;
          existingGraphics.rotation = obj.rotation;
        }
      }
    });
  }

  createStars() {
    const NUM_STARS = 20;
    let starsRemaining = NUM_STARS;
    while (starsRemaining > 0) {
      starsRemaining -= 1;
      const starX = Math.round(Math.random() * GAME_WIDTH);
      const starY = Math.round(Math.random() ** 2 * GAME_HEIGHT);
      const starSize = Math.random() * 3 + 3;

      const starRect = new Graphics()
        .rect(0, 0, starSize, starSize)
        .fill("#eee");
      starRect.x = starX;
      starRect.y = starY;
      this.app!.stage.addChild(starRect);
    }
  }
}

export default PixiRenderer;
