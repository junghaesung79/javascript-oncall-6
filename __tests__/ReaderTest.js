import { Console } from '@woowacourse/mission-utils';
import { Reader } from '../src/io/index.js';

jest.mock('@woowacourse/mission-utils', () => ({
  Console: {
    readLineAsync: jest.fn(),
  },
}));

describe.skip('Reader 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('readString 테스트', () => {
    const testCases = [
      ['정상 입력', 'aaa', 'aaa', false],
      ['공백 입력', '   ', null, true],
      ['빈 입력', '', null, true],
    ];

    testCases.forEach(([description, input, expected, isError]) => {
      test(description, async () => {
        const testPrompt = '테스트 프롬프트';
        Console.readLineAsync.mockResolvedValue(input);

        if (isError) {
          await expect(Reader.readString(testPrompt)).rejects.toThrow();
          return;
        }
        await expect(Reader.readString(testPrompt)).resolves.toBe(expected);
      });
    });
  });

  describe('readNumber 테스트', () => {
    const testCases = [
      ['정상 입력', '10', 10, false],
      ['정상 음수 입력', '-10', -10, false],
      ['문자 입력', '1j', null, true],
      ['빈 입력', '', null, true],
    ];

    testCases.forEach(([description, input, expected, isError]) => {
      test(description, async () => {
        const testPrompt = '테스트 프롬프트';
        Console.readLineAsync.mockResolvedValue(input);

        if (isError) {
          await expect(Reader.readNumber(testPrompt)).rejects.toThrow();
          return;
        }
        await expect(Reader.readNumber(testPrompt)).resolves.toBe(expected);
      });
    });
  });

  describe('readCSVString 테스트', () => {
    const testCases = [
      ['정상 입력', 'a,b,c', ['a', 'b', 'c'], false],
      ['중간에 빈 입력', 'a,,c', null, true],
    ];

    testCases.forEach(([description, input, expected, isError]) => {
      test(description, async () => {
        const testPrompt = '테스트 프롬프트';
        Console.readLineAsync.mockResolvedValue(input);

        if (isError) {
          await expect(Reader.readCSVString(testPrompt)).rejects.toThrow();
          return;
        }
        await expect(Reader.readCSVString(testPrompt)).resolves.toEqual(expected);
      });
    });
  });

  describe('readCSVNumber 테스트', () => {
    const testCases = [
      ['정상 입력', '1,2,3', [1, 2, 3], false],
      ['중간에 빈 입력', '1,,3', null, true],
      ['중간에 문자 입력', '1,b,3', null, true],
    ];

    testCases.forEach(([description, input, expected, isError]) => {
      test(description, async () => {
        const testPrompt = '테스트 프롬프트';
        Console.readLineAsync.mockResolvedValue(input);

        if (isError) {
          await expect(Reader.readCSVNumber(testPrompt)).rejects.toThrow();
          return;
        }
        await expect(Reader.readCSVNumber(testPrompt)).resolves.toEqual(expected);
      });
    });
  });
});
