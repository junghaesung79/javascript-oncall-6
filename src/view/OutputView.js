import { Printer } from '../io/index.js';

export default class OutputView {
  static error(message) {
    Printer.print(message);
  }
}
