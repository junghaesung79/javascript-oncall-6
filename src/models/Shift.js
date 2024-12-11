export default class Shift {
  #shift;

  constructor(shift) {
    this.#shift = shift;
  }

  generateShiftName(date) {
    return this.#shift[(date - 1) % this.#shift.length];
  }

  peekWorker() {
    return this.#shift[0];
  }

  getWorker() {
    const worker = this.#shift.shift();
    this.#shift.push(worker);

    return worker;
  }

  exchangeTopTwo() {
    const arrA = [...this.#shift];
    const arrB = arrA.splice(0);
    const target = arrB.shift();
    const next = arrB.shift();

    this.#shift = [...arrA, next, target, ...arrB];
  }

  static getWorker(isHoliday, weekdayShift, weekendShift) {
    const weekdayWorker = weekdayShift.peekWorker();
    const weekendWorker = weekendShift.peekWorker();

    if (isHoliday) {
      if (weekdayWorker === weekendWorker) {
        weekendShift.exchangeTopTwo();
      }
      return weekendShift.getWorker();
    }

    if (weekdayWorker === weekendWorker) {
      weekdayShift.exchangeTopTwo();
    }
    return weekdayShift.getWorker();
  }
}
