import {
  AlphaFilter,
  AnimatedSprite,
  Application,
  Assets,
  Color,
  Container,
  Filter,
  Geometry,
  GlProgram,
  Graphics,
  Mesh,
  Shader,
  Sprite,
  Spritesheet,
  TextureStyle,
} from "pixi.js";
import PixiRenderer from "./renderer/PixiRenderer";
import { FOV } from "./config";
import fragment from "./renderer/2fragment.glsl";
import vertex from "./renderer/2vertex.glsl";
import { ColorGradientFilter } from "pixi-filters";

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
  const alphaSprite = new URL("./images/alpha.png", import.meta.url);

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
  const alphaTexture = await Assets.load(alphaSprite.href);

  const viewConeAlphaSprite = new Sprite(alphaTexture);
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
    .setStrokeStyle({ width: 4, cap: "square", alpha: 0.3 })
    .poly([
      0,
      0,
      2000 * Math.cos(-FOV),
      2000 * Math.sin(-FOV),
      2000 * Math.cos(FOV),
      2000 * Math.sin(FOV),
    ])
    .fill(new Color({ r: 255, g: 255, b: 255, a: 0.3 }))
    .moveTo(0, 0)
    .lineTo(2000, 0)
    .stroke();

  const viewConeAlphaMask = new Graphics()
    .setStrokeStyle({ width: 4, cap: "square" })
    .poly([
      0,
      0,
      2000 * Math.cos(-FOV),
      2000 * Math.sin(-FOV),
      2000 * Math.cos(FOV),
      2000 * Math.sin(FOV),
    ])
    .fill();

  const hm: Container = new Container();
  hm.addChild(viewCone);
  hm.addChild(viewConeAlphaSprite);
  hm.addChild(viewConeAlphaMask);
  viewConeAlphaSprite.anchor.x = 0;
  viewConeAlphaSprite.anchor.y = 0;
  viewConeAlphaSprite.rotation = -FOV;
  viewConeAlphaSprite.mask = viewConeAlphaMask;
  hm.alpha = 0.7;
  viewConeAlphaSprite.alpha = 0.7;

  // Now initialize a pixi renderer
  const renderer = new PixiRenderer({
    app,
    sprites: {
      playerDeadSprite,
      playerWalkSprite,
      viewCone: hm,
    },
    canvas,
  });
}
