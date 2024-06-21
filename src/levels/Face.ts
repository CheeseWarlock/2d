import CameraFrame from "../CameraFrame";
import GeometryObject from "../gameObjects/GeometryObject";
import GameObject from "../gameObjects/IGameObject";
import Player from "../gameObjects/Player";
import PolyBlock from "../gameObjects/PolyBlock";
import World from "../World";
import { LevelData } from "../types";
import GrayscaleObject from "../gameObjects/GrayscaleObject";

const world = new World();

const content: LevelData = {
  world,
  goals: [
    new CameraFrame([
      {
        start: 0,
        end: 1,
        color: "#ff3060",
      },
    ]),
    new CameraFrame([
      {
        start: 0,
        end: 1,
        color: "#44e244",
      },
    ]),
  ],
};

const worldObjects: GameObject[] = [
  new PolyBlock(50, 100, 350, 200, "#44e244", content.world),
  new PolyBlock(650, 100, 950, 200, "#ff3060", content.world),
  new GrayscaleObject(
    [
      { x: 50, y: 400 },
      { x: 100, y: 400 },
      { x: 100, y: 600 },
      { x: 900, y: 600 },
      { x: 900, y: 400 },
      { x: 950, y: 400 },
      { x: 950, y: 700 },
      { x: 50, y: 700 },
    ],
    world
  ),
  new Player(700, 500, world),
];

worldObjects.forEach((obj) => {
  if (obj instanceof GeometryObject) {
    world.addGeometry(obj);
  }
});

world.objects = worldObjects;

export default content;
