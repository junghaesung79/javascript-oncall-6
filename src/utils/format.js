export const formatShift = ({ month, date, day, holiday, nickname }) => {
  // 5월 1일 월 준팍
  // 5월 5일 금(휴일) 루루
  return `${month}월 ${date}일 ${day}${holiday} ${nickname}`;
};
