import World from "./World";

export default interface GameObject {
  world: World;
  tick: () => void;
}