import { EventDispatcher } from "./EventDispatcher";

/**
 * Buttons from the perspective of game logic.
 */
export enum BUTTONS {
  LEFT,
  RIGHT,
  UP,
  CLICK,
  BACK,
  FORWARD,
}

const PRESSABLE_BUTTONS = [
  BUTTONS.UP,
  BUTTONS.LEFT,
  BUTTONS.RIGHT,
  BUTTONS.CLICK,
  BUTTONS.BACK,
  BUTTONS.FORWARD,
];

/**
 * The keyboard codes that should trigger a press/unpress of each logical button.
 */
const CONTROLS_MAP: Record<BUTTONS, string[]> = {
  [BUTTONS.UP]: ["w", "ArrowUp", " "],
  [BUTTONS.LEFT]: ["a", "ArrowLeft"],
  [BUTTONS.RIGHT]: ["d", "ArrowRight"],
  [BUTTONS.BACK]: ["1"],
  [BUTTONS.FORWARD]: ["2"],
  [BUTTONS.CLICK]: [],
};

type ControlEvents = {
  [BUTTONS.LEFT]: void;
  [BUTTONS.RIGHT]: void;
  [BUTTONS.UP]: void;
  [BUTTONS.CLICK]?: { x: number; y: number };
  [BUTTONS.BACK]: void;
  [BUTTONS.FORWARD]: void;
};

/**
 * Dispatches events for logical button presses/unpresses.
 */
export class Controls extends EventDispatcher<ControlEvents> {
  buttonsDown: Set<BUTTONS> = new Set();

  cursorPosition?: { x: number; y: number };

  pressFromKey = (key: string) => {
    PRESSABLE_BUTTONS.forEach((button) => {
      if (CONTROLS_MAP[button].indexOf(key) > -1) {
        this.press(button);
      }
    });
  };

  unpressFromKey = (key: string) => {
    PRESSABLE_BUTTONS.forEach((button) => {
      if (CONTROLS_MAP[button].indexOf(key) > -1) {
        this.unpress(button);
      }
    });
  };

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
