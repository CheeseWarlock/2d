import {
  CameraFrameProps,
  ColorGeometryProps,
  GeometryProps,
  LineGeometryProps,
} from "../types";

/**
 * A JSON format defining level data.
 */
export default interface ILevelFormat {
  ground: GeometryProps[];
  colors: ColorGeometryProps[];
  lines: LineGeometryProps[];
  playerPosition: { x: number; y: number };
  goals: CameraFrameProps[];
}
