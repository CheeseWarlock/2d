import uh from "./PixiRenderer.ts";
import Renderer from "./Renderer.js";

// @ts-ignore
window.addEventListener("parcelhmraccept", () => {
  window.location.reload();
});

const main = async () => {
  const renderer = new Renderer();
  await uh();
  renderer.draw();

  const update = () => {
    renderer.draw();
    window.requestAnimationFrame(() => {
      update();
    });
  };

  update();
};

main();
