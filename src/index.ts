import "./styles.css";
import Matter from "matter-js";
import decomp from "poly-decomp";
import aaa from "./second";
import { Quadtree } from "@timohausmann/quadtree-ts";

const myTree = new Quadtree({
  width: 800,
  height: 600,
  x: 0, // optional, default:  0
  y: 0, // optional, default:  0
  maxObjects: 10, // optional, default: 10
  maxLevels: 4, // optional, default:  4
});

const PI = Math.PI;

const huh = aaa;

var { Engine, Render, World, Bodies, Runner, Common } = Matter;

Common.setDecomp(decomp);

document.getElementById("app").innerHTML = `
<h1>Hello ${myTree}!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>`;

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 30, 30);
var boxB = Bodies.rectangle(450, 50, 30, 30);
Matter.Body.setInertia(boxA, Infinity);
Matter.Body.setInertia(boxB, Infinity);

var ground2 = Bodies.fromVertices(
  400,
  410,
  [
    [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 300 },
      { x: 300, y: 400 },
      { x: 0, y: 500 },
    ],
  ],
  { isStatic: true }
);
var ground = Bodies.rectangle(400, 510, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground2]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);
