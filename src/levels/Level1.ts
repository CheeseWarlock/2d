import World from "../World.js";
import Line from "../Line.js";
import PolyBlock from "../PolyBlock.js";
import GrayscaleObject from "../GrayscaleObject.js";
import GameObject from "../IGameObject.js";
import Player from "../Player.js";
import GeometryObject from "../GeometryObject.js";
import CameraFrame from "../CameraFrame.js";

const world = new World();

const content: GameObject[] = [
  new PolyBlock(0, 100, 200, 200, "green", world),
  new PolyBlock(200, 200, 400, 400, "blue", world),
  new Line(400, 600, 600, 600, "orange", world),
  new Line(490, 605, 510, 605, "red", world),
  new Line(750, 700, 850, 700, "black", world),
  new GrayscaleObject(world, [{ x: 600, y: 800 }, { x: 700, y: 850 }, { x: 800, y: 800 }, { x: 900, y: 850 }, { x: 950, y: 825 }, {x: 950, y: 400 }, { x: 1000, y: 400 }, { x: 1000, y: 1000 }, { x: 900, y: 1000 }, { x: 0, y: 1000 }, { x: 0, y: 400 }, { x: 50, y: 400 }, { x: 50, y: 700 }, { x: 150, y: 700 }, { x: 150, y: 850 }, { x: 300, y: 850 }, { x: 500, y: 850 }, { x: 500, y: 700 }, { x: 600, y: 700 }]),
  // new GrayscaleObject(world, [{ x: 600, y: 850 }, { x: 900, y: 850 }, { x: 900, y: 1000 }, { x: 300, y: 900 }, { x: 300, y: 850 }, { x: 500, y: 850 }, { x: 500, y: 700 }, { x: 600, y: 700 }]),
  new Player(500, 500, world),
];

const goals: CameraFrame[] = [];

goals.push(new CameraFrame(
  [
    {
      "start": 0,
      "end": 1,
      "color": "blue"
    }
  ]
));
goals.push(new CameraFrame(
  [
    {
      "start": 0,
      "end": 0.5,
      "color": "white"
    },
    {
      "start": 0.5,
      "end": 1,
      "color": "black"
    }
  ]
));
goals.push(new CameraFrame(
  [
    {
      "start": 0,
      "end": 0.5,
      "color": "blue"
    },
    {
      "start": 0.5,
      "end": 1,
      "color": "black"
    }
  ]
));
goals.push(new CameraFrame(
  [
    {
      "start": 0,
      "end": 0.5,
      "color": "green"
    },
    {
      "start": 0.5,
      "end": 1,
      "color": "blue"
    }
  ]
));
goals.push(new CameraFrame(
  [
    {
        "start": 0,
        "end": 0.43376372719473855,
        "color": "orange"
    },
    {
        "start": 0.43376372719473855,
        "end": 0.5639745364278583,
        "color": "red"
    },
    {
        "start": 0.5639745364278583,
        "end": 1,
        "color": "orange"
    }
]
));
goals.push(new CameraFrame(
  [
    {
        "start": 0,
        "end": 0.1740706460704038,
        "color": "blue"
    },
    {
        "start": 0.1740706460704038,
        "end": 0.6728278902122806,
        "color": "orange"
    },
    {
        "start": 0.6728278902122806,
        "end": 0.7522016613094786,
        "color": "red"
    },
    {
        "start": 0.7522016613094786,
        "end": 0.844358411837284,
        "color": "orange"
    },
    {
        "start": 0.844358411837284,
        "end": 1,
        "color": "black"
    }
  ]
));

content.forEach(obj => {
  if (obj instanceof GeometryObject) {
    world.addGeometry(obj);
  }
})

world.objects = content;

export default {
  world,
  goals
};