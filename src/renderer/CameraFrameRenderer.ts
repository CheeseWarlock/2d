import CameraFrame from "../CameraFrame";

const CAMERA_FRAME_WIDTH = 60;
const CAMERA_FRAME_HEIGHT = 900;
const CLEAR_COLOR_FOR_CAMERA_FRAMES = "#444";

/**
 * Special renderer for a camera frame (the view or the goal).
 * Uses a canvas under the hood.
 */
class CameraFrameRenderer {
  context: CanvasRenderingContext2D;
  element: HTMLElement;

  constructor(targetElement: HTMLElement, title: string) {
    this.element = targetElement;
    const header = document.createElement("span");
    header.className = "header-text";
    header.innerText = title;
    targetElement.appendChild(header);

    const photoCanvas = document.createElement("canvas");
    photoCanvas.width = CAMERA_FRAME_WIDTH;
    photoCanvas.height = CAMERA_FRAME_HEIGHT;
    targetElement.appendChild(photoCanvas);
    this.context = photoCanvas.getContext("2d")!;
  }

  drawCamera(frame?: CameraFrame) {
    this.context.fillStyle = CLEAR_COLOR_FOR_CAMERA_FRAMES;
    this.context.fillRect(0, 0, CAMERA_FRAME_WIDTH, CAMERA_FRAME_HEIGHT);

    if (frame) {
      frame.segments.forEach((segment) => {
        if (segment.color === "empty") return;
        this.context.fillStyle = segment.color;
        this.context.fillRect(
          0,
          segment.start * CAMERA_FRAME_HEIGHT,
          CAMERA_FRAME_WIDTH,
          (segment.end - segment.start) * CAMERA_FRAME_HEIGHT
        );
      });
    }

    this.context.strokeStyle = "rgba(255, 255, 255, 0.4)";
    this.context.lineWidth = 4;
    this.context.beginPath();
    this.context.moveTo(0, CAMERA_FRAME_HEIGHT / 2);
    this.context.lineTo(CAMERA_FRAME_WIDTH, CAMERA_FRAME_HEIGHT / 2);
    this.context.closePath();
    this.context.stroke();
  }
}

export default CameraFrameRenderer;
