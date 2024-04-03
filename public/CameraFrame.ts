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
    this.segments.push({
      start: {
        position: 0,
        depth: 0
      },
      end: {
        position: 0.5,
        depth: 0
      },
      color: "red"
    });

    this.segments.push({
      start: {
        position: 0.75,
        depth: 0
      },
      end: {
        position: 1,
        depth: 0
      },
      color: "green"
    });
  }

  add(segment: Segment) {
    this.segments.push(segment);
  }
}