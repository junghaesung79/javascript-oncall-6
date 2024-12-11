import { startMonth } from '../src/constants/config.js';
import { Reader } from '../src/io/index.js';
import { InputView } from '../src/view/index.js';

jest.mock('../src/io/index.js', () => ({
  Reader: {
    readCSVString: jest.fn(),
  },
}));

describe.skip('InputView 테스트', () => {
  let inputView;

  beforeEach(() => {
    inputView = new InputView();
    jest.clearAllMocks();
  });

  describe('getStartMonthAndDay 테스트', () => {
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
          await expect(inputView.getStartMonthAndDay()).rejects.toThrow();
          return;
        }
        await expect(inputView.getStartMonthAndDay()).resolves.toEqual(expected);
      });
    });
  });

  describe('getWeekdayShift 테스트', () => {
    const testCases = [
      ['정상 입력', ['가', '나', '다', '라', '마'], ['가', '나', '다', '라', '마'], false],
      // [
      //   '많은 사람',
      //   ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차', '카', '타', '파', '하'],
      //   null,
      //   true,
      // ],
      ['적은 사람', ['가', '나'], null, true],
      ['중복 이름', ['가', '나', '다', '라', '라'], null, true],
      ['긴 이름', ['가가가가가가', '나', '다', '라', '마'], null, true],
    ];

    testCases.forEach(([description, input, expected, isError]) => {
      test(description, async () => {
        Reader.readCSVString.mockResolvedValue(input);

        if (isError) {
          await expect(inputView.getWeekdayShift()).rejects.toThrow();
          return;
        }
        await expect(inputView.getWeekdayShift()).resolves.toEqual(expected);
      });
    });
  });

  describe('getWeekendShift 테스트', () => {
    const weedayShift = ['가', '나', '다', '라', '마'];
    const testCases = [
      ['정상 입력', ['가', '나', '다', '라', '마'], ['가', '나', '다', '라', '마'], false],
      ['평일과 다른 입력', ['구', '나', '다', '라', '마'], null, true],
    ];

    testCases.forEach(([description, input, expected, isError]) => {
      test(description, async () => {
        Reader.readCSVString.mockResolvedValue(weedayShift);
        await inputView.getWeekdayShift();

        Reader.readCSVString.mockResolvedValue(input);

        if (isError) {
          await expect(inputView.getWeekendShift()).rejects.toThrow();
          return;
        }
        await expect(inputView.getWeekendShift()).resolves.toEqual(expected);
      });
    });
  });
});
