import { CONFIG } from '../constants/index.js';

export default class Shift {
  #shift;

  constructor(shift) {
    this.#shift = shift;
  }

  generateShiftName(date) {
    return this.#shift[(date - 1) % this.#shift.length];
  }
}
