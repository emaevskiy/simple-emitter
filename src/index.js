import { isTypeOf } from '@/utils';

export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  $on(event, fn) {
    if (!isTypeOf(event, [String, Array]) || !isTypeOf(fn, [Function])) return this;

    if (!this.events[event]) {
      this.events[event] = [];
    }

    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.$on(event[i], fn);
      }
    } else {
      this.events[event].push(fn);
    }

    return this;
  }

  $once(event, fn) {
    const on = (...args) => {
      this.$off(event, on);
      fn.apply(this, args);
    };

    on.fn = fn;
    this.$on(event, on);
    return this;
  }

  $off(event, fn) {
    if (!arguments.length) {
      this.events = {};
      return this;
    }
    // array of events
    if (Array.isArray(event)) {
      for (let i = 0, l = event.length; i < l; i++) {
        this.$off(event[i], fn);
      }
      return this;
    }
    // specific event
    const callbacks = this.events[event];
    if (!callbacks) {
      return this;
    }
    if (!fn) {
      this.events[event] = null;
      return this;
    }
    // specific handler
    let callback;
    let i = callbacks.length;
    while (i--) {
      callback = callbacks[i];
      if (callback === fn || callback.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }
    return this;
  }

  $emit(event, ...payload) {
    let callbacks = this.events[event];
    if (callbacks) {
      callbacks = callbacks.length > 1 ? [...callbacks] : callbacks;
      for (let i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i].call(this, ...payload);
      }
    }
    return this;
  }
}
