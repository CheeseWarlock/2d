#version 300 es

uniform sampler2D uTexture;
uniform vec2 uCenter;
uniform float uTime;
uniform highp vec4 uInputSize;

in vec2 vTextureCoord;
in vec4 outputFrame;

out vec4 finalColor;

void main() {
  vec2 coord = vTextureCoord;

  // modified center pos for white band
  vec2 modCenter = vec2(0.02 * round(coord.x / 0.02), 0.02 * round(coord.y / 0.02));

  // Calculate distance from the center
  float dist = distance(modCenter, uCenter / 1000.) * 5. + 1.;
  
  // The amount, make it wrap for now
  float proportion = 0.25 * round(4. * clamp(1. - abs(dist - uTime), 0., 1.));

  vec2 pixeled = vec2(0.02 * round(coord.x / 0.02), 0.02 * round(coord.y / 0.02));
  vec4 pixeledColor = texture(uTexture, pixeled) * .8 + vec4(1.) * .2;
  vec4 standardColor = texture(uTexture, coord);

  vec4 color = standardColor * (1. - proportion) + pixeledColor * proportion;

  if (dist < uTime) {
      float grayColor = max(color.x, max(color.y, color.z));
    color = vec4(grayColor, grayColor, grayColor, 0);
  }
  finalColor = color;
}