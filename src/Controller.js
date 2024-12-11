import { CONFIG, ERRORS } from './constants/index.js';
import { Service } from './services/index.js';
import { throwError } from './utils/errorHandler.js';
import { InputView, OutputView } from './view/index.js';
import { EventEmitter } from './core/index.js';
import { EVENT_TYPES } from './types/index.js';

export default class Controller {
  constructor() {
    this.inputView = new InputView();

    EventEmitter.on(EVENT_TYPES.submit, (data) => {
      OutputView.printSubmit(data);
    });
    // 사용할 때
    // EventEmitter.emit(EVENT_TYPES.submit, result)
  }

  async run() {
    const { startMonth, startDay } = await this.#retryOnError(
      async () => await this.inputView.getStartMonthAndDay(),
    );
    const weekdayShift = await this.#retryOnError(
      async () => await this.inputView.getWeekdayShift(),
    );
    const weekendShift = await this.#retryOnError(
      async () => await this.inputView.getWeekendShift(),
    );

    OutputView.printShift(startMonth, startDay);
  }

  async #retryOnError(inputFunction) {
    let attempts = 0;

    while (attempts < CONFIG.maxRetryCount) {
      try {
        return await inputFunction();
      } catch (error) {
        OutputView.printError(error.message);
        attempts += 1;

        if (attempts === CONFIG.maxRetryCount) {
          throw throwError(ERRORS.exceedMaxRetryCount);
        }
      }
    }
  }
}
