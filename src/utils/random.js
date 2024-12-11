import { Random } from '@woowacourse/mission-utils';
import { CONFIG } from '../constants/index.js';

export const getTryNumber = () => {
  const number = Random.pickNumberInRange(CONFIG.minRandomNumber, CONFIG.maxRandomNumber);

  return number;
};
