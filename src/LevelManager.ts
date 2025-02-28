import CameraFrame from "./CameraFrame";
import ColorGeometry from "./gameObjects/ColorGeometry";
import ColorLineGeometry from "./gameObjects/ColorLineGeometry";
import GroundGeometry from "./gameObjects/GroundGeometry";
import Player from "./gameObjects/Player";
import World from "./World";
import multiShapeLevel from "./levels/Face";
import canyonLevel from "./levels/Face";
import ILevelFormat from "./levels/ILevelFormat";
import TeachesPhoto from "./levels/TeachesPhoto";
import newFace from "./levels/NewFace.json";
import jump from "./levels/Jump.json";
import Game from "./Game";
import TeachesJump from "./levels/TeachesJump.json";
import DodgeThings from "./levels/DodgeThings.json";
import SafetyToggler from "./gameObjects/SafetyToggler";
import EndingScreen from "./levels/EndingScreen";
import { GAME_LEVELS } from "./LevelIndex";

export class LevelManager {
  currentLevelIndex: number = 0;
  game: Game;

  constructor(game: Game) {
    this.game = game;
  }
  get currentLevel() {
    return this.loadLevel(GAME_LEVELS[this.currentLevelIndex]);
  }

  get levelCount() {
    return GAME_LEVELS.length;
  }

  getLevelData(index: number) {
    return GAME_LEVELS[index];
  }

  loadLevel = (levelData: ILevelFormat) => {
    const world = new World(this.game);
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

    levelData.timerPositions.forEach((pos) => {
      const timer = new SafetyToggler(pos);
      world.objects.push(timer);
      world.addGeometry(timer);
    });

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
