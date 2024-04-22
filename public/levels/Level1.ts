import Line from "../Line.js";
import PolyBlock from "../PolyBlock.js";

const content = [
  new PolyBlock(100, 100, 200, 200, "green"),
  new PolyBlock(200, 200, 400, 400, "blue"),
  new Line(400, 600, 600, 600, "black"),
  new Line(490, 605, 510, 605, "red"),
];

const playerPosition = { x: 10, y: 40 };

export default {
  objects: content,
  playerPosition,
};