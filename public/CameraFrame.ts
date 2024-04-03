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

  constructor() {
    
  }

  add(segment: Segment) {
    let start = segment.start;
    let end = segment.end;
    if (start.position > end.position) {
      const temp = start;
      start = end;
      end = temp;
    }
    this.segments.push(segment);
  }
}