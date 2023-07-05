export const getArraySlider = (start, end, length) => {
  const limit = start > end ? length : end;
  let output = [];
  for (let i = start; i <= limit; i++) {
    output.push(i);
  }
  if (start > end) {
    for (let i = 0; i <= end; i++) {
      output.push(i);
    }
  }
  return output;
};

// lenght 5
// 0 1 2 3 4 5
// 1 2 3 4 5 0
// 2 3 4 5 0 1
// 3 4 5 0 1 2
// 4 5 0 1 2 3
// 5 0 1 2 3 4
// 0 1 2 3 4 5

//0 1 2
//1 2 0

export function formatNumber(num, precision = 2) {
  const map = [
    {suffix: "T", threshold: 1e12},
    {suffix: "B", threshold: 1e9},
    {suffix: "M", threshold: 1e6},
    {suffix: "K", threshold: 1e3},
    {suffix: "", threshold: 1},
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num;
}
