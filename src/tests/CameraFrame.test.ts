import CameraFrame from "../CameraFrame";

jest.mock("../config");

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
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });

    frame.flip();
    expect(frame.segments[0].start).toBe(0.25);
    expect(frame.segments[0].end).toBe(0.75);
  });
});

describe("CameraFrame.simplify", () => {
  it("should not change a camera frame with only one segment", () => {
    const frame = new CameraFrame();
    frame.segments.push({
      start: 0.25,
      end: 0.75,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    frame.simplify();
    expect(frame.segments[0].start).toBe(0.25);
    expect(frame.segments[0].end).toBe(0.75);
  });

  it("should connect two segments of the same colour", () => {
    const frame = new CameraFrame();
    frame.segments.push({
      start: 0.25,
      end: 0.5,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    frame.segments.push({
      start: 0.5,
      end: 0.75,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    frame.simplify();
    expect(frame.segments[0].start).toBe(0.25);
    expect(frame.segments[0].end).toBe(0.75);
  });

  it("should not connect two segments of different colours", () => {
    const frame = new CameraFrame();
    frame.segments.push({
      start: 0.25,
      end: 0.5,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    frame.segments.push({
      start: 0.5,
      end: 0.75,
      color: "#0000ff",
      startDistance: 0,
      endDistance: 0,
    });
    frame.simplify();
    expect(frame.segments[0].start).toBe(0.25);
    expect(frame.segments[0].end).toBe(0.5);
  });

  it("should not connect non-adjacent segments", () => {
    const frame = new CameraFrame();
    frame.segments.push({
      start: 0.25,
      end: 0.4,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    frame.segments.push({
      start: 0.5,
      end: 0.75,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    frame.simplify();
    expect(frame.segments.length).toBe(2);
    expect(frame.segments[0].start).toBe(0.25);
    expect(frame.segments[0].end).toBe(0.4);
  });
});

describe("CameraFrame.compare", () => {
  it("should return 100% similarity for comparing an empty frame", () => {
    const frame = new CameraFrame();
    const comparison = frame.compare(frame);
    expect(comparison).toBe(1);
  });

  it("should return 50% similarity for a simple case", () => {
    const frameA = new CameraFrame();
    const frameB = new CameraFrame();
    frameA.segments.push({
      start: 0.25,
      end: 0.75,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    frameB.segments.push({
      start: 0.25,
      end: 0.75,
      color: "#0000ff",
      startDistance: 0,
      endDistance: 0,
    });
    const comparison = frameA.compare(frameB);
    expect(comparison).toBe(0.5);
  });

  it("should properly create new breakpoints", () => {
    /*
    RRRRR-BBBB
    ---BBBBB--
    ffffffTTff
    */
    const frameA = new CameraFrame();
    const frameB = new CameraFrame();
    frameA.segments.push({
      start: 0,
      end: 0.5,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    frameA.segments.push({
      start: 0.6,
      end: 1,
      color: "#0000ff",
      startDistance: 0,
      endDistance: 0,
    });
    frameB.segments.push({
      start: 0.3,
      end: 0.8,
      color: "#0000ff",
      startDistance: 0,
      endDistance: 0,
    });
    const comparison = frameA.compare(frameB);
    expect(comparison).toBeCloseTo(0.2);
  });
});

describe("CameraFrame.areZonesEqual", () => {
  it("should return true when frames are exactly the same", () => {
    const frameA = new CameraFrame();
    frameA.segments.push({
      start: 0.2,
      end: 0.8,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    expect(frameA.areZonesEqual(frameA)).toBe(true);
  });

  it("should return false if the frames' contents are of different length", () => {
    const frameA = new CameraFrame();
    const frameB = new CameraFrame();
    frameA.segments.push({
      start: 0,
      end: 1,
      color: "empty",
      startDistance: 0,
      endDistance: 0,
    });
    frameB.segments.push({
      start: 0,
      end: 0.5,
      color: "#0000ff",
      startDistance: 0,
      endDistance: 0,
    });
    frameB.segments.push({
      start: 0.5,
      end: 1,
      color: "#ff00ff",
      startDistance: 0,
      endDistance: 0,
    });
    expect(frameA.areZonesEqual(frameB)).toBe(false);
  });

  it("should return false if the frames' colors differ", () => {
    const frameA = new CameraFrame();
    const frameB = new CameraFrame();
    frameA.segments.push({
      start: 0,
      end: 0.5,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    frameA.segments.push({
      start: 0.5,
      end: 1,
      color: "#0000ff",
      startDistance: 0,
      endDistance: 0,
    });
    frameB.segments.push({
      start: 0,
      end: 0.5,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    frameB.segments.push({
      start: 0.5,
      end: 1,
      color: "#00ff00",
      startDistance: 0,
      endDistance: 0,
    });
    expect(frameA.areZonesEqual(frameB)).toBe(false);
  });

  it("should return false if one frame has an extra blank section", () => {
    const frameA = new CameraFrame();
    const frameB = new CameraFrame();
    frameA.segments.push({
      start: 0,
      end: 0.5,
      color: "empty",
      startDistance: 0,
      endDistance: 0,
    });
    frameA.segments.push({
      start: 0.5,
      end: 1,
      color: "#0000ff",
      startDistance: 0,
      endDistance: 0,
    });
    frameB.segments.push({
      start: 0,
      end: 1,
      color: "#0000ff",
      startDistance: 0,
      endDistance: 0,
    });
    expect(frameA.areZonesEqual(frameB)).toBe(false);
  });

  it("should return true if the frames have the same zones but different positions", () => {
    const frameA = new CameraFrame();
    const frameB = new CameraFrame();
    frameA.segments.push({
      start: 0,
      end: 0.5,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    frameA.segments.push({
      start: 0.5,
      end: 1,
      color: "#0000ff",
      startDistance: 0,
      endDistance: 0,
    });
    frameB.segments.push({
      start: 0,
      end: 0.9,
      color: "#ff0000",
      startDistance: 0,
      endDistance: 0,
    });
    frameB.segments.push({
      start: 0.9,
      end: 1,
      color: "#0000ff",
      startDistance: 0,
      endDistance: 0,
    });
    expect(frameA.areZonesEqual(frameA)).toBe(true);
  });
});
