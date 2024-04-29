import World from "../World.js";
import Line from "../Line.js";
import PolyBlock from "../PolyBlock.js";
import GrayscaleObject from "../GrayscaleObject.js";
import GameObject from "../IGameObject.js";
import Player from "../Player.js";
import GeometryObject from "../GeometryObject.js";

const world = new World();

const content: GameObject[] = [
  new PolyBlock(0, 100, 200, 200, "green", world),
  new PolyBlock(200, 200, 400, 400, "blue", world),
  new Line(400, 600, 600, 600, "black", world),
  new Line(490, 605, 510, 605, "red", world),
  new GrayscaleObject(world, [{ x: 600, y: 800 }, { x: 700, y: 850 }, { x: 800, y: 800 }, { x: 900, y: 850 }, { x: 900, y: 900 }, { x: 300, y: 900 }, { x: 300, y: 850 }, { x: 500, y: 850 }, { x: 500, y: 700 }, { x: 600, y: 700 }]),
  new Player(10, 40, world),
];

content.forEach(obj => {
  if (obj instanceof GeometryObject) {
    world.addGeometry(obj);
  }
})

world.objects = content;

export default {
  world,
};