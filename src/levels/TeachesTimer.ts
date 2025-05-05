import ILevelFormat from "../types";
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
      { x: 300, y: 800 },
      { x: 300, y: 1000 },
      { x: 0, y: 1000 },
    ],
  },
  {
    points: [
      { x: 700, y: 600 },
      { x: 1000, y: 600 },
      { x: 1000, y: 1000 },
      { x: 700, y: 1000 },
    ],
  },
  {
    points: [
      { x: 0, y: 400 },
      { x: 300, y: 400 },
      { x: 300, y: 450 },
      { x: 0, y: 450 },
    ],
  },
];

const colorLines: LineGeometryProps[] = [];

const colorGeometries: ColorGeometryProps[] = [
  {
    color: "#dead3d",
    points: [
      { x: 400, y: 500 },
      { x: 600, y: 500 },
      { x: 600, y: 550 },
      { x: 400, y: 550 },
    ],
    motion: {
      offset: {
        x: 0,
        y: 200,
      },
      duration: 5000,
    },
  },
  {
    color: "blue",
    points: [
      { x: -50, y: -50 },
      { x: 50, y: -50 },
      { x: 50, y: 50 },
      { x: -50, y: 50 },
    ],
    origin: { x: 150, y: 200 },
    motion: {
      rotations: -1,
      duration: 8000,
    },
  },
];

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
  playerPosition: { x: 100, y: 650 },
  timerPositions: [
    { x: 200, y: 700 },
    { x: 800, y: 520 },
  ],
} as ILevelFormat;
