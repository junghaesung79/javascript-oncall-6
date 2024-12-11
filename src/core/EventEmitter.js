export default class EventEmitter {
  static #listeners = new Map();

  static on(event, callback) {
    this.#listeners.set(event, callback);
  }

  static emit(event, data) {
    const callback = this.#listeners.get(event);
    if (callback) callback(data);
  }
}
