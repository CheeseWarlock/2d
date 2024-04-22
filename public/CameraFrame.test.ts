import CameraFrame, { Segment } from './CameraFrame.ts';

describe("CameraFrame.flip", () => {
  it("should not change an empty camera frame", () => {
    const frame = new CameraFrame();
    expect(frame.segments.length).toBe(0);
    frame.flip();
    expect(frame.segments.length).toBe(0);
  });

  it("should not change a symmetric camera frame", () => {
    const frame = new CameraFrame();
    frame.segments.push({
      start: 0.25,
      end: 0.75,
      color: "red"
    });

    frame.flip();
    expect(frame.segments[0].start).toBe(0.25);
    expect(frame.segments[0].end).toBe(0.75);
  })
});