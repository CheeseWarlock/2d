import CameraFrame from "./CameraFrame";
import World from "./World";

export type LevelData = {
  world: World;
  goals: CameraFrame[];
};
