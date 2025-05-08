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

/* https://www.shadertoy.com/view/XsX3zB
 *
 * The MIT License
 * Copyright © 2013 Nikita Miropolskiy
 * 
 * ( license has been changed from CCA-NC-SA 3.0 to MIT
 *
 *   but thanks for attributing your source code when deriving from this sample 
 *   with a following link: https://www.shadertoy.com/view/XsX3zB )
 *
 * ~
 * ~ if you're looking for procedural noise implementation examples you might 
 * ~ also want to look at the following shaders:
 * ~ 
 * ~ Noise Lab shader by candycat: https://www.shadertoy.com/view/4sc3z2
 * ~
 * ~ Noise shaders by iq:
 * ~     Value    Noise 2D, Derivatives: https://www.shadertoy.com/view/4dXBRH
 * ~     Gradient Noise 2D, Derivatives: https://www.shadertoy.com/view/XdXBRH
 * ~     Value    Noise 3D, Derivatives: https://www.shadertoy.com/view/XsXfRH
 * ~     Gradient Noise 3D, Derivatives: https://www.shadertoy.com/view/4dffRH
 * ~     Value    Noise 2D             : https://www.shadertoy.com/view/lsf3WH
 * ~     Value    Noise 3D             : https://www.shadertoy.com/view/4sfGzS
 * ~     Gradient Noise 2D             : https://www.shadertoy.com/view/XdXGW8
 * ~     Gradient Noise 3D             : https://www.shadertoy.com/view/Xsl3Dl
 * ~     Simplex  Noise 2D             : https://www.shadertoy.com/view/Msf3WH
 * ~     Voronoise: https://www.shadertoy.com/view/Xd23Dh
 * ~ 
 *
 */
vec3 random3(vec3 c) {
	float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
	vec3 r;
	r.z = fract(512.0*j);
	j *= .125;
	r.x = fract(512.0*j);
	j *= .125;
	r.y = fract(512.0*j);
	return r-0.5;
}

/* skew constants for 3d simplex functions */
const float F3 =  0.3333333;
const float G3 =  0.1666667;

/* 3d simplex noise */
float simplex3d(vec3 p) {
	 /* 1. find current tetrahedron T and it's four vertices */
	 /* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */
	 /* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/
	 
	 /* calculate s and x */
	 vec3 s = floor(p + dot(p, vec3(F3)));
	 vec3 x = p - s + dot(s, vec3(G3));
	 
	 /* calculate i1 and i2 */
	 vec3 e = step(vec3(0.0), x - x.yzx);
	 vec3 i1 = e*(1.0 - e.zxy);
	 vec3 i2 = 1.0 - e.zxy*(1.0 - e);
	 	
	 /* x1, x2, x3 */
	 vec3 x1 = x - i1 + G3;
	 vec3 x2 = x - i2 + 2.0*G3;
	 vec3 x3 = x - 1.0 + 3.0*G3;
	 
	 /* 2. find four surflets and store them in d */
	 vec4 w, d;
	 
	 /* calculate surflet weights */
	 w.x = dot(x, x);
	 w.y = dot(x1, x1);
	 w.z = dot(x2, x2);
	 w.w = dot(x3, x3);
	 
	 /* w fades from 0.6 at the center of the surflet to 0.0 at the margin */
	 w = max(0.6 - w, 0.0);
	 
	 /* calculate surflet components */
	 d.x = dot(random3(s), x);
	 d.y = dot(random3(s + i1), x1);
	 d.z = dot(random3(s + i2), x2);
	 d.w = dot(random3(s + 1.0), x3);
	 
	 /* multiply d by w^4 */
	 w *= w;
	 w *= w;
	 d *= w;
	 
	 /* 3. return the sum of the four surflets */
	 return dot(d, vec4(52.0));
}

/* const matrices for 3d rotation */
const mat3 rot1 = mat3(-0.37, 0.36, 0.85,-0.14,-0.93, 0.34,0.92, 0.01,0.4);
const mat3 rot2 = mat3(-0.55,-0.39, 0.74, 0.33,-0.91,-0.24,0.77, 0.12,0.63);
const mat3 rot3 = mat3(-0.71, 0.52,-0.47,-0.08,-0.72,-0.68,-0.7,-0.45,0.56);

/* directional artifacts can be reduced by rotating each octave */
float simplex3d_fractal(vec3 m) {
    return   0.5333333*simplex3d(m*rot1)
			+0.2666667*simplex3d(2.0*m*rot2)
			+0.1333333*simplex3d(4.0*m*rot3)
			+0.0666667*simplex3d(8.0*m);
}

float getNoise(vec2 fragCoord)
{
	vec2 p = fragCoord.xy/uInputSize.x;
	vec3 p3 = vec3(p, uTime*0.025);
	
	float value;
	
	value = simplex3d(p3*32.0);
	
	value = 0.5 + 0.5 * value;
	
	return value;
}

bool isNG(vec4 color) {
	return color.r != color.b || color.r != color.g || color.g != color.b;
}

vec4 convolute(vec2 uv, bool noisy)
{
    vec4 color = vec4(0);
		int size = 10;
		float pixelsInWindow = pow((float(size) * 2. + 1.), 2.);
		vec4 currentColor = texture(uTexture, vTextureCoord);
		
		if (!isNG(currentColor)) {
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
			float noiseProportion = getNoise(uv);
			float proximityProportion = pow(1. - clamp(distance / 12., 0., 1.), 2.) * noiseProportion * 0.75;
			// return vec4(proximityProportion, proximityProportion, proximityProportion, 1.);
			currentColor = nearbyColor * proximityProportion + currentColor * (1. - proximityProportion);
		}

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