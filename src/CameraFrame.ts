/**
 * A coloured segment of a camera frame.
 */
export type Segment = {
  start: number;
  end: number;
  color: string;
  startDistance: number;
  endDistance: number;
};

/**
 * A data class for a camera image-
 * either a goal or the result of a field of view calculation.
 */
export default class CameraFrame {
  segments: Segment[];

  constructor(segments: Segment[] = []) {
    this.segments = segments;
  }

  /**
   * Flip the contents of this camera frame.
   * Something at 1 will move to 0 and vice versa.
   */
  flip() {
    const newSegments: Segment[] = [];
    this.segments.forEach((seg) => {
      newSegments.unshift({
        start: 1 - seg.end,
        end: 1 - seg.start,
        color: seg.color,
        startDistance: seg.endDistance,
        endDistance: seg.startDistance,
      });
    });
    this.segments = newSegments;
  }

  /**
   * Join all adjacent segments of the same color into a single segment.
   */
  simplify(): CameraFrame {
    const newSegments: Segment[] = [];
    let lastColor = "none";
    let lastEnd = 0;
    this.segments.forEach((seg) => {
      if (seg.color === lastColor && seg.start === lastEnd) {
        newSegments[newSegments.length - 1].end = seg.end;
      } else {
        newSegments.push({ ...seg });
      }
      lastColor = seg.color;
      lastEnd = seg.end;
    });
    const simplifiedFrame = new CameraFrame();
    simplifiedFrame.segments = newSegments;
    return simplifiedFrame;
  }

  at(position: number): string {
    let ret = "none";
    this.segments.forEach((seg) => {
      if (position >= seg.start && position < seg.end) {
        ret = seg.color;
      }
    });
    return ret;
  }

  /**
   * Compare this camera frame to another one and determine what zones of similarity exist between them.
   * @param otherFrame
   * @returns the proportion of similarity, from 0 to 1.
   */
  compare(otherFrame: CameraFrame) {
    // find all breakpoints
    const breakpoints = new Set<number>();
    this.segments.forEach((seg) => {
      breakpoints.add(seg.start);
      breakpoints.add(seg.end);
    });
    otherFrame.segments.forEach((seg) => {
      breakpoints.add(seg.start);
      breakpoints.add(seg.end);
    });
    breakpoints.add(1);

    const breakpointsArray = Array.from(breakpoints.values()).sort(
      (a, b) => a - b
    );
    const similarityZones: any[] = [];
    let similarity = 0;
    breakpointsArray.forEach((breakpoint, idx) => {
      const start = breakpointsArray[idx - 1] || 0;
      const position = (breakpoint + start) / 2;
      const thisColor = this.at(position);
      const otherColor = otherFrame.at(position);
      similarityZones.push({
        start,
        end: breakpoint,
        same: thisColor === otherColor,
      });
      if (thisColor === otherColor) similarity += breakpoint - start;
    });
    return similarity;
  }

  /**
   * Whether the zones that exist are the same as another frame's, regardless of positioning.
   */
  areZonesEqual(otherFrame: CameraFrame) {
    if (this.segments.length !== otherFrame.segments.length) return false;
    for (let i = 0; i != this.segments.length; i++) {
      if (this.segments[i].color !== otherFrame.segments[i].color) return false;
    }
    return true;
  }
}
