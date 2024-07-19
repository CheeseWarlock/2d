import PixiRenderer from "./renderer/PixiRenderer.js";

let pixi: PixiRenderer;

const main = async () => {
  pixi = new PixiRenderer();
};

main();

export const DEBUG_MODE = true;

if (DEBUG_MODE) {
  const container = document.getElementById("debug-container")!;

  const importButton = document.createElement("input");
  importButton.setAttribute("type", "button");
  importButton.setAttribute("value", "Load From JSON");

  const exportButton = document.createElement("input");
  exportButton.setAttribute("type", "button");
  exportButton.setAttribute("value", "Write Current Level");

  const textarea = document.createElement("textarea");

  container.appendChild(importButton);

  container.appendChild(exportButton);

  container.appendChild(textarea);

  exportButton.onclick = () => {
    textarea.value = pixi!.game.levelManager.export();
  };

  importButton.onclick = () => {
    const d = pixi!.game.levelManager.import(textarea.value);
    pixi!.game.loadLevel2(d);
  };

  container.onmousedown = (e) => {
    e.stopPropagation();
  };
}
