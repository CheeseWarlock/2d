import {
  AnimatedSprite,
  Application,
  Assets,
  Color,
  Graphics,
  Sprite,
  Spritesheet,
  TextureStyle,
} from "pixi.js";
import PixiRenderer from "./renderer/PixiRenderer";
import { FOV } from "./config";

export async function loadPixi() {
  // Create DOM elements
  const container = document.getElementById("game-world-container")!;
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;
  container.appendChild(canvas);
  const app = new Application();
  await app.init({
    antialias: true,
    width: 1000,
    height: 1000,
    background: "#fff",
    canvas,
  });

  // Load sprites
  TextureStyle.defaultOptions.scaleMode = "nearest";
  const playerSprite = new URL("./images/player.png", import.meta.url);

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
  const playerDeadSprite = new Sprite(sheet.textures.playerhurt);
  const playerWalkSprite = new AnimatedSprite(sheet.animations.enemy);

  playerWalkSprite.animationSpeed = 0.1;
  playerWalkSprite.anchor.set(0.5);
  playerWalkSprite.scale.x = -1;
  playerDeadSprite.anchor.set(0.5);

  playerWalkSprite.play();

  const viewCone = new Graphics()
    .setStrokeStyle({ width: 4, cap: "square" })
    .poly([
      0,
      0,
      2000 * Math.cos(-FOV),
      2000 * Math.sin(-FOV),
      2000 * Math.cos(FOV),
      2000 * Math.sin(FOV),
    ])
    .fill(new Color({ r: 255, g: 255, b: 255, a: 0.5 }))
    .moveTo(2000 * Math.cos(-FOV), 2000 * Math.sin(-FOV))
    .lineTo(0, 0)
    .stroke()
    .lineTo(2000 * Math.cos(FOV), 2000 * Math.sin(FOV))
    .stroke()
    .moveTo(0, 0)
    .lineTo(2000, 0)
    .stroke();

  // Now initialize a pixi renderer
  const renderer = new PixiRenderer({
    app,
    sprites: {
      playerDeadSprite,
      playerWalkSprite,
      viewCone,
    },
    canvas,
  });
}
