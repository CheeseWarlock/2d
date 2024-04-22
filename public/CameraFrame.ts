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

  }

  compare(otherFrame: CameraFrame) {
    
  }
}