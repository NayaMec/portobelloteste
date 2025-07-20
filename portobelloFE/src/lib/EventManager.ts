type Listener<T = any> = (payload: T) => void;

export default class EventManager<Events extends Record<string, any> = Record<string, any>> {
  private listeners: Map<keyof Events, Listener<any>[]>;

  constructor() {
    this.listeners = new Map();
  }

  on<K extends keyof Events>(event: K, listener: Listener<Events[K]>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)!.push(listener);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    if (!this.listeners.has(event)) return;

    this.listeners.get(event)!.forEach((listener) => {
      listener(payload);
    });
  }

  removeListener<K extends keyof Events>(event: K, listenerToRemove: Listener<Events[K]>) {
    const listeners = this.listeners.get(event);
    if (!listeners) return;

    const filteredListeners = listeners.filter((listener) => listener !== listenerToRemove);
    this.listeners.set(event, filteredListeners);
  }
}
