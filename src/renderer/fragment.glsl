#version 300 es

in vec2 vTextureCoord;
out vec4 finalColor;
in vec2 aaPosition;
in vec4 outputFrame;
in vec4 aaInputSize;

uniform float uTime;
uniform sampler2D uTexture;
uniform float uTolerance;

// implementation of MurmurHash (https://sites.google.com/site/murmurhash/) for a 
// single unsigned integer.

uint hash(uint x, uint seed) {
    const uint m = 0x5bd1e995U;
    uint hash = seed;
    // process input
    uint k = x;
    k *= m;
    k ^= k >> 24;
    k *= m;
    hash *= m;
    hash ^= k;
    // some final mixing
    hash ^= hash >> 13;
    hash *= m;
    hash ^= hash >> 15;
    return hash;
}

// implementation of MurmurHash (https://sites.google.com/site/murmurhash/) for a  
// 2-dimensional unsigned integer input vector.

uint hash(uvec2 x, uint seed){
    const uint m = 0x5bd1e995U;
    uint hash = seed;
    // process first vector element
    uint k = x.x; 
    k *= m;
    k ^= k >> 24;
    k *= m;
    hash *= m;
    hash ^= k;
    // process second vector element
    k = x.y; 
    k *= m;
    k ^= k >> 24;
    k *= m;
    hash *= m;
    hash ^= k;
	// some final mixing
    hash ^= hash >> 13;
    hash *= m;
    hash ^= hash >> 15;
    return hash;
}


vec2 gradientDirection(uint hash) {
    switch (int(hash) & 3) { // look at the last two bits to pick a gradient direction
    case 0:
        return vec2(1.0, 1.0);
    case 1:
        return vec2(-1.0, 1.0);
    case 2:
        return vec2(1.0, -1.0);
    case 3:
        return vec2(-1.0, -1.0);
    }
}

float interpolate(float value1, float value2, float value3, float value4, vec2 t) {
    return mix(mix(value1, value2, t.x), mix(value3, value4, t.x), t.y);
}

vec2 fade(vec2 t) {
    // 6t^5 - 15t^4 + 10t^3
	return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

float perlinNoise(vec2 position, uint seed) {
    vec2 floorPosition = floor(position);
    vec2 fractPosition = position - floorPosition;
    uvec2 cellCoordinates = uvec2(floorPosition);
    float value1 = dot(gradientDirection(hash(cellCoordinates, seed)), fractPosition);
    float value2 = dot(gradientDirection(hash((cellCoordinates + uvec2(1, 0)), seed)), fractPosition - vec2(1.0, 0.0));
    float value3 = dot(gradientDirection(hash((cellCoordinates + uvec2(0, 1)), seed)), fractPosition - vec2(0.0, 1.0));
    float value4 = dot(gradientDirection(hash((cellCoordinates + uvec2(1, 1)), seed)), fractPosition - vec2(1.0, 1.0));
    return interpolate(value1, value2, value3, value4, fade(fractPosition));
}

float perlinNoise(vec2 position, int frequency, int octaveCount, float persistence, float lacunarity, uint seed) {
    float value = 0.0;
    float amplitude = 1.0;
    float currentFrequency = float(frequency);
    uint currentSeed = seed;
    for (int i = 0; i < octaveCount; i++) {
        currentSeed = hash(currentSeed, 0x0U); // create a new seed for each octave
        value += perlinNoise(position * currentFrequency, currentSeed) * amplitude;
        amplitude *= persistence;
        currentFrequency *= lacunarity;
    }
    return value;
}

float mainImage(vec2 fragCoord) {
    vec2 position = fragCoord / aaInputSize.xy;
    position.x *= aaInputSize.x / aaInputSize.y;
    position += uTime * 0.25;
    uint seed = 0x578438adU; // can be set to something else if you want a different set of random values
    // float frequency = 16.0;
    // float value = perlinNoise(position * frequency, seed); // single octave perlin noise
    float value = perlinNoise(position, 10, 6, 0.5, 2.0, seed); // multiple octaves
    value = (value + 0.5); // convert from range [-1, 1] to range [0, 1]
    return value;
}

vec4 convolute(vec2 uv, mat3 kernel)
{
    vec4 color = vec4(0);

    vec3 direction = vec3(-1.0, 0.0, 1.0);    
    for (int x = 0; x < 3; x++)
    {
        for (int y = 0; y < 3; y++)
        {
            vec2 offset = vec2(direction[x], direction[y]) / aaInputSize.xy * 10.0;
            vec4 tryColor = texture(uTexture, vTextureCoord+offset) * kernel[x][y];

            if (tryColor.r != tryColor.b || tryColor.r != tryColor.g || tryColor.g != tryColor.b) {
              float amount = mainImage(uv);
              color += (tryColor * amount);
              color += texture(uTexture, vTextureCoord) * kernel[x][y] * (1.0 - amount);
            } else {
              color += texture(uTexture, vTextureCoord) * kernel[x][y];
            }
        }
    }
    return color;
}

void main(void)
{
  // finalColor = vec4(uTime, uTime, uTime, 1.0);
  finalColor = convolute(vec2(aaPosition.x, aaPosition.y), mat3(1, 2, 1, 2, 4, 2, 1, 2, 1) * 0.0625);
  // float aa = mainImage(vec2(aaPosition.x, aaPosition.y));
  // finalColor = vec4(aa, aa, aa, 1.0);
}