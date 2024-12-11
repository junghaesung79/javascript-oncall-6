import { CONFIG, HOLIDAY } from '../constants/index.js';

export const getHoliday = (month, date, day) => {
  if (CONFIG.weekend.includes(day)) return '';
  if (HOLIDAY.holiday[month].includes(date)) return '(휴일)';
  return '';
};
