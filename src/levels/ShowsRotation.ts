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
      {
        x: 0,
        y: 560,
      },
      {
        x: 120,
        y: 570,
      },
      { x: 120, y: 680 },
      {
        x: 190,
        y: 720,
      },
      {
        x: 310,
        y: 820,
      },
      {
        x: 470,
        y: 840,
      },
      {
        x: 510,
        y: 870,
      },
      {
        x: 550,
        y: 870,
      },
      {
        x: 620,
        y: 910,
      },
      {
        x: 720,
        y: 900,
      },
      {
        x: 800,
        y: 890,
      },
      {
        x: 950,
        y: 890,
      },
      {
        x: 950,
        y: 700,
      },
      {
        x: 900,
        y: 690,
      },
      {
        x: 900,
        y: 640,
      },
      { x: 960, y: 640 },
      { x: 960, y: 500 },
      { x: 910, y: 490 },
      { x: 910, y: 460 },
      {
        x: 1000,
        y: 460,
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
  {
    points: [
      {
        x: 800,
        y: 790,
      },
      { x: 830, y: 784 },
      {
        x: 860,
        y: 790,
      },
      {
        x: 860,
        y: 820,
      },
      {
        x: 800,
        y: 820,
      },
    ],
  },
  {
    points: [
      {
        x: 665,
        y: 690,
      },
      { x: 690, y: 685 },
      {
        x: 760,
        y: 695,
      },
      {
        x: 760,
        y: 730,
      },
      {
        x: 665,
        y: 730,
      },
    ],
  },
  {
    points: [
      {
        x: 790,
        y: 540,
      },
      {
        x: 790,
        y: 560,
      },
      {
        x: 850,
        y: 560,
      },
      {
        x: 850,
        y: 540,
      },
    ],
  },
];

const colorLines: LineGeometryProps[] = [];

const colorGeometries: ColorGeometryProps[] = [
  {
    points: [
      { x: -50, y: 45 },
      { x: -65, y: -40 },
      { x: 75, y: -70 },
      { x: 50, y: 65 },
    ],
    origin: { x: 775, y: 170 },
    rotation: 0.3,
    color: "#de60f2",
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
  playerPosition: { x: 690, y: 655 },
  timerPositions: [],
} as ILevelFormat;
