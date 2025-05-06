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
      { x: 70, y: 800 },
      { x: 170, y: 810 },
      { x: 170, y: 740 },
      { x: 240, y: 740 },
      { x: 240, y: 820 },
      { x: 590, y: 800 },
      { x: 625, y: 820 },
      { x: 870, y: 820 },
      { x: 1000, y: 790 },
      { x: 1000, y: 1000 },
      { x: 0, y: 1000 },
    ],
  },
];

const colorLines: LineGeometryProps[] = [];

const colorGeometries: ColorGeometryProps[] = [
  {
    points: [
      { x: -33, y: -33 },
      { x: -33, y: 33 },
      { x: 33, y: 33 },
      { x: 33, y: -33 },
    ],
    color: "#ff9050",
    rotation: -0.1,
    origin: { x: 580, y: 640 },
    motion: {
      offset: {
        x: 0,
        y: 4,
      },
    },
  },
  {
    points: [
      { x: -41, y: -156 },
      { x: -41, y: 156 },
      { x: 41, y: 156 },
      { x: 41, y: -156 },
    ],
    color: "#ddee22",
    rotation: 0.15,
    origin: { x: 770, y: 600 },
    motion: {
      delay: 660,
    },
  },
];

const goals: CameraFrameProps[] = [
  [
    {
      start: 0,
      end: 0.3,
      color: "#ddee22",
    },
    {
      start: 0.3,
      end: 0.7,
      color: "#ff9050",
    },
    {
      start: 0.7,
      end: 1,
      color: "#ddee22",
    },
  ],
  [
    {
      start: 0,
      end: 1,
      color: "#ff9050",
    },
  ],
];

export default {
  lines: colorLines,
  colors: colorGeometries,
  ground: groundGeometries,
  goals,
  playerPosition: { x: 70, y: 700 },
  timerPositions: [],
} as ILevelFormat;
