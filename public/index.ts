import Renderer from './Renderer.js';

const main = () => {
  const renderer = new Renderer();
  renderer.draw();
  renderer.drawCameraFrame();
  renderer.drawCameraSpace();

  const update = () => {
    renderer.draw();
    renderer.drawCameraFrame();
    renderer.drawCameraSpace();
    window.requestAnimationFrame(() => {
      update();
    });
  }

  update();
}

main();