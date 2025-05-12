#version 300 es

in vec2 vTextureCoord;
out vec4 finalColor;
in vec2 aaPosition;
in vec4 outputFrame;
uniform highp vec4 uInputSize;

uniform float uTime;
uniform float screenFade;
uniform float black;
uniform float focusX;
uniform float focusY;
uniform float focusDistance;
uniform sampler2D uTexture;
uniform float uTolerance;

__COLOR_REPLACER__

void main(void)
{
  vec4 currentColor = texture(uTexture, vTextureCoord);
  if (isGreyscale(currentColor)) {
    finalColor = currentColor;
  } else {
    float pixelX = floor(aaPosition.x);
    float pixelY = floor(aaPosition.y);
    finalColor = findReplacementColor(currentColor, aaPosition);
  }

  finalColor = (finalColor * (1. - screenFade)) + vec4(0.2) * screenFade;
  float dx = aaPosition.x - focusX;
  float dy = aaPosition.y - focusY;
  float dist = pow((dx * dx) + (dy * dy), 0.5);
  if (dist > focusDistance && black > 0.) {
    float minColor = min(finalColor.x, min(finalColor.y, finalColor.z));
    finalColor = vec4(minColor, minColor, minColor, 1.);
    finalColor = (finalColor * (1. - black)) + vec4(0., 0., 0., 1.) * black;
  }
}