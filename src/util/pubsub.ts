type EventCallback<T> = (...args: T[]) => void;

interface Publisher<T> {
  subscribe(key: string, callback: EventCallback<T>): {
    unsubscribe(): void;
  };
}

export class Emitter<T> implements Publisher<T> {
  private events: Map<string, EventCallback<T>[]>;
  // Store events
  constructor() {
    this.events = new Map();
  }
  // Get size
  get size() {
    return this.events.size;
  }

  // Subscribe and return unsubscribe callback
  subscribe(eventId: string, callback: EventCallback<T>) {
    if (!this.events.has(eventId)) {
      this.events.set(eventId, [])
    }
    const event = this.events.get(eventId)!
    event.push(callback)
    const unsubscribe = () => {
      const index = event.indexOf(callback)
      if (index === -1) return;
      event.splice(index, 1)
    }
    
    return { unsubscribe }
  }

  // Emit values to consumers
  emit(eventId: string, value: T) {
    const event = this.events.get(eventId)
    if (!this.size || !event) return
    event.forEach(callback => callback(value))
  }
  // Remove all subscribed consumers
  clear() {
    this.events.clear();
    this.events = new Map();
  }
}