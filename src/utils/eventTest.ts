import { EventDispatcher } from "./EventDispatcher";

type MyEvents = {
  NO_DATA: void;
  ANOTHER_NO_DATA?: void;
  YES_DATA: number;
  ANOTHER_YES_DATA: number;
};

const eventDis = new EventDispatcher<MyEvents>();
const func = () => {
  console.log("Did it");
};
eventDis.on("NO_DATA", func);

eventDis.publish("NO_DATA");

eventDis.publish("YES_DATA", 1);

eventDis.publish("ANOTHER_NO_DATA");

eventDis.publish("ANOTHER_YES_DATA", 123);

const nonGeneric = new EventDispatcher();

nonGeneric.publish("adasd");

nonGeneric.publish("asdasd", 123);
