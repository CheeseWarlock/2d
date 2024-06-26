import Line from "../gameObjects/Line.js";
import PolyBlock from "../gameObjects/PolyBlock.js";
import GrayscaleObject from "../gameObjects/GrayscaleObject.js";
import CameraFrame from "../CameraFrame.js";
import ILevelFormat from "./ILevelFormat.js";
import GeometryObject from "../gameObjects/GeometryObject.js";

const geometries: GeometryObject[] = [
  new PolyBlock(0, 100, 200, 200, "green"),
  new PolyBlock(200, 200, 400, 400, "blue"),
  new Line({ x: 400, y: 600 }, { x: 600, y: 600 }, "black"),
  new Line({ x: 400, y: 610 }, { x: 600, y: 610 }, "orange"),
  new Line({ x: 490, y: 615 }, { x: 510, y: 615 }, "red"),
  new Line({ x: 750, y: 700 }, { x: 850, y: 700 }, "black"),
  new GrayscaleObject([
    { x: 600, y: 800 },
    { x: 700, y: 850 },
    { x: 800, y: 800 },
    { x: 900, y: 850 },
    { x: 950, y: 825 },
    { x: 950, y: 400 },
    { x: 1000, y: 400 }, // next is missing
    { x: 1000, y: 1000 }, // nim
    { x: 900, y: 1000 }, // nim
    { x: 0, y: 1000 }, // nim
    { x: 0, y: 400 },
    { x: 50, y: 400 },
    { x: 50, y: 700 },
    { x: 150, y: 700 },
    { x: 150, y: 850 },
    { x: 300, y: 850 },
    { x: 500, y: 850 }, // nim
    { x: 500, y: 700 },
    { x: 600, y: 700 },
  ]),
];

const goals: CameraFrame[] = [
  new CameraFrame([
    {
      start: 0,
      end: 1,
      color: "blue",
    },
  ]),
  new CameraFrame([
    {
      start: 0,
      end: 0.5,
      color: "empty",
    },
    {
      start: 0.5,
      end: 1,
      color: "black",
    },
  ]),
  new CameraFrame([
    {
      start: 0,
      end: 0.5,
      color: "blue",
    },
    {
      start: 0.5,
      end: 1,
      color: "black",
    },
  ]),
  new CameraFrame([
    {
      start: 0,
      end: 0.5,
      color: "green",
    },
    {
      start: 0.5,
      end: 1,
      color: "blue",
    },
  ]),
  new CameraFrame([
    {
      start: 0,
      end: 0.43376372719473855,
      color: "orange",
    },
    {
      start: 0.43376372719473855,
      end: 0.5639745364278583,
      color: "red",
    },
    {
      start: 0.5639745364278583,
      end: 1,
      color: "orange",
    },
  ]),
  new CameraFrame([
    {
      start: 0,
      end: 0.1740706460704038,
      color: "blue",
    },
    {
      start: 0.1740706460704038,
      end: 0.6728278902122806,
      color: "orange",
    },
    {
      start: 0.6728278902122806,
      end: 0.7522016613094786,
      color: "red",
    },
    {
      start: 0.7522016613094786,
      end: 0.844358411837284,
      color: "orange",
    },
    {
      start: 0.844358411837284,
      end: 1,
      color: "black",
    },
  ]),
];

export default {
  geometries,
  goals,
  playerPosition: { x: 500, y: 500 },
} as ILevelFormat;
