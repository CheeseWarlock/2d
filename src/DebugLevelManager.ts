import PixiRenderer from "./renderer/PixiRenderer";

export class DebugLevelManager {
  renderer: PixiRenderer;
  constructor(renderer: PixiRenderer) {
    this.renderer = renderer;
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
      textarea.value = this.renderer.game.levelManager.export();
    };

    importButton.onclick = () => {
      const d = this.renderer.game.levelManager.import(textarea.value);
      this.renderer.game.currentLevelData = textarea.value;
      this.renderer.game.loadLevelFromData(d);
    };

    container.onkeydown = (e) => {
      e.stopPropagation();
    };

    container.onmousedown = (e) => {
      e.stopPropagation();
    };
  }
}
