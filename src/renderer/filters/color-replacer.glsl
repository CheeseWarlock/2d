bool isGreyscale(vec4 color) {
  return color.r == color.b && color.r == color.g && color.g == color.b;
}

vec4 findReplacementColor(vec4 color, vec2 pos) {
  vec3 colorInts = vec3(color.rgb * 255.);
  if (colorInts == vec3(__COLOR1__)) {
    float rc = mod(floor(pos.x / 10.) + floor(pos.y / 10.), 2.) == 0. ? 0.8 : 0.5;
    return vec4(rc, rc, rc, 1);
  } else if (colorInts == vec3(__COLOR2__)) {
    float radius = 5.0;
    vec2 center = vec2(mod(pos.x, 20.0), mod(pos.y, 20.0));
    float dist = length(center - vec2(10.0));
    float rc = dist < radius ? 0.2 : 0.9;
    return vec4(rc, rc, rc, 1);
  } else if (colorInts == vec3(__COLOR3__)) {
    float rc = mod(floor((pos.x + pos.y) / 20.), 2.) == 0. ? 0.3 : 0.7;
    return vec4(rc, rc, rc, 1);
  } else if (colorInts == vec3(__COLOR4__)) {
    float rc = mod(floor((pos.x - pos.y + 0.2) / 4.), 4.) == 0. ? 0.2 : 0.85;
    return vec4(rc, rc, rc, 1);
  } else {
    return vec4(1.);
  }
}