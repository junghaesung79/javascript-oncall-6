export const sum = (arr) => arr.reduce((acc, curr) => acc + curr, 0);

export const average = (arr) => {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
};

export const ascending = (arr) => {
  return [...arr].sort((a, b) => a - b);
};

export const descending = (arr) => {
  return [...arr].sort((a, b) => b - a);
};

export const ascendingString = (arr) => {
  return [...arr].sort();
};

export const descendingString = (arr) => {
  return [...arr].sort().reverse();
};

export const sortByKey = (arr, key) => {
  return [...arr].sort((a, b) => a[key] - b[key]);
};
