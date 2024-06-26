import CameraFrame from "../CameraFrame";
import GeometryObject from "../gameObjects/GeometryObject";

export default interface ILevelFormat {
  geometries: GeometryObject[];
  playerPosition: { x: number; y: number };
  goals: CameraFrame[];
}
