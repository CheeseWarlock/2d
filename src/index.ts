import PixiRenderer from "./PixiRenderer.ts";
import Renderer from "./Renderer.js";

// @ts-ignore
window.addEventListener("parcelhmraccept", () => {
  window.location.reload();
});

const main = async () => {
  const pixi = new PixiRenderer();
};

main();
