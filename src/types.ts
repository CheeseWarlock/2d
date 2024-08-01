import { AnimatedSprite, Container, Graphics, Sprite, Text } from "pixi.js";

export type Point = {
  x: number;
  y: number;
};

export type Motion = {
  offset: {
    x: number;
    y: number;
  };
  duration: number;
  delay: number;
  rotations?: number;
};

export type GeometryProps = {
  points: Point[];
  color?: string;
};

export type LineGeometryProps = {
  from: Point;
  to: Point;
  color: string;
};

export type ColorGeometryProps = {
  /**
   * The origin; 0,0 if unspecified.
   */
  origin?: Point;
  /**
   * The initial rotation, clockwise in radians; 0 if unspecified.
   */
  rotation?: number;
  points: Point[];
  color: string;
  motion?: Motion;
};

export type CameraFrameProps = CameraFrameElementProps[];

export type CameraFrameElementProps = {
  start: number;
  end: number;
  color: string;
};

export type RendererAnimationEvents = {
  levelCompleteAnimationMidTransition: void;
  levelCompleteAnimationFinished: void;
};

export type Sprites = {
  playerWalkSprite: AnimatedSprite;
  playerDeadSprite: Sprite;
  viewCone: Container;
  titleText: Sprite;
};
