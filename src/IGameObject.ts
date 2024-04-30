import World from "./World.js";

export default interface GameObject {
  world: World;
  tick: () => void;
}