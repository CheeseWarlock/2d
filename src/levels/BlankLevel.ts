import ILevelFormat from "../types";
import {
  CameraFrameProps,
  ColorGeometryProps,
  GeometryProps,
  LineGeometryProps,
} from "../types.js";

const groundGeometries: GeometryProps[] = [];

const colorLines: LineGeometryProps[] = [];

const colorGeometries: ColorGeometryProps[] = [];

const goals: CameraFrameProps[] = [
  [
    {
      start: 0,
      end: 1,
      color: "blue",
    },
  ],
];

export default {
  lines: colorLines,
  colors: colorGeometries,
  ground: groundGeometries,
  goals,
  playerPosition: { x: 500, y: 500 },
} as ILevelFormat;
