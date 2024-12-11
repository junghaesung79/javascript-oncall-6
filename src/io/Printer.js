import { Console } from '@woowacourse/mission-utils';

export default class Printer {
  static print(message) {
    Console.print(message);
  }

  static newline(count = 1) {
    Console.print('\n'.repeat(count - 1));
  }
}
