import ILevelFormat from "./ILevelFormat.js";
import {
  CameraFrameProps,
  ColorGeometryProps,
  GeometryProps,
  LineGeometryProps,
} from "../types.js";

const groundGeometries: GeometryProps[] = [
  {
    points: [
      { x: 0, y: 800 },
      { x: 250, y: 800 },
      { x: 350, y: 840 },
      { x: 550, y: 820 },
      { x: 800, y: 860 },
      { x: 1000, y: 860 },
      { x: 1000, y: 1000 },
      { x: 0, y: 1000 },
    ],
  },
  {
    points: [
      { x: 20, y: 800 },
      { x: 20, y: 740 },
      { x: 5, y: 740 },
      { x: 35, y: 725 },
      { x: 50, y: 725 },
      { x: 50, y: 705 },
      { x: 60, y: 705 },
      { x: 60, y: 725 },
      { x: 105, y: 725 },
      { x: 135, y: 740 },
      { x: 120, y: 740 },
      { x: 120, y: 800 },
    ],
    color: "#666",
  },
];

const colorLines: LineGeometryProps[] = [];

const colorGeometries: ColorGeometryProps[] = [
  {
    points: [
      { x: -60, y: 60 },
      { x: -60, y: -60 },
      { x: 60, y: -60 },
      { x: 60, y: 60 },
    ],
    origin: { x: 750, y: 200 },
    rotation: 0.3,
    color: "#de60f2",
  },
  {
    points: [
      { x: -30, y: 30 },
      { x: -30, y: -30 },
      { x: 30, y: -30 },
      { x: 30, y: 30 },
    ],
    origin: { x: 550, y: 750 },
    color: "#de60f2",
    motion: {
      offset: { x: 0, y: 0 },
      delay: 0,
      duration: 1000,
    },
  },
];

const goals: CameraFrameProps[] = [
  [
    {
      start: 0,
      end: 0.32,
      color: "empty",
    },
    {
      start: 0.32,
      end: 0.68,
      color: "#de60f2",
    },
    { start: 0.68, end: 1, color: "empty" },
  ],
];

export default {
  lines: colorLines,
  colors: colorGeometries,
  ground: groundGeometries,
  goals,
  playerPosition: { x: 583, y: 803.68 },
} as ILevelFormat;
