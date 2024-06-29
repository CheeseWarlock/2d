import { Tween } from "@tweenjs/tween.js";

export type Point = {
  x: number;
  y: number;
};

export type GeometryProps = {
  points: Point[];
};

export type LineGeometryProps = {
  from: Point;
  to: Point;
  color: string;
};

export type ColorGeometryProps = {
  points: Point[];
  color: string;
};
