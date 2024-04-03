type Segment = {
  start: {
    position: number,
    depth: number
  }, end: {
    position: number,
    depth: number
  }, color: string
}

export default class CameraFrame {
  segments: Segment[] = [];

  add(newSegment: Segment) {
    let start = newSegment.start;
    let end = newSegment.end;
    if (start.position > end.position) {
      const temp = start;
      newSegment.start = end;
      newSegment.end = temp;
    }
    const breakpoints: number[] = [];
    // get the existing segments that overlap the new one
    const candidates = this.segments.filter(existingSegment => {
      if (existingSegment.start.position <= newSegment.end.position && newSegment.start.position <= existingSegment.end.position) {
        return true;
      }
      return false;
    });

    candidates.forEach((candidate) => {
      // if (candidate.start.position > newSegment.)
    });

    this.segments.push(newSegment);
    this.test();
  }

  test() {
    const sorted = this.segments.slice().sort((a, b) => a.start.position - b.start.position);
    
    for (let i = 0; i != sorted.length - 1; i++) {
      // compare i with i+1
      if (sorted[i].end.position > sorted[i+1].start.position) {
        // Overlap!
        console.log("overla")
      }
    }
  }
}