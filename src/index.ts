import PixiRenderer from "./renderer/PixiRenderer.js";

// @ts-ignore
window.addEventListener("parcelhmraccept", () => {
  window.location.reload();
});

const main = async () => {
  const pixi = new PixiRenderer();
};

main();
