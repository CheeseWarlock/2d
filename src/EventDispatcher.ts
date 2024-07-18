type someEvents = "thing" | "something";

class EventDispatcher<Events> {
  _listeners: Map<Events, () => void> = new Map();

  on = (eventName: Events, func: () => void) => {};

  off = (eventName: Events, func: () => void) => {};
}

const eventDis = new EventDispatcher<someEvents>();

eventDis.on("thing", () => {});

eventDis.off("thing", () => {});
