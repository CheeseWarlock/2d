import {
  Application,
  Sprite,
  Graphics,
  Container,
  FillGradient,
  Color,
  RenderTexture,
  BlurFilter,
} from "pixi.js";
import Game from "./Game";
import GameObject from "./gameObjects/IGameObject";
import ColorGeometry from "./gameObjects/ColorGeometry";
import GroundGeometry from "./gameObjects/GroundGeometry";
import CameraFrameRenderer from "./CameraFrameRenderer";
import BaseGeometry from "./gameObjects/BaseGeometry";

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 1000;

const ms = async () => {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      res();
    }, 500);
  });
};

class PixiRenderer {
  game: Game;
  objectsToDraw: Map<GameObject, Container> = new Map();
  playerSprite: Container;
  viewConeGraphics: Container;
  mousePosition?: { x: number; y: number };
  viewRenderer?: CameraFrameRenderer;
  goalRenderer?: CameraFrameRenderer;
  app?: Application;

  constructor() {
    this.init();
    this.game = new Game();
    this.playerSprite = new Graphics().rect(-10, -20, 20, 40).fill("white");
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

    document.onmousemove = (ev) => {
      const canvasX =
        canvas.getBoundingClientRect().left +
        document.documentElement.scrollTop;
      const canvasY =
        canvas.getBoundingClientRect().top + document.documentElement.scrollTop;
      if (!this.mousePosition) {
        this.mousePosition = { x: 0, y: 0 };
      }
      this.mousePosition.x = ev.clientX - canvasX;
      this.mousePosition.y = ev.clientY - canvasY;
    };

    canvas.onclick = () => {
      this.game.clicked = true;
    };

    document.body.onkeydown = (ev) => {
      this.game.keysDown.add(ev.key);
    };

    document.body.onkeyup = (ev) => {
      this.game.keysDown.delete(ev.key);
    };
    app.stage.addChild(this.playerSprite);
    app.stage.addChild(this.viewConeGraphics);
    this.viewConeGraphics.x = 10;
    this.viewConeGraphics.y = 300;
    this.viewConeGraphics.alpha = 0.5;
    this.viewConeGraphics.zIndex = 1;

    // Listen for frame updates
    app.ticker.add(() => {
      this.game.focusPoint = this.mousePosition;
      this.game.tick();
      this.viewRenderer!.drawCamera(this.game.cameraFrame);
      this.goalRenderer!.drawCamera(
        this.game.goals[this.game.currentGoalIndex]
      );
      this.playerSprite.x = this.game.player.x;
      this.playerSprite.y = this.game.player.y;
      this.viewConeGraphics.x = this.game.player.x;
      this.viewConeGraphics.y = this.game.player.y;

      this.viewConeGraphics.rotation = this.game.viewDirection || 0;
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
              .fill("black");
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
