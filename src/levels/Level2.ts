import CameraFrame from "../CameraFrame";
import GeometryObject from "../GeometryObject";
import GameObject from "../IGameObject";
import Player from "../Player";
import PolyBlock from "../PolyBlock";
import World from "../World";
import { LevelData } from "../types";

const world = new World();

const content: LevelData = {
  world,
  goals: [
    new CameraFrame([
      {
        start: 0,
        end: 1,
        color: "red",
      },
    ]),
  ],
};

const worldObjects: GameObject[] = [
  new PolyBlock(0, 100, 200, 200, "green", content.world),
  new Player(500, 500, world),
];

worldObjects.forEach((obj) => {
  if (obj instanceof GeometryObject) {
    world.addGeometry(obj);
  }
});

world.objects = worldObjects;

export default content;
