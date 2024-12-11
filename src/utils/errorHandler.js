import { ValidationError } from '../errors/index.js';

export const throwError = (message) => {
  throw new ValidationError(message);
};
