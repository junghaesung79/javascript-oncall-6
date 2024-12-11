import { Reader } from '../io/index.js';
import { throwError } from '../utils/errorHandler.js';
import { PROMPTS } from '../constants/index.js';

export default class InputView {
  static async confirm(promptType) {
    // 사용할 때 CONFIRM_TYPES. 으로 인자 넣기
    const answer = await Reader.readConfirmation(PROMPTS[promptType]);
    return answer === 'y';
  }
}
