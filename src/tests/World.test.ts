import World, { CollisionGroups } from "../World";
import Game from "../Game";
import BaseGeometry from "../gameObjects/BaseGeometry";
import { Rectangle } from "@timohausmann/quadtree-ts";
import ColorLineGeometry from "../gameObjects/ColorLineGeometry";

jest.mock("../config");

describe("World", () => {
  let game: Game;
  let world: World;

  beforeEach(() => {
    game = new Game();
    world = new World(game);
  });

  it("should initialize with correct size and empty objects", () => {
    expect(world.size).toEqual({ width: 1000, height: 1000 });
    expect(world.objects).toEqual([]);
  });

  it("should add geometry and update quadtree", () => {
    const geometry = new ColorLineGeometry(
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      "#ffffff"
    );

    world.addGeometry(geometry);

    expect(world.objects).toContain(geometry);
    const retrieved = world.quadtree.retrieve(
      new Rectangle({
        x: 0,
        y: 0,
        width: 10,
        height: 10,
      })
    );
    expect(retrieved.length).toBeGreaterThan(0);
  });

  it("should return geometry objects", () => {
    const geometry = new BaseGeometry();
    world.addGeometry(geometry);

    expect(world.geometryObjects).toContain(geometry);
  });

  it("should calculate photo content correctly", () => {
    const geometry = new ColorLineGeometry(
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      "#ffffff"
    );

    world.addGeometry(geometry);

    const cameraFrame = world.calculatePhotoContent(
      { x: 5, y: 5 },
      Math.PI / 4,
      Math.PI / 6
    );

    expect(cameraFrame.segments.length).toBeGreaterThan(0);
    expect(cameraFrame.segments[0].color).toBe("#ffffff");
    expect(cameraFrame.segments[1].color).toBe("#ffffff");
  });

  it("should detect collisions correctly", () => {
    const geometry = new ColorLineGeometry(
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      "#ffffff"
    );

    world.addGeometry(geometry);

    const collision = world.collisionTest(
      5,
      -5,
      5,
      5,
      10,
      CollisionGroups.solid
    );

    expect(collision.collisionFound).toBe(true);
    expect(collision.maxSafe).toBe(0);
  });

  it("should update objects and quadtree", () => {
    const geometry = new ColorLineGeometry(
      { x: 0, y: 0 },
      { x: 10, y: 10 },
      "#ffffff"
    );
    geometry.tick = jest.fn();

    world.addGeometry(geometry);
    world.update();

    expect(geometry.tick).toHaveBeenCalled();
    const retrieved = world.quadtree.retrieve(
      new Rectangle({
        x: 0,
        y: 0,
        width: 10,
        height: 10,
      })
    );
    expect(retrieved.length).toBeGreaterThan(0);
  });
});
