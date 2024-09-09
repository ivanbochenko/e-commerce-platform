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
  get size(): number {
    return this.events.size;
  }

  // Subscribe and return unsubscribe callback
  subscribe(eventId: string, callback: EventCallback<T>) {
    if (!this.events.get(eventId)) {
      this.events.set(eventId, [])
    }
    const event = this.events.get(eventId)!
    const index = event.push(callback) - 1
    
    return { unsubscribe: () => event.splice(index, 1) }
  }

  // Emit values to consumers
  emit(eventId: string, value: T) {
    if (this.events.size === 0) return;
    this.events.get(eventId)!.forEach(callback => callback(value));
  }
  // Remove all subscribed consumers
  clear() {
    this.events.clear();
    this.events = new Map();
  }
}