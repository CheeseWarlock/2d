import Game from "./Game.js";

export default class Renderer {
  game: Game;
  context: CanvasRenderingContext2D;
  mousePosition: { x: number, y: number } = { x: 0, y: 0 };
  constructor() {
    const game = new Game()
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    document.body.appendChild(canvas);
    const context = canvas.getContext('2d')!;
    this.game = game;
    this.context = context;

    canvas.onmousemove = (ev) => {
      this.mousePosition.x = ev.offsetX;
      this.mousePosition.y = ev.offsetY;
    }

    document.body.onkeydown = (ev) => {
      console.log(ev.key);
      this.game.keysDown.add(ev.key);
    }

    document.body.onkeyup = (ev) => {
      console.log(ev.key);
      this.game.keysDown.delete(ev.key);
    }
  }

  draw() {
    this.game.focusPoint = this.mousePosition;
    this.game.tick();
    this.context.clearRect(0, 0, 1000, 1000);
    this.context.fillStyle = "red";
    this.context.beginPath();
    this.context.arc(this.game.player.x, this.game.player.y, 20, 0, Math.PI * 2);
    this.context.fill();
    this.context.closePath();
    this.game.blocks.forEach(block => {
      this.context.fillStyle = "green";
      this.context.fillRect(block.x1, block.y1, block.x2 - block.x1, block.y2 - block.y1);
    });

    // draw view cone
    this.context.fillStyle = "#cccccc";
    this.context.beginPath();
    this.context.moveTo(this.game.player.x, this.game.player.y);
    this.context.lineTo(this.game.player.x + Math.cos(this.game.viewDirection - this.game.fov) * 1e6, this.game.player.y + Math.sin(this.game.viewDirection - this.game.fov) * 1e6);
    this.context.lineTo(this.game.player.x + Math.cos(this.game.viewDirection + this.game.fov) * 1e6, this.game.player.y + Math.sin(this.game.viewDirection + this.game.fov) * 1e6);
    this.context.lineTo(this.game.player.x, this.game.player.y);
    this.context.closePath();
    this.context.fill();

    // draw view centerline
    this.context.strokeStyle = "black";
    this.context.beginPath();
    this.context.moveTo(this.game.player.x, this.game.player.y);
    this.context.lineTo(this.game.player.x + Math.cos(this.game.viewDirection) * 1e6, this.game.player.y + Math.sin(this.game.viewDirection) * 1e6);
    this.context.closePath();
    this.context.stroke();
  }
}
