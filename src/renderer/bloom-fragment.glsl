#version 300 es

in vec2 vTextureCoord;
out vec4 finalColor;
in vec2 aaPosition;
in vec4 outputFrame;
in vec4 aaInputSize;

uniform float white;
uniform sampler2D uTexture;
uniform float uTolerance;

vec4 otherConvolute(vec2 uv, float amount) {
	int size = 5;
	vec4 outC = vec4(0., 0., 0., 0.);
	for (int x = 0; x < (size * 2 + 1); x++)
	{
		for (int y = 0; y < (size * 2 + 1); y++)
		{
			vec2 offset = vec2(float(x - size), float(y - size)) / aaInputSize.xy * 2.0;
			vec4 tryColor = texture(uTexture, vTextureCoord+offset);

			outC += tryColor;
		}
	}
	vec4 base = texture(uTexture, vTextureCoord);
	outC = outC / 121.;
	return (outC * amount) + (base * (1. - amount));
}

void main(void)
{
  finalColor = otherConvolute(vec2(aaPosition.x, aaPosition.y), white);
  finalColor = (finalColor * (1. - white)) + vec4(1.) * white;
}