import ILevelFormat from "./ILevelFormat";

const levelData: ILevelFormat = {
  lines: [],
  colors: [],
  ground: [
    {
      points: [
        {
          x: 0,
          y: 600,
        },
        { x: 1000, y: 600 },
        { x: 1000, y: 1000 },
        { x: 0, y: 1000 },
      ],
    },
  ],
  goals: [
    [
      {
        start: 0,
        end: 1,
        color: "#ff3060",
      },
    ],
  ],
  playerPosition: { x: 100, y: 500 },
  timerPositions: [],
};

export default levelData;
