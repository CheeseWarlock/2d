import CameraFrame from "./CameraFrame.js";
import Game from "./Game.js";
import GrayscaleObject from "./gameObjects/GrayscaleObject.js";
import Line from "./gameObjects/Line.js";
import PolyBlock from "./gameObjects/PolyBlock.js";

const CLEAR_COLOR_FOR_CAMERA_FRAMES = "#444";

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 1000;

const CAMERA_FRAME_WIDTH = 60;
const CAMERA_FRAME_HEIGHT = 900;

type StarDetail = {
  x: number;
  y: number;
  size: number;
};

export default class Renderer {
  game: Game;
  renderingContexts: {
    gameWorld: CanvasRenderingContext2D;
    playerFrame: CanvasRenderingContext2D;
    goalFrame: CanvasRenderingContext2D;
  };
  mousePosition: { x: number; y: number } = { x: 0, y: 0 };
  stars: StarDetail[] = [];
  backgroundGradient: any;

  constructor() {
    const container = document.getElementById("game-world-container")!;
    const game = new Game();
    const canvas = document.createElement("canvas");
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    container.appendChild(canvas);

    const viewContainer = document.getElementById("view-camera-container")!;
    const photoCanvas = document.createElement("canvas");
    photoCanvas.width = CAMERA_FRAME_WIDTH;
    photoCanvas.height = CAMERA_FRAME_HEIGHT;
    viewContainer.appendChild(photoCanvas);

    const goalContainer = document.getElementById("goal-camera-container")!;
    const goalCanvas = document.createElement("canvas");
    goalCanvas.width = CAMERA_FRAME_WIDTH;
    goalCanvas.height = CAMERA_FRAME_HEIGHT;
    goalContainer.appendChild(goalCanvas);

    this.renderingContexts = {
      gameWorld: canvas.getContext("2d")!,
      playerFrame: photoCanvas.getContext("2d")!,
      goalFrame: goalCanvas.getContext("2d")!,
    };

    this.game = game;

    document.onmousemove = (ev) => {
      const canvasX =
        canvas.getBoundingClientRect().left +
        document.documentElement.scrollTop;
      const canvasY =
        canvas.getBoundingClientRect().top + document.documentElement.scrollTop;
      this.mousePosition.x = ev.clientX - canvasX;
      this.mousePosition.y = ev.clientY - canvasY;
    };

    canvas.onclick = (ev) => {
      this.game.clicked = true;
    };

    document.body.onkeydown = (ev) => {
      this.game.keysDown.add(ev.key);
    };

    document.body.onkeyup = (ev) => {
      this.game.keysDown.delete(ev.key);
    };

    const gradient = this.renderingContexts.gameWorld.createLinearGradient(
      0,
      0,
      0,
      GAME_HEIGHT
    );
    gradient.addColorStop(0, "#222");
    gradient.addColorStop(0.7, "#444");
    gradient.addColorStop(1, "#666");
    this.backgroundGradient = gradient;

    this.createStars();
  }

  createStars() {
    const NUM_STARS = 20;
    let starsRemaining = NUM_STARS;
    while (starsRemaining > 0) {
      starsRemaining -= 1;
      const starX = Math.round(Math.random() * GAME_WIDTH);
      const starY = Math.round(Math.random() ** 2 * GAME_HEIGHT);
      const starSize = Math.random() * 3 + 3;

      this.stars.push({
        x: starX,
        y: starY,
        size: starSize,
      });
    }
  }

  /**
   * Draw everything including the goal and current camera frames.
   */
  draw() {
    const context = this.renderingContexts.gameWorld;
    this.game.focusPoint = this.mousePosition;
    this.game.tick();

    context.fillStyle = CLEAR_COLOR_FOR_CAMERA_FRAMES;
    context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    this.drawBackground();
    this.drawBackgroundStars();
    this.drawPlayer();

    this.game.visibleObjects.forEach((obj) => {
      this.drawObject(obj);
    });

    this.drawViewCone();
    this.drawCameraFrame();
    this.drawGoalCameraFrame();
  }

  drawBackground() {
    const context = this.renderingContexts.gameWorld;

    context.closePath();
    context.fillStyle = this.backgroundGradient;
    context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }

  drawBackgroundStars() {
    const context = this.renderingContexts.gameWorld;

    context.fillStyle = "white";
    this.stars.forEach((star) => {
      context.fillRect(
        star.x - star.size / 2,
        star.y - star.size / 2,
        star.size,
        star.size
      );
    });
  }

