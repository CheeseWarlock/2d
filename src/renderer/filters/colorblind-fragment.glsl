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


bool isGreyscale(vec4 color) {
	return color.r == color.b && color.r == color.g && color.g == color.b;
}

void main(void)
{
  vec4 currentColor = texture(uTexture, vTextureCoord);
  if (!isGreyscale(currentColor)) {
    // float aaa = mod(vTextureCoord.x * 20., 1.) / 2.;
    float pixelX = vTextureCoord.x * uInputSize.x;
    // float bbb = mod(vTextureCoord.y * 20., 1.) / 2.;
    float pixelY = vTextureCoord.y * uInputSize.y;

    float aaa = mod(pixelX, 20.) / 40.;
		float bbb = mod(pixelY, 20.) / 40.;
    currentColor = vec4(aaa+bbb,aaa+bbb,aaa+bbb, 1);
  }
  
  finalColor = currentColor;

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