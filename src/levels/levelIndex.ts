import CameraFrame from "../CameraFrame";
import ColorGeometry from "../gameObjects/ColorGeometry";
import ColorLineGeometry from "../gameObjects/ColorLineGeometry";
import GroundGeometry from "../gameObjects/GroundGeometry";
import Player from "../gameObjects/Player";
import World from "../World";
import multiShapeLevel from "./Face";
import canyonLevel from "./Face";
import ILevelFormat from "./ILevelFormat";
import introLevel from "./IntroLevel";
import newFace from "./NewFace.json";
import jump from "./Jump.json";

export const GAME_LEVELS: ILevelFormat[] = [
  introLevel,
  newFace,
  jump,
  multiShapeLevel,
  canyonLevel,
];

export class LevelManager {
  currentLevelIndex: number = 0;
  get currentLevel() {
    return this.loadLevel(GAME_LEVELS[this.currentLevelIndex]);
  }

  loadLevel = (levelData: ILevelFormat) => {
    const world = new World();
    levelData.ground.forEach((g) => {
      const geo = new GroundGeometry(
        [...g.points.map((m) => ({ x: m.x, y: m.y }))],
        g.color
      );
      world.addGeometry(geo);
    });
    levelData.lines.forEach((l) => {
      const geo = new ColorLineGeometry(l.from, l.to, l.color);
      world.addGeometry(geo);
    });
    levelData.colors.forEach((c) => {
      const geo = new ColorGeometry(
        [...c.points.map((m) => ({ x: m.x, y: m.y }))],
        c.color,
        c.motion,
        c.rotation || 0,
        c.origin || { x: 0, y: 0 }
      );
      world.addGeometry(geo);
    });

    const player = new Player(
      levelData.playerPosition.x,
      levelData.playerPosition.y,
      world
    );
    world.objects.push(player);

    const goals = levelData.goals.map((goal) => new CameraFrame(goal));

    return {
      world,
      goals,
      player,
    };
  };

  import = (json: string) => {
    const data = JSON.parse(json) as ILevelFormat;
    return this.loadLevel(data);
  };

  export = () => {
    return JSON.stringify(GAME_LEVELS[this.currentLevelIndex], null, 2);
  };
}
