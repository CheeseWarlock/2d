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
        x: 40,
        y: 570,
      },
      { x: 40, y: 650 },
      { x: 120, y: 660 },
      { x: 120, y: 740 },
      {
        x: 190,
        y: 770,
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
      { x: 950, y: 500 },
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
      {
        x: 870,
        y: 788,
      },
      {
        x: 870,
        y: 820,
      },
      { x: 850, y: 840 },
      { x: 820, y: 840 },
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
      {
        x: 760,
        y: 695,
      },
      {
        x: 760,
        y: 730,
      },
      { x: 750, y: 742 },
      { x: 720, y: 750 },
      {
        x: 665,
        y: 730,
      },
    ],
  },
  {
    points: [
      {
        x: 690,
        y: 530,
      },
      {
        x: 690,
        y: 550,
      },
      { x: 740, y: 560 },
      {
        x: 790,
        y: 550,
      },
      {
        x: 790,
        y: 530,
      },
    ],
  },
];

const colorLines: LineGeometryProps[] = [];

const colorGeometries: ColorGeometryProps[] = [
  {
    points: [
      { x: -20, y: -70 },
      { x: -20, y: 70 },
      { x: 20, y: 70 },
      { x: 20, y: -70 },
    ],
    origin: { x: 355, y: 410 },
    rotation: 0.3,
    color: "#de60f2",
    motion: {
      rotations: 1,
      duration: 8000,
    },
  },
  {
    points: [
      { x: -20, y: -70 },
      { x: -20, y: 70 },
      { x: 20, y: 70 },
      { x: 20, y: -70 },
    ],
    origin: { x: 525, y: 410 },
    rotation: 0.3 + Math.PI / 2,
    color: "#c0ff33",
    motion: {
      rotations: 1,
      duration: 8000,
    },
  },
];

const goals: CameraFrameProps[] = [
  [
    {
      start: 0,
      end: 0.5,
      color: "#de60f2",
    },
    { start: 0.5, end: 1, color: "#c0ff33" },
  ],
  [
    {
      start: 0,
      end: 0.2110755541438326,
      color: "empty",
    },
    {
      start: 0.2110755541438326,
      end: 0.34131511956826993,
      color: "#c0ff33",
    },
    {
      start: 0.34131511956826993,
      end: 0.7013945400966103,
      color: "#de60f2",
    },
    {
      start: 0.7013945400966103,
      end: 0.8084691042679413,
      color: "#c0ff33",
    },
    {
      start: 0.8084691042679413,
      end: 1,
      color: "#000000",
    },
  ],
  [
    {
      start: 0,
      end: 0.287734959269633,
      color: "empty",
    },
    {
      start: 0.287734959269633,
      end: 0.38969435004121866,
      color: "#de60f2",
    },
    {
      start: 0.38969435004121866,
      end: 0.6536828369633474,
      color: "#c0ff33",
    },
    {
      start: 0.6536828369633474,
      end: 0.8203567490692016,
      color: "#de60f2",
    },
    {
      start: 0.8203567490692016,
      end: 0.9156205565882543,
      color: "empty",
    },
    {
      start: 0.9156205565882543,
      end: 1,
      color: "#000000",
    },
  ],
];

export default {
  lines: colorLines,
  colors: colorGeometries,
  ground: groundGeometries,
  goals,
  playerPosition: { x: 290, y: 755 },
  timerPositions: [],
} as ILevelFormat;
