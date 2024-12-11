import { Printer } from '../io/index.js';
import { MONTH } from '../constants/index.js';
import { formatShift } from '../utils/format.js';
import { Day } from '../models/index.js';

export default class OutputView {
  static error(message) {
    Printer.print(message);
  }

  static printShift(month, day) {
    const countOfMonth = MONTH.countOfMonth[month];
    const dayGenerator = new Day(day);

    const shiftLines = [...Array(countOfMonth)].map((_, index) => {
      const element = {
        month: month,
        date: index + 1,
        day: dayGenerator.generateDayOfDate(index + 1),
        holiday: '(휴일)',
        nickname: '해성',
      };

      return formatShift(element);
    });

    Printer.print(shiftLines.join('\n'));
  }
}
