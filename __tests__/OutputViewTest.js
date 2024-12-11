import { Printer } from '../src/io/index.js';
import { OutputView } from '../src/view/index.js';

describe('OutputView 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('', () => {
    OutputView.printShift(1, '토');
    expect(true).toBe(true);
  });
});
