import { Printer } from '../io/index.js';
import { MONTH } from '../constants/index.js';
import { formatShift } from '../utils/format.js';

export default class OutputView {
  static error(message) {
    Printer.print(message);
  }

  static printShift(month) {
    const countOfMonth = MONTH.countOfMonth[month];

    const shiftLines = [...Array(countOfMonth)].map((_, index) => {
      const element = {
        month: month,
        date: index + 1,
        day: '월',
        holiday: '(휴일)',
        nickname: '해성',
      };

      return formatShift(element);
    });

    Printer.print(shiftLines.join('\n'));
  }
}
