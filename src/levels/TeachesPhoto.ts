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
    color: "#666666",
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
    color: "#DE60F2",
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
      color: "#DE60F2",
    },
    { start: 0.68, end: 1, color: "empty" },
  ],
];

export default {
  lines: colorLines,
  colors: colorGeometries,
  ground: groundGeometries,
  goals,
  playerPosition: { x: 135, y: 780 },
  timerPositions: [],
} as ILevelFormat;
