// 한국 원화
export const formatKRW = (amount) => {
  return amount.toLocaleString('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  });
};

// 소수점 둘째 자리까지
export const formatDecimal = (number) => {
  return number.toLocaleString('ko-KR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// 백분율
export const formatPercent = (ratio) => {
  return ratio.toLocaleString('ko-KR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};
