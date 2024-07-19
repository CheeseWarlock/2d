type KeysWithPayload<T> = {
  [K in keyof T]-?: T[K] extends void ? K : never;
}[keyof T];

/**
 * A strongly-typed event dispatcher.
 * Pass a type to it with keys of the event names and values of the payloads.
 * Like `EventDispatcher<{ EVENT_A: void; EVENT_B: number; }>`
 */
export class EventDispatcher<Events extends Record<string, any>> {
  _listeners: Map<keyof Events, Function[]> = new Map();

  on<K extends keyof Events>(key: K, callback: (data: Events[K]) => void) {
    if (!this._listeners.get(key)) this._listeners.set(key, []);
    const arr = this._listeners.get(key);
    arr?.push(callback);
  }

  off<K extends keyof Events>(key: K, callback: (data: Events[K]) => void) {
    if (!this._listeners.get(key)) return;

    this._listeners.set(
      key,
      this._listeners.get(key)!.filter((func) => func !== callback)
    );
  }

  clear<K extends keyof Events>(key: K) {
    this._listeners.set(key, []);
  }

  publish<K extends keyof Pick<Events, KeysWithPayload<Events>>>(key: K): void;
  publish<K extends keyof Omit<Events, KeysWithPayload<Events>>>(
    key: K,
    data: Events[K]
  ): void;
  publish<K extends keyof Events>(key: K, data?: Events[K]): void {
    if (!this._listeners.get(key)) return;

    this._listeners.get(key)!.forEach((func) => func(data));
    return;
  }
}
