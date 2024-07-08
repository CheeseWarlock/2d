import CameraFrame from "../CameraFrame";
import BaseGeometry from "../gameObjects/BaseGeometry";
import ColorGeometry from "../gameObjects/ColorGeometry";
import World from "../World";
import GroundGeometry from "../gameObjects/GroundGeometry";
import ILevelFormat from "./ILevelFormat";
import { ColorGeometryProps, GeometryProps, LineGeometryProps } from "../types";

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

const lineGeometries: LineGeometryProps[] = [];

const colorGeometries: ColorGeometryProps[] = [
  {
    points: [
      { x: 50, y: 100 },
      { x: 350, y: 100 },
      { x: 350, y: 200 },
      { x: 50, y: 200 },
    ],
    color: "#44e244",
    motion: {
      offset: {
        x: 0,
        y: 20,
      },
      duration: 1000,
      delay: 500,
    },
  },
  {
    points: [
      { x: 650, y: 100 },
      { x: 950, y: 100 },
      { x: 950, y: 200 },
      { x: 650, y: 200 },
    ],
    color: "#ff3060",
    motion: {
      offset: {
        x: 0,
        y: 20,
      },
      duration: 1000,
      delay: 0,
    },
  },
];

const groundGeometries: GeometryProps[] = [
  {
    points: [
      { x: 50, y: 400 },
      { x: 100, y: 400 },
      { x: 100, y: 600 },
      { x: 900, y: 600 },
      { x: 900, y: 400 },
      { x: 950, y: 400 },
      { x: 950, y: 700 },
      { x: 50, y: 700 },
    ],
  },
];

const levelData: ILevelFormat = {
  lines: lineGeometries,
  colors: colorGeometries,
  ground: groundGeometries,
  goals,
  playerPosition: { x: 700, y: 580 },
};

export default levelData;
