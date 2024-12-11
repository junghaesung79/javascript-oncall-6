import { CONFIG } from '../constants/index.js';

export default class Day {
  #startDay;

  constructor(day) {
    this.#startDay = day;
  }

  generateDayOfDate(date) {
    const days = [...CONFIG.dayOfWeek];
    const dayIndex = days.indexOf(this.#startDay);
    const splicedDays = days.splice(dayIndex);
    const newDays = [...splicedDays, ...days];

    return newDays[(date - 1) % 7];
  }
}
