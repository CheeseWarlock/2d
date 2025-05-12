attribute vec4 a_position;
varying vec4 position;

void main() {
  gl_Position = a_position;
  position = a_position * vec4(1, -1, 1, 1);
}