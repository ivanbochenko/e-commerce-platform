import { Emitter } from "./pubsub";

const eventEmitter = new Emitter<string>();

// Define event handlers
const handler1 = (message: string) => {
  console.log(`Handler 1: ${message}`);
};
const handler2 = (message: string) => {
  console.log(`Handler 2: ${message}`);
};

// Subscribe handlers to events
const sub1 = eventEmitter.subscribe('event1', handler1);
const sub2 = eventEmitter.subscribe('event1', handler2);

// Emit the event
eventEmitter.emit('event1', 'Hello, World!');
sub1.unsubscribe()
eventEmitter.emit('event1', 'Hello, World!');