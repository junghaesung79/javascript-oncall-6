import { CONFIG, HOLIDAY } from '../constants/index.js';

export const getHoliday = (month, date, day) => {
  if (CONFIG.weekend.includes(day)) return '';
  if (HOLIDAY.holiday[month].includes(date)) return '(휴일)';
  return '';
};

export const getIsHoliday = (month, date, day) => {
  if (CONFIG.weekend.includes(day)) return true;
  if (HOLIDAY.holiday[month].includes(date)) return true;
  return false;
};
