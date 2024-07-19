import { EventDispatcher } from "./EventDispatcher";

export enum BUTTONS {
  LEFT,
  RIGHT,
  UP,
  CLICK,
}

type ControlEvents = {
  [BUTTONS.LEFT]: void;
  [BUTTONS.RIGHT]: void;
  [BUTTONS.UP]: void;
  [BUTTONS.CLICK]?: { x: number; y: number };
};

export class Controls extends EventDispatcher<ControlEvents> {
  buttonsDown: Set<BUTTONS> = new Set();

  cursorPosition?: { x: number; y: number };

  press = (button: BUTTONS) => {
    if (!this.buttonsDown.has(button)) {
      if (button === BUTTONS.CLICK) {
        this.publish(button, this.cursorPosition);
      } else {
        this.publish(button);
      }
    }
    this.buttonsDown.add(button);
  };

  unpress = (button: BUTTONS) => {
    this.buttonsDown.delete(button);
  };
}
