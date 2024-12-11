import { Reader } from '../src/io/index.js';
import { InputView } from '../src/view/index.js';

jest.mock('../src/io/index.js', () => ({
  Reader: {
    readNumber: jest.fn(),
    readCSVNumber: jest.fn(),
  },
}));

describe('InputView 테스트', () => {
  let inputView;

  beforeEach(() => {
    inputView = new InputView();
    jest.clearAllMocks();
  });

  describe('getPurchasePrice 테스트', () => {
    const testCases = [
      ['정상 테스트', 8000, 8000, false],
      ['예외 테스트', 500, null, true],
    ];

    testCases.forEach(([description, input, output, isError]) => {
      test(description, async () => {
        Reader.readNumber.mockResolvedValue(input);

        if (isError) {
          await expect(inputView.getPurchasePrice()).rejects.toThrow();
          return;
        }
        await expect(inputView.getPurchasePrice()).resolves.toBe(output);
      });
    });
  });

  describe('getBonusNumber 테스트', () => {
    const testCases = [
      ['정상 테스트', 7, 7, false],
      ['예외 테스트', 6, null, true],
      ['예외 테스트', 0, null, true],
      ['예외 테스트', 46, null, true],
    ];

    testCases.forEach(([description, input, output, isError]) => {
      test(description, async () => {
        const winningNumbers = [1, 2, 3, 4, 5, 6];
        Reader.readNumber.mockResolvedValue(input);

        if (isError) {
          await expect(inputView.getBonusNumber(winningNumbers)).rejects.toThrow();
          return;
        }
        await expect(inputView.getBonusNumber(winningNumbers)).resolves.toBe(output);
      });
    });
  });
});
