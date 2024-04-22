import Renderer from './Renderer.js';

const main = () => {
  const renderer = new Renderer();
  renderer.draw();
  renderer.drawCameraFrame();

  const update = () => {
    renderer.draw();
    renderer.drawCameraFrame();
    window.requestAnimationFrame(() => {
      update();
    });
  }

  update();
}

main();