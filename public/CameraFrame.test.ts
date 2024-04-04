import CameraFrame, { depthAt } from "./CameraFrame";

const jestConsole = console;

beforeEach(() => {
  global.console = require('console');
});

afterEach(() => {
  global.console = jestConsole;
});

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

  test('a camera frame with two non-overlapping should pass its test', () => {
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
      color: "red"
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
      color: "green"
    });
    expect(fra.test()).toBe(true);
    expect(fra.segments.length).toBe(2);
  });
});

describe('a more complicated case', () => {
  test('add two non-overlapping', () => {
    const fra = new CameraFrame();
    fra.add({
      start: { position: 0.3, depth: 1 },
      end: { position: 0.5, depth: 11 },
      color: "red"
    });
    fra.add({
      start: { position: 0.7, depth: 55 },
      end: { position: 0.8, depth: 5 },
      color: "green"
    });
    expect(fra.test()).toBe(true);
    expect(fra.segments.length).toBe(5);
  });

  test('add two overlapping', () => {
    const fra = new CameraFrame();
    fra.add({
      start: { position: 0.3, depth: 1 },
      end: { position: 0.7, depth: 1 },
      color: "red"
    });
    fra.add({
      start: { position: 0.5, depth: 5 },
      end: { position: 0.8, depth: 5 },
      color: "green"
    });
    expect(fra.test()).toBe(true);
    expect(fra.segments.length).toBe(4);
  });

  test('add two overlapping, then one overlapping all of that', () => {
    const fra = new CameraFrame();
    fra.add({
      start: { position: 0.3, depth: 1 },
      end: { position: 0.7, depth: 1 },
      color: "red"
    });
    fra.add({
      start: { position: 0.5, depth: 5 },
      end: { position: 0.8, depth: 5 },
      color: "green"
    });
    fra.add({
      start: { position: 0.1, depth: 0.5 },
      end: { position: 0.9, depth: 0.5 },
      color: "green"
    });
    expect(fra.test()).toBe(true);
    expect(fra.segments.length).toBe(3);
  });
});

describe.only('from actual game', () => {
  test('inside the blue square', () => {
    const fra = new CameraFrame();
    const segmentsToAdd = [
      {
          "start": {
              "position": 0.10642906195594026,
              "depth": 253.24296633865274
          },
          "end": {
              "position": 0.8566159217669056,
              "depth": 198.3229689168655
          },
          "color": "green"
      },
      {
          "start": {
              "position": 0.8566159217669056,
              "depth": 198.3229689168655
          },
          "end": {
              "position": 0.17699132696563602,
              "depth": 111.94641575325224
          },
          "color": "green"
      },
      {
          "start": {
              "position": 0.17699132696563602,
              "depth": 111.94641575325224
          },
          "end": {
              "position": -0.620699437484503,
              "depth": 193.21490625725542
          },
          "color": "green"
      },
      {
          "start": {
              "position": -0.620699437484503,
              "depth": 193.21490625725542
          },
          "end": {
              "position": 0.10642906195594026,
              "depth": 253.24296633865274
          },
          "color": "green"
      },
      {
          "start": {
              "position": 0.17699132696563602,
              "depth": 111.94641575325224
          },
          "end": {
              "position": 3.58696143646027,
              "depth": 151.43315356948756
          },
          "color": "blue"
      },
      {
          "start": {
              "position": -3.5261232286870943,
              "depth": 137.59360450253493
          },
          "end": {
              "position": 0.17699132696563602,
              "depth": 111.94641575325224
          },
          "color": "blue"
      }
  ];
  segmentsToAdd.forEach(seg => fra.add(seg));
  expect(fra.test()).toBe(true);
    expect(fra.segments.length).toBe(2);
  });

  test('bug where you can see through a line', () => {
    const fra = new CameraFrame();
    const segmentsToAdd = [
      {
          "start": {
              "position": 0.1898361477881556,
              "depth": 650.3076195155644
          },
          "end": {
              "position": 0.4641089421479663,
              "depth": 598.4145720150872
          },
          "color": "green"
      },
      {
          "start": {
              "position": 0.4641089421479663,
              "depth": 598.4145720150872
          },
          "end": {
              "position": 0.2848593766897727,
              "depth": 511.5662224971465
          },
          "color": "green"
      },
      {
          "start": {
              "position": 0.2848593766897727,
              "depth": 511.5662224971465
          },
          "end": {
              "position": -0.011804069629693714,
              "depth": 571.4017850864661
          },
          "color": "green"
      },
      {
          "start": {
              "position": -0.011804069629693714,
              "depth": 571.4017850864661
          },
          "end": {
              "position": 0.1898361477881556,
              "depth": 650.3076195155644
          },
          "color": "green"
      },
      {
          "start": {
              "position": 0.2848593766897727,
              "depth": 511.5662224971465
          },
          "end": {
              "position": 1.0760197686367374,
              "depth": 438.2921400162225
          },
          "color": "blue"
      },
      {
          "start": {
              "position": 1.0760197686367374,
              "depth": 438.2921400162225
          },
          "end": {
              "position": 0.7977907702808458,
              "depth": 243.51591323771842
          },
          "color": "blue"
      },
      {
          "start": {
              "position": 0.7977907702808458,
              "depth": 243.51591323771842
          },
          "end": {
              "position": -0.3211052411820683,
              "depth": 359.02646142032484
          },
          "color": "blue"
      },
      {
          "start": {
              "position": -0.3211052411820683,
              "depth": 359.02646142032484
          },
          "end": {
              "position": 0.2848593766897727,
              "depth": 511.5662224971465
          },
          "color": "blue"
      },
      {
          "start": {
              "position": 0,
              "depth": 42.11161798948698
          },
          "end": {
              "position": 1,
              "depth": 32.70257881567132
          },
          "color": "black"
      }
  ];
  segmentsToAdd.forEach(seg => fra.add(seg));
  expect(fra.test()).toBe(true);
    expect(fra.segments.length).toBe(1);
  })
  
  test("side-eye", () => {
    const fra = new CameraFrame();
    const segmentsToAdd = [
      {
          "start": {
              "position": -5.7794382389642935,
              "depth": 164.1097193952875
          },
          "end": {
              "position": 0.9071825348716298,
              "depth": 36.49657518178932
          },
          "color": "blue"
      },
      {
          "start": {
              "position": 0.9071825348716298,
              "depth": 36.49657518178932
          },
          "end": {
              "position": 3.372457532277845,
              "depth": 209.1219739769114
          },
          "color": "blue"
      },
      {
          "start": {
              "position": 0.6277216865605277,
              "depth": 236.07625886564705
          },
          "end": {
              "position": -0.7991800058970369,
              "depth": 305.50286414369344
          },
          "color": "black"
        }
    ];
    segmentsToAdd.forEach(seg => fra.add(seg));
    expect(fra.test()).toBe(true);
    expect(fra.segments.length).toBe(3);
  })
})