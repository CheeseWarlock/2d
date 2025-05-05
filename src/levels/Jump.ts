import ILevelFormat from "../types";
import { ColorGeometryProps, GeometryProps, LineGeometryProps } from "../types";

const goals = [
  [
    {
      start: 0,
      end: 1,
      color: "#44e244",
    },
  ],
  [
    {
      start: 0,
      end: 1,
      color: "#5522dd",
    },
  ],

  [
    {
      start: 0,
      end: 0.3727682139969808,
      color: "empty",
    },
    {
      start: 0.3727682139969808,
      end: 0.5311320768823284,
      color: "#44e244",
    },
    {
      start: 0.5311320768823284,
      end: 0.7166193134302858,
      color: "#5522dd",
    },
    {
      start: 0.7166193134302858,
      end: 1,
      color: "#44e244",
    },
  ],
  [
    {
      start: 0,
      end: 1,
      color: "#44e244",
    },
  ],
];

const lineGeometries: LineGeometryProps[] = [];

const colorGeometries: ColorGeometryProps[] = [
  {
    points: [
      { x: 0, y: 300 },
      { x: 0, y: 400 },
      { x: 150, y: 400 },
      { x: 150, y: 300 },
    ],
    color: "#44e244",
    motion: {
      offset: {
        x: 200,
        y: 200,
      },
      duration: 2500,
      delay: 1250,
    },
  },
];

const groundGeometries: GeometryProps[] = [
  {
    points: [
      { x: 0, y: 700 },
      { x: 1000, y: 700 },
      { x: 1000, y: 1000 },
      { x: 0, y: 1000 },
    ],
  },
];

const levelData: ILevelFormat = {
  lines: lineGeometries,
  colors: colorGeometries,
  ground: groundGeometries,
  goals,
  playerPosition: { x: 50, y: 610 },
  timerPositions: [],
};

export default levelData;
