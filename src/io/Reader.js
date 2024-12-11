import { Console } from '@woowacourse/mission-utils';
import { CONFIG, ERRORS } from '../constants/index.js';
import { throwError } from '../utils/errorHandler.js';

export default class Reader {
  static async readString(query) {
    return this.#readAndNormalize(query);
  }

  static async readNumber(query) {
    const normalizedLine = await this.#readAndNormalize(query);

    this.#validateNumber(normalizedLine);

    return Number(normalizedLine);
  }

  static async readCSVString(query) {
    const normalizedLine = await this.#readAndNormalize(query);
    const items = this.#parseCSV(normalizedLine);

    this.#validateCSVItems(items);
    return items;
  }

  static async readCSVNumber(query) {
    const normalizedLine = await this.#readAndNormalize(query);
    const items = this.#parseCSV(normalizedLine);

    this.#validateCSVItems(items);

    return items.map((item) => {
      this.#validateNumber(item);
      return Number(item);
    });
  }

  static async readConfirmation(query) {
    const normalizedInput = await this.#readAndNormalize(query);
    const answer = normalizedInput.toLowerCase();

    const isValidAnswer = CONFIG.confirmAnswers.includes(answer);
    if (!isValidAnswer) {
      throwError(ERRORS.invalidConfirmation);
    }

    return answer;
  }

  static async #readAndNormalize(query) {
    const line = await Console.readLineAsync(query);
    const normalizedLine = line.trim();

    if (normalizedLine === '') {
      throwError(ERRORS.emptyInput);
    }

    return normalizedLine;
  }

  static #parseCSV(line) {
    return line.split(CONFIG.csvDelimiter).map((item) => item.trim());
  }

  static #validateNumber(value) {
    const number = Number(value);
    if (isNaN(number) || !Number.isInteger(number)) {
      throwError(ERRORS.invalidNumber, { value });
    }
  }

  static #validateCSVItems(splittedLine) {
    if (splittedLine.some((word) => word.trim() === '')) {
      throwError(ERRORS.invalidCSV);
    }
  }
}
