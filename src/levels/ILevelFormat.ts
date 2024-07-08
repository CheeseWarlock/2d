import {
  CameraFrameProps,
  ColorGeometryProps,
  GeometryProps,
  LineGeometryProps,
} from "../types";

export default interface ILevelFormat {
  ground: GeometryProps[];
  colors: ColorGeometryProps[];
  lines: LineGeometryProps[];
  playerPosition: { x: number; y: number };
  goals: CameraFrameProps[];
}
