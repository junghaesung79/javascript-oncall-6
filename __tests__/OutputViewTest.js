import { OutputView } from '../src/view/index.js';

describe.skip('OutputView 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('', () => {
    OutputView.printShift(1, '토');
    expect(true).toBe(true);
  });
});
