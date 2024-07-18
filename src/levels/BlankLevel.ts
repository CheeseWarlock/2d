import ILevelFormat from "./ILevelFormat.js";
import {
  CameraFrameProps,
  ColorGeometryProps,
  GeometryProps,
  LineGeometryProps,
} from "../types.js";

const groundGeometries: GeometryProps[] = [];

const colorLines: LineGeometryProps[] = [];

const colorGeometries: ColorGeometryProps[] = [];

const goals: CameraFrameProps[] = [];

export default {
  lines: colorLines,
  colors: colorGeometries,
  ground: groundGeometries,
  goals,
  playerPosition: { x: 500, y: 500 },
} as ILevelFormat;
