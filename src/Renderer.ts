import CameraFrame from "./CameraFrame.js";
import Game from "./Game.js";
import GrayscaleObject from "./gameObjects/GrayscaleObject.js";
import Line from "./gameObjects/Line.js";
import PolyBlock from "./gameObjects/PolyBlock.js";

const CLEAR_COLOR_FOR_CAMERA_FRAMES = "#222";

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

  constructor() {
    const game = new Game();
    const canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    document.body.appendChild(canvas);

    const photoCanvas = document.createElement("canvas");
    photoCanvas.width = 50;
    photoCanvas.height = 1000;
    document.body.appendChild(photoCanvas);

    const goalCanvas = document.createElement("canvas");
    goalCanvas.width = 50;
    goalCanvas.height = 1000;
    document.body.appendChild(goalCanvas);

    this.renderingContexts = {
      gameWorld: canvas.getContext("2d")!,
      playerFrame: photoCanvas.getContext("2d")!,
      goalFrame: goalCanvas.getContext("2d")!,
    };

    this.game = game;

    canvas.onmousemove = (ev) => {
      this.mousePosition.x = ev.offsetX;
      this.mousePosition.y = ev.offsetY;
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

    this.createStars();
  }

  createStars() {
    const NUM_STARS = 20;
    let starsRemaining = NUM_STARS;
    while (starsRemaining > 0) {
      starsRemaining -= 1;
      const starX = Math.round(Math.random() * 1000);
      const starY = Math.round(Math.random() ** 2 * 1000);
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
    context.clearRect(0, 0, 1000, 1000);

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
    const gradient = context.createLinearGradient(0, 0, 0, 1000);
    gradient.addColorStop(0, "#222");
    gradient.addColorStop(0.7, "#444");
    gradient.addColorStop(1, "#666");
    context.closePath();
    context.fillStyle = gradient;
    context.fillRect(0, 0, 1000, 1000);
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
    context.lineWidth = 3;
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
    // uhh directions
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
    target.clearRect(0, 0, 50, 1000);
    target.fillStyle = CLEAR_COLOR_FOR_CAMERA_FRAMES;
    target.fillRect(0, 0, 50, 1000);
    frame.segments.forEach((segment) => {
      target.fillStyle = segment.color;
      target.fillRect(
        0,
        segment.start * 1000,
        50,
        (segment.end - segment.start) * 1000
      );
    });
    target.strokeStyle = "black";
    target.beginPath();
    target.moveTo(0, 500);
    target.lineTo(50, 500);
    target.closePath();
    target.stroke();
  }
}
