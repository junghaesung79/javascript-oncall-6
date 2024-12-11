import { Reader } from '../io/index.js';
import { throwError } from '../utils/errorHandler.js';
import { CONFIG, ERRORS, PROMPTS } from '../constants/index.js';

export default class InputView {
  static async getStartMonthAndDay() {
    const startDatas = Reader.readCSVString(PROMPTS.startMonthAndDay);
    const [startMonth, startDay] = startDatas;

    if (
      this.#isInvalidStartDatas(startDatas) ||
      this.#isInvalidInteger(startMonth) ||
      this.#isInvalidMonth(startMonth)
    )
      throwError(ERRORS.invalidInput);

    if (this.#isInvalidDay(startDay)) {
      throwError(ERRORS.invalidInput);
    }

    return { startMonth, startDay };
  }
  //   const [month, dayOfWeek] = Reader.readCSVString(PROMPTS.weekdayShift);
  //   const [month, dayOfWeek] = Reader.readCSVString(PROMPTS.weekendShift);

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
    return CONFIG.dayOfWeek.includes(day);
  }
}
