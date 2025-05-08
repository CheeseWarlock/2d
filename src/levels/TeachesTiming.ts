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
        y: 700,
      },
      {
        x: 300,
        y: 710,
      },
      {
        x: 750,
        y: 695,
      },
      {
        x: 1000,
        y: 700,
      },
      {
        x: 1000,
        y: 1000,
      },
      { x: 0, y: 1000 },
    ],
  },
];

const colorLines: LineGeometryProps[] = [];

const colorGeometries: ColorGeometryProps[] = [
  {
    color: "#c0ffee",
    points: [
      { x: -225, y: -25 },
      { x: -225, y: 25 },
      { x: -175, y: 25 },
      { x: -175, y: -25 },
    ],
    rotation: 0.4,
    origin: { x: 500, y: 300 },
    motion: {
      rotations: 1,
      duration: 14000,
    },
  },
  {
    color: "#c0ffee",
    points: [
      { x: -225, y: -25 },
      { x: -225, y: 25 },
      { x: -175, y: 25 },
      { x: -175, y: -25 },
    ],
    rotation: 0.6,
    origin: { x: 500, y: 300 },
    motion: {
      rotations: 1,
      duration: 14000,
      delay: 7000,
    },
  },
  {
    color: "#eecc44",
    points: [
      { x: 120, y: 0 },
      { x: 84.863, y: 84.863 },
      { x: 0, y: 120 },
      { x: -84.863, y: 84.863 },
      { x: -120, y: 0 },
      { x: -84.863, y: -84.863 },
      { x: 0, y: -120 },
      { x: 84.863, y: -84.863 },
    ],
    rotation: 0.3,
    origin: { x: 500, y: 300 },
    motion: {
      rotations: -1,
      duration: 26000,
    },
  },
];

const goals: CameraFrameProps[] = [
  [
    {
      start: 0,
      end: 0.28,
      color: "#eecc44",
    },
    {
      start: 0.28,
      end: 0.72,
      color: "#c0ffee",
    },
    {
      start: 0.72,
      end: 1,
      color: "#eecc44",
    },
  ],
  [
    {
      start: 0,
      end: 0.5,
      color: "#eecc44",
    },
    {
      start: 0.5,
      end: 0.75,
      color: "empty",
    },
    { start: 0.75, end: 1, color: "#c0ffee" },
  ],
  [
    {
      start: 0,
      end: 0.4,
      color: "empty",
    },
    {
      start: 0.4,
      end: 0.5,
      color: "#c0ffee",
    },
    {
      start: 0.5,
      end: 1,
      color: "#eecc44",
    },
  ],
];

export default {
  lines: colorLines,
  colors: colorGeometries,
  ground: groundGeometries,
  goals,
  playerPosition: { x: 100, y: 500 },
  timerPositions: [],
} as ILevelFormat;
