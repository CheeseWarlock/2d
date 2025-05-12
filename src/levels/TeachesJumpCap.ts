import ILevelFormat from "../types";
import {
  CameraFrameProps,
  ColorGeometryProps,
  GeometryProps,
  LineGeometryProps,
} from "../types";

const groundGeometries: GeometryProps[] = [
  {
    points: [
      {
        x: 0,
        y: 800,
      },
      {
        x: 240,
        y: 780,
      },
      {
        x: 240,
        y: 690,
      },
      {
        x: 490,
        y: 640,
      },
      {
        x: 490,
        y: 580,
      },
      {
        x: 640,
        y: 510,
      },
      {
        x: 640,
        y: 460,
      },
      {
        x: 790,
        y: 390,
      },
      {
        x: 790,
        y: 190,
      },
      {
        x: 1000,
        y: 120,
      },
      {
        x: 1000,
        y: 1000,
      },
      {
        x: 0,
        y: 1000,
      },
    ],
  },
];

const colorLines: LineGeometryProps[] = [];

const colorGeometries: ColorGeometryProps[] = [
  {
    color: "#90F263",
    points: [
      { x: -50, y: -50 },
      { x: 50, y: -50 },
      { x: 50, y: 50 },
      { x: -50, y: 50 },
    ],
    origin: { x: 275, y: 120 },
  },
];

const goals: CameraFrameProps[] = [
  [
    {
      start: 0,
      end: 1,
      color: "#90F263",
    },
  ],
];

export default {
  lines: colorLines,
  colors: colorGeometries,
  ground: groundGeometries,
  goals,
  playerPosition: { x: 80, y: 700 },
  timerPositions: [],
} as ILevelFormat;
