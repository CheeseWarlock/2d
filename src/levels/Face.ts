import CameraFrame from "../CameraFrame";
import GeometryObject from "../gameObjects/GeometryObject";
import PolyBlock from "../gameObjects/PolyBlock";
import World from "../World";
import GrayscaleObject from "../gameObjects/GrayscaleObject";
import ILevelFormat from "./ILevelFormat";

const world = new World();

const goals = [
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
];

const geometries: GeometryObject[] = [
  new PolyBlock(50, 100, 350, 200, "#44e244"),
  new PolyBlock(650, 100, 950, 200, "#ff3060"),
  new GrayscaleObject([
    { x: 50, y: 400 },
    { x: 100, y: 400 },
    { x: 100, y: 600 },
    { x: 900, y: 600 },
    { x: 900, y: 400 },
    { x: 950, y: 400 },
    { x: 950, y: 700 },
    { x: 50, y: 700 },
  ]),
];

const levelData: ILevelFormat = {
  goals,
  geometries,
  playerPosition: { x: 700, y: 580 },
};

export default levelData;
