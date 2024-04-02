import Renderer from './Renderer.js';

const main = () => {
  const renderer = new Renderer();
  renderer.draw();

  const update = () => {
    renderer.draw();
    window.requestAnimationFrame(() => {
      update();
    });
  }

  update();
}

main();