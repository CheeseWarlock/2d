import { Application, Sprite, Graphics } from "pixi.js";

const ms = async () => {
  return new Promise<void>((res, rej) => {
    setTimeout(() => {
      res();
    }, 500);
  });
};

const renderPixi = async () => {
  // The application will create a renderer using WebGL, if possible,
  // with a fallback to a canvas render. It will also setup the ticker
  // and the root stage PIXI.Container
  const app = new Application();

  // Wait for the Renderer to be available
  console.log("before");
  await app.init({
    width: 1000,
    height: 1000,
  });

  // The application will create a canvas element for you that you
  // can then insert into the DOM
  document.body.appendChild(app.canvas);

  // load the texture we need
  const bunny = new Graphics().circle(100, 100, 50).fill("red");

  // Setup the position of the bunny
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  // Rotate around the center
  bunny.pivot.x = 0.5;
  bunny.pivot.y = 0.5;

  // Add the bunny to the scene we are building
  app.stage.addChild(bunny);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
  });

  console.log("27");
};

export default renderPixi;
