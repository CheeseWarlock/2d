bool isGreyscale(vec4 color) {
  return color.r == color.b && color.r == color.g && color.g == color.b;
}

vec4 findReplacementColor(vec4 color, vec2 pos) {
  vec3 colorInts = vec3(color.rgb * 255.);
  if (colorInts == vec3(__COLOR1__)) {
    float amount = (mod(pos.x, 20.) + mod(pos.y, 20.)) / 40.;
    return vec4(amount, amount, amount, 1);
  } else if (colorInts == vec3(__COLOR2__)) {
    float aaa = mod(pos.x, 20.);
    float bbb = mod(pos.y, 20.);
    bool white = aaa < 18. && bbb < 18.;
    float rc = white ? 0.85 : 0.;
    return vec4(rc, rc, rc, 1);
  } else if (colorInts == vec3(__COLOR3__)) {
    bool white = mod(abs(pos.x - pos.y + 1024.), 20.) > 2.;
    float rc = white ? 0.85 : 0.;
    return vec4(rc, rc, rc, 1);
  } else if (colorInts == vec3(__COLOR4__)) {
    bool white = mod(abs(pos.x + pos.y + 1024.), 20.) > 2.;
    float rc = white ? 0.85 : 0.;
    return vec4(rc, rc, rc, 1);
  } else {
    return vec4(1.);
  }
}