import { Reader } from '../io/index.js';
import { throwError } from '../utils/errorHandler.js';
import { CONFIG, ERRORS, PROMPTS } from '../constants/index.js';
import { ascendingString } from '../utils/array.js';

export default class InputView {
  #weekDayShift;

  async getStartMonthAndDay() {
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

  async getWeekdayShift() {
    const people = await Reader.readCSVString(PROMPTS.weekdayShift);

    if (
      this.#isInvalidPeopleCount(people) ||
      this.#isDuplicatedNickname(people) ||
      this.#isInvalidNameLength(people)
    ) {
      throwError(ERRORS.invalidInput);
    }

    this.#weekDayShift = people;
    return people;
  }

  async getWeekendShift() {
    const people = await Reader.readCSVString(PROMPTS.weekendShift);

    if (this.#isEqualToWeekdayShift(people)) {
      throwError(ERRORS.invalidInput);
    }

    return people;
  }

  #isInvalidStartDatas(data) {
    return data.length > CONFIG.startDataCount;
  }

  #isInvalidInteger(number) {
    return isNaN(number) || !Number.isInteger(number);
  }

  #isInvalidMonth(month) {
    return month > CONFIG.lastMonth || month < CONFIG.firstMonth;
  }

  #isInvalidDay(day) {
    return !CONFIG.dayOfWeek.includes(day);
  }

  #isInvalidPeopleCount(people) {
    return people.length > CONFIG.maxShiftPeople || people.length < CONFIG.minShiftPeople;
  }

  #isDuplicatedNickname(people) {
    return new Set(people).size !== people.length;
  }

  #isInvalidNameLength(people) {
    return people.some((name) => name.length > CONFIG.maxNameLength);
  }

  #isEqualToWeekdayShift(people) {
    const ascendingPeople = ascendingString(people);
    const ascendingweekDayShift = ascendingString(this.#weekDayShift);
    return ascendingPeople.toString() !== ascendingweekDayShift.toString();
  }
}
