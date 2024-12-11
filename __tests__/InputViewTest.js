import { startMonth } from '../src/constants/config.js';
import { Reader } from '../src/io/index.js';
import { InputView } from '../src/view/index.js';

jest.mock('../src/io/index.js', () => ({
  Reader: {
    readCSVString: jest.fn(),
  },
}));

describe('InputView 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe.skip('getStartMonthAndDay 테스트', () => {
    const testCases = [
      ['정상 입력', ['1', '월'], { startMonth: 1, startDay: '월' }, false],
      ['숫자가 아닌 월', ['일', '일'], null, true],
      ['벗어난 월', ['0', '일'], null, true],
      ['벗어난 월', ['13', '일'], null, true],
      ['없는 요일', ['1', '가'], null, true],
    ];

    testCases.forEach(([description, input, expected, isError]) => {
      test(description, async () => {
        Reader.readCSVString.mockResolvedValue(input);

        if (isError) {
          await expect(InputView.getStartMonthAndDay()).rejects.toThrow();
          return;
        }
        await expect(InputView.getStartMonthAndDay()).resolves.toEqual(expected);
      });
    });
  });
});
