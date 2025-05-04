import { EventDispatcher } from "../utils/EventDispatcher";

type ButtonEvents = {
  click: void;
};

class Button extends EventDispatcher<ButtonEvents> {
  title: string;
  width: number = 200;
  height: number = 100;
  centerX: number = 500;
  centerY: number = 750;
  constructor(
    title: string,
    options?: {
      width?: number;
      height?: number;
      centerX?: number;
      centerY?: number;
    }
  ) {
    super();
    this.title = title;
    if (options?.centerX != null) this.centerX = options.centerX;
    if (options?.centerY != null) this.centerY = options.centerY;
    if (options?.width != null) this.width = options.width;
    if (options?.height != null) this.height = options.height;
  }
}

export default Button;
