import {
  Quadtree,
  Line,
  Rectangle,
} from "@timohausmann/quadtree-ts/src/index.esm.js";

const quadtree = new Quadtree<Line>({ width: 1000, height: 1000 });

const data = [
  { x: 600, y: 800 },
  { x: 700, y: 850 },
  { x: 800, y: 800 },
  { x: 900, y: 850 },
  { x: 950, y: 825 },
  { x: 950, y: 400 },
  { x: 1000, y: 400 }, // next is missing
  { x: 1000, y: 1000 }, // nim
  { x: 900, y: 1000 }, // nim
  { x: 0, y: 1000 }, // nim
  { x: 0, y: 400 },
  { x: 50, y: 400 },
  { x: 50, y: 700 },
  { x: 150, y: 700 },
  { x: 150, y: 850 },
  { x: 300, y: 850 },
  { x: 500, y: 850 }, // nim
  { x: 500, y: 700 },
  { x: 600, y: 700 },
];

for (let i = 0; i != data.length; i++) {
  quadtree.insert(
    new Line({
      x1: data[i].x,
      y1: data[i].y,
      x2: data[(i + 1) % data.length].x,
      y2: data[(i + 1) % data.length].y,
    })
  );
}

console.log(
  quadtree.retrieve(
    new Rectangle({
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
    })
  ).length
);
