export function intersects(a: number,b: number,c: number,d: number,p: number,q: number,r: number,s: number) {
  var det, gamma, lambda;
  det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
};

export function lineSegmentsIntersect(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
  var a_dx = x2 - x1;
  var a_dy = y2 - y1;
  var b_dx = x4 - x3;
  var b_dy = y4 - y3;
  var s = (-a_dy * (x1 - x3) + a_dx * (y1 - y3)) / (-b_dx * a_dy + a_dx * b_dy);
  var t = (+b_dx * (y1 - y3) - b_dy * (x1 - x3)) / (-b_dx * a_dy + a_dx * b_dy);
  const doSegmentsIntersect = (s >= 0 && s <= 1 && t >= 0 && t <= 1);
  return {
    direct: doSegmentsIntersect,
    point: [x1 + t * a_dx, y1 + t * a_dy]
  }
}

export function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function limitNearVerticalDirection(direction: number, disallowedRange: number) {
  const VERTICAL = 0.5 * Math.PI;
  if (direction > VERTICAL - disallowedRange && direction <= VERTICAL) {
    return VERTICAL - disallowedRange;
  } else if (direction > VERTICAL && direction < VERTICAL + disallowedRange) {
    return VERTICAL + disallowedRange;
  } else if (direction > -VERTICAL - disallowedRange && direction <= -VERTICAL) {
    return -VERTICAL - disallowedRange;
  } else if (direction > -VERTICAL && direction <= -VERTICAL + disallowedRange) {
    return -VERTICAL + disallowedRange;
  }
  return direction;
}