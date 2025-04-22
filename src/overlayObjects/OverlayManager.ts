import Button from "./Button";

class OverlayManager {
  buttons: Button[] = [];

  constructor() {
    const button = new Button("Test");
    this.buttons.push(button);
    button.on("click", () => {
      console.log("Clicked");
    });
  }

  add(button: Button) {
    this.buttons.push(button);
  }
}

export default OverlayManager;
