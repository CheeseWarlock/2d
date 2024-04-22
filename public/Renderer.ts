import CameraFrame from "./CameraFrame.js";
import Game from "./Game.js";
import Line from "./Line.js";
import PolyBlock from "./PolyBlock.js";

const CAMERA_SPACE_WIDTH = 400;
const DEPTH_RATIO = 2;

export default class Renderer {
  game: Game;
  context: CanvasRenderingContext2D;
  photoContext: CanvasRenderingContext2D;
  mousePosition: { x: number, y: number } = { x: 0, y: 0 };
  cameraFrame: CameraFrame;
  constructor() {
    const game = new Game()
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    document.body.appendChild(canvas);
    const context = canvas.getContext('2d')!;

    const photoCanvas = document.createElement('canvas');
    photoCanvas.width = 50;
    photoCanvas.height = 1000;
    document.body.appendChild(photoCanvas);
    this.game = game;
    this.context = context;
    this.photoContext = photoCanvas.getContext('2d')!;

    canvas.onmousemove = (ev) => {
      this.mousePosition.x = ev.offsetX;
      this.mousePosition.y = ev.offsetY;
    }

    document.body.onkeydown = (ev) => {
      this.game.keysDown.add(ev.key);
    }

    document.body.onkeyup = (ev) => {
      this.game.keysDown.delete(ev.key);
    }

    const cf = new CameraFrame();
    this.cameraFrame = cf;
  }

  draw() {
    this.game.focusPoint = this.mousePosition;
    this.game.tick();
    this.context.clearRect(0, 0, 1000, 1000);
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, 1000, 1000);
    this.context.fillStyle = "red";
    this.context.beginPath();
    this.context.arc(this.game.player.x, this.game.player.y, 20, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();
    this.game.visibleObjects.forEach(block => {
      if (block instanceof PolyBlock) {
        this.context.fillStyle = block.color;
        this.context.moveTo(block.points[0].x, block.points[0].y)
        this.context.beginPath();
        for (let i = 0; i != block.points.length; i++) {
          this.context.lineTo(block.points[i].x, block.points[i].y)
        }
        this.context.closePath();
        this.context.fill();
      }

      if (block instanceof Line) {
        this.context.strokeStyle = block.color;
        this.context.beginPath();
        this.context.moveTo(block.lineSegments[0].from.x, block.lineSegments[0].from.y);
        this.context.lineTo(block.lineSegments[0].to.x, block.lineSegments[0].to.y);
        this.context.closePath();
        this.context.stroke();
      }
      
    });

    // draw view cone
    this.context.strokeStyle = "#cccccc";
    this.context.beginPath();
    this.context.moveTo(this.game.player.x, this.game.player.y);
    this.context.lineTo(this.game.player.x + Math.cos(this.game.viewDirection - this.game.fov) * 1e6, this.game.player.y + Math.sin(this.game.viewDirection - this.game.fov) * 1e6);
    this.context.lineTo(this.game.player.x + Math.cos(this.game.viewDirection + this.game.fov) * 1e6, this.game.player.y + Math.sin(this.game.viewDirection + this.game.fov) * 1e6);
    this.context.lineTo(this.game.player.x, this.game.player.y);
    this.context.closePath();
    this.context.stroke();

    // draw view centerline
    this.context.strokeStyle = "black";
    this.context.beginPath();
    this.context.moveTo(this.game.player.x, this.game.player.y);
    this.context.lineTo(this.game.player.x + Math.cos(this.game.viewDirection) * 1e6, this.game.player.y + Math.sin(this.game.viewDirection) * 1e6);
    this.context.closePath();
    this.context.stroke();
  }

  drawCameraFrame() {
    this.photoContext.clearRect(0, 0, 50, 1000);
    this.game.cameraFrame.segments.forEach(segment => {
      this.photoContext.fillStyle = segment.color;
      this.photoContext.fillRect(0, segment.start * 1000, 50, (segment.end - segment.start) * 1000)
    })
    this.photoContext.strokeStyle = "black";
    this.photoContext.beginPath();
    this.photoContext.moveTo(0,500);
    this.photoContext.lineTo(50,500);
    this.photoContext.closePath();
    this.photoContext.stroke();
  }
}
