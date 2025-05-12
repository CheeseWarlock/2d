import { EventDispatcher } from "./EventDispatcher";

type MyEvents = {
  NO_DATA: void;
  ANOTHER_NO_DATA?: void;
  YES_DATA: number;
  ANOTHER_YES_DATA: number;
};

describe("EventDispatcher", () => {
  let dispatcher: EventDispatcher<MyEvents>;

  beforeEach(() => {
    dispatcher = new EventDispatcher<MyEvents>();
  });

  it("should call the listener when an event with no payload is published", () => {
    const callback = jest.fn();
    dispatcher.on("NO_DATA", callback);

    dispatcher.publish("NO_DATA");

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(undefined);
  });

  it("should call the listener when an event with a payload is published", () => {
    const callback = jest.fn();
    dispatcher.on("YES_DATA", callback);

    dispatcher.publish("YES_DATA", 42);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(42);
  });

  it("should not call the listener after it is removed", () => {
    const callback = jest.fn();
    dispatcher.on("YES_DATA", callback);
    dispatcher.off("YES_DATA", callback);

    dispatcher.publish("YES_DATA", 42);

    expect(callback).not.toHaveBeenCalled();
  });

  it("should clear all listeners for a specific event", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    dispatcher.on("YES_DATA", callback1);
    dispatcher.on("YES_DATA", callback2);

    dispatcher.clear("YES_DATA");
    dispatcher.publish("YES_DATA", 42);

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).not.toHaveBeenCalled();
  });

  it("should handle events with optional payloads", () => {
    const callback = jest.fn();
    dispatcher.on("ANOTHER_NO_DATA", callback);

    dispatcher.publish("ANOTHER_NO_DATA");

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(undefined);
  });

  it("should not throw an error when publishing an event with no listeners", () => {
    expect(() => dispatcher.publish("NO_DATA")).not.toThrow();
  });

  it("should not throw an error when removing a listener that was never added", () => {
    const callback = jest.fn();

    expect(() => dispatcher.off("YES_DATA", callback)).not.toThrow();
  });

  it("should allow multiple listeners for the same event", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    dispatcher.on("YES_DATA", callback1);
    dispatcher.on("YES_DATA", callback2);

    dispatcher.publish("YES_DATA", 42);

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback1).toHaveBeenCalledWith(42);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith(42);
  });

  it("should not call listeners for other events", () => {
    const callback = jest.fn();
    dispatcher.on("YES_DATA", callback);

    dispatcher.publish("NO_DATA");

    expect(callback).not.toHaveBeenCalled();
  });
});

describe("EventDispatcher with no generics", () => {
  let dispatcher: EventDispatcher;

  beforeEach(() => {
    dispatcher = new EventDispatcher();
  });

  it("should call the listener when an event with no payload is published", () => {
    const callback = jest.fn();
    dispatcher.on("something", callback);

    dispatcher.publish("something");

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(undefined);
  });

  it("should call the listener when an event with a payload is published", () => {
    const callback = jest.fn();
    dispatcher.on("anything", callback);

    dispatcher.publish("anything", 42);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(42);
  });
});
