import { Printer } from '../io/index.js';
import { CONFIG, MONTH } from '../constants/index.js';
import { formatShift } from '../utils/format.js';
import { Day, Shift } from '../models/index.js';
import { getHoliday, getIsHoliday } from '../utils/holiday.js';

export default class OutputView {
  static error(message) {
    Printer.print(message);
  }

  static printShift(month, day, weekdayShift, weekendShift) {
    const countOfMonth = MONTH.countOfMonth[month];
    const dayGenerator = new Day(day);

    const shiftLines = [...Array(countOfMonth)].map((_, index) => {
      const date = index + 1;
      const day = dayGenerator.generateDayOfDate(date);
      const holiday = getHoliday(month, date, day);
      const isHoliday = getIsHoliday(month, date, day);
      const nickname = Shift.getWorker(isHoliday, weekdayShift, weekendShift);

      const element = {
        month,
        date,
        day,
        holiday,
        nickname,
      };

      return formatShift(element);
    });

    Printer.print(shiftLines.join('\n'));
  }
}
