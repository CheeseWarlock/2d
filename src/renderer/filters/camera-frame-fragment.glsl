precision mediump float;
uniform vec4 uColor;
varying vec4 position;

float width = __CAMERA_FRAME_WIDTH__.;
float height = __CAMERA_FRAME_HEIGHT__.;

__COLOR_REPLACER__

void main() {
  if (isGreyscale(uColor)) {
    gl_FragColor = uColor;
  } else {
    float pixelX = floor(position.x * width / 2.);
    float pixelY = floor(position.y * height / 2.);
    gl_FragColor = findReplacementColor(uColor, vec2(pixelX, pixelY));
  }
}