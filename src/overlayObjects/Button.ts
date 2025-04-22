import { EventDispatcher } from "../EventDispatcher";

class Button extends EventDispatcher {
  title: string;
  width: number = 200;
  height: number = 100;
  centerX: number = 500;
  centerY: number = 750;
  constructor(title: string) {
    super();
    this.title = title;
  }
}

export default Button;
