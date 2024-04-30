export type Segment = {
  start: number,
  end: number,
  color: string
}

/**
 * Essentially a data class for a camera image-
 * either a goal or the result of a field of view calculation.
 */
export default class CameraFrame {
  segments: Segment[] = [];

  flip() {
    // start to end
    // becomes
    // (1 - end) to (1 - start)
    const newSegments: Segment[] = [];
    this.segments.forEach(seg => {
      newSegments.push({start: 1 - seg.end, end: 1 - seg.start, color: seg.color})
    });
    this.segments = newSegments;
  }

  simplify() {
    const newSegments: Segment[] = [];
    let lastColor = "none";
    let lastEnd = 0;
    this.segments.forEach((seg) => {
      if (seg.color === lastColor && seg.start === lastEnd) {
        newSegments[newSegments.length - 1].end = seg.end;
      } else {
        newSegments.push(seg);
      }
      lastColor = seg.color;
      lastEnd = seg.end;
    });
    this.segments = newSegments;
  }

  at(position: number): string {
    let ret = "none";
    this.segments.forEach(seg => {
      if (position >= seg.start && position < seg.end) {
        ret = seg.color;
      }
    });
    return ret;
  }

  compare(otherFrame: CameraFrame) {
    // find all breakpoints
    const breakpoints = new Set<number>();
    this.segments.forEach(seg => {
      breakpoints.add(seg.start);
      breakpoints.add(seg.end);
    });
    otherFrame.segments.forEach(seg => {
      breakpoints.add(seg.start);
      breakpoints.add(seg.end);
    });
    breakpoints.add(1);

    const breakpointsArray = Array.from(breakpoints.values()).sort((a, b) => a - b);
    const similarityZones: any[] = [];
    let similarity = 0;
    breakpointsArray.forEach((breakpoint, idx) => {
      const start = (breakpointsArray[idx - 1]) || 0;
      const position = (breakpoint + start) / 2;
      const thisColor = this.at(position);
      const otherColor = otherFrame.at(position);
      similarityZones.push({
        start,
        end: breakpoint,
        same: thisColor === otherColor
      });
      if (thisColor === otherColor) similarity += breakpoint - start;
    });
    return similarity;
  }
}