  drawPlayer() {
    const context = this.renderingContexts.gameWorld;
    context.fillStyle = "red";
    context.beginPath();
    context.moveTo(this.game.player.x - 10, this.game.player.y - 20);
    context.lineTo(this.game.player.x + 10, this.game.player.y - 20);
    context.lineTo(this.game.player.x + 10, this.game.player.y + 20);
    context.lineTo(this.game.player.x - 10, this.game.player.y + 20);
    context.fill();
    context.closePath();
  }

  drawViewCone() {
    const context = this.renderingContexts.gameWorld;
    // draw view cone
    context.strokeStyle = "rgba(255, 255, 255, 0.6)";
    context.lineWidth = 3.9;
    context.beginPath();
    context.moveTo(this.game.player.x, this.game.player.y);
    context.lineTo(
      this.game.player.x +
        Math.cos(this.game.viewDirection - this.game.fov) * 1e6,
      this.game.player.y +
        Math.sin(this.game.viewDirection - this.game.fov) * 1e6
    );
    context.closePath();
    context.stroke();
    context.beginPath();
    context.lineTo(
      this.game.player.x +
        Math.cos(this.game.viewDirection + this.game.fov) * 1e6,
      this.game.player.y +
        Math.sin(this.game.viewDirection + this.game.fov) * 1e6
    );
    context.lineTo(this.game.player.x, this.game.player.y);
    context.closePath();
    context.stroke();

    // Draw viewcone gradient
    const gradient = context.createLinearGradient(
      this.game.player.x,
      this.game.player.y,
      this.game.player.x + Math.cos(this.game.viewDirection) * 200,
      this.game.player.y + Math.sin(this.game.viewDirection) * 200
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");
    context.fillStyle = gradient;
    context.beginPath();
    context.moveTo(this.game.player.x, this.game.player.y);
    context.lineTo(
      this.game.player.x +
        Math.cos(this.game.viewDirection - this.game.fov) * 1e6,
      this.game.player.y +
        Math.sin(this.game.viewDirection - this.game.fov) * 1e6
    );
    context.lineTo(
      this.game.player.x +
        Math.cos(this.game.viewDirection + this.game.fov) * 1e6,
      this.game.player.y +
        Math.sin(this.game.viewDirection + this.game.fov) * 1e6
    );
    context.lineTo(this.game.player.x, this.game.player.y);
    context.closePath();
    context.fill();

    // draw view centerline
    context.beginPath();
    context.moveTo(this.game.player.x, this.game.player.y);
    context.lineTo(
      this.game.player.x + Math.cos(this.game.viewDirection) * 1e6,
      this.game.player.y + Math.sin(this.game.viewDirection) * 1e6
    );
    context.closePath();
    context.stroke();
  }

  drawObject(obj: PolyBlock | GrayscaleObject | Line) {
    const context = this.renderingContexts.gameWorld;

    if (obj instanceof PolyBlock || obj instanceof GrayscaleObject) {
      context.fillStyle = obj.color;
      context.moveTo(obj.points[0].x, obj.points[0].y);
      context.beginPath();
      for (let i = 0; i != obj.points.length; i++) {
        context.lineTo(obj.points[i].x, obj.points[i].y);
      }
      context.closePath();
      context.fill();
    }

    if (obj instanceof Line) {
      context.strokeStyle = obj.color;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(obj.lineSegments[0].from.x, obj.lineSegments[0].from.y);
      context.lineTo(obj.lineSegments[0].to.x, obj.lineSegments[0].to.y);
      context.closePath();
      context.stroke();
    }
  }

  drawCameraFrame() {
    this.drawCamera(this.game.cameraFrame, this.renderingContexts.playerFrame);
  }

  drawGoalCameraFrame() {
    this.drawCamera(
      this.game.goals[this.game.currentGoalIndex],
      this.renderingContexts.goalFrame
    );
  }

  drawCamera(frame: CameraFrame, target: CanvasRenderingContext2D) {
    target.fillStyle = CLEAR_COLOR_FOR_CAMERA_FRAMES;
    target.fillRect(0, 0, CAMERA_FRAME_WIDTH, CAMERA_FRAME_HEIGHT);
    frame.segments.forEach((segment) => {
      if (segment.color === "empty") return;
      target.fillStyle = segment.color;
      target.fillRect(
        0,
        segment.start * CAMERA_FRAME_HEIGHT,
        CAMERA_FRAME_WIDTH,
        (segment.end - segment.start) * CAMERA_FRAME_HEIGHT
      );
    });
    target.strokeStyle = "rgba(255, 255, 255, 0.6)";
    target.lineWidth = 4;
    target.beginPath();
    target.moveTo(0, CAMERA_FRAME_HEIGHT / 2);
    target.lineTo(CAMERA_FRAME_WIDTH, CAMERA_FRAME_HEIGHT / 2);
    target.closePath();
    target.stroke();
  }
}
