#version 300 es

in vec2 vTextureCoord;
out vec4 finalColor;
in vec2 aaPosition;
in vec4 outputFrame;
in vec4 aaInputSize;

uniform sampler2D uTexture;
uniform vec2 uCenter;
uniform float uTime;
uniform float uSpeed;
uniform float uWave;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

const float PI = 3.14159;

void main() {
  vec2 coord = vTextureCoord;

  // Calculate distance from the center
  float dist = distance(coord, uCenter / 1000.) * 7. + 1.;
  
  // The amount, make it wrap for now
  float proportion = clamp(1. - abs(dist - uTime), 0., 1.);

  vec2 pixeled = vec2(0.012 * round(coord.x / 0.012), 0.012 * round(coord.y / 0.012));
  vec4 pixeledColor = texture(uTexture, pixeled) * .8 + vec4(1.) * .2;
  vec4 standardColor = texture(uTexture, coord);

  vec4 color = standardColor * (1. - proportion) + pixeledColor * proportion;

  if (dist < uTime) {
      float grayColor = max(color.x, max(color.y, color.z));
    color = vec4(grayColor, grayColor, grayColor, 0);
  }
  finalColor = color;
}