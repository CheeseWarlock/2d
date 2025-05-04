in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uCenter;
uniform float uTime;
uniform float uSpeed;
uniform float uWave;

uniform vec4 uInputSize;
uniform vec4 uInputClamp;

const float PI = 3.14159;

void main() {
  vec2 coord = vTextureCoord * uInputSize.xy;

  // Calculate distance from the center
  float dist = distance(coord, uCenter);

  // Calculate the ripple effect
  float ripple = sin(dist - uTime * uSpeed) * 0.02;

  // Apply the ripple effect to the texture coordinates
  vec2 rippleCoord = coord + normalize(coord - uCenter) * ripple;

  // Sample the texture with the modified coordinates
  vec4 color = texture(uTexture, rippleCoord / uInputSize.xy);

  // Output the final color
  finalColor = color;
}