import CameraFrame, { depthAt } from "./CameraFrame";

describe('depthAt', () => {
  it('should find depth halfway along a segment', () => {
    expect(depthAt({
      start: {
        position: 0.2,
        depth: 10
      },
      end: {
        position: 0.5,
        depth: 20
      },
      color: ""
    },
    0.35)).toBe(15);
  });

  it('should just return the depth of the start of a segment', () => {
    expect(depthAt({
      start: {
        position: 0.2,
        depth: 10
      },
      end: {
        position: 0.5,
        depth: 20
      },
      color: ""
    },
    0.2)).toBe(10);
  });
});

describe('Simple camera frame setup', () => {
  test('an empty camera frame should pass its test', () => {
    const fra = new CameraFrame();
    expect(fra.test()).toBe(true);
  });

  test('a camera frame with one element should pass its test', () => {
    const fra = new CameraFrame();
    fra.add({
      start: {
        position: 0,
        depth: 0
      },
      end: {
        position: 1,
        depth: 0
      },
      color: ""
    });
    expect(fra.test()).toBe(true);
  });

  test.only('a camera frame with two non-overlapping should pass its test', () => {
    const fra = new CameraFrame();
    fra.add({
      start: {
        position: 0,
        depth: 0
      },
      end: {
        position: .5,
        depth: 0
      },
      color: ""
    });
    fra.add({
      start: {
        position: .5,
        depth: 0
      },
      end: {
        position: 1,
        depth: 0
      },
      color: ""
    });
    expect(fra.test()).toBe(true);
    expect(fra.segments.length).toBe(2);
  });

  test('a camera frame with overlapping should fail its test', () => {
    const fra = new CameraFrame();
    fra.segments.push({
      start: {
        position: 0,
        depth: 0
      },
      end: {
        position: .7,
        depth: 0
      },
      color: ""
    });
    fra.segments.push({
      start: {
        position: .2,
        depth: 0
      },
      end: {
        position: 1,
        depth: 0
      },
      color: ""
    });
    expect(fra.test()).toBe(false);
  });
});

describe('camera frame manipulation', () => {
  test('adding two overlapping segments should fix them so they do not overlap', () => {
    const fra = new CameraFrame();
    fra.add({
      start: {
        position: 0,
        depth: 0
      },
      end: {
        position: .7,
        depth: 0
      },
      color: ""
    });
    fra.add({
      start: {
        position: .2,
        depth: 1
      },
      end: {
        position: 1,
        depth: 1
      },
      color: ""
    });
    expect(fra.test()).toBe(true);
    expect(fra.segments.length).toBe(2);
  });
})