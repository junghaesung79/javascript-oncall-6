import { Shift } from '../src/models/index.js';

describe.skip('Shift 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('exchangeTopTwo 테스트', () => {
    const nameString = '허브,쥬니,말랑,라온,헤나';
    const names = nameString.split(',');
    const shift = new Shift(names);
    shift.exchangeTopTwo();

    expect(shift.getWorker()).toBe('쥬니');
  });

  test('exchangeTopTwo 테스트', () => {
    const nameString1 = '허브,쥬니,말랑,라온,헤나';
    const nameString2 = '쥬니,라온,말랑,허브,헤나';
    const names1 = nameString1.split(',');
    const names2 = nameString2.split(',');
    const shift1 = new Shift(names1);
    const shift2 = new Shift(names2);
    const isHoliday = true;

    expect(Shift.getWorker(isHoliday, shift1, shift2)).toBe('쥬니');
  });
});
