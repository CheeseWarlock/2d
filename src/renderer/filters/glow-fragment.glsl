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


bool isNG(vec4 color) {
	return color.r != color.b || color.r != color.g || color.g != color.b;
}

vec4 convolute(vec2 uv, bool noisy)
{
    vec4 color = vec4(0);
		int size = 11;
		vec4 currentColor = texture(uTexture, vTextureCoord);

		// isNG start
		float nearestColoredPixel = 10000.0;
		vec4 nearbyColor = currentColor;
		int nearbys = 0;
		for (int x = 0; x < (size * 2 + 1); x++)
			{
					for (int y = 0; y < (size * 2 + 1); y++)
					{
							vec2 offset = vec2(float(x - size), float(y - size)) / uInputSize.xy * 2.0;
							vec4 tryColor = texture(uTexture, vTextureCoord+offset);

							if (isNG(tryColor)) {
								nearestColoredPixel = min(nearestColoredPixel, (pow(float(x - size), 2.) + pow(float(y - size), 2.))); // squared distance
								if (nearbys == 0) {
									nearbyColor = tryColor;
								} else {
									nearbyColor += tryColor;
								}
								nearbys += 1;
							}
					}
			}

		if (nearbys > 1) {
			nearbyColor /= vec4(float(nearbys), float(nearbys), float(nearbys), 1.0);
		}
		float distance = pow(nearestColoredPixel, 0.5);
		float noiseProportion = 0.5;
		float proximityProportion = pow(1. - clamp(distance / 12., 0., 1.), 2.) * noiseProportion;
		currentColor = nearbyColor * proximityProportion + currentColor * (1. - proximityProportion);

		// isNG end
		return currentColor;
}

void main(void)
{
	if (texture(uTexture, vTextureCoord).rgb == vec3(1., 1., 1.)) {
		finalColor = (vec4(1.) * (1. - screenFade)) + vec4(0.2) * screenFade;
	} else {
		finalColor = convolute(vec2(aaPosition.x, aaPosition.y), true);
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
}