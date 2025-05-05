import ILevelFormat from "../types";
import { ColorGeometryProps, GeometryProps, LineGeometryProps } from "../types";

const goals = [
  [
    {
      start: 0,
      end: 1,
      color: "#ff3060",
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

const colorGeometries: ColorGeometryProps[] = [];

const groundGeometries: GeometryProps[] = [
  {
    points: [
      { x: 0, y: 500 },
      { x: 60, y: 500 },
      { x: 50, y: 650 },
      { x: 125, y: 700 },
      { x: 200, y: 750 },
      { x: 300, y: 780 },
      { x: 400, y: 830 },
      { x: 500, y: 800 },
      { x: 600, y: 830 },
      { x: 700, y: 780 },
      { x: 300, y: 1000 },
      { x: 0, y: 1000 },
    ],
  },
];

const levelData: ILevelFormat = {
  lines: lineGeometries,
  colors: colorGeometries,
  ground: groundGeometries,
  goals,
  playerPosition: { x: 100, y: 610 },
  timerPositions: [],
};

export default levelData;
