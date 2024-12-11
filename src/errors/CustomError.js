import { CONFIG } from '../constants/index.js';

export default class CustomError extends Error {
  constructor(message) {
    super(`${CONFIG.errorPrefix} ${message}`);
    this.name = this.constructor.name;
  }
}
