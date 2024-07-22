import {
  Application,
  Sprite,
  Graphics,
  Container,
  FillGradient,
  Color,
  Assets,
  TextureStyle,
  Spritesheet,
  AnimatedSprite,
} from "pixi.js";
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
import { RendererAnimationEvents } from "../types";

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 1000;

const glowFilter = new GlowFilter();

class PixiRenderer {
  game: Game;
  objectsToDraw: Map<GameObject, Container> = new Map();
  playerSprite?: AnimatedSprite;
  viewConeGraphics: Container;
  mousePosition?: { x: number; y: number };
  viewRenderer?: CameraFrameRenderer;
  goalRenderer?: CameraFrameRenderer;
  app?: Application;
  timeSinceLastPhoto: number = 100;
  playerDeadSprite?: Sprite;
  animationEvents: EventDispatcher<RendererAnimationEvents> =
    new EventDispatcher();
  isFadingToWhite = false;
  isFadingFromWhite = false;
  whiteMultiplier = 0;
  blackMultiplier = 0;
  blackFocusDistance = 0;

  constructor() {
    this.game = new Game();
    this.game.animationEvents = this.animationEvents;
    this.viewConeGraphics = new Graphics()
      .setStrokeStyle({ width: 4, cap: "square" })
      .poly([
        0,
        0,
        2000 * Math.cos(-this.game.fov),
        2000 * Math.sin(-this.game.fov),
        2000 * Math.cos(this.game.fov),
        2000 * Math.sin(this.game.fov),
      ])
      .fill(new Color({ r: 255, g: 255, b: 255, a: 0.5 }))
      .moveTo(2000 * Math.cos(-this.game.fov), 2000 * Math.sin(-this.game.fov))
      .lineTo(0, 0)
      .stroke()
      .lineTo(2000 * Math.cos(this.game.fov), 2000 * Math.sin(this.game.fov))
      .stroke()
      .moveTo(0, 0)
      .lineTo(2000, 0)
      .stroke();
    this.init();
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

  async init() {
    const container = document.getElementById("game-world-container")!;
    const canvas = document.createElement("canvas");
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    container.appendChild(canvas);
    const app = new Application();
    this.app = app;
    await app.init({
      antialias: true,
      width: 1000,
      height: 1000,
      background: "#444",
      canvas,
    });
    new DebugLevelManager(this);
    TextureStyle.defaultOptions.scaleMode = "nearest";

    const playerSprite = new URL("../images/player.png", import.meta.url);

    const spriteSheetJson = {
      frames: {
        playerstand: {
          frame: { x: 0, y: 0, w: 10, h: 20 },
          spriteSourceSize: { x: 0, y: 0, w: 10, h: 20 },
          sourceSize: { x: 0, y: 0, w: 10, h: 20 },
        },
        playerwalk: {
          frame: { x: 10, y: 0, w: 10, h: 20 },
          spriteSourceSize: { x: 0, y: 0, w: 10, h: 20 },
          sourceSize: { x: 0, y: 0, w: 10, h: 20 },
        },
        playerhurt: {
          frame: { x: 20, y: 0, w: 10, h: 20 },
          spriteSourceSize: { x: 0, y: 0, w: 10, h: 20 },
          sourceSize: { x: 0, y: 0, w: 10, h: 20 },
        },
      },

      animations: {
        enemy: ["playerstand", "playerwalk"],
      },

      meta: {
        image: playerSprite.href,
        format: "RGBA8888",
        size: { w: 30, h: 20 },
        scale: "0.5",
      },
    };

    const playerTexture = await Assets.load(playerSprite.href);

    const sheet = new Spritesheet(playerTexture, spriteSheetJson);
    await sheet.parse();
    const deathSprite = new Sprite(sheet.textures.playerhurt);
    const anim = new AnimatedSprite(sheet.animations.enemy);
    anim.animationSpeed = 0.1;
    anim.play();
    anim.anchor.set(0.5);
    anim.scale.x = -1;
    deathSprite.anchor.set(0.5);

    const nPS = new Sprite(playerTexture);
    nPS.setSize(20, 40);
    nPS.anchor.set(0.5);

    this.playerSprite = anim;
    this.playerDeadSprite = deathSprite;

    const backgroundGradient = new FillGradient(0, 0, 0, 1000);
    backgroundGradient.addColorStop(0, "#222");
    backgroundGradient.addColorStop(1, "#444");

    const background = new Graphics()
      .rect(0, 0, 1000, 1000)
      .fill(backgroundGradient);

    app.stage.addChild(background);

    this.createStars();

    const viewContainer = document.getElementById("view-camera-container")!;
    const goalContainer = document.getElementById("goal-camera-container")!;
    this.viewRenderer = new CameraFrameRenderer(viewContainer);
    this.goalRenderer = new CameraFrameRenderer(goalContainer);

    app.stage.filters = [glowFilter];

    document.onmousemove = (ev) => {
      const canvasX = canvas.getBoundingClientRect().left;
      const canvasY = canvas.getBoundingClientRect().top;
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
    app.stage.addChild(this.playerSprite);
    app.stage.addChild(this.viewConeGraphics);
    this.viewConeGraphics.x = 10;
    this.viewConeGraphics.y = 300;
    this.viewConeGraphics.alpha = 0.5;
    this.viewConeGraphics.zIndex = 1;
    this.game.events.on("goalAchieved", () => {
      goalContainer.classList.remove("camera-container-bounce");
      goalContainer.offsetHeight;
      goalContainer.classList.add("camera-container-bounce");
    });
    this.game.events.on("photoTaken", () => {
      this.timeSinceLastPhoto = 0;
    });
    this.game.events.on("levelCompleted", () => {
      // start fading out the screen
      this.isFadingToWhite = true;
    });
    this.game.events.on("playerDied", () => {
      glowFilter.focusDistance = 1400;
    });

    // Listen for frame updates
    app.ticker.add(() => {
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
      glowFilter.time += 0.02;

      // set the white fade to the max of fade for any reason
      glowFilter.white = Math.min(
        1,
        Math.max(0, 0.8 - this.timeSinceLastPhoto / 30, this.whiteMultiplier)
      );
      this.game.focusPoint = this.mousePosition;
      this.game.tick();

      if (this.game.player.isDead) {
        glowFilter.black += 0.02;
        if (glowFilter.black > 0.4) {
          glowFilter.black = 0.4;
        }
        glowFilter.focusDistance -= 50;
        if (glowFilter.focusDistance < 100) {
          glowFilter.focusDistance = 100;
        }
        glowFilter.focusX = this.game.player.x;
        glowFilter.focusY = this.game.player.y;
        this.viewConeGraphics.visible = false;
        this.app?.stage.removeChild(this.playerSprite!);
        this.app?.stage.addChild(this.playerDeadSprite!);
        this.playerDeadSprite!.scale.x =
          (this.game.viewDirection || 0) < -(Math.PI / 2) ||
          (this.game.viewDirection || 0) > Math.PI / 2
            ? -1
            : 1;
        this.playerDeadSprite!.x = this.game.player.x;
        this.playerDeadSprite!.y = this.game.player.y;
      } else {
        glowFilter.black = 0;
        this.app?.stage.removeChild(this.playerDeadSprite!);
        this.app?.stage.addChild(this.playerSprite!);
        this.playerSprite!.scale.x =
          (this.game.viewDirection || 0) < -(Math.PI / 2) ||
          (this.game.viewDirection || 0) > Math.PI / 2
            ? -1
            : 1;
        if (this.game.player.isWalking) {
          if (!this.playerSprite!.playing) {
            this.playerSprite!.currentFrame = 1;
          }
          this.playerSprite!.play();
        } else {
          this.playerSprite!.currentFrame = 0;
          this.playerSprite!.stop();
        }
        this.viewRenderer!.drawCamera(this.game.cameraFrame);
        this.goalRenderer!.drawCamera(
          this.game.goals[this.game.currentGoalIndex] ||
            this.game.goals[this.game.currentGoalIndex - 1]
        );
        this.playerSprite!.x = this.game.player.x;
        this.playerSprite!.y = this.game.player.y;

        if (this.game.viewOrigin) {
          this.viewConeGraphics.visible = true;
          this.viewConeGraphics.x = this.game.viewOrigin!.x || 0;
          this.viewConeGraphics.y = this.game.viewOrigin!.y || 0;
          this.viewConeGraphics.rotation = this.game.viewDirection || 0;
        } else {
          this.viewConeGraphics.visible = false;
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
              .poly(obj.points.map((seg) => [seg.x, seg.y]).flat())
              .fill(obj.color);
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
          app.stage.addChild(newGraphics);
        } else {
          const existingGraphics = this.objectsToDraw.get(obj)!;
          if (obj instanceof ColorGeometry) {
            existingGraphics.x = obj.transform.x;
            existingGraphics.y = obj.transform.y;
          }
        }
      });
    });
  }
}

export default PixiRenderer;
