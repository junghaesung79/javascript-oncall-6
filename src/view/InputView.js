import { Reader } from '../io/index.js';
import { throwError } from '../utils/errorHandler.js';
import { CONFIG, ERRORS, PROMPTS } from '../constants/index.js';

export default class InputView {
  static async getStartMonthAndDay() {
    const startDatas = await Reader.readCSVString(PROMPTS.startMonthAndDay);
    const startMonth = Number(startDatas[0]);
    const startDay = startDatas[1];

    if (
      this.#isInvalidStartDatas(startDatas) ||
      this.#isInvalidInteger(startMonth) ||
      this.#isInvalidMonth(startMonth)
    )
      throwError(ERRORS.invalidInput);

    if (this.#isInvalidDay(startDay)) {
      throwError(ERRORS.invalidInput);
    }

    console.log({ startMonth, startDay });
    return { startMonth, startDay };
  }

  static async getWeekdayShift() {
    const people = await Reader.readCSVString(PROMPTS.weekdayShift);

    if (
      this.#isInvalidPeopleCount(people) ||
      this.#isDuplicatedNickname(people) ||
      this.#isInvalidNameLength(people)
    ) {
      throwError(ERRORS.invalidInput);
    }

    return people;
  }
  // const [month, dayOfWeek] = await Reader.readCSVString(PROMPTS.weekendShift);

  static #isInvalidStartDatas(data) {
    return data.length > CONFIG.startDataCount;
  }

  static #isInvalidInteger(number) {
    return isNaN(number) || !Number.isInteger(number);
  }

  static #isInvalidMonth(month) {
    return month > CONFIG.lastMonth || month < CONFIG.firstMonth;
  }

  static #isInvalidDay(day) {
    return !CONFIG.dayOfWeek.includes(day);
  }

  static #isInvalidPeopleCount(people) {
    return people.length > CONFIG.maxShiftPeople || people.length < CONFIG.minShiftPeople;
  }

  static #isDuplicatedNickname(people) {
    return new Set(people).size !== people.length;
  }

  static #isInvalidNameLength(people) {
    return people.some((name) => name.length > CONFIG.maxNameLength);
  }
}